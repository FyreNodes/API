import { RouteInfo, RouteRun } from "@/Interfaces";
import response from "@/models/response";
import { FastifyRequest } from "fastify";
import { createTransport } from 'nodemailer';

export const run: RouteRun = async (app, req: ContactRequest, res) => {
    const transporter = createTransport({
        port: 587,
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
    await transporter.sendMail({
        from: '"FyreNodes Contact" mail@fyrenodes.com',
        to: 'support@fyrenodes.com',
        subject: `New Contact Message from ${req.body.name}`,
        html: `<h2>New Contact Message:</h2><p>=================================<br/>Name: ${req.body.name}<br/>Email: <a href="mailto:${req.body.email}">${req.body.email}</a><br/>=================================</p><h3>${req.body.subject}</h3><code>${req.body.content}</code>`
    });
    return response(res, null);
};

export const info: RouteInfo = {
    url: '/contact',
    method: 'POST',
    json: true,
    validation: [
        {
            key: 'name',
            type: 'string',
            required: true
        },
        {
            key: 'email',
            type: 'string',
            required: true
        },
        {
            key: 'subject',
            type: 'string',
            required: true
        },
        {
            key: 'content',
            type: 'string',
            required: true
        }
    ]
};

type ContactRequest = FastifyRequest<{ Body: { name: string; email: string; subject: string; content: string } }>;