import equals from 'ramda/src/equals';

/**
 *判断promise
 *
 * @export
 * @param {*} f
 * @returns
 */
export function isThenable(f: any) {
  return f && typeof f.then === 'function';
}

/**
 *获取url参数 兼容微信支付 window.location.search改成window.location.href
 *
 * @export
 * @param {string} variable
 * @returns
 */
export function getQueryVariable(variable: string) {
  var query = window.location.href.match(/\?(.*)$/);
  if (!query) return null;
  var vars = query[1].split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return null;
}

/**
 *获取cookie
 *
 * @export
 * @param {string} name
 * @returns
 */
export function getCookie(name: string) {
  let cookies = document.cookie.split(';');

  for (let i in cookies) {
    let arr = cookies[i].split('=');
    if (name == arr[0].trim()) {
      return unescape(arr[1]).replace(/&&&&/g, ';');
    }
  }
  return null;
}

/**
 *设置cookie
 *
 * @export
 * @param {string} name
 * @param {string} value
 * @param {number} [expires=99999]
 * @param {string} [path='/']
 * @param {string} [domain]
 */
export function setCookie(name: string, value: string, expires: number = 99999, path: string = '/', domain?: string) {
  document.cookie =
    name +
    '=' +
    value.replace(/;/g, '&&&&') +
    (expires ? '; expires=' + getExpires(expires) : '') +
    (path ? '; path=' + path : '') +
    ('; domain=' + (domain ? domain : '.' + location.host.replace(/.*\.(.*\..*)$/, '$1')));

  function getExpires(hours: number) {
    let date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date.toUTCString();
  }
}

/**
 *
 *
 * @export
 * @param {*} binding
 * @returns
 */
export function notChanged(binding: any) {
  if (binding.oldValue !== undefined) {
    if (typeof binding.value === 'object') {
      return equals(binding.value, binding.oldValue);
    } else {
      return binding.value === binding.oldValue;
    }
  } else {
    return false;
  }
}

/**
 * if the binding value is empty
 */
export function isEmpty(binding: any) {
  return binding.value === '' || binding.value === undefined || binding.value === null;
}

export function setFlag(key: string, value = true) {
  _TrackerGlobalData._trackerFlag = _TrackerGlobalData._trackerFlag || {};
  _TrackerGlobalData._trackerFlag[key] = value;
}

export function getFlag(key: string) {
  _TrackerGlobalData._trackerFlag = _TrackerGlobalData._trackerFlag || {};
  return _TrackerGlobalData._trackerFlag[key] || false;
}

export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 *获取dom path
 *
 * @export
 * @param {HTMLElement} dom
 * @returns
 */
export function getDomPath(dom: HTMLElement) {
  // let path = [dom.id ? '#' + dom.id : dom.tagName.toLowerCase()];
  let path = [];
  if (dom.id && typeof dom.id === 'string') {
    path.push('#' + dom.id);
  } else if (dom.className && typeof dom.className === 'string') {
    path.push(dom.tagName.toLowerCase() + '.' + dom.className.split(' ')[0]);
  } else {
    path.push(dom.tagName.toLowerCase());
  }
  while (dom.parentNode && (dom.parentNode as HTMLElement).tagName !== 'BODY') {
    dom = dom.parentNode as HTMLElement;
    if (dom.id) {
      path.unshift('#' + dom.id);
    } else if (dom.className) {
      path.unshift(dom.tagName.toLowerCase() + '.' + dom.className.split(' ')[0]);
    } else {
      path.unshift(dom.tagName.toLowerCase());
    }
  }
  return path.join('>');
}

export function noop() {}

export function isString(value: any) {
  return Object.prototype.toString.call(value) === '[object String]';
}

export function getLocationHref() {
  if (typeof document === 'undefined' || document.location == null) return '';

  return document.location.href;
}

export function oneOf(one: any, all: any[]) {
  for (let i in all) {
    if (one === all[i]) {
      return true;
    }
  }
  return false;
}

export function getGlobal() {
  return typeof window !== 'undefined' ? window : global;
}

export function isArray(o: any) {
  return Object.prototype.toString.call(o) === '[object Array]';
}

export function isObject(o: any) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

export function hashCode(str: string): string {
  let hash = 0;
  if (str.length === 0) {
    return '';
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return String(hash).replace('-', '0');
}

export function getRealPath(url: string, offlineUrl: string) {
  if (/file:/.test(url) && offlineUrl) {
    url = offlineUrl + url.replace(/^.*(#.*)$/, '$1');
  }

  return url
    .replace('https', 'http')
    .replace(/\?.*$/, '')
    .replace(/\/\d+([\/]*$)/, '{param}$1')
    .replace(/index\.html/, '');
}

export const inMin = /miniprogram/i.test(window.navigator.userAgent);

export const inWechat = !inMin && /micromessenger/i.test(window.navigator.userAgent);
