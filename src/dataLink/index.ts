import Worker from './socket.worker.ts?worker';

export default function () {
    let worker = new Worker();

    worker.postMessage('init');
}
