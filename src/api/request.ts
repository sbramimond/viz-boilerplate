import {message as iMessage} from 'antd';
import axios from 'axios';

import apify from './apify';
import * as list from './list';

// 默认请求头配置
const DEFAULT_HEADERS = {
    // biome-ignore lint: ignore
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
};

let instance = axios.create({
    headers: DEFAULT_HEADERS,
});

let notify = (type = true, message = '') => {
    type ||
        iMessage[type === true ? 'success' : 'error']({
            content: `${type === true ? '成功' : '错误'}: ${message}`,
        });
};

instance.interceptors.request.use(
    (config) => {
        // 处理x-silent标记
        if (config['x-silent'] === false) {
            // ui: $loading
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => {
        let {status = 0} = response;
        let {code = 0, data = {}, msg = ''} = response.data;

        if (status === 304) {
            response.status = 200;
        }

        if (status >= 200 && status < 300) {
            if (code === 200) {
                return data;
            } else if (code === 403) {
                // store.set('Authorization', '');
                location.hash = '/login';
            }

            notify(false, `[Request]: Error code ${code} Message: ${msg}`);

            return Promise.reject(response);
        }

        return {};
    },
    (error) => {
        // $load && $load.close();

        return Promise.reject(error.response || error);
    }
);
export default {
    ...apify(instance, 'GET', list.get),
    ...apify(instance, 'POST', list.post),
};
