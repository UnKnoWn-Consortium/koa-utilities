/**
 * Image Transformer
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */

// !!DEPRECATED IN FAVOR OF https://github.com/OblonDATA-IO/image-transformer-pipeline

/**
 * const sizes = [320, 480, 800, 1200, 2400]
 */

import sharp from "sharp";

const DefaultSizes = [
    480, 800, 1200,
];

const DefaultFormats: [string, any][] = [
    ["jpg", {}],
    ["webp", {}],
    ["avif", {}]
];

const DefaultOptions: any = {
    failOnError: false,
}

export function transformStreamBuilderFactory (
    sizes: number[] = DefaultSizes,
    formats = DefaultFormats,
    options = DefaultOptions,
) {
    const srcStream = sharp(options);
    const destStreams = sizes
        .map(
            size => [srcStream.clone().resize(size), size]
        )
        .map(
            ([resizer, size]) => {
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
    return [srcStream, destStreams];
}

export default transformStreamBuilderFactory;
