import {ACTION_TYPE} from "../constant"

class User{
  userInfo={
    userId:null,
    // userMobile:null,
    // userAge:null
  }
  static instance=null;
  static getInstance() {
      if (!User.instance) {
          User.instance = new User();
      }
      return User.instance;
  }

  export function login(info){
    if(typeof info==='object'&&info){
      this.userInfo={...this.userInfo,...info};
    }else{
      this.userInfo.userId=info;
    }
  }

  export function logout(){
    this.userInfo.userId=null;
  }

  export function getIdentify(){

  }

  export function changeIdentify(){

  }


}

let instance=User.getInstance();

export default instance
