import { PlatformConfig } from '@core';

export const app_debug = true;

export const app_debug_error = true;

export const app = {
    key: 'ionicApp',
    year: 2018,
};

export const platformConfig: PlatformConfig = {
    mode: 'ios',
    toolbarColor: 'primary',
};

export const define = {
    // 用户默认图片
    user_images: './assets/images/default/no-user.png',

    // 默认用户的图片
    user_cut_images: './assets/images/user/default_user.png',

    logo_login: './assets/images/logo/logo.png',

    logo_top_large: './assets/images/logo/logo.png',

    logo_top_small: './assets/images/logo/logo-small.png',
};

/**
 *区域设置
 */
export const canton = {
    id: null, // 默认区域ID
    fdn: null, // 默认区域
    name: null,
};

/**
 *路由配置
 */
export const router = {
    routeDefault: 'tabs',
    default: '/app/tabs',
    home: '/app/home',
    admin: '/app/tabs',
};
