import {message as iMessage} from 'antd';
import {useEffect} from 'react';

import {socketChannel} from '@/messageChannel';

export default function () {
    useEffect(() => {
        socketChannel.onmessage = (event: MessageEvent) => {
            let {
                data: {message = '', type = 'success'},
            } = event;

            iMessage[type]({content: message});
        };
    }, []);
}
