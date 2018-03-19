<style lang="scss" scoped>
  .showimg{
   width: 100%;height: 100%;
    background-color: orange;
  }
  ul{
    list-style: none;
  }
  li{
    float: left;
    width: 200px;
    height: 200px;
    border: 1px solid gainsboro;
  }
</style>

<template>
  <div class="showimg">
    <ul>
      <li v-for="item in 10"><router-link to="../"><img src="../../assets/books/b001.jpg" width="" height="" title="" name=""></router-link></li>
      <!--<li><router-link to="../"><img src="../../assets/books/b001.jpg" width="" height="" title="" name=""></router-link></li>
      <li><router-link to="../"><img src="../../assets/books/b001.jpg" width="" height="" title="" name=""></router-link></li>
      <li><router-link to="../"><img src="../../assets/books/b001.jpg" width="" height="" title="" name=""></router-link></li>
      <li><router-link to="../"><img src="../../assets/books/b001.jpg" width="" height="" title="" name=""></router-link></li>
      <li><router-link to="../"><img src="../../assets/books/b001.jpg" width="" height="" title="" name=""></router-link></li>-->
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'showimg',
    data(){
      return{

      }
    },
    methods:{

    },
  }
</script>
