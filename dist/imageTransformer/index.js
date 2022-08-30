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
exports.transformStreamBuilderFactory = void 0;
// !!DEPRECATED IN FAVOR OF https://github.com/OblonDATA-IO/image-transformer-pipeline
/**
 * const sizes = [320, 480, 800, 1200, 2400]
 */
const sharp_1 = __importDefault(require("sharp"));
const DefaultSizes = [
    480, 800, 1200,
];
const DefaultFormats = [
    ["jpg", {}],
    ["webp", {}],
    ["avif", {}]
];
const DefaultOptions = {
    failOnError: false,
};
function transformStreamBuilderFactory(sizes = DefaultSizes, formats = DefaultFormats, options = DefaultOptions) {
    const srcStream = (0, sharp_1.default)(options);
    const destStreams = sizes
        .map(size => [srcStream.clone().resize(size), size])
        .map(([resizer, size]) => {
        return [
            formats.map(([format, options]) => [
                resizer
                    // @ts-ignore
                    .clone()
                    .toFormat(format, options),
                format
            ]),
            size
        ];
    });
    return [srcStream, destStreams];
}
exports.transformStreamBuilderFactory = transformStreamBuilderFactory;
exports.default = transformStreamBuilderFactory;
//# sourceMappingURL=index.js.map