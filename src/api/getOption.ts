import host from './host';
export default function request<T>(url = '/', method = 'GET', payload = {}, config: RequestConfig<T> = {}) {
    let option: RequestOption<Record<symbol, any>> = {
        url,
        // biome-ignore lint: axios 默认就是用这个
        baseURL: host,
        method,
        timeout: 10 * 1000,
        withCredentials: false,
        responseType: 'json',
        responseEncoding: 'utf8',
        maxRedirects: 5,
        paramsSerializer: function paramsSerializer(params) {
            return new URLSearchParams(params).toString();
        },
    };

    if (method === 'GET') {
        option.params = payload;
    } else if (method === 'POST') {
        option.params = config?.query || {};
        option.data = payload;
    } else {
        option.data = payload;
    }

    return {...option, ...config};
}
