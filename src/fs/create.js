import {writeFile} from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const pathToFile = join(__dirname, 'files', 'fresh.txt');
    await writeFile(pathToFile, 'I am fresh and young', {flag: 'wx'}).catch((err) => {
        if(err.code === 'EEXIST') {
            throw new Error('FS operation failed');
        } else {
            throw err; 
        }
    }) ;
};

await create();