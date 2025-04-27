import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createGunzip } from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
    const pathToArchive = join(__dirname, 'files', 'archive.gz');
    const pathToFile = join(__dirname, 'files', 'fileToCompress.txt');

    await pipeline(
        createReadStream(pathToArchive),
        createGunzip(),
        createWriteStream(pathToFile)
    )
};

await decompress();