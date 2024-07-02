import { Chat } from "@pubnub/chat";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    data: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const chat = await Chat.init({
        publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
        subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUB_KEY,
        userId: "cypress"
    });

    const channel = (await chat.getChannels()).channels.find((channel) => channel.name === 'canary123');

    if (!channel?.id) return res.status(404).send({ data: "Channel not found" });

    await chat.deleteChannel(channel.id);
    res.status(200).send({ data: "Successfully deleted channel" });
}