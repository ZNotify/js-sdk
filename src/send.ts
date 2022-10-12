import {Client} from "./client";
import type {Message, SendOptions} from "./entity";

export async function send(option: SendOptions): Promise<Message>
export async function send(user_id: string, content: string, title?: string, long?: string): Promise<Message>
export async function send(userIDOrOption: string | SendOptions, content?: string, title?: string, long?: string): Promise<Message> {
    if (!(typeof userIDOrOption === "string")) {
        return send(userIDOrOption.user_id, userIDOrOption.content, userIDOrOption.title, userIDOrOption.long);
    } else {
        if (!content) {
            throw new Error("Content is required");
        }
        const client = await Client.create(userIDOrOption);
        return client.send(content, title, long);
    }
}
