import { DoneFuncWithErrOrRes, FastifyPluginOptions } from "fastify";
import { readdirSync } from "node:fs";
import { Instance, Route } from "@/Interfaces";
import { green, white, grey } from 'chalk';

export default async (router: Instance, options: FastifyPluginOptions, done: DoneFuncWithErrOrRes) => {
    router.all('*', async (req, res)=> {
        const route = router.routes.get(req.url.toLowerCase());
        if (!route) return res.send({ message: 'Invalid route specified.' }).status(404);
        if (req.method !== route.info.method) return res.send({ message: 'The specified route does not support this method.' }).status(400);
        return route.run(req, res);
    });
    done();
};

export const handler = async (app: Instance) => {
    const path: string = `${__dirname}/routes`;
    const routes: string[] = readdirSync(path).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
    routes.forEach(async (r) => {
        const route: Route = require(`${path}/${r}`);
        app.routes.set(route.info.url, route);
    });
    console.log(`${grey.bold('[')}${green.bold('ROUTER')}${grey.bold(']')} ${white('All routes have been loaded.')}`);
};