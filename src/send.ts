import {Client} from "./client";

export async function send(user_id: string, content: string): Promise<string>
export async function send(user_id: string, content: string, title: string): Promise<string>
export async function send(user_id: string, content: string, title: string, long: string): Promise<string>
export async function send(user_id: string, content: string, title?: string, long?: string): Promise<string> {
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
