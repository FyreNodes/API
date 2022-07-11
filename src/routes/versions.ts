import { RouteInfo, RouteRun } from "@/Interfaces";
import versioning from "@/data/versioning";

export const run: RouteRun = async (req, res) => {
    res.header('Content-Type', 'application/json');
    res.send(versioning).status(200);
};

export const info: RouteInfo = {
    url: '/versions',
    method: 'GET'
}