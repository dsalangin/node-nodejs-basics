import { rm } from 'fs/promises';
import { fileURLToPath } from 'url';
import {dirname, join} from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const remove = async () => {
    const pathToFile = join(__dirname, 'files', 'fileToRemove.txt');

    await rm(pathToFile, {force: false})
        .catch((err) => {
            if(err.code !== 'ENOENT') {
                throw err;
            }

            throw new Error('FS operation failed');
        });
};

await remove();