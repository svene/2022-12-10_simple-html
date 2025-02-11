// https://www.youtube.com/watch?v=Ys7xdebd66Y
const monkeyPathConsoleLog = () => {
    const org = console.log;
    console.log = function (...args) {
        org(...args);
        console.warn('monkey patched console.log was called');
    }
};

const run = () => {
    monkeyPathConsoleLog();
    console.log('one');
    console.log('two');
};

run();
