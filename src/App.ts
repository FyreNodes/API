import Fastify from "fastify";
import Router, { handler } from "@/Router";
import pointOfView from "@fastify/view";
import cors from '@fastify/cors';
import ejsEngine from 'ejs';
import { cyanBright, white, grey } from 'chalk';
import { Instance, Route } from "@/Interfaces";
import { MongoClient } from "mongodb";

export default () => {
    const routes = new Map<string, Route>();
    const application = Fastify({ logger: true });
    const mongo = new MongoClient(process.env.MONGODB);
    const app: Instance = Object.assign(application, {
        db: mongo.db('api'),
        routes
    });

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