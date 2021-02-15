/**
 * Image Transformer
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */

/**
 * const sizes = [320, 480, 800, 1200, 2400]
 */

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
) {
    return function transformerBuilder (parentStream) {
        return sizes
            .map(
                size => [sharp().resize(size), size]
            )
            .map(
                ([resizer, size]) => {
                    parentStream.pipe(resizer);
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
            )
    }
}

export default transformerBuilderFactory;
