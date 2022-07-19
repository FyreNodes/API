import { RouteInfo, RouteRun } from '@/Interfaces';
import error from '@/models/error';
import response from '@/models/response';
import { FastifyRequest } from 'fastify';

export const run: RouteRun = async (app, req: UpdateRequest, res) => {
	if (!req.query.id) return error(res, { code: 'ERR.QUERY.UNDEFINED', meta: "Query paramater 'id' is required but not found." });
	if (isNaN(req.query.id)) return error(res, { code: 'ERR.QUERY.INVALIDTYPE', meta: "Query paramater 'id': expected type 'number' but recieved 'unknown'." });
	const id: number = req.query.id;
	let data: UpdateData = { name: undefined, description: null, live: null, link: null };
	const announcements = app.db.collection('announcements');
	if ((await announcements.countDocuments({ id: parseInt(id as unknown as string) })) === 0) return error(res, { code: 'ERR.QUERY.INVALID', meta: `Query paramater \'id\': \'${req.query.id}\' provided but not found.` });
	const currentData = await announcements.findOne({ id: parseInt(id as unknown as string) });
	if (req.body.name) data.name = req.body.name;
	else data.name = currentData.name;
	if (req.body.live) data.live = req.body.live;
	else data.live = currentData.live;
	if (req.body.link) data.link = req.body.link;
	else data.link = currentData.link;
	if (req.body.description) data.description = req.body.description;
	else data.description = currentData.description;
	await announcements.updateOne({ id: parseInt(req.query.id as unknown as string) }, { $set: data });
	return response(res, null);
};

export const info: RouteInfo = {
	url: '/announcements',
	method: 'PATCH',
	json: true,
	authenticated: true,
	validation: [
		{
			key: 'name',
			type: 'string',
			required: false
		},
		{
			key: 'description',
			type: 'string',
			required: false
		},
		{
			key: 'live',
			type: 'boolean',
			required: false
		},
		{
			key: 'link',
			type: 'string',
			required: false
		}
	]
};

interface UpdateData {
	name: string;
	description: string;
	live: boolean;
	link: string;
}

type UpdateRequest = FastifyRequest<{ Querystring: { id: number }; Body: { name: string; description: string; live: boolean; link: string } }>;
