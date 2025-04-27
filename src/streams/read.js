import { fileURLToPath } from 'url';
import {dirname, join} from 'path';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
    const pathToFile = join(__dirname, 'files', 'fileToRead.txt');

    await pipeline(
        createReadStream(pathToFile),
        process.stdout,
    )
};

await read();