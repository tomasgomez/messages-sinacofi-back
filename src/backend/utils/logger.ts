import winston from "winston";

import { NextRequest } from "next/server";
const { combine, timestamp, json } = winston.format;

export const winstonLogger = winston.createLogger({
    level: process.env["LOG_LEVEL"] || "info",
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.File({
            filename: process.env["LOG_FILENAME"] || "/var/log/bf_web_app.log",
            maxsize: 5242880
        }),
    ],
});

const formatLogData = async (data?: any, request?: NextRequest) => {
    let ip = request ? request.headers.get('X-Forwarded-For') : undefined

    // let user;
    // try {
    //     user = request ? await getSessionUser(request, true) : {};
    // } catch (error) { }

    let payload = {};
    if (data instanceof Error) {
        payload = { errorMessage: data.message };
    } else if (typeof data === "object") {
        payload = data;
    } else {
        payload = { detalle: data };
    }

    return {
        ...payload,
        _ip_usuario: ip,
        // _sesion_username: user?.username,
        // _sesion_codigo_banco: user?.bank_code,
    }
}

export const logger = {
    error(message: any, data?: any, request?: NextRequest) {
        formatLogData(data, request).then(payload => {
            winstonLogger.error(message, payload)
        })
    },
    warn(message: any, data?: any, request?: NextRequest) {
        formatLogData(data, request).then(payload => {
            winstonLogger.warn(message, payload)
        })
    },
    info(message: any, data?: any, request?: NextRequest) {
        formatLogData(data, request).then(payload => {
            winstonLogger.info(message, payload)
        })
    },
}
