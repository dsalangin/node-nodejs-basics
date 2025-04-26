import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
    const pathToFile = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const readStream = createReadStream(pathToFile);
    const hash = createHash('SHA256');

    readStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    readStream.on('end', () => {
        console.log(hash.digest('hex'));
    });
};

await calculateHash();