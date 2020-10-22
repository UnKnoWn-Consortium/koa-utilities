"use strict";
/**
 * Image Transformer
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformerBuilderFactory = void 0;
/**
 * const sizes = [320, 800, 1200, 2400]
 */
const sharp = require("sharp");
function transformerBuilderFactory(sizes) {
    return function transformerBuilder(parentStream) {
        return sizes
            .map(size => [sharp().resize(size), size])
            .map(([resizer, size]) => {
            parentStream.pipe(resizer);
            return [
                [
                    [
                        resizer
                            .clone()
                            .toFormat("jpg", {
                        //"lossless": true,
                        }),
                        "jpg"
                    ],
                    [
                        resizer
                            .clone()
                            .toFormat("png", {
                        //"lossless": true,
                        }),
                        "png"
                    ],
                    [
                        resizer
                            .clone()
                            .toFormat("webp", {
                        //"lossless": true,
                        }),
                        "webp"
                    ],
                ],
                size
            ];
        });
    };
}
exports.transformerBuilderFactory = transformerBuilderFactory;
exports.default = transformerBuilderFactory;
