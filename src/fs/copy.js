import { cp } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
    const sourcePath = join(__dirname, 'files');
    const destinationPath = join(__dirname, 'files_copy');
    await cp(sourcePath, destinationPath, {recursive: true, force: false, errorOnExist: true})
        .catch((err) => {
            if(err.code === 'ERR_FS_CP_EEXIST') {
                throw new Error('FS operation failed');
            } else {
                throw err;
            }
        })
};

await copy();
