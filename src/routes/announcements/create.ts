import { RouteInfo, RouteRun } from "@/Interfaces";
import response from "@/models/response";
import gen from "@/utils/gen";
import { FastifyRequest } from "fastify";

export const run: RouteRun = async (app, req: CreateRequest, res) => {
    const id = await gen('id', 6);
    const announcements = app.db.collection('announcements');
    if (req.body.live) await announcements.updateMany({ live: true }, { $set: { live: false } }, { upsert: false });
    const query = await announcements.insertOne({ id: id, name: req.body.name, description: req.body.description, live: req.body.live, link: req.body.link ? req.body.link : null });
    return response(res, { id: id, objectID: query.insertedId });
};

export const info: RouteInfo = {
    url: '/announcements',
    method: 'POST',
    json: true,
    authenticated: true,
    validation: [
        {
            key: 'name',
            type: 'string',
            required: true
        },
        {
            key: 'description',
            type: 'string',
            required: true
        },
        {
            key: 'live',
            type: 'boolean',
            required: true
        },
        {
            key: 'link',
            type: 'string',
            required: false
        }
    ]
};

type CreateRequest = FastifyRequest<{ Body: { name: string, description: string, live: boolean, link: string } }>;