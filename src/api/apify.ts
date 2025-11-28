import getOption from './getOption';

export default function apify(axios, method, list = {}) {
    let all = Object.keys(list);
    let result = {};

    all.forEach((key) => {
        let url = list[key];

        result[key] = (...parameter) => {
            return axios(getOption(url, method.toUpperCase(), ...parameter));
        };
    });

    return result;
}
