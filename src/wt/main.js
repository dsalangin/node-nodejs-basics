import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cpus } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
    const pathToWorker = join(__dirname, 'worker.js');
    const cpuCount = cpus().length;
    const promiseThreads = [];

    for (let i = 0; i < cpuCount; i++) {
        const promiseThread = new Promise((resolve, reject) => {
            const worker = new Worker(pathToWorker, {
                workerData: 10 + i,
            });
            worker.on('message', (data) => {
                resolve({
                    status: 'resolved',
                    data
                });
            });
            worker.on('error', () => {
                resolve({
                    status: 'error',
                    data: null
                });
            });
        });

        promiseThreads.push(promiseThread);
    }

    const result = await Promise.all(promiseThreads);
    console.log(result);
};

await performCalculations();