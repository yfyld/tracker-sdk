import {  PerformanceTime } from '@/types'


class PerformanceTracker {
  static instance: PerformanceTracker = null
  static getInstance() {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker()
    }
    return PerformanceTracker.instance
  }

  performance: Performance = window.performance

  // getResourceTiming(filter?:PerformanceEntryFilterOptions):PerformanceTime{
  //   if (!this.performance) {
  //     console.log('你的浏览器不支持 performance 接口')
  //     return null;
  //   }
  //   const ts = performance.getEntries(filter);// tslint:disable-line
  //   if(ts.length!==1){
  //     return null;
  //   }
  //   const t=ts[0];
  //   const times: any = {
  //   }
  //   return times;
  // }

  getRenderTiming(): PerformanceTime {
    if (!this.performance) {
      console.log('你的浏览器不支持 performance 接口')
      return null;
    }

    const t = performance.timing
    const times: PerformanceTime = {
      //页面加载完成的时间
      loadPage: t.loadEventEnd - t.navigationStart,
      //解析 DOM 树结构的时间
      domReady: t.domComplete - t.responseEnd,
      //重定向的时间
      redirect: t.redirectEnd - t.redirectStart,
      //DNS 查询时间
      lookupDomain: t.domainLookupEnd - t.domainLookupStart,
      //读取页面第一个字节的时间
      ttfb: t.responseStart - t.navigationStart,
      //内容加载完成的时间
      request: t.responseEnd - t.requestStart,
      //执行 onload 回调函数的时间
      loadEvent: t.loadEventEnd - t.loadEventStart,
      // DNS 缓存时间
      appcache: t.domainLookupStart - t.fetchStart,
      // 卸载页面的时间
      unloadEvent: t.unloadEventEnd - t.unloadEventStart,
      // TCP 建立连接完成握手的时间
      connect: t.connectEnd - t.connectStart
    }

    return times
  }
}

let instance = PerformanceTracker.getInstance()
export default instance
