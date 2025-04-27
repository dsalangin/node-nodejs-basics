import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
    const pathToFile = join(__dirname, 'files', 'script.js');
    const childProcess = spawn('node', [pathToFile, ...args], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });

    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);

    childProcess.on('error', (err) => {
        throw err;
    });

    childProcess.stderr.on('data', (errData) => {
        throw errData.toString();
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
