import type WebSocketAsPromised from 'websocket-as-promised';
import create from '@/dataLink/create';

let socketMap: Map<string, WebSocketAsPromised> = await create();

self.onmessage = () => {};

socketMap.get('a').sendPacked({a: 1});
