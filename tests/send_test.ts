import {send} from "../src";

test("send create failed", async () => {
    await expect(send("error", "")).rejects.toThrowError("User ID not valid");
});

test("send 0", async () => {
    await expect(send("zxilly", "")).rejects.toThrowError("Content is required");
});

test("send 1", async () => {
    expect(await send("zxilly", "test")).toStrictEqual({
        content: "test",
        long: "",
        title: "Notification"
    });
});

test("send 2", async () => {
    expect(await send("zxilly", "content", "title")).toStrictEqual({
        content: "content",
        long: "",
        title: "title"
    });
});

test("send 3", async () => {
    expect(await send("zxilly", "content", "title", "long")).toStrictEqual({
        content: "content",
        long: "long",
        title: "title"
    });
});
