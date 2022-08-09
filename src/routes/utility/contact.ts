import { RouteInfo, RouteRun } from "@/Interfaces";
import response from "@/models/response";
import axios from "axios";
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
    await axios({
        url: process.env.WEBHOOK,
        method: 'POST',
        data: {
            username: 'FyreNodes Contact',
            avatar_url: 'https://fyrenodes.s3.amazonaws.com/assets/logo/icon.png',
            embeds: [
                {
                    title: 'New Contact Request',
                    color: 1750748,
                    description: `**Name:** ${req.body.name}\n**Email:** ${req.body.email}\n\n**${req.body.subject}**\n\n${req.body.content}\n\n*Note: Support team members can reply to this contact message via their company inbox.*`,
                    footer: { text: 'FyreAPI Utility', icon_url: 'https://fyrenodes.s3.amazonaws.com/assets/logo/icon.png' },
                    timestamp: new Date().toISOString()
                }
            ]
        }
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