import { readdirSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
    avatars: string[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    // Fetch and iterate over all static avatar files in /public/avatars
    const imageDirectory = path.join(process.cwd(), '/public/avatars');
    const avatars = readdirSync(imageDirectory);
    res.send({ avatars });
}
