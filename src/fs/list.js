import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const list = async () => {
    const pathToFolder = join(__dirname, 'files');

    const filenames = await readdir(pathToFolder)
        .catch((err) => {
            if (err.code !== 'ENOENT') {
                throw err
            }

            throw new Error('FS operation failed');
        });

        console.log(...filenames);
    };

await list();