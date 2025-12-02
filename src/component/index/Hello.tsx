export interface HelloProps {
    compiler?: string;
    framework?: string;
}

import useSocketError from '@/hook/useSocketError';

export default ({compiler = '', framework = ''}: HelloProps) => {
    useSocketError();
    return (
        <h1>
            Hello from {compiler} and {framework} !
        </h1>
    );
};
