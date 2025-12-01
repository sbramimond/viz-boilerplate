let time: number = 0;

export default function (threshold: number, dataType: string = 'string', data: Record<string, any> = {}) {
    if (Date.now() - time < threshold) {
        return;
    }

    time = Date.now();

    return JSON.parse(JSON.stringify(data));
}
