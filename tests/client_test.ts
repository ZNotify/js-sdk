import {Client} from "../src";

test("client create", async () => {
    expect(await Client.create("zxilly")).toBeInstanceOf(Client);
});

test("client create failed", async () => {
    await expect(Client.create("error")).rejects.toThrowError("User ID not valid");
});

test("client send 0", async () => {
    const client = await Client.create("zxilly");
    await expect(client.send("")).rejects.toThrowError("Content is required");
});

test("client send 1", async () => {
    const client = await Client.create("zxilly");
    expect(await client.send("test")).toStrictEqual({
        content: "test",
        long: "",
        title: "Notification"
    });
});

test("client send 2", async () => {
    const client = await Client.create("zxilly");
    expect(await client.send("content", "title")).toStrictEqual({
        content: "content",
        long: "",
        title: "title"
    });
});

test("client send 3", async () => {
    const client = await Client.create("zxilly");
    expect(await client.send("content", "title", "long")).toStrictEqual({
        content: "content",
        long: "long",
        title: "title"
    });
});

test("client send with option", async () => {
    const client = await Client.create("zxilly");
    expect(await client.send({
        content: "content",
        long: "long",
        title: "title"
    })).toStrictEqual({
        content: "content",
        long: "long",
        title: "title"
    });
});
