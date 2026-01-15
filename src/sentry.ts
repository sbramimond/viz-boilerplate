const DSN = 'http://77db99e3d9934f95ba7640067074cf3b@localhost:9200/2';

export default function sentry(
    id: string = Date.now().toString(),
    username: string = 'example_user',
    email: string = 'user@example.com'
): any {
    Sentry.init({
        dsn: DSN,
    });

    Sentry.setUser({
        id,
        username,
        email,
    });

    return Sentry;
}
