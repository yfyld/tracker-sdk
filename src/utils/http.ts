import {SERVER_URL} from '../constant/index'
import Base64 from './base64'


export default function http(data:string|string[],isAjax=false,isSendBeacon=true){
  return new Promise((resolve)=>{
    const dataStr=Base64.encode(JSON.stringify(data));
    const url=`${SERVER_URL}?time=${Date.now()}`
    if(isSendBeacon&&typeof window.navigator.sendBeacon==='function'&&typeof Blob==='function') {

      const headers = {
        type: "text/plain; charset=UTF-8"
      }
      const blob = new Blob([dataStr], headers);
      const success=window.navigator.sendBeacon(url, blob);
      if(success){
        resolve()
        return;
      }
    }

    if(isAjax||dataStr.length>8000){
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          resolve();
        }
      });
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
      xhr.withCredentials = true;
      xhr.send(dataStr);
    }else{
      const img:HTMLImageElement=new Image()
      img.onload=()=>{
        resolve();
      }
      img.src=`${url}&data=${dataStr}`
    }

  })
}




