/**
 * @file apify
 * @author ienix(guoaimin01@baidu.com)
 *
 * @since 2019/04/15
 */

import request from './request';

export let api: Api<symbol, string> = request;

export {default as host} from './host';
