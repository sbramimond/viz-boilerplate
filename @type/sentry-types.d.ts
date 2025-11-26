declare const Sentry: {
    init(options: {
        dsn: string;
        debug?: boolean;
        autoSessionTracking?: boolean;
        integrations?: any[];
        beforeSend?: (event: any) => any;
        tracesSampleRate?: number;
        replaysSessionSampleRate?: number;
        replaysOnErrorSampleRate?: number;
    }): void;
    captureException(exception: Error): string;
    captureMessage(message: string, level: string): string;
    setExtra(key: string, extra: any): void;
    setTag(key: string, value: string): void;
    setUser(user: any): void;
    addBreadcrumb(breadcrumb: any): void;
};
