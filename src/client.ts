import {argument, body, ENDPOINT, isUUID, response} from "./utils";
import {version} from "../package.json";
import {definitions} from "./schema";
import axios, {AxiosInstance} from "axios";
import {stringify} from "qs"

export class Client {
    private readonly user_secret: string;
    private readonly session: AxiosInstance

    private constructor(user_id: string, endpoint?: string) {
        const headers: Record<string, string> = {}
        if (typeof window === 'undefined') {
            headers["User-Agent"] = "znotify-js-sdk/" + version
        }
        this.user_secret = user_id;
        this.session = axios.create({
            baseURL: endpoint ?? ENDPOINT,
            headers: headers,
            timeout: 10000,
        })
    }

    public static async create(user_secret: string, endpoint?: string): Promise<Client> {
        const client = new Client(user_secret, endpoint);
        await client.check()
        return client;
    }

    private async check(): Promise<void> {
        const resp = await this.session.get("/check", {
            params: {
                user_secret: this.user_secret
            }
        })
        if (resp.data.body === false) {
            throw new Error("User secret is not valid");
        }
    }

    public async send(option: argument<"send.send">): Promise<body<"send.send">> {
        const data = stringify({
            title: option.title ?? "Notification",
            content: option.content ?? "",
            priority: option.priority ?? "normal",
            long: option.long ?? "",
        })

        const resp = await this.session.post<response<"send.send">>(`/${this.user_secret}/send`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        if (resp.data.code !== 200 || resp.status !== 200) {
            throw new Error(resp.data.body as string);
        }
        return resp.data.body;
    }

    public async deleteDevice(deviceID: string): Promise<body<"device.delete">> {
        const resp = await this.session.delete<response<"device.delete">>(`/${this.user_secret}/device/${deviceID}`)
        if (resp.data.code !== 200 || resp.status !== 200) {
            throw new Error(resp.data.body as string);
        }
        return resp.data.body;
    }


    public async createDevice(channel: definitions["enum.Sender"], device_id: string, token: string, device_name: string = "", device_meta: string = ""): Promise<boolean> {
        if (!isUUID(device_id)) {
            throw new Error("Device ID not valid, should be a UUID");
        }
        const data = stringify({
            channel: channel,
            token: token,
            device_meta: device_meta,
            device_name: device_name,
            device_id: device_id,
        } as argument<"device.create">)
        const resp = await this.session.put<response<"device.create">>(`/${this.user_secret}/device/${device_id}`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        if (resp.data.code !== 200 || resp.status !== 200) {
            throw new Error(resp.data.body as string);
        }
        return resp.data.body as boolean;
    }
}
