const DSN = 'http://bdfad8fb24be4f40bdbbd3ddba028ded@localhost:9200/2';

export default function sentry(
    id: string = Date.now().toString(),
    username: string = 'example_user',
    email: string = 'user@example.com'
): void {
    Sentry.init({
        dsn: DSN,
    });

    Sentry.setUser({
        id,
        username,
        email,
    });
}
