import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
    const pathToFileURL = join(__dirname, 'files', 'fileToRead.txt');

    const fileContent = await readFile(pathToFileURL)
    .catch((err) => {
        if(err.code !== 'ENOENT') {
            throw err;
        }

        throw new Error('FS operation failed');
    });
    
    console.log(fileContent.toString());
};

await read();