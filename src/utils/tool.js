
import Vue from 'vue'

var func = {
   GetUser(){
          let userJsonStr = sessionStorage.getItem('user')
          	if(userJsonStr){
          		userJsonStr=JSON.parse(userJsonStr)
          		//this.name=userJsonStr.cname
          	}

   }
}


export default func