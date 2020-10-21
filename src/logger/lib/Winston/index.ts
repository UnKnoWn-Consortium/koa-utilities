/**
 * Winston logger instance
 * Prerender Service
 * Created by Thomas Sham on 26/6/2020.
 */

import {
    createLogger,
    format,
    transports,
} from "winston";

const {
    combine,
    timestamp,
    label,
    metadata,
    printf,
    colorize,
    prettyPrint,
    json,
} = format;

const logFormat = printf(
    ({ timestamp, label, message, level, }) => `${ timestamp } ${ level } [${ label }]: ${ message }`
);

import fluent from "fluent-logger";
const fluentTransport = fluent.support.winstonTransport();

export default function winstonLoggerFactory (ServiceName) {
    return createLogger(
        {
            "level": "info",
            "format":  combine(
                label(
                    {
                        "label": ServiceName
                    }
                ),
                timestamp(),
                metadata(
                    {
                        "fillExcept": ["message", "label", "level", ],
                    }
                ),
                json()
            ),
            "defaultMeta": {
                "service": ServiceName
            },
            "transports": [
                new fluentTransport(
                    "mongo.prerender-service",
                    {
                        "host": "localhost",
                        "port": 24224,
                        "timeout": 3.0,
                        "requireAckResponse": true,
                    }
                ),
                new transports.File(
                    {
                        "filename": "combined.log"
                    }
                ),
                new transports.Console(
                    {
                        "format": combine(
                            colorize(),
                            timestamp(),
                            logFormat,
                        )
                    }
                ),
            ],
        }
    );
}
