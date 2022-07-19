import { RouteInfo, RouteRun } from "@/Interfaces";

export const run: RouteRun = async (app, req, res) => {
    return res.view('base').status(200);
};

export const info: RouteInfo = {
    url: '/',
    method: 'GET',
    json: false
};