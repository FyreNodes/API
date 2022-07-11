import { FastifyReply, FastifyRequest } from "fastify";

export interface RouteInfo {
    url: string;
    method: 'GET'|'POST';
    private?: boolean;
};

export interface RouteRun {
    (req: FastifyRequest, res: FastifyReply);
};

export default interface Route {
    info: RouteInfo;
    run: RouteRun; 
};