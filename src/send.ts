import {Client, ClientResponse} from "./client";
import {Send} from "./entity";

export async function send(option: Send): Promise<ClientResponse>
export async function send(user_id: string, content: string, title?: string, long?: string): Promise<ClientResponse>
export async function send(userIDOrOption: string | Send, content?: string, title?: string, long?: string): Promise<ClientResponse> {
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
