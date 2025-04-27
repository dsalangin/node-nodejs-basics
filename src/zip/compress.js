import {fileURLToPath} from 'url';
import { dirname, join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compress = async () => {
    const pathToFile = join(__dirname, 'files', 'fileToCompress.txt');
    const pathToArchive = join(__dirname, 'files', 'archive.gz');

    await pipeline(
        createReadStream(pathToFile),
        createGzip(),
        createWriteStream(pathToArchive)
    )
};

await compress();