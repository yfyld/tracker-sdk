## 安装
```bash
npm i @zyf2e/telescope -S

```

## 引入
```js
import * as Telescope from '@zyf2e/telescope';
```


## 使用

### 设置配置
```js
Telescope.setConfig({ autoTrackClick: false, projectId: 2, version: '1.0.0' });
```

### 设置登录信息

```js
Telescope.login({ uid: 123 });
```



### 方法

```js
Telescope.trackPage({trackId: "h5-page-pay"});
Telescope.trackEvent({trackId:"h5-click-submit"})
```

### 指令

```js
Vue.directive('track-event', Telescope.vTrackEvent);
// Vue.directive('track-view', Telescope.vTrackView);
Vue.directive('track-page', Telescope.vTrackPage);
```

```html
 <div class="content">
  <div v-if="isHuangjin" v-track-page="'h5-page-member-detail-huangjin'">
    ...
  </div>
  <div v-else  v-track-page="'h5-page-member-detail-zhuanshi'">
    ...
  </div>
</div
```


```html
 <div class="conversion">
    <input v-track-event.blur="'h5-event-member-detail-conversion'"/>
    <button v-track-event.click="'h5-event-member-detail-conversion'">
      使用兑换码
    </button>
    <button v-track-event="'h5-event-member-detail-conversion'">
      使用兑换码
    </button>
  </div>
```


### 装饰器

```js
@tracker("h5-event-submit")
handleSubmit(){

}

@tracker(after(){
  return 'h5-event-submit-success'
})
handleSubmit(){
  return new Promise()
}

@tracker({
  actionType:'PAGE'
  trackId:'h5-page-pay-success'
})
handleSubmit(){

}




```


