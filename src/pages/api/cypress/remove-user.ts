import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "@/firebase/admin";

type Data = {
    data: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const { userId } = req.body ?? {};

    if (!userId) return res.status(400).send({ data: 'Missing required fields' });

    await firebaseAdmin.auth().deleteUser(userId)

    res.status(200).send({ data: "Successfully deleted user" });
}
