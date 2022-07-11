import { RouteInfo, RouteRun } from "@/Interfaces";

export const run: RouteRun = async (req, res) => {
    return res.view('base').status(200);
};

export const info: RouteInfo = {
    url: '/',
    method: 'GET'
};