import {Client} from "../src";
import {checkTestServer} from "./utils";

beforeAll(checkTestServer);

test("client create", async () => {
    expect(await Client.create("test")).toBeInstanceOf(Client);
});

test("client create failed", async () => {
    await expect(Client.create("error")).rejects.toThrowError("User ID not valid");
});

test("client send 0", async () => {
    const client = await Client.create("test");
    await expect(client.send("")).rejects.toThrowError("Content is required");
});

test("client send 1", async () => {
    const client = await Client.create("test");
    expect(await client.send("test")).toMatchObject({
        content: "test",
        long: "",
        title: "Notification",
        user_id: "test"
    });
});

test("client send 2", async () => {
    const client = await Client.create("test");
    expect(await client.send("content", "title")).toMatchObject({
        content: "content",
        long: "",
        title: "title",
        user_id: "test"
    });
});

test("client send 3", async () => {
    const client = await Client.create("test");
    expect(await client.send("content", "title", "long")).toMatchObject({
        content: "content",
        long: "long",
        title: "title",
        user_id: "test"
    });
});

test("client send with option", async () => {
    const client = await Client.create("test");
    expect(await client.send({
        content: "content",
        long: "long",
        title: "title"
    })).toMatchObject({
        content: "content",
        long: "long",
        title: "title",
        user_id: "test"
    });
});
