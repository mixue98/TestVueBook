

<template>
  <div id="tabs2">
    <ul class="menu0" id="menu0">
      <li @click="setTab(0,0)" class="hover">店铺</li>
      <!--<li @click="setTab(0,1)">童书</li>
      <li @click="setTab(0,2)">教育</li>
      <li @click="setTab(0,3)">文学</li>-->
    </ul>
    <div class="main" id="main0">
      <ul class="block"><li>全部DAINPU收藏内容</li></ul>
     <!-- <ul><li>童书收藏</li></ul>
      <ul><li>教育1</li></ul>
      <ul><li>文学2</li></ul>-->
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },

    mounted:{
    },
    components: {

    },
    methods: {
      setTab(m,n){
        debugger;
        var tli=document.getElementById("menu"+m).getElementsByTagName("li");
        var mli=document.getElementById("main"+m).getElementsByTagName("ul");
        for(let i=0;i<tli.length;i++){
          tli[i].className=i==n?"hover":"";
          mli[i].style.display=i==n?"block":"none";
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
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
    /* padding:8px;*/
    text-align:center;
  }

  #tabs2 {
    min-height: 200px;
    width: 100%;
    /*border: 1px solid #cb1c40;*/
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
