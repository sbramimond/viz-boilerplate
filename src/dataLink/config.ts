import './socket.d';

import jsonParser from './parse/json';
import worldParser from './parse/world';

const ROOT_HOST: string = location.hostname + ':8886';

export default {
    a: {
        url: `ws://${ROOT_HOST}/a`,
        option: {},
        parser: worldParser,
        dataType: 'arraybuffer',
        threshold: 80,
    } as WebsocketPromiseOption,
    b: {
        url: `ws://${ROOT_HOST}/b`,
        option: {},
        parser: jsonParser,
        dataType: 'json',
        threshold: 80,
    } as WebsocketPromiseOption,
};
