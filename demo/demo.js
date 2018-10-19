//time project pageid
const data={
  page:[{
    url:"www",
    pageId:"123",
    count:1212,
  }],
  event:[
    {
      url:"http://0.0.0.0:10002/demo/vue.html",
      name:"CLICK",
      pageId:"pid3",
      trackId:"asd",
      domPath:"div",
      domId:"aaa",
      count:1233,
      id:1,
    },
    {
      url:"http://0.0.0.0:10002/demo/vue.html",
      name:"CLICK",
      pageId:"pid3",
      trackId:"asd",
      domPath:"div",
      domId:"bbb",
      count:1233,
      id:1,
    }
  ]
}

const elements={

}

install()

function install(){
  // const oDiv=document.createElement('div');
  // oDiv.id="tracker-analyse-wrapper";
  // oDiv.innerHTML=`
  //   <button class="tracker-analyse-btn">控制台</button>
  //   <div class="tracker-analyse-content">
  //     <div class="tracker-analyse-form">
  //       <span>时间:</span><input type="text">~
  //       <input type="text">
  //     </div>
  //     <button class="tracker-analyse-search">查询</button>
  //   </div>
  // `
  // document.body.appendChild(oDiv);


  bind(analyseChange)
}


function analyseChange(e){
  const url=location.href
  data.event.filter(item=>{
    return !item.trackId||!_trackerPageId||item.trackId===_trackerPageId||item.url===url
  }).forEach(item=>{
    let element=null;
    if(item.domId){
      element=document.getElementById(item.domId)
    }else{
      element=document.querySelectorAll(item.path)
      element=element.length===1?element[0]:null;
    }
    if(!element){
      return
    }
    elements[item.id]=element;
  })

}


function bind(cb){
  const observer = new MutationObserver(cb)
  const body = document.body;
  const options = {
    'childList': true,
    'attributes':true,
    subtree:true
  };
  observer.observe(body, options);
}


class EventEffect{

}


// import {track,after,before,setConfig} from "../dist/tracker.min"
//
// setConfig({
//   projectId:12,
//   token:"12131313"
// })
//
// class demo{
//   constructor(){
//     this.qqq="wode";
//   }
//   @track
//   aaa(){
//     console.log("aaa",this)
//   }
//   @track("iiidd")
//   ccc(){
//     console.log("ccc",this)
//   }
//   @track(()=>({aaaa:1}))
//   fff(){
//     console.log("ccc",this)
//   }
//
//   @track(after(function(){
//     console.log(this)
//     console.log("a1")
//   }))
//   a1(){
//     console.log("a11")
//   }
//
//   @track(before(()=>{
//     console.log("a2")
//     return {a2:1}
//   }))
//   a2(){
//     console.log("a22")
//   }
//
//   @track(after(()=>{
//     console.log(99991)
//     return {asdfasdf:111}
//   }))
//   a3(){
//     return new Promise((resolve,reject)=>{
//       setTimeout(()=>{
//         resolve()
//       },1000)
//     }).then(()=>{
//       console.log(8)
//     })
//   }
//
//   @track(after("cccccc"))
//   a4(){
//     console.log("a44")
//   }
// }
//
// export  {demo}


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
