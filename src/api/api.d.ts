interface RequestOption {
    url: string;
    // biome-ignore lint: 调试阶段需要
    baseURL?: string;
    method?: string;
    headers?: Record<string, string>;
    timeout?: number;
    withCredentials?: boolean;
    responseType?: string;
    responseEncoding?: string;
    maxRedirects?: number;
    paramsSerializer?: (params: Record<string, string>) => string;
    'x-silent'?: boolean;
    'x-message'?: boolean;
    params?: Record<string, any>;
    data?: any;
}

interface Api<U, T> {
    [u: string]: T & RequestOption;
}
