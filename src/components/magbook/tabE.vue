<template>
  <div id="tabs0">
    <ul class="menu0" id="menu0">
      <li @click="setTab(0,0)" class="hover">全部</li>
      <li @click="setTab(0,1)">好评</li>
      <li @click="setTab(0,2)">中评</li>
      <li @click="setTab(0,3)">差评</li>
    </ul>
    <div class="main" id="main0">
      <ul class="block">
        <li>
          全部评论
          <el-col :span="24">
            <li v-for="item in 5" class="comment_list">
              <div class="efl">
                <p>头像</p>
                <p>昵称</p>
              </div>
              <div class="efc">
                <p>打分</p>
                <p>评语</p>
                <p>图片</p>
                <p>时间</p>
              </div>
              <div class="efr">
                <p>举报</p>
                <p>点赞</p>
                <p>回复</p>
              </div>
            </li>
          </el-col>
        </li>
      </ul>
      <ul><li>好评列表</li></ul>
      <ul><li>中评列表</li></ul>
      <ul><li>差评列表</li></ul>
    </div>
  </div>
</template>
<script>
  import {findComment} from '../../api/account.js'
  export default {
    mounted:{
    },
    data () {
      return {
      }
    },
    components: {

    },
    methods: {
    	 getEvaluate(){
        //获取bid
        //那边要存bid
         let para={
           bid:this.bid
         }
        findComment(para).then((res)=>{

        }).catch ((res)=>{
          this.$message({message:"异常",duration:1500})
        })

      },
      setTab(m,n){
        debugger;
          var tli=document.getElementById("menu"+m).getElementsByTagName("li");
          var mli=document.getElementById("main"+m).getElementsByTagName("ul");
          for(let i=0;i<tli.length;i++){
            tli[i].className=i==n?"hover":"";
            mli[i].style.display=i==n?"block":"none";
          }
      },
      addCart: function(){
        //状态加1
      },
      collectGoods(){

      },
      collectShop(){

      },
      buyNow(){

      },
      GoodsDetail(){

      },
      GoodsEvaluate(){

      },
      comeInShop(){

      },
      supportGiftCard(){

      },
    }
  }
</script>
<style lang="scss" scoped>
  .efl{
    width: 20%;
    background-color: #8097f9;
    float: left;
  }
  .efc{
    width: 50%;
    float: left;
    background-color: #9fff33;
  }
  .efr{
    float: left;
    width: 20%;
    background-color: antiquewhite;
  }
  .comment_list{
    width: 100%;
    border: 1px solid red;
    margin: 10px 10px;
  }
  body{
    font:12px "宋体";
    text-align:center;
  }
  a:link{
    color:#00F;
    text-decoration:none;
  }
  a:visited {
    color: #00F;
    text-decoration:none;
  }
  a:hover {
    color: #c00;
    text-decoration:none;
  }
  ul{
    list-style:none;
  }
  .main{
    clear:both;
    padding:8px;
    text-align:center;
  }

  #tabs0 {
    min-height: 200px;
    width: 100%;
    border: 1px solid #cbcbcb;
    background-color: #f2f6fb;
  }
  .menu0{
    width: 100%;
  }
  .menu0 li{
    display:block;
    float: left;
    padding: 4px 0;
    width:25%;
    text-align: center;
    cursor:pointer;
    background: #FFFFff;
  }
  .menu0 li.hover{
    background: #f2f6fb;
  }
  #main0 ul{
    display: none;
  }
  #main0 ul.block{
    display: block;
  }
</style>
