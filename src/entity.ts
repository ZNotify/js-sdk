export type MessageOptions = {
    // The message to send.
    content: string;

    // The title of the message.
    title?: string;

    // The long content of the message.
    long?: string;

    // The priority of the message.
    priority?: PriorityType;
}

export type SendOptions = MessageOptions & {
    // The user-id of the user to send the message to.
    user_id: string;
}

export type ClientResponse<T> = {
    code: number
    body: T
}

export type Message = {
    id: string,
    user_id: string,
    title: string,
    content: string,
    long: string,
    created_at: string,
}

export const Channels = {
    WebPush: "WebPush"
} as const;

export type ChannelType = typeof Channels[keyof typeof Channels];

export const Priority = {
    High: "high",
    Normal: "normal",
    Low: "low"
} as const;

export type PriorityType = typeof Priority[keyof typeof Priority];
