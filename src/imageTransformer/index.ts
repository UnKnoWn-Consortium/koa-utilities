/**
 * Image Transformer
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */

/**
 * const sizes = [320, 480, 800, 1200, 2400]
 */

import { PassThrough } from "stream";

import sharp from "sharp";

const defaultSizes = [
    480, 800, 1200,
];

const defaultFormats: [string, any][] = [
    ["jpg", {}],
    ["webp", {}],
    ["avif", {}]
];

export function transformerBuilderFactory (
    sizes: number[] = defaultSizes,
    formats = defaultFormats,
    saveOriginal: boolean = false,
) {
    return function transformerBuilder (
        parentStream,
        originalExtension: string
    ) {
        const origin = parentStream.pipe(new PassThrough());
        const pipes = sizes
            .map(
                size => [sharp().resize(size), size]
            )
            .map(
                ([resizer, size]) => {
                    origin.pipe(resizer);
                    return [
                        formats.map(
                            ([format, options]) => [
                                resizer
                                    .clone()
                                    .toFormat(
                                        format,
                                        options,
                                    ),
                                format
                            ]
                        ),
                        size
                    ];
                }
            );
        if (saveOriginal === true) {
            pipes.unshift(
                [
                    [
                        [parentStream.pipe(new PassThrough()), originalExtension ?? ""]
                    ],
                    "original"
                ]
            );
        }
        return pipes;
    }
}

export default transformerBuilderFactory;
