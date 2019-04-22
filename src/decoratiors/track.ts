import isFunction from 'lodash-es/isFunction';
import propSet from 'lodash-es/set';


import actionTracker from "../core/actionTracker"


const track = (partical:any,key:string,descriptor:PropertyDescriptor)=>{
  if (isFunction(partical)) {
    return (target:any, key:string, descriptor:PropertyDescriptor) => {
      const value = function (...args:any) {
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
      return propSet(descriptor,'value', value)
    }
  }else if(typeof partical==='object'&&typeof partical.constructor==='function'){
    //无参数,默认使用属性名作为trackID
    const value=function(){
      const data={
        trackId:key,
      }
      actionTracker.track(data)
      return propSet(descriptor,'value', value)
    }
    return descriptor
  }else if(typeof partical==='object'){

    return (target:any, key:string, descriptor:PropertyDescriptor) =>{
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
  }else {
    //参数为string 作为tarckId
    return (target:any, key:string, descriptor:PropertyDescriptor) =>{
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
  }


}

export default track
