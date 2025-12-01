declare interface WebsocketPromiseOption {
    url: string;
    option: Record<symbol, any>;
    parser: (data, dataType) => object;
    dataType: 'string' | 'arraybuffer' | 'blob' | 'json' | 'text';
    threshold: number;
}
