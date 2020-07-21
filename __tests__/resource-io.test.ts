import { readFile, writeFile, buildXml } from '../src/resource-io';
import { resolve } from 'path';

test("IO: read file correctly parses known XML", async () => {
    const resourcePath = resolve(__dirname, "./data/Test.en.resx");
    const resourceXml = await readFile(resourcePath);

    expect(resourceXml).toBeTruthy();
    expect(resourceXml.root).toBeTruthy();
    expect(resourceXml.root.data).toBeTruthy();

    expect(resourceXml.root.data[0].$.name).toEqual("Greetings");
    expect(resourceXml.root.data[0].value[0]).toEqual("Hello world, this is a test.... only a test!");
    expect(resourceXml.root.data[1].$.name).toEqual("MyFriend");
    expect(resourceXml.root.data[1].value[0]).toEqual("Where have you gone?");
});

test("IO: roundtrip, resolve->read->write->read-> compare", async () => {
    const fakePath = resolve(__dirname, './test-7.en.resx');
    const resourcePath = resolve(__dirname, "./data/Test.en.resx");
    const resourceXml = await readFile(resourcePath);

    const xml = buildXml(resourceXml);
    writeFile(fakePath, xml);

    const compareXml = await readFile(fakePath);
    expect(resourceXml).toEqual(compareXml);

    expect(resourceXml).toBeTruthy();
    expect(resourceXml.root).toBeTruthy();
    expect(resourceXml.root.data).toBeTruthy();

    expect(resourceXml.root.data[0].$.name).toEqual("Greetings");
    expect(resourceXml.root.data[0].value[0]).toEqual("Hello world, this is a test.... only a test!");
    expect(resourceXml.root.data[1].$.name).toEqual("MyFriend");
    expect(resourceXml.root.data[1].value[0]).toEqual("Where have you gone?");
});
