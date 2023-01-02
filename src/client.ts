import axios, {AxiosInstance} from "axios";
import {stringify} from 'qs';
import {Channels, ChannelType, ClientResponse, Message, MessageOptions, Priority} from "./entity";
import {ENDPOINT, isUUID} from "./utils";
import {version} from "../package.json";

export class Client {
    private readonly endpoint: string;
    private readonly user_id: string;
    private readonly session: AxiosInstance;

    private constructor(user_id: string, endpoint?: string) {
        const headers: Record<string, string> = {}
        if (typeof window === 'undefined') {
            headers["User-Agent"] = "znotify-js-sdk/" + version
        }

        this.endpoint = endpoint ? endpoint : ENDPOINT;
        this.user_id = user_id;
        this.session = axios.create({
            baseURL: this.endpoint,
            timeout: 10000,
            headers
        })
    }

    public static async create(user_id: string, endpoint?: string): Promise<Client> {
        const client = new Client(user_id, endpoint);
        await client.check()
        return client;
    }

    public async check(): Promise<void> {
        const resp = await this.session.get<ClientResponse<boolean>>(`${this.endpoint}/check`, {
            params: {
                user_id: this.user_id
            }
        })
        if (!(resp.data.body)) {
            throw new Error("User ID not valid");
        }
    }

    public async send(option: MessageOptions): Promise<Message> {
        if (option === undefined || option === null || option.content === undefined || option.content === null) {
            throw new Error("Content is required");
        }
        const data = stringify({
            title: option.title ?? "Notification",
            content: option.content,
            long: option.long ?? "",
            priority: option.priority ?? Priority.Normal
        })
        const resp = await this.session.post<ClientResponse<Message | string>>(`${this.endpoint}/${this.user_id}/send`, data, {
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
        await this.session.delete(`${this.endpoint}/${this.user_id}/${id}`)
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
        const resp = await this.session.put<ClientResponse<boolean | string>>(`${this.endpoint}/${this.user_id}/token/${deviceID}`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        if (resp.data.code !== 200 || resp.status !== 200) {
            throw new Error(resp.data.body as string);
        }
    }
}
