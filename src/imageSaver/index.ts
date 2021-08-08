import fs from "fs";
import { resolve } from "path";
import { promisify } from "util";
import stream from "stream";
const pipeline = promisify(stream.pipeline);

function imageSaver (
    files: any,
    location: string = "./data",
    targetId: string,
) {
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
                async ({ stream, detectedFileExtension }, ind) => {
                    await pipeline(
                        stream,
                        fs.createWriteStream(
                            resolve(
                                location,
                                `${ targetId }_${ String(ind + 1).padStart(2, "0") }.original.${ detectedFileExtension }`
                            )
                        )
                    );
                    return resolve(
                        location,
                        `${ targetId }_${ String(ind + 1).padStart(2, "0") }.original.${ detectedFileExtension }`
                    );
                }
            )
    );
}

export default imageSaver;
