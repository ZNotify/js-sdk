import axios from "axios";
import {stringify} from 'qs';
import {Message} from "./entity";
import {ENDPOINT} from "./utils";

export type ClientResponse = {
    id: string,
    user_id: string,
    title: string,
    content: string,
    long: string,
    created_at: string,
}

export class Client {
    private readonly endpoint: string;
    private readonly user_id: string;

    private constructor(user_id: string, endpoint?: string) {
        this.endpoint = endpoint ? endpoint : ENDPOINT;
        this.user_id = user_id;
    }

    public static async create(user_id: string, endpoint?: string): Promise<Client> {
        const client = new Client(user_id, endpoint);
        await client.check()
        return client;
    }

    public async check(): Promise<void> {
        const resp = await axios.get(`${this.endpoint}/check`, {
            params: {
                user_id: this.user_id
            }
        })
        if (!(resp.data === true)) {
            throw new Error("User ID not valid");
        }
    }

    public async send(option: Message): Promise<ClientResponse>
    public async send(content: string, title?: string, long?: string): Promise<ClientResponse>
    public async send(contentOrOption: string | Message, title?: string | undefined, long?: string | undefined): Promise<ClientResponse> {
        if (contentOrOption === undefined || contentOrOption === null || contentOrOption === "") {
            throw new Error("Content is required");
        }
        if (!(typeof contentOrOption === "string")) {
            return this.send(contentOrOption.content, contentOrOption.title, contentOrOption.long);
        }
        const data = stringify({
            title: title ? title : "Notification",
            content: contentOrOption,
            long: long ? long : ""
        })
        const resp = await axios.post<ClientResponse>(`${this.endpoint}/${this.user_id}/send`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        return resp.data;
    }

    public async delete(id: string): Promise<void> {
        await axios.delete(`${this.endpoint}/${this.user_id}/${id}`)
    }
}
