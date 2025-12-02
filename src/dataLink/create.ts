import './socket.d';

import {socketChannel} from '@/messageChannel';

import config from './config';
import Socket from './socket';

export default async function () {
    let map: Map<string, Socket> = new Map();

    for (let [key, value] of Object.entries(config)) {
        let {
            url = '',
            option = {},
            parser = (...args) => args,
            dataType = 'string',
            threshold = 80,
            tag = '',
        }: WebsocketPromiseOption = value;

        let socket = new Socket(url, option);

        socket.onMessage.addListener((data: string | ArrayBuffer) => {
            return parser(threshold, dataType, data);
        });

        socket.onError.addListener((error: Error) => {
            console.log(error);
        });

        try {
            await socket.open();
        } catch (error) {
            socketChannel.postMessage({type: 'error', message: error.message, tag});
        }

        map.set(key, socket);
    }

    return map;
}
