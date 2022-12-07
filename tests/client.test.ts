import {Channels, type ChannelType, Client} from "../src";

describe("Client Test", () => {
    test("client create", async () => {
        await expect(Client.create("test")).resolves.toBeInstanceOf(Client);
    });

    test("client create failed", async () => {
        await expect(Client.create("error")).rejects.toThrowError("User ID not valid");
    });

    test("client send with option", async () => {
        const client = await Client.create("test");
        await expect(client.send({
            content: "content",
            long: "long",
            title: "title"
        })).resolves.toMatchObject({
            content: "content",
            long: "long",
            title: "title",
            user_id: "test"
        });
    });

    test("client register", async () => {
        const client = await Client.create("test");
        const uuid = "b366312b-fb94-4f13-b9f0-3788ef67e58b";

        await expect(client.register(<ChannelType>"tt", "tt", uuid)).rejects.toThrowError("Channel tt is not valid");
        await expect(client.register(Channels.WebPush, "tt", uuid)).resolves.toBeUndefined();
        await expect(client.register(Channels.WebPush, "tt", "tt")).rejects.toThrowError("Device ID not valid, should be a UUID");
    })
})
