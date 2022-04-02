import axios from "axios";

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
    public async send(title: string, content: string): Promise<string>
    public async send(title: string, content: string, long: string): Promise<string>
    public async send(content: string, title?: string, long?: string): Promise<string> {
        const resp = await axios.post(`${this.endpoint}/${this.user_id}/send`, {
            title: title ? title : "Notification",
            content: content,
            long: long ? long : ""
        })
        return resp.data;
    }
}
