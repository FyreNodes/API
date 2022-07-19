import { RouteInfo, RouteRun } from "@/Interfaces";
import versioning from "@/data/versioning";

export const run: RouteRun = async (app, req, res) => {
    res.send(versioning).status(200);
};

export const info: RouteInfo = {
    url: '/versions',
    method: 'GET',
    json: false
}