import { App, PlatformConfig, Canton, Router, Api, Define, Http } from '@core';
import * as env from '@env/environment.config';
import { deepExtend } from './helpers/extend';

export const appDebug = env.appDebug;
export const appDebugError = env.appDebugError;
export const app: App = env.app;

/**
 *区域设置
 */
export const canton: Canton = env.canton;

/**
 * 平台配置
 */
export const platformConfig: PlatformConfig = env.platformConfig;

/**
 *路由配置
 */
export const router: Router = deepExtend(
    {
        login: '/passport/login',
        lock: '/passport/lock',
    },
    env.router,
);

/**
 * API
 */
export const api: Api = deepExtend(
    {
        host: '',
        base: 'api',
        upload: '/api/file/upload',
        show: '/file/show/',
        down: '/uploads/',
        canton: 'canton/selectselectselect', // 获取区域的默认URL
    },
    env.api,
);

export const fundebug = {
    api: 'bdd622a941f6a247afdd11a6c83a1297ea8d06b4158325080b089b6421a33a83',
};

/**
 * 富文本编辑器
 */
export const editor = null;

/**
 *默认定义
 */
export const define: Define = deepExtend(
    {
        pageSize: 10,
        qualitySize: 10,
        imageSize: 10,
    },
    env.define,
);

/**
 *HTTP配置
 */
export const http: Http = {
    // 数据包发送格式，10是明文 11是密文
    style: 10,

    // 请求验证代码
    check: 'ezhuo@20161016',
};

export const httpCode = {
    200: '',
    201: '',
    202: '',
    204: '',
    203: '',
    205: '',

    400: '',
    401: '',
    403: '',
    404: '在服务器端，没有找到该请求服务！',
    406: '重要：',
    410: '',
    411: '',
    412: '',
    422: '验证：',
    500: '服务器端异常！',
    504: '没有连接到服务器！',
};
