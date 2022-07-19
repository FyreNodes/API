import { RouteInfo, RouteRun } from "@/Interfaces";
import response from "@/models/response";
import { FastifyRequest } from "fastify";

export const run: RouteRun = async (app, req: GetRequest, res) => {
    let data: object;
    const announcements = app.db.collection('announcements');
    if (!isNaN(req.query.id)) data = await announcements.findOne({ id: req.query.id }); else if (req.query.latest) data = await announcements.findOne(); else data = await announcements.find().limit(5).sort({$natural:-1}).toArray();
    return response(res, data);
};

export const info: RouteInfo = {
    url: '/announcements',
    method: 'GET',
    json: true,
};

type GetRequest = FastifyRequest<{ Querystring: { id: number, latest: boolean } }>;