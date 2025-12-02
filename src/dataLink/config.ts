import './socket.d';

import jsonParser from './parse/json';
import worldParser from './parse/world';

const ROOT_HOST: string = `${location.hostname}:3000`;

export default {
    a: {
        url: `ws://${ROOT_HOST}/a`,
        option: {
            packMessage: <T>(data: T) => JSON.stringify(data),
            unpackMessage: <T>(data: T) => data,
        },
        parser: worldParser,
        dataType: 'arraybuffer',
        threshold: 80,
        tag: 'SOCKET:A',
    } as WebsocketPromiseOption,
    b: {
        url: `ws://${ROOT_HOST}/b`,
        option: {},
        parser: jsonParser,
        dataType: 'json',
        threshold: 80,
        tag: 'SOCKET:B',
    } as WebsocketPromiseOption,
};
