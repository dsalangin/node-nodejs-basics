import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const write = async () => {
    const pathToFile = join(__dirname, 'files', 'fileToWrite.txt');
    await pipeline(
        process.stdin,
        createWriteStream(pathToFile)
    )
};

await write();