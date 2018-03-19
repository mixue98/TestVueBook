<style lang="scss" scoped>
  .footer {
    height: 50px;
    width: 100%;
    border-top: 2px solid #ccc;
    margin-bottom: 0px;
    
  }
  /* .footer-cont li {

    float: left;
    width: 25%;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    color: #303030;
    text-align: center;
    a{
      color:#303030;
    }
    a:hover{
      color:red;
    }
  }
  .footer-cont li:active {
    background-color: #ccc;
  }
  .footer-cont:after {
    content: '';
    display: block;
    clear: both;
    width: 0;
    height: 0;
  } */
  #copyright{
    margin:0px auto;
    line-height:50px;
  }
</style>

<template>
  <div class="footer">
 <!--  <h4>尾部</h4> -->
   <!-- <ul class="footer-cont">  
      <li><a href="#" target="_blank">公司简介</a><span>|</span></li>
      <li><a href="#" target="_blank">联系我们</a><span>|</span></li>
      <li><a href="#" target="_blank">官方blog</a><span>|</span></li>
      <li><a href="#" target="_blank">诚聘英才</a></li>
   </ul>  -->
     <p id="copyright">Copyright (C) 书城网 2017, All Rights Reserved</p>
  </div>
</template>

<script>
  export default {
    name: 'footer'
  }
</script>
