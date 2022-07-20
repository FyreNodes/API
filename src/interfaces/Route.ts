import { Instance } from '@/Interfaces';
import { FastifyReply, FastifyRequest } from 'fastify';
import Validator from '@/interfaces/Validator';

export interface RouteInfo {
	url: string;
	json: boolean;
	method: 'GET' | 'POST' | 'PATCH';
	validation?: Validator[];
	authenticated?: boolean;
}

export interface RouteRun {
	(app: Instance, req: FastifyRequest, res: FastifyReply);
}

export default interface Route {
	info: RouteInfo;
	run: RouteRun;
}
