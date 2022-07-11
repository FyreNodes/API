import Fastify from "fastify";
import Router, { handler } from "@/Router";
import pointOfView from "@fastify/view";
import ejsEngine from 'ejs';
import { cyanBright, white, grey } from 'chalk';
import { Instance, Route } from "@/Interfaces";

export default () => {
    const routes = new Map<string, Route>();
    const application = Fastify();
    const app: Instance = Object.assign(application, { routes: routes });

    app.register(pointOfView, { 
        engine: { ejs: ejsEngine },
        root: `${__dirname}/views`
    });

    app.register(Router);
    handler(app);

    app.listen({ port: parseInt(process.env.PORT), host: process.env.HOST }).then((srv) => {
        console.log(`${grey.bold('[')}${cyanBright.bold('SERVER')}${grey.bold(']')} ${white(`Server is now listening on ${srv}`)}`);
    });
};