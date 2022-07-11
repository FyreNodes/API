import { FastifyInstance } from "fastify";
import Route from "@/interfaces/Route";

export default interface Instance extends FastifyInstance {
    routes: Map<string, Route>;
}