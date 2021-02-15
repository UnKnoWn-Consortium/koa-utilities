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
const sharp_1 = __importDefault(require("sharp"));
const defaultSizes = [
    480, 800, 1200,
];
const defaultFormats = [
    ["jpg", {}],
    ["webp", {}],
    ["avif", {}]
];
function transformerBuilderFactory(sizes = defaultSizes, formats = defaultFormats) {
    return function transformerBuilder(parentStream) {
        return sizes
            .map(size => [sharp_1.default().resize(size), size])
            .map(([resizer, size]) => {
            parentStream.pipe(resizer);
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
    };
}
exports.transformerBuilderFactory = transformerBuilderFactory;
exports.default = transformerBuilderFactory;
