/**
 * 判断类型
 * @param {*} o
 */
const typeCheck = function (o) {
  const s = Object.prototype.toString.call(o);
  return s
    .match(/\[object (.*?)\]/)[1]
    .toLowerCase()
    .trim();
};

const isTypeCheck = function (typeName, obj) {
  return (
    typeName
      .toLowerCase()
      .slice(2)
      .trim() === typeCheck(obj)
  );
};

export function isNull(obj) {
  return isTypeCheck(isNull.name, obj);
}

export function isUndefined(obj) {
  return isTypeCheck(isUndefined.name, obj);
}

export function isObject(obj) {
  return isTypeCheck(isObject.name, obj);
}

export function isArray(obj) {
  return isTypeCheck(isArray.name, obj);
}

export function isString(obj) {
  return isTypeCheck(isString.name, obj);
}

export function isNumber(obj) {
  return isTypeCheck(isNumber.name, obj);
}

export function isBoolean(obj) {
  return isTypeCheck(isBoolean.name, obj);
}

export function isFunction(obj) {
  return isTypeCheck(isFunction.name, obj);
}

export function isRegExp(obj) {
  return isTypeCheck(isRegExp.name, obj);
}

export function IsEmpty(obj) {
  if (obj == null || obj === undefined) return true;

  if (isObject(obj)) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  if (isArray(obj)) {
    return obj.length === 0;
  }

  return !Boolean(obj);
}

export function isNotEmpty(obj) {
  return !IsEmpty(obj);
}

export function getNow() {
  return '';
}

export function parseJSON(obj) {
  if (obj == null || obj === undefined) {
    return obj;
  }
  try {
    return JSON.parse(obj);
  } catch (e) {
    return null;
  }
}


export function formatYesOrNo(value: number | string): string {
  return value == 1 ? '是' : (value == '0' ? '否' : null);
}


/**
 * 日期对象转为日期字符串
 * @param date 需要格式化的日期对象
 * @param sFormat 输出格式,默认为yyyy-MM-dd                        年：y，月：M，日：d，时：h，分：m，秒：s
 * @example  dateFormat(new Date())                               "2017-02-28"
 * @example  dateFormat(new Date(),'yyyy-MM-dd')                  "2017-02-28"
 * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         "2017-02-28 13:24:00"   ps:HH:24小时制
 * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 01:24:00"   ps:hh:12小时制
 * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
 * @example  dateFormat(new Date(),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
 * @example  dateFormat(new Date('2017-02-28 13:24:00'),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
 * @returns {string}
 */
export function dateFormat(date: Date, sFormat: String = 'yyyy-MM-dd'): string {
  let time = {
    Year: 0,
    TYear: '0',
    Month: 0,
    TMonth: '0',
    Day: 0,
    TDay: '0',
    Hour: 0,
    THour: '0',
    hour: 0,
    Thour: '0',
    Minute: 0,
    TMinute: '0',
    Second: 0,
    TSecond: '0',
    Millisecond: 0
  };
  time.Year = date.getFullYear();
  time.TYear = String(time.Year).substr(2);
  time.Month = date.getMonth() + 1;
  time.TMonth = time.Month < 10 ? "0" + time.Month : String(time.Month);
  time.Day = date.getDate();
  time.TDay = time.Day < 10 ? "0" + time.Day : String(time.Day);
  time.Hour = date.getHours();
  time.THour = time.Hour < 10 ? "0" + time.Hour : String(time.Hour);
  time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
  time.Thour = time.hour < 10 ? "0" + time.hour : String(time.hour);
  time.Minute = date.getMinutes();
  time.TMinute = time.Minute < 10 ? "0" + time.Minute : String(time.Minute);
  time.Second = date.getSeconds();
  time.TSecond = time.Second < 10 ? "0" + time.Second : String(time.Second);
  time.Millisecond = date.getMilliseconds();

  return sFormat.replace(/yyyy/ig, String(time.Year))
    .replace(/yyy/ig, String(time.Year))
    .replace(/yy/ig, time.TYear)
    .replace(/y/ig, time.TYear)
    .replace(/MM/g, time.TMonth)
    .replace(/M/g, String(time.Month))
    .replace(/dd/ig, time.TDay)
    .replace(/d/ig, String(time.Day))
    .replace(/HH/g, time.THour)
    .replace(/H/g, String(time.Hour))
    .replace(/hh/g, time.Thour)
    .replace(/h/g, String(time.hour))
    .replace(/mm/g, time.TMinute)
    .replace(/m/g, String(time.Minute))
    .replace(/ss/ig, time.TSecond)
    .replace(/s/ig, String(time.Second))
    .replace(/fff/ig, String(time.Millisecond))
}

/**
 * 每次调用sequence加1
 * @type {()=>number}
 */
export let getSequence = (function () {
  let sequence = 1;
  return function () {
    return ++sequence;
  };
})();

/**
 * 返回字符串长度，中文计数为2
 * @param str
 * @returns {number}
 */
export function strLength(str: string): number {
  let len = 0;
  for (let i = 0, length = str.length; i < length; i++) {
    str.charCodeAt(i) > 255 ? len += 2 : len++;
  }
  return len;
}

/**
 * 把url中的双斜杠替换为单斜杠
 * 如:http://localhost:8080//api//demo.替换后http://localhost:8080/api/demo
 * @param url
 * @returns {string}
 */
export function formatUrl(url: string = ''): string {
  let index = 0;
  if (url.startsWith('http')) {
    index = 7
  }
  return url.substring(0, index) + url.substring(index).replace(/\/\/*/g, '/');
}

/** 产生一个随机的32位长度字符串 */
export function uuid() {
  let text = "";
  let possible = "abcdef0123456789";
  for (let i = 0; i < 19; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text + new Date().getTime();
}