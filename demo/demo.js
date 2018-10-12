import {track,after} from "../dist/tracker.min"



class demo{
  constructor(){
    this.qqq="wode";
  }
  @track
  aaa(){
    console.log("aaa",this)
  }
  @track("iiidd")
  ccc(){
    console.log("ccc",this)
  }
  @track(()=>({aaaa:1}))
  fff(){
    console.log("ccc",this)
  }

  @track(after(function(){
    console.log(this)
    console.log("a1")
  }))
  a1(){
    console.log("a11")
  }

  @track(after(()=>{
    console.log("a2")
    return {a2:1}
  }))
  a2(){
    console.log("a22")
  }

  @track(after(()=>{
    console.log(99991)
    return {asdfasdf:111}
  }))
  a3(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve()
      },1000)
    }).then(()=>{
      console.log(8)
    })
  }

  @track(after("cccccc"))
  a4(){
    console.log("a44")
  }
}

export  {demo}


// class demo{
//   @track(({type:"page"}))
//   componentWillDid(){
//
//   }
//
//   aaaa(){
//     track.send({type:'action'})
//   }
//
//   @track({type:"action"})
//   handleClick(){
//
//   }
//
//   @track(after({type:'action'}))
//   @track(after(()=>{
//     return {type:'action'}
//   }))
//   mentaaa(){
//     return  http.get('www.baidu.com')
//   }
// }
