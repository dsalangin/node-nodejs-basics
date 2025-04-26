import { rename as fsRename, access, constants } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rename = async () => {
    const pathToFile = join(__dirname, 'files', 'wrongFilename.txt');
    const pathToRenameFile = join(__dirname, 'files', 'properFilename.md');

    try {
        await access(pathToRenameFile, constants.R_OK);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }

        await fsRename(pathToFile, pathToRenameFile)
        .catch((err) => {
            if (err.code === 'ENOENT') {
                throw new Error('FS operation failed');
            } else {
                throw err;
            }
        });
    }
};

await rename();