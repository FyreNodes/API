import { FastifyReply } from "fastify";

export default async (res: FastifyReply, data: any) => {
    return res.send({ error: false, code: 'SUCCESS', data: data }).status(200);
};