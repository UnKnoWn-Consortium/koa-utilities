"use strict";
/**
 * Image Transformer
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformerBuilderFactory = void 0;
/**
 * const sizes = [320, 480, 800, 1200, 2400]
 */
const stream_1 = require("stream");
const sharp_1 = __importDefault(require("sharp"));
const defaultSizes = [
    480, 800, 1200,
];
const defaultFormats = [
    ["jpg", {}],
    ["webp", {}],
    ["avif", {}]
];
function transformerBuilderFactory(sizes = defaultSizes, formats = defaultFormats, saveOriginal = false) {
    return function transformerBuilder(parentStream, originalExtension) {
        const origin = parentStream.pipe(new stream_1.PassThrough());
        const pipes = sizes
            .map(size => [sharp_1.default().resize(size), size])
            .map(([resizer, size]) => {
            origin.pipe(resizer);
            return [
                formats.map(([format, options]) => [
                    resizer
                        .clone()
                        .toFormat(format, options),
                    format
                ]),
                size
            ];
        });
        if (saveOriginal === true) {
            pipes.unshift([
                [
                    [parentStream.pipe(new stream_1.PassThrough()), originalExtension !== null && originalExtension !== void 0 ? originalExtension : ""]
                ],
                "original"
            ]);
        }
        return pipes;
    };
}
exports.transformerBuilderFactory = transformerBuilderFactory;
exports.default = transformerBuilderFactory;
