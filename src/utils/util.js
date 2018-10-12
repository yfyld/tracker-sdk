import isFunction from 'lodash/fp/isFunction'
import curry from 'lodash/fp/curry'
import curryN from 'lodash/fp/curryN'
import attempt from 'lodash/fp/attempt'
import isError from 'lodash/fp/isError'
import isArray from 'lodash/fp/isArray'
import once from 'lodash/fp/once'
import reduce from 'lodash/fp/reduce'
import memoize from 'lodash/fp/memoize'
import mapValues from 'lodash/fp/mapValues'
import propSet from 'lodash/fp/set'

import isEqual from 'lodash/fp/isEqual'

export{
  propSet,
  curryN,
  attempt,
  isError,
  isFunction,
  isArray,
  once,
  reduce,
  memoize,
  mapValues,
}

export function isThenable (f) {
    return f && isFunction(f.then)
}


export function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let i in cookies) {
    let arr = cookies[i].split("=");
    if (name == arr[0]) {
      return unescape(arr[1]);
    }
  }
  return null;
}


export function setCookie(name, value, expires=9999999, path='/', domain) {
  document.cookie = name + "=" + value + ((expires)
    ? "; expires=" + getExpires(expires)
    : "") + ((path)
    ? "; path=" + path
    : "") + ((domain)
    ? "; domain=" + domain
    : "");

  function getExpires(hours) {
    let date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date.toGMTString();
  }
}


export function notChanged (binding) {
  if (binding.oldValue !== undefined) {
    if (typeof binding.value === 'object') {
      return isEqual(binding.value, binding.oldValue)
    } else {
      return binding.value === binding.oldValue
    }
  } else {
    return false
  }
}

/**
 * if the binding value is empty
 */
export function isEmpty (binding) {
  return binding.value === '' || binding.value === undefined || binding.value === null
}







export function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]';
}

export function getLocationHref () {
  if (typeof document === 'undefined' || document.location == null) return '';

  return document.location.href;
}

export function noop () { }



export function oneOf (one, all) {
  for (let i in all) {
    if (one === all[i]) {
      return true;
    }
  }
  return false;
}



export function setFlag (key, value) {
  window._tryCatch =    window._tryCatch || {};
    window._tryCatch[key] = value;
}

export function getFlag (key) {
    window._tryCatch =    window._tryCatch || {};
  return    window._tryCatch[key];
}
