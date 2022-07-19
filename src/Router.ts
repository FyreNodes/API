import { DoneFuncWithErrOrRes, FastifyPluginOptions } from "fastify";
import { readdirSync } from "node:fs";
import { Instance, Route } from "@/Interfaces";
import { green, white, grey } from 'chalk';
import error from "@/models/error";

export default async (router: Instance, options: FastifyPluginOptions, done: DoneFuncWithErrOrRes) => {
    router.all('*', async (req, res) => {
        const route = router.routes.get(`${req.url.split('?')[0]}.${req.method}`);
        if (!route) return error(res, { code: 'ERR.ROUTE.NOTFOUND' });
        if (req.method !== route.info.method) return error(res, { code: 'ERR.ROUTE.METHOD' });
        if (route.info.authenticated) {
            if (!req.headers.authorization) return error(res, { code: 'ERR.AUTH.UNDEFINED' });
            if (req.headers.authorization !== process.env.KEY) return error(res, { code: 'ERR.AUTH.INVALID' });
        };
        if (route.info.json) res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        const validation = route.info.validation;
        if (validation) {
            if (!req.body) return error(res, { code: 'ERR.BODY.EMPTY' });
            const body: any = req.body;
            for (const validator of validation) {
                if (!(validator.key in body) && validator.required) return error(res, { code: 'ERR.PARAM.UNDEFINED', meta: `Paramater '${validator.key}' is required but not found.` });
                if (body[validator.key] && typeof body[validator.key] !== validator.type) return error(res, { code: 'ERR.PARAM.INVALIDTYPE', meta: `Paramater '${validator.key}': expected type '${validator.type}' but recieved '${typeof body[validator.key]}'.` })
            };
        };
        return route.run(router, req, res);
    });
    done();
};

export const handler = async (app: Instance) => {
    const path: string = `${__dirname}/routes`;
    readdirSync(path).forEach(async (dir) => {
        const routes: string[] = readdirSync(`${path}/${dir}`).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
        for (const r of routes) {
            const route: Route = require(`${path}/${dir}/${r}`);
            app.routes.set(`${route.info.url}.${route.info.method}`, route);
        };
    });
    console.log(`${grey.bold('[')}${green.bold('ROUTER')}${grey.bold(']')} ${white('All routes have been loaded.')}`);
};