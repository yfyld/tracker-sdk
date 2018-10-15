# 无痕埋点 tracker

## install

### npm
```
npm i tracker-web -S
```
使用
```js
import {track,before} from "tracker-web"
```
### 直接引进
```
<script src="dist/tracker.min.js" tracker-key="******"></script>
所有方法挂载再全局 tracker 下

```


## method

### track
``` js
import {track,before} from "tracker-web"

class component{
  constructor(){
      this.id="thisIsAId"
      track=track.bind(this)
  }
  //参数可以是埋点id
  @track("open-share")
  handleClickShareBtn(){

  }
  //参数可以是埋点信息
  @track({trackId:"open-share"})
  handleClickShareBtn(){

  }
  //参数可以是一个函数返回埋点信息
  @track(()=>{
    return {trackId:"open-share"}
  })
  handleClickShareBtn(){

  }
  //需要访问this 已自动绑定this 不能用箭头函数
  @track(function(){
    return {trackId:this.id}
  })
  handleClickShareBtn(){

  }

  //参数是高阶函数,默认提给的高阶函数见下方api
  @track(before(()=>{
    return {trackId:"open-share"}
  }))
  handleClickShareBtn(){

  }
}
```

### before

方法运行前触发埋点,支持多种传参数方式

```js
class component{
  @track(before("open-share"))
  handleClickShareBtn(){

  }

  @track(before({trackId:"open-share"}))
  handleClickShareBtn(){

  }

  @track(before(()=>{
    return {trackId:"open-share"}
  }))
  handleClickShareBtn(){

  }
}
```

### after
方法运行后触发埋点,支持promise异步,支持多种传参数方式

```js
class component{
  @track(after(()=>{
    console.log('track')
    return {trackId:"open-share"}
  }))
  handleClickShareBtn(){
    return fetch.POST("/share").then(()=>{
      console.log("Share OK")
    })
  }
  //结果:
  //"Share OK"
  //"track"
}
### send
手动发送埋点信息

### sendSync
同步发送埋点信息

### pageTimeTracker.start/change/end
手动埋点访问持续时间

### actionTracker.trackEvent/trackPage/trackLink
手动埋点

### v-track
vue指令 默认click触发 可通过修饰器指定触发方式 v-track.focus="{trackId:'id'}"

### v-track-view
vue 指令 页面埋点 和模块显示隐藏

### setConfig
`config.autoInstall:true`时必须在windown.onload之前修改config


## config

```json
{
  pageTime:false,  //是否记录页面停留时间
  env:'production',
  projectId:null,
  token:null,
  version:null,
  domain:'',
  sendType:'SYNC',  //发送日志方式 (存cookie下次发,同步发,异步延迟发,关闭浏览器前发送)
  delayTime:1000, //仅在sendType=AYNC 生效
  autoSendCookie:true,
  autoTrakerPage:true,
  autoTrakerClick:true,//自动埋点a,button,input
  autoInstall:true
}
```
