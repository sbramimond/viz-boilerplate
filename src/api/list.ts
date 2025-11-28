import host from './host';

let {protocol} = location;
const ROOT_URL = `${protocol}//${host}`;

export let post = {
    logout: `${ROOT_URL}/logout`,
};

export let get = {
    getDetail: `${ROOT_URL}/api/getDetail`,
    getGen: `${ROOT_URL}/v1/api/supervise/genQR`,
};
