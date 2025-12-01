import Worker from '@/worker/socket.worker.ts?worker';

let worker = new Worker();

export default function () {
    worker.postMessage('init');
}
