import {useState} from 'react';
export interface HelloProps {
    compiler?: string;
    framework?: string;
}

import useSocketError from '@/hook/useSocketError';
import sse from '@/sse';

export default ({compiler = '', framework = ''}: HelloProps) => {
    useSocketError();

    let [message, setMessage] = useState('');

    sse<string>(`http://${location.hostname}:3000/stream`, 'sse-example-message', (data) => {
        setMessage(data);
    });

    return (
        <h1>
            Hello from {compiler} and {framework} ! SSE MESSAGE: {message}
        </h1>
    );
};
