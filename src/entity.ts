export class Message {
    // The message to send.
    content: string;

    // The title of the message.
    title?: string;

    // The long content of the message.
    long?: string;
}

export class Send extends Message {
    // The user-id of the user to send the message to.
    user_id: string;
}
