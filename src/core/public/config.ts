export const is_debug = false;//是否开发(调试)模式

export const app = {
  key: 'zs',
  name: 'ezhuo',
  description: 'hello app',
  year: 2018
};


export const api = {
  base: 'api',
  upload: '/api/file/upload',
  down: '/uploads/',
  canton: 'canton/selectselectselect' // 获取区域的默认URL
};

/**
*区域设置
*/
export const canton = {
  id: null, // 默认区域ID
  fdn: null, // 默认区域
  name: null
};

/**
 *默认定义
 */
export const define = {

  // 用户默认图片
  user_images: './assets/img/avatar.png',

  // 默认用户的图片
  user_cut_images: './assets/img/avatar.png',

  // table page size
  table_page_size: 10,

  image_size: 1024, //拍照/从相册选择照片压缩大小

  quality_size: 94, //图像压缩质量，范围为0 - 100

  // 去https://fundebug.com/申请key
  fundebug_api_key: 'bdd622a941f6a247afdd11a6c83a1297ea8d06b4158325080b089b6421a33a83',

  file_cache: false
};

/**
 *路由配置
 */
export const router = {
  home: '/app/dashboard',
  login: '/passport/login',
  lock: '/passport/lock'
};


/**
 *HTTP配置
 */
export const http = {
  // 数据包发送格式，10是明文 11是密文
  style: 10,

  // 请求验证代码
  check: 'ezhuo@20161016',

  timeout: 20000 //请求超时时间,单位为毫秒
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
  500: '服务器端异常！'
};


/*----------------------------------------后台Api地址----------------------------------------*/
export const APP_SERVE_URL = 'http://127.0.0.1:8090/api/sys/pc/v1/';//测试

/*----------------------------------------文件服务器地址----------------------------------------*/
export const FILE_SERVE_URL = 'http://127.0.0.1:3022/uploads';//文件服务:测试环境

/*----------------------------------------app版本升级服务地址,查询app最新版本号,更新日志.----------------------------------------*/
export const APP_VERSION_SERVE_URL = 'http://172.16.19.86/version/api/';//新测试环境
