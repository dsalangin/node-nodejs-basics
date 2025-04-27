import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
    class ReverseStream extends Transform {
        constructor(options) {
            super(options);
        }

        _transform(chunk, _, cb) {
            this.push(`${chunk.toString().split('').reverse().join('')}\n`);
            cb();
        }
    }

    await pipeline(
        process.stdin,
        new ReverseStream(),
        process.stdout
    );
};

await transform();