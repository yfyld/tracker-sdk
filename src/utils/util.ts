import isEqual from 'lodash-es/isEqual';
import isFunction from 'lodash-es/isFunction';



export function isThenable(f: any) {
  return f && isFunction(f.then)
}

export function getCookie(name: string) {
  let cookies = document.cookie.split('; ')
  for (let i in cookies) {
    let arr = cookies[i].split('=')
    if (name == arr[0]) {
      return unescape(arr[1]).replace(/&&&&/g, ';')
    }
  }
  return null
}

export function setCookie(
  name: string,
  value: string,
  expires: number = 9999999,
  path: string = '/',
  domain?: string
) {
  document.cookie =
    name +
    '=' +
    value.replace(/;/g, '&&&&') +
    (expires ? '; expires=' + getExpires(expires) : '') +
    (path ? '; path=' + path : '') +
    (domain ? '; domain=' + domain : '')

  function getExpires(hours: number) {
    let date = new Date()
    date.setTime(date.getTime() + hours * 60 * 60 * 1000)
    return date.toUTCString()
  }
}

export function notChanged(binding: any) {
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
export function isEmpty(binding: any) {
  return (
    binding.value === '' ||
    binding.value === undefined ||
    binding.value === null
  )
}

export function setFlag(key: string, value = true) {
  window._trackerFlag = window._trackerFlag || {}
  window._trackerFlag[key] = value
}

export function getFlag(key: string) {
  window._trackerFlag = window._trackerFlag || {}
  return window._trackerFlag[key] || false
}

export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function getDomPath(dom: HTMLElement) {
  let path = [dom.id ? '#' + dom.id : dom.tagName.toLowerCase()]
  while (dom.parentNode && (dom.parentNode as HTMLElement).tagName !== 'BODY') {
    dom = dom.parentNode as HTMLElement
    path.unshift(dom.id ? '#' + dom.id : dom.tagName.toLowerCase())
  }
  return path.join('>')
}

export function noop() {}

export function isString(value: any) {
  return Object.prototype.toString.call(value) === '[object String]'
}

export function getLocationHref() {
  if (typeof document === 'undefined' || document.location == null) return ''

  return document.location.href
}

export function oneOf(one: any, all: any[]) {
  for (let i in all) {
    if (one === all[i]) {
      return true
    }
  }
  return false
}
