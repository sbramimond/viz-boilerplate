import Socket from 'websocket-as-promised';

export default class Websocket extends Socket {
    constructor(url = '', option?: Record<symbol, any>) {
        if (!url) {
            url = `ws://${location.host}`;
        }

        super(url, option);
    }
    override send = (data: any): void => {
        this.send(JSON.stringify(data));
    };
}
