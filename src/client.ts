import axios from "axios";
import {stringify} from 'qs';

export class Client {
    private readonly endpoint: string;
    private readonly user_id: string;

    constructor(user_id: string, endpoint?: string) {
        this.endpoint = endpoint ? endpoint : "https://push.learningman.top";
        this.user_id = user_id;
    }

    public static async create(user_id: string, endpoint?: string): Promise<Client> {
        const client = new Client(user_id, endpoint);
        await client.check()
        return client;
    }

    private async check(): Promise<void> {
        const resp = await axios.get(`${this.endpoint}/${this.user_id}/check`)
        if (!(resp.data === true)) {
            throw new Error("User ID not valid");
        }
    }

    public async send(content: string): Promise<string>
    public async send(content: string, title: string): Promise<string>
    public async send(content: string, title: string, long: string): Promise<string>
    public async send(content: string, title?: string, long?: string): Promise<string> {
        if (content === undefined || content === null || content === "") {
            throw new Error("Content is required");
        }
        const params: any = {}
        if (process.env.NODE_ENV === "test") {
            params["dry"] = true;
        }
        const data = stringify({
            title: title ? title : "Notification",
            content: content,
            long: long ? long : ""
        })
        const resp = await axios.post(`${this.endpoint}/${this.user_id}/send`, data, {
            params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        return resp.data;
    }
}
