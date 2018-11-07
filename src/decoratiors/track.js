import {
  propSet,
  isArray,
  isFunction,
} from "../utils/util"

import actionTracker from "../core/actionTracker"


const track = (partical,key,descriptor)=>{
  if (isFunction(partical)) {
    return (target, key, descriptor) => {
      const value = function (...args) {
        const fn=partical.call(this, descriptor.value, this)
        if(typeof fn==='function'){//参数为高阶函数
          return fn.apply(this, args)
        }else{//普通函数
          if(typeof fn==='object'){
            const data={...fn}
            actionTracker.track(data)
          }
          return descriptor.value.apply(this, arguments);
        }
      }
      // if (descriptor.initializer) {
      //   return propSet('initializer', function() {
      //     const value = descriptor.initializer.apply(this);
      //     return function (...args) {
      //       return partical.call(this, value, this).apply(this, args);
      //     }
      //   }, descriptor);
      // }
      return propSet('value', value, descriptor)
    }
  }else if(typeof partical==='object'&&typeof partical.constructor==='function'){
    //无参数,默认使用属性名作为trackID
    const value=function(){
      const data={
        trackId:key,
      }
      actionTracker.track(data)
      return propSet('value', value, descriptor)
    }
    return descriptor
  }else if(typeof partical==='string'){
    //参数为string 作为tarckId
    return (target, key, descriptor) =>{
      var oldValue = descriptor.value;
      descriptor.value=function(){
        const data={
          trackId:partical,
        }
        actionTracker.track(data)
        return oldValue.apply(this, arguments);
      }
      return descriptor
    }
  }else if(typeof partical==='object'){

    return (target, key, descriptor) =>{
      var oldValue = descriptor.value;
      descriptor.value=function(){
        const data={
          ...partical
        }
        actionTracker.track(data)
        return oldValue.apply(this, arguments);
      }
      return descriptor
    }
  }


}

export default track
