let time: number = 0;

export default function (threshold: number, dataType: string = 'arraybuffer', data: ArrayBuffer = new ArrayBuffer(0)) {
    if (Date.now() - time < threshold) {
        return {};
    }

    return {};
}
