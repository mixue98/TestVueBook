<template>
   <div id="banner">
	    <el-carousel indicator-position="outside">
		    <el-carousel-item v-for="item in 4" :key="item">
		        <router-link to="../activity"><h3>{{ item }}</h3></router-link>
		    </el-carousel-item>
        </el-carousel>
   </div>

</template>

<script>
  export default{
    name: 'banner',
    data(){
        return{
        }
    }  }
</script>

<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-of-type(1){
  	cursor:pointer;
     /*background:url('../assets/banner001.jpg') no-repeat center;*/
    background:url('../assets/index/banner01.png') no-repeat center;
   background-size: 100% 100%;
  }
  .el-carousel__item:nth-of-type(2) {
  	cursor:pointer;
    /*background:url('../assets/banner002.jpg') no-repeat center;*/
    background:url('../assets/index/banner02.png') no-repeat center;
    background-size: 100% 100%;
  }

  .el-carousel__item:nth-of-type(3){
  	cursor:pointer;
    /*background:url('../assets/banner03.jpg') no-repeat center;*/
    background:url('../assets/index/banner03.png') no-repeat center;
    background-size: 100% 100%;
  }
  .el-carousel__item:nth-of-type(4){
  	cursor:pointer;
    background:url('../assets/index/banner04.png') no-repeat center;
    background-size: 100% 100%;
  }
</style>
