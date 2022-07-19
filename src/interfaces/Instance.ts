import { FastifyInstance } from "fastify";
import Route from "@/interfaces/Route";
import { Db } from "mongodb";

export default interface Instance extends FastifyInstance {
    routes: Map<string, Route>;
    db: Db;
}