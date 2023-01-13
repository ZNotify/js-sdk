import {Client} from "../src";

describe("Client Test", () => {
    test("client create", async () => {
        await expect(Client.create("test")).resolves.toBeInstanceOf(Client);
    });

    test("client create failed", async () => {
        await expect(Client.create("error")).rejects.toThrowError("User secret is not valid");
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
        });
    });

    test("device", async () => {
        const client = await Client.create("test");
        const uuid = "b366312b-fb94-4f13-b9f0-3788ef67e58b";

        await expect(client.createDevice("WebPush", uuid, "tt")).resolves.toBe(true);
        await expect(client.deleteDevice(uuid)).resolves.toBe(true);
        await expect(client.createDevice("WebPush", "tt", "tt")).rejects.toThrowError("Device ID not valid, should be a UUID");
    })
})
