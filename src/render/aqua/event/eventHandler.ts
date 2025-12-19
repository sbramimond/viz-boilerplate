export default function eventHandler(event: string, x: number, y: number): void {
    let handler: Record<string, (x: number, y: number) => void> = {
        'THREE:dblclick': (x, y) => {
            console.log('Aqua Event Handler: Double Click at', x, y);
        },
    };

    try {
        handler[event](x, y);
    } catch (_error) {}
}
