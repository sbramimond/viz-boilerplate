import './socket.d';

import config from './config';
import Socket from './socket';

export default async function () {
    let map: Map<symbol, Socket> = new Map();

    for (let [key, value] of Object.entries(config)) {
        let {
            url = '',
            option = {},
            parser = (...args) => args,
            dataType = 'string',
            threshold = 80,
        }: WebsocketPromiseOption = value;

        let socket = new Socket(url, option);

        socket.onMessage.addListener((data: any) => {
            return parser(threshold, dataType, data);
        });

        socket.onError.addListener((error) => {
            console.log(error);
        });

        try {
            await socket.open();
        } catch (_error) {
            console.log(_error);
        }

        map.set(Symbol(key), socket);
    }

    return map;
}
