import type WebSocketAsPromised from 'websocket-as-promised';
import create from '@/dataLink/create';

self.onmessage = async () => {
    let socketMap: Map<string, WebSocketAsPromised> = await create();

    socketMap.get('a').sendPacked({a: 1});
};
