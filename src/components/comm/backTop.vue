<style lang="scss">
  #backtop{
    position: fixed;
    z-index: 1000;
    right: 50px;
    bottom: 150px;
    border: 1px solid gainsboro;
    width: 50px; height: 50px;
    background: url("../../assets/samll/backtop.png") no-repeat center;
  }
</style>

<template>
  <div id="backtop" @click="backtop" v-show="showtop">
    <!--<img src="../../assets/samll/backtop.png">-->
  </div>
</template>

<script>
  export default {
    name: 'backtop',
    data(){
      return{
        showtop: true

      }
    },
    methods:{

      backtop(){
        /*this.animation({backtop},300)*/
        var stop=document.body || document.documentElement
        if(document.documentElement.scrollTop + document.body.scrollTop > 100){
           this.showtop=true
        }else {
          this.showtop=false
        }

        stop.scrollTop = 0
      }
    }
  }
</script>
