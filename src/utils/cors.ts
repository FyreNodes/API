import { Instance } from "@/Interfaces";
import { DoneFuncWithErrOrRes, FastifyPluginOptions } from "fastify";
import cors from 'cors';

export default async (app: Instance, options: FastifyPluginOptions, done: DoneFuncWithErrOrRes) => {
    const corsRoutes: string[] = [];
    app.routes.forEach((route) => {
        if (['POST', 'PATCH'].includes(route.info.method)) {
            if (corsRoutes.includes(route.info.url)) return;
            corsRoutes.push(route.info.url);
            app.options(route.info.url, cors());
        };
    });
    done();
};