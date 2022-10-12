import axios from "axios";
import {stringify} from 'qs';
import {Channels, ChannelType, ClientResponse, Message, MessageOptions} from "./entity";
import {ENDPOINT, isUUID} from "./utils";

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
        const resp = await axios.get<ClientResponse<boolean>>(`${this.endpoint}/check`, {
            params: {
                user_id: this.user_id
            }
        })
        if (!(resp.data.body)) {
            throw new Error("User ID not valid");
        }
    }

    public async send(option: MessageOptions): Promise<Message>
    public async send(content: string, title?: string, long?: string): Promise<Message>
    public async send(contentOrOption: string | MessageOptions, title?: string | undefined, long?: string | undefined): Promise<Message> {
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
        const resp = await axios.post<ClientResponse<Message | string>>(`${this.endpoint}/${this.user_id}/send`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        if (resp.data.code !== 200 || resp.status !== 200) {
            throw new Error(resp.data.body as string);
        }

        return resp.data.body as Message;
    }

    public async delete(id: string): Promise<void> {
        await axios.delete(`${this.endpoint}/${this.user_id}/${id}`)
    }

    public async register(channel: ChannelType, token: string, deviceID: string): Promise<void> {
        if (!isUUID(deviceID)) {
            throw new Error("Device ID not valid, should be a UUID");
        }

        if (!(channel in Channels)) {
            throw new Error(`Channel ${channel} is not valid`);
        }

        const data = stringify({
            channel: channel,
            token: token,
        })
        const resp = await axios.put<ClientResponse<boolean | string>>(`${this.endpoint}/${this.user_id}/token/${deviceID}`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        if (resp.data.code !== 200 || resp.status !== 200) {
            throw new Error(resp.data.body as string);
        }
    }
}
