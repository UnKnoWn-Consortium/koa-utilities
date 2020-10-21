"use strict";
/**
 * Winston logger instance
 * Prerender Service
 * Created by Thomas Sham on 26/6/2020.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, metadata, printf, colorize, prettyPrint, json, } = winston_1.format;
const logFormat = printf(({ timestamp, label, message, level, }) => `${timestamp} ${level} [${label}]: ${message}`);
const fluent_logger_1 = __importDefault(require("fluent-logger"));
const fluentTransport = fluent_logger_1.default.support.winstonTransport();
function winstonLoggerFactory(ServiceName) {
    return winston_1.createLogger({
        "level": "info",
        "format": combine(label({
            "label": ServiceName
        }), timestamp(), metadata({
            "fillExcept": ["message", "label", "level",],
        }), json()),
        "defaultMeta": {
            "service": ServiceName
        },
        "transports": [
            new fluentTransport("mongo.prerender-service", {
                "host": "localhost",
                "port": 24224,
                "timeout": 3.0,
                "requireAckResponse": true,
            }),
            new winston_1.transports.File({
                "filename": "combined.log"
            }),
            new winston_1.transports.Console({
                "format": combine(colorize(), timestamp(), logFormat)
            }),
        ],
    });
}
exports.default = winstonLoggerFactory;
