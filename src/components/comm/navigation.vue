<style lang="scss">
  #navigation{
    width: 100%;
    height: 45px;
    margin: 0 auto;
    /*border: 1px solid green;*/
  }
  .con-ul{
    list-style: none;
    width: 100%;
    height: 100%;
    /*background-color: green;*/
 background: -webkit-gradient(linear,0% 0%, 100% 0%, from(#0D4709), to(#256E18), color-stop(0.7,#5DBA00));
    line-height: 45px;
    color: white;
    font-weight: bold;
  >li{
     float: left;
     color: white;
     text-align: center;
     width: 150px;
    height: 100%;
   }
  li:hover{
    background-color: rgba(179, 255, 147, 0.77);
  }
  li:nth-child(1){
    margin-left: 13%;
    color: white;
    background-color: black;
  }
  .con-ul-link{
    color: white;
  }
  }
</style>

<template>
  <div id="navigation">
    <ul class="con-ul">
      <li class="con-ul-link">

          <el-dropdown >
              <span class="el-dropdown-link" style="color: white;">
                下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>
             </span>
            <el-dropdown-menu slot="dropdown"  style="width: 150px;margin-left:13%;background:rgba(125, 225, 125, 0.5);">
              <el-dropdown-item>畅销榜</el-dropdown-item>
              <el-dropdown-item>新书榜</el-dropdown-item>
              <el-dropdown-item>热销榜</el-dropdown-item>
              <el-dropdown-item>飙升榜</el-dropdown-item>
              <el-dropdown-item>五星图书榜</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </li>
      <li><router-link to="../" class="con-ul-link">图书</router-link></li>
      <li><router-link to="../" class="con-ul-link">电子书</router-link></li>
      <li><router-link to="../" class="con-ul-link">网络文学</router-link></li>
      <li><router-link to="../" class="con-ul-link">文具</router-link></li>
      <li><router-link to="../" class="con-ul-link">礼品卡</router-link></li>
      <li><router-link to="../" class="con-ul-link">专题页</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'navigation',
    data(){
      return{

      }
    },
    components:{

    },

  }
</script>
