<style lang="scss" scoped>
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
    padding:8px 0px;
    text-align:center;
  }
  #tabs1{
    /*text-align:left;*/
    width: 80%;
    margin: 10px 10%;
    /*width:400px;*/
  }
  .menu1box{
    position:relative;
    overflow:hidden;
    height:40px;
    line-height: 40px;

    width: 100%;
    background-color: gainsboro;
    text-align:left;
  }
  #menu1{
    position:absolute;
    top:0;
    left:0;
    z-index:1;
  }
  #menu1 li{
    float:left;
    display:block;
    cursor:pointer;
    width:100px;
    text-align:center;
    line-height:40px;
    height:40px;
  }
  #menu1 li.hover{
    background:#fff;
    border-left:1px solid gainsboro;
    border-top:1px solid gainsboro;
    border-right:1px solid gainsboro;
    /*color: red;*/
    font-weight: bold;
  }
  .main1box{
    clear:both;
    margin-top:-1px;
    border:1px solid gainsboro;
    min-height: 500px;
    width: 100%;
  }
  #main1 ul{
    display: none;
  }
  #main1 ul.block{
    display: block;
    width: 100%;
  }
  .main-ba1{
    float: left;
    width: 19%;
    height: 220px;
    border: 1px solid gainsboro;

    /*border-top:1px solid gainsboro;*/
   /* border-right:1px solid gainsboro;*/
  }
  .main-ul{
    width: 100%;
    height: 100%;
    background-color: #8097f9;
    /*border: 1px solid gainsboro;*/
    /*background-color: orange;*/
  }
  .main-ul li:last-child{
   /* border-right: 1px solid gainsboro;*/
  }
  .main-left{
    width: 20%;
    background-color:lavenderblush;
    float: left;
    height: 100%
  }
  .main-right{
    float: left;
    width: 80%;
    /*background-color: lemonchiffon;*/
    /*height: 100%;*/
    height: 100%
  }
  .main-left-top{
    width: 100%;
    float: left;
    text-align: left;
    height: 60%;
    background-color: gainsboro;
    img{
      width: 100%;

    }
  }
  .main-left-bottom{
    width: 100%;
    height: 40%;
    background-color: oldlace;
  }
  .lba{
    float: left;
    width: 20%;
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
  }
  .main-ba2{
    float: left;
    width: 19%;
    height: 220px;
    border: 1px solid gainsboro;

  }
</style>
<template>
  <div id="tabs1">
    <div class="menu1box">
      <ul id="menu1">
        <li class="hover" @click="setTab(1,0)">最新上架</li>
        <li @click="setTab(1,1)">独家畅品</li>
        <li @click="setTab(1,2)">重点推荐</li>
        <li @click="setTab(1,3)">网络文学</li>
      </ul>
    </div>
    <div class="main1box">
      <div class="main" id="main1">
        <ul class="block">
          <li>
            <div class="main-ul">
              <li v-for="item in 10" class="main-ba1"><router-link to="../bookdetail"><img src="../../assets/books/b001.jpg"></router-link></li>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div class="main-ul">
              <li v-for="item in 10" class="main-ba1"><router-link to="../bookdetail"><img src="../../assets/books/b002.jpg" width="150" height="150"></router-link></li>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div class="main-left">
              <div class="main-left-top">
                <img src="../../assets/books/g001.jpg" width="" height="341">
              </div>
              <div class="main-left-bottom">
                  <li class="lba" v-for="item2 in 12"><router-link to="">{{lbname}}</router-link></li>
              </div>
            </div>
            <div class="main-right">
              <li v-for="item in 10" class="main-ba2"><router-link to="../bookdetail"><img src="../../assets/books/b003.jpg" width="150" height="150"></router-link></li>
            </div>
          </li>
        </ul>
        <ul><li>444444444444444444444</li></ul>
      </div>
    </div>
  </div>
</template>

<script>
  import showHotReco from '../../components/comm/showHotReco.vue'
  export default {
    data(){
      return{
        lbname: '童书'
      }
    },
    components:{
      showHotReco,
    },
    methods:{
      setTab(m,n){
        console.log(1)
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
