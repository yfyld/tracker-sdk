import Base64 from './base64';
import { getConfig } from 'src/core/config';

export default function http(data: string, isAjax = false, isSendBeacon = true, cb = () => {}) {
  // return new Promise((resolve) => {
  //   //const dataStr=Base64.encode(JSON.stringify(data));
  //   const dataStr = data;
  //   const config = getConfig();
  //   const url = `${config.serverUrl}?${config.trackKey ? `trackKey=${config.trackKey}&` : ''}time=${Date.now()}`;

  //   if (
  //     window.location.protocol === 'https:' &&
  //     isSendBeacon &&
  //     typeof window.navigator.sendBeacon === 'function' &&
  //     typeof Blob === 'function'
  //   ) {
  //     const headers = {
  //       type: 'text/plain; charset=UTF-8'
  //     };
  //     const blob = new Blob([dataStr], headers);
  //     const success = window.navigator.sendBeacon(url, blob);
  //     if (success) {
  //       resolve();
  //       return;
  //     }
  //   }

  //   if (isAjax) {
  //     const xhr = new XMLHttpRequest();
  //     xhr.withCredentials = true;
  //     xhr.addEventListener('readystatechange', function () {
  //       if (this.readyState === 4) {
  //         resolve();
  //       }
  //     });
  //     xhr.open('POST', url, true);
  //     xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
  //     xhr.withCredentials = true;
  //     xhr.send(dataStr);
  //   } else {
  //     const img: HTMLImageElement = new Image();
  //     img.onload = () => {
  //       resolve();
  //     };
  //     img.src = `${url}&data=${encodeURIComponent(dataStr)}`;
  //   }
  // });

  //const dataStr=Base64.encode(JSON.stringify(data));
  const dataStr = data;
  const config = getConfig();
  const url = `${config.serverUrl}?${config.trackKey ? `trackKey=${config.trackKey}&` : ''}time=${Date.now()}`;

  if (
    window.location.protocol === 'https:' &&
    isSendBeacon &&
    typeof window.navigator.sendBeacon === 'function' &&
    typeof Blob === 'function'
  ) {
    const headers = {
      type: 'text/plain; charset=UTF-8'
    };
    const blob = new Blob([dataStr], headers);
    const success = window.navigator.sendBeacon(url, blob);
    if (success) {
      cb();
      return;
    }
  }

  if (isAjax || dataStr.length > 2000) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        cb();
      }
    });
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.withCredentials = true;
    xhr.send(dataStr);
  } else {
    const img: HTMLImageElement = new Image();
    img.onload = () => {
      cb();
    };
    img.src = `${url}&data=${encodeURIComponent(dataStr)}`;
  }
}
