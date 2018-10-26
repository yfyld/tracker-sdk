import {SERVER_URL} from '@/constant'
import Base64 from './base64'


export default function http(data,isAjax=false,isSendBeacon=true){
  return new Promise((resolve,reject)=>{
    data=Base64.encode(JSON.stringify(data));
    const url=`${SERVER_URL}?time=${Date.now()}`
    if(isSendBeacon&&typeof window.navigator.sendBeacon==='function'&&typeof Blob==='function') {

      const headers = {
        type: "text/plain; charset=UTF-8"
      }
      const blob = new Blob([data], headers);
      const success=window.navigator.sendBeacon(url, blob);
      if(success){
        resolve()
        return;
      }
    }

    if(isAjax||data.length>8000){
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
      xhr.send(data);
    }else{
      const img=new Image()
      img.onload=()=>{
        resolve();
      }
      img.src=`${url}&data=${data}`
    }

  })
}




// {
//   project:'1212',
//   type:'track',
//   time:234523452345,
//   data:{
//     screen_width:1213,
//     screen_heith:234,
//     referrer:"",
//     url:"",
//     path:"",
//     title:"",
//     id:1111
//
//   }
//
// }
