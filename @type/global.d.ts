declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare global {
    interface Window {
        React: any;
        Sentry: any;
    }
}

export {};

