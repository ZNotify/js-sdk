import {send} from "../src";

describe("Send Test", () => {
    test("send create failed", async () => {
        await expect(send("error", "fake")).rejects.toThrowError("User ID not valid");
    });

    test("send 0", async () => {
        await expect(send("test", "")).rejects.toThrowError("Content is required");
    });

    test("send 1", async () => {
        expect(await send("test", "test")).toMatchObject({
            content: "test",
            long: "",
            title: "Notification",
            user_id: "test"
        });
    });

    test("send 2", async () => {
        expect(await send("test", "content", "title")).toMatchObject({
            content: "content",
            long: "",
            title: "title",
            user_id: "test"
        });
    });

    test("send 3", async () => {
        expect(await send("test", "content", "title", "long")).toMatchObject({
            content: "content",
            long: "long",
            title: "title",
            user_id: "test"
        });
    });

    test("send with option", async () => {
        expect(await send({
            user_id: "test",
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
})


