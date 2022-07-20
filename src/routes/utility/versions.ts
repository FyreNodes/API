import { RouteInfo, RouteRun } from '@/Interfaces';
import versioning from '@/data/versioning';
import response from '@/models/response';

export const run: RouteRun = async (app, req, res) => {
	return response(res, versioning);
};

export const info: RouteInfo = {
	url: '/versions',
	method: 'GET',
	json: true
};
