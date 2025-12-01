import './socket.d';

import config from './config';
import Socket from './socket';

export default function () {
    let map: Map<symbol, Socket> = new Map();

    for (let [key, value] of Object.entries(config)) {
        let {
            url = '',
            option = {},
            parser = (data: any) => data,
            dataType = 'string',
            threshold = 80,
        }: WebsocketPromiseOption = value;

        let socket = new Socket(url, option);

        socket.onMessage.addListener((data: any) => {
            return parser(data, dataType);
        });

        map.set(Symbol(key), socket);
    }

    return map;
}
