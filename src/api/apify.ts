import {Axios, type AxiosRequestConfig} from 'axios';
import getOption from './getOption';

export default function apify(i: Axios, method: string, list = {}) {
    let all = Object.keys(list);
    let result = {};

    all.forEach((key) => {
        let url = list[key];

        result[key] = (...parameter: any) => {
            return i(getOption(url, method.toUpperCase(), ...parameter) as AxiosRequestConfig);
        };
    });

    return result;
}
