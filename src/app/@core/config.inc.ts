import * as env from '@env/environment.config';
import { deepExtend } from './helpers/extend';

export const app_debug = env.app_debug;
export const app_debug_error = env.app_debug_error;
export const app = env.app;

/**
 *区域设置
 */
export const canton = env.canton;

/**
 * 平台配置
 */
export const platformConfig = env.platformConfig;

/**
 *路由配置
 */
export const router = deepExtend(
    {
        routeDefault: 'tabs',
        default: '/app/tabs',
        home: '/app/home',
        admin: '/app/tabs',
        login: '/passport/login',
        lock: '/passport/lock',
    },
    env.router,
);

/**
 * API
 */
export const api = deepExtend(
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
export const define = deepExtend(
    {
        // table page size
        table_page_size: 10,

        // 用户默认图片
        user_images: './assets/images/default/no-user.png',

        // 默认用户的图片
        user_cut_images: './assets/images/user/default_user.png',

        logo_login: './assets/images/logo/logo.png',

        logo_top_large: './assets/images/logo/logo.png',

        logo_top_small: './assets/images/logo/logo-small.png',
    },
    env.define,
);

/**
 *HTTP配置
 */
export const http = {
    // 数据包发送格式，10是明文 11是密文
    style: 10,

    // 请求验证代码
    check: 'ezhuo@20161016',
};

export const http_code = {
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
