import { App, PlatformConfig, Canton, Router, Api, Define, Http } from '@core';

export const appDebug = true;
export const appDebugError = true;

export const app: App = {
    key: 'ionicApp',
    year: 2018,
};

export const api: Api = {
    host: 'http://192.168.168.202:8090/api/sys/app/v1',
};

export const platformConfig: PlatformConfig = {
    mode: 'ios',
    toolbarColor: 'primary',
    statusBarColor: '#3880ff', //'#488aff'
};

export const define: Define = {
    userImages: './assets/images/default/no-user.png', // 用户默认图片
    userCutImages: './assets/images/user/default_user.png', // 默认用户的图片
    logoLogin: './assets/images/logo/logo.png',
    logoTopLarge: './assets/images/logo/logo.png',
    logoTopSmall: './assets/images/logo/logo-small.png',
};

/**
 *区域设置
 */
export const canton: Canton = {
    id: null, // 默认区域ID
    fdn: null, // 默认区域
    name: null,
};

/**
 *路由配置
 */
export const router: Router = {
    defaultRoute: '/tutorial',
    defaultUrl: '/tutorial',
    home: '/app/home',
    admin: '/app/tabs',
};
