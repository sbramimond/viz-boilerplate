export default function <T>(url: string, eventName: string, callback: (data: T) => void) {
    let sse = new EventSource(url);

    if (eventName) {
        sse.addEventListener(
            eventName,
            (event: MessageEvent) => {
                callback(event.data);
            },
            false
        );
    } else {
        sse.onmessage = (event: MessageEvent) => {
            callback(event.data);
        };
    }

    return sse;
}
