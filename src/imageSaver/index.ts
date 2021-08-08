import fs from "fs";
import { resolve } from "path";
import { promisify } from "util";
import stream from "stream";
const pipeline = promisify(stream.pipeline);

function imageSaverFactory (
    files: any,
    location: string = "./data",
    targetId: string,
) {
    return async () => {
        if (
            !Array.isArray(files) ||
            files.length === 0
        ) {
            return [];
        }

        return Promise.all(
            files
                .filter(
                    ({ detectedMimeType }) => detectedMimeType.includes("image/")
                )
                .map(
                    ({ stream, detectedFileExtension }, ind) => pipeline(
                        stream,
                        fs.createWriteStream(
                            resolve(
                                location,
                                `${ targetId }_${ String(ind + 1).padStart(2, "0") }.original.${ detectedFileExtension }`
                            )
                        )
                    )
                )
        );
    };
}

export default imageSaverFactory;
