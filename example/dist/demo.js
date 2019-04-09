(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("demo", [], factory);
	else if(typeof exports === 'object')
		exports["demo"] = factory();
	else
		root["demo"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//time project pageid
var data = {
  page: [{
    url: "www",
    pageId: "123",
    count: 1212
  }],
  event: [{
    url: "http://0.0.0.0:10002/demo/vue.html",
    name: "CLICK",
    pageId: "pid3",
    trackId: "asd",
    domPath: "div",
    domId: "aaa",
    count: 1233,
    id: 1
  }, {
    url: "http://0.0.0.0:10002/demo/vue.html",
    name: "CLICK",
    pageId: "pid3",
    trackId: "asd",
    domPath: "div",
    domId: "bbb",
    count: 1233,
    id: 1
  }]
};

var elements = {};

install();

function install() {
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


  bind(analyseChange);
}

function analyseChange(e) {
  var url = location.href;
  data.event.filter(function (item) {
    return !item.trackId || !_trackerPageId || item.trackId === _trackerPageId || item.url === url;
  }).forEach(function (item) {
    var element = null;
    if (item.domId) {
      element = document.getElementById(item.domId);
    } else {
      element = document.querySelectorAll(item.path);
      element = element.length === 1 ? element[0] : null;
    }
    if (!element) {
      return;
    }
    elements[item.id] = element;
  });
}

function bind(cb) {
  var observer = new MutationObserver(cb);
  var body = document.body;
  var options = {
    'childList': true,
    'attributes': true,
    subtree: true
  };
  observer.observe(body, options);
}

var EventEffect = function EventEffect() {
  _classCallCheck(this, EventEffect);
};

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

/***/ })
/******/ ]);
});
//# sourceMappingURL=demo.js.map