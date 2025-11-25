export interface HelloProps {
    compiler?: string;
    framework?: string;
}

export default ({compiler = '', framework = ''}: HelloProps) => {
    return (
        <h1>
            Hello from {compiler} and {framework} !
        </h1>
    );
};
