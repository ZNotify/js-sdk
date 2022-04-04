import {Client, ClientResponse} from "./client";

export async function send(user_id: string, content: string): Promise<ClientResponse>
export async function send(user_id: string, content: string, title: string): Promise<ClientResponse>
export async function send(user_id: string, content: string, title: string, long: string): Promise<ClientResponse>
export async function send(user_id: string, content: string, title?: string, long?: string): Promise<ClientResponse> {
    const client = await Client.create(user_id);
    if (title) {
        if (long) {
            return await client.send(content, title, long);
        } else {
            return await client.send(content, title);
        }
    } else {
        return await client.send(content);
    }
}
