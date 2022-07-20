import { FastifyReply } from 'fastify';

interface Params {
	code: keyof typeof codes;
	meta?: string;
}

export default async (res: FastifyReply, { code, meta }: Params) => {
	let formattedMeta: string;
	let sCode: number = 400;
	if (meta) formattedMeta = ` ${meta}`;
	else formattedMeta = '';
	const msg: object = { error: true, code: code, message: `${codes[code]}${formattedMeta}` };
	if (sCodes[code]) sCode = sCodes[code];
	return res.status(sCode).send(msg);
};

const codes = {
	'ERR.BODY.EMPTY': 'Request body is not specified. There are one or more paramaters required by this route.',
	'ERR.AUTH.INVALID': 'Invalid authorization key specified. This route requires authorization.',
	'ERR.AUTH.UNDEFINED': 'Authorization key undefined. This route requires authorization.',
	'ERR.ROUTE.METHOD': 'The specified route does not support the current request method.',
	'ERR.ROUTE.NOTFOUND': 'The specified route could not be found.',
	'ERR.PARAM.UNDEFINED': 'A required paramater is not defined.',
	'ERR.PARAM.INVALIDTYPE': 'A paramater is not of valid type.',
	'ERR.QUERY.INVALID': 'A query paramater is invalid.',
	'ERR.QUERY.UNDEFINED': 'A required query paramater is not defined.',
	'ERR.QUERY.INVALIDTYPE': 'A query paramater is not of valid type.'
};

const sCodes = {
	'ERR.AUTH.INVALID': 401,
	'ERR.AUTH.UNDEFINED': 401,
	'ERR.ROUTE.METHOD': 405,
	'ERR.ROUTE.NOTFOUND': 404
};
