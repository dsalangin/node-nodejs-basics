const parseArgs = () => {
    const result = [];

    for (let i = 2; i < process.argv.length; i++) {
        if(!process.argv[i].startsWith('--')) {
            continue;
        }

        result.push(`${process.argv[i].slice(2)} is ${process.argv[i + 1]}`);
    }

    console.log(result.join(', '));
};

parseArgs();