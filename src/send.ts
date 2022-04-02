import {Client} from "./client";

export async function send(user_id: string, content: string): Promise<string>
export async function send(user_id: string, title: string, content: string): Promise<string>
export async function send(user_id: string, title: string, content: string, long: string): Promise<string>
export async function send(user_id: string, content: string, title?: string, long?: string): Promise<string> {
    const client = await Client.create(user_id);
    if (title) {
        if (long) {
            return await client.send(title, content, long);
        } else {
            return await client.send(title, content);
        }
    } else {
        return await client.send(content);
    }
}
