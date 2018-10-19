import Tooltip from "./tooltip.js"
import debounce from "lodash/debounce"


const styleStr=`
.tracker-analyse-tooltip {
    position: absolute;
    background: #FFC107;
    color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    padding: 5px 10px;
    font-size: 12px;
    text-align: center;
}



.tracker-analyse-tooltip .tracker-analyse-tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
}

.tracker-analyse-tooltip .tracker-analyse-tooltip-arrow {
    border-color: #FFC107;
}


.tracker-analyse-tooltip[x-placement^="top"] {
    margin-bottom: 5px;
}

.tracker-analyse-tooltip[x-placement^="top"] .tracker-analyse-tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.tracker-analyse-tooltip[x-placement^="bottom"] {
    margin-top: 5px;
}
.tracker-analyse-tooltip[x-placement^="bottom"] .tracker-analyse-tooltip-arrow{
    border-width: 0 5px 5px 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}
.tracker-analyse-tooltip[x-placement^="right"] {
    margin-left: 5px;
}

.tracker-analyse-tooltip[x-placement^="right"] .tracker-analyse-tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

.tracker-analyse-tooltip[x-placement^="left"] {
    margin-right: 5px;
}

.tracker-analyse-tooltip[x-placement^="left"] .tracker-analyse-tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}


.tracker-analyse-page{
  white-space: pre-wrap;
  position:fixed;
  pointer-events: none;
  width:100%;
  max-width: 300px;
  background: rgba(23,23,4,.4);
  top: 0;
  right: 0;
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  z-index: 99999;
  border-bottom-left-radius: 10px;
}
.tracker-analyse-page p{
  margin-bottom: 10px;
}

.tracker-analyse-event{
  position: fixed;
}

.tracker-analyse-event i{
  width:20px;
  height: 20px;
  border-radius: 50%;
  border:3px solid #f7780c;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  transform: scale3d(.01, .01, .01);
}

.tracker-analyse-event i:nth-child(1){
  animation: tracker-analyse-animation 1.5s linear infinite;
}
.tracker-analyse-event i:nth-child(2){
  animation: tracker-analyse-animation 1.5s .5s linear infinite;
}
.tracker-analyse-event i:nth-child(3){
  animation: tracker-analyse-animation 1.5s  1s linear infinite;
}

@keyframes tracker-analyse-animation{

0% {
  opacity: 1;
  transform: scale3d(.1, .1, .1);
}
100% {
  opacity: 0;
  transform: scale3d(1, 1 ,1);
}

}

.tracker-analyse-console-btn,.tracker-analyse-console-search{

    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
}
.tracker-analyse-console-btn{
  position: fixed;
  right: 5px;
  bottom: 5px;
}
.tracker-analyse-console-search{
  padding: 7px 15px;
  font-size: 12px;
}

.tracker-analyse-console-content{
  display: none;
  width:500px;
  max-width: 100%;
  height: 300px;
  background: #fff;
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%,-50%);
  padding:10px 20px;
  box-sizing: border-box;
}
.tracker-analyse-console-content h4{
  margin: 10px 0;
  font-weight: bold;
}
.tracker-analyse-console-form{
  height: 34px;
  line-height: 34px;
  margin-bottom: 10px;
}
.tracker-analyse-console-form span{
  display: inline-block;
  margin-right: 1em;
}
.tracker-analyse-console-mask{
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.4);
  z-index: 9998;
}
.tracker-analyse-console-input{
  display: inline-block;
      width: 100%;
      max-width: 150px;
      height: 24px;
      line-height: 1.5;
      padding: 4px 7px;
      font-size: 12px;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      color: #515a6e;
      background-color: #fff;
      background-image: none;
      position: relative;
      cursor: text;
  }

  .tracker-analyse-event-hide .tracker-analyse-event,.tracker-analyse-event-hide .tracker-analyse-tooltip{
    display: none!important;
  }
`


class Analyse{
  static instance=null;
  static getInstance() {
      if (!Analyse.instance) {
          Analyse.instance = new Analyse();
      }
      return Analyse.instance;
  }
  style=styleStr;
  data={
    page:[{
      url:"http://0.0.0.0:10002/demo/vue.html",
      pageId:"pid3",
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
        id:2,
      }
    ]
  }

  elements={}

  wrapper = document.createElement('div')

  page=document.createElement('div')

  console=document.createElement('div')

  install(){
    const style=document.createElement('style')
    style.innerHTML=this.style;
    document.head.appendChild(style);
    this.wrapper.className="tracker-analyse-wrapper"
    this.page.className="tracker-analyse-page"
    this.wrapper.innerHTML=`
      <div>
        <button class="tracker-analyse-console-btn">控制台</button>
        <div class="tracker-analyse-console-mask"></div>
        <div class="tracker-analyse-console-content">
          <h4>查询条件:</h4>
          <div class="tracker-analyse-console-form">
            <span>时间:</span><input type="text" class="tracker-analyse-console-input">~
            <input class="tracker-analyse-console-input" type="text">
          </div>
          <button class="tracker-analyse-console-search">查询</button>
          <h4>分析设置:</h4>

          <div class="tracker-analyse-console-form" >
            <span>显示页面埋点信息:</span><input checked class="tracker-analyse-console-input-page" type="checkbox">
          </div>
          <div class="tracker-analyse-console-form">
            <span>显示事件埋点信息:</span><input checked class="tracker-analyse-console-input-event" type="checkbox">
          </div>
          <div class="tracker-analyse-console-form">
            <span>总是显示tooltip:</span><input class="tracker-analyse-console-input-tooltip" type="checkbox">
          </div>
        </div>
      </div>
    `
    const content=this.wrapper.querySelector('.tracker-analyse-console-content')
    const mask=this.wrapper.querySelector('.tracker-analyse-console-mask')
    const btn=this.wrapper.querySelector('.tracker-analyse-console-btn')
    const pageInput=this.wrapper.querySelector('.tracker-analyse-console-input-page');
    const eventInput=this.wrapper.querySelector('.tracker-analyse-console-input-event');
    const tooltipInput=this.wrapper.querySelector('.tracker-analyse-console-input-tooltip');
    this.wrapper.appendChild(this.page)

    mask.onclick=()=>{
      mask.style.display=content.style.display='none'
    }
    btn.onclick=()=>{
      mask.style.display=content.style.display='block'
    }
    pageInput.onchange=(e)=>{
      page.style.display=e.target.checked?'block':'none'
    }
    tooltipInput.onchange=(e)=>{
      window._trackerAnalyseDisableDide=e.target.checked;
      for(let i in this.elements){
        if(e.target.checked){
          this.elements[i].tooltip.show()
        }else{
          this.elements[i].tooltip.hide()
        }
      }

    }

    eventInput.onchange=(e)=>{
      document.body.className=e.target.checked?document.body.className.replace("tracker-analyse-event-hide",''):document.body.className+" tracker-analyse-event-hide"
    }
    document.body.appendChild(this.wrapper)

    this.analyseEvent()
    this.analysePage()
    this.bind(this.analyseEvent)
    if (typeof window.onpopstate === 'undefined') {
      window.addEventListener('hashchange', this.analysePage)
    }
    window.addEventListener('historyPushState', this.analysePage)
    window.addEventListener('historyPopstate', this.analysePage)
  }

  bind(fn){
    fn=debounce(fn,100)
    const cb=(records)=>{
      for(let i in records){
        let result=this.wrapper.compareDocumentPosition(records[i].target)
        if(result===20||result===0){
          return
        }
      }
      fn.call(this)
    }
    const observer = new MutationObserver(cb)
    const body = document.body
    const options = {
      'childList': true,
      'attributes':true,
      subtree:true
    };
    observer.observe(body, options);
  }


  analysePage(){
    const url=location.href
    let pageData=window._trackerPageId?this.data.page.find(item=>item.pageId===window._trackerPageId):null
    if(!pageData){
      pageData=this.data.page.find(item=>item.url===url)
    }
    if(!pageData){
      this.page.innerHTML="当前页面未埋点"
      return
    }

    this.page.innerHTML=`
      pageId:${pageData.pageId}
      url:${pageData.url}
      访问次数:${pageData.count}
    `
  }


  analyseEvent(){
    const url=location.href
    this.data.event.filter(item=>{
      const active=!item.trackId||!window._trackerPageId||item.trackId===window._trackerPageId||item.url===url;
      if(this.elements[item.id]){
        this.elements[item.id].cursor.style.display='none'

      }
      return active
    }).forEach(item=>{
      let element=null;
      if(item.domId){
        element=document.getElementById(item.domId)
      }else{
        element=document.querySelectorAll(item.path)
        element=element.length===1?element[0]:null;
      }
      if(!element||element.style.display==='none'){
        if(this.elements[item.id]){
          this.elements[item.id].tooltip.hide()
          this.elements[item.id].cursor.style.display==='none'
        }
        return
      }




      if(this.elements[item.id]&&this.elements[item.id].el===element){
        this.elements[item.id].cursor.style.display='block'
        this.elements[item.id].tooltip.updateTitleContent(item.count)
        return;
      }

      let cursor=null

      if(this.elements[item.id]){
        this.elements[item.id].tooltip.dispose()
        cursor=this.elements[item.id].cursor
        cursor.style.display='block'
      }else{
        cursor=document.createElement('div');
        cursor.className="tracker-analyse-event"
        cursor.style=`top:${element.offsetTop+element.offsetHeight/2-10}px;left:${element.offsetLeft+element.offsetWidth/2-10}px;`
        cursor.innerHTML=`
        <i></i>
        <i></i>
        <i></i>
        `
        this.wrapper.appendChild(cursor)
      }






      const tooltip=new Tooltip(element, {
          placement: 'top',
          title: item.count,
          trigger: "hover",
          container:document.body,
          popperOptions:{
            onUpdate(e){
              cursor.style=`top:${e.offsets.reference.top+e.offsets.reference.height/2-10}px;left:${e.offsets.reference.left+e.offsets.reference.width/2-10}px;`
            }
          },
          container:this.wrapper,
          html:true,
          template:'<div class="tracker-analyse-tooltip" role="tooltip"><div class="tracker-analyse-tooltip-arrow"></div>点击次数<div class="tracker-analyse-tooltip-inner"></div></div>',
          arrowSelector: '.tracker-analyse-tooltip-arrow',
          innerSelector: '.tracker-analyse-tooltip-inner'

      });

      if(window._trackerAnalyseDisableDide){
        tooltip.show()
      }

      this.elements[item.id]={
        el:element,
        tooltip,
        show:true,
        cursor
      }


    })



  }

}

let instance=Analyse.getInstance();

instance.install()

export default instance
