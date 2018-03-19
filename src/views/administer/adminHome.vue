<style lang="scss">
  .main{
    border: 1px solid red;
    margin: 80px 0 0 200px;
  }
</style>

<template>
  <div id="adminEditorInfo">
    <adminHeader></adminHeader>
    <adminLeftMenu></adminLeftMenu>
    <div class="main">
      <p>home</p>
    </div>
  </div>
</template>

<script>
  import adminLeftMenu from '../../components/adminster/adminLeftMenu.vue'
  import adminHeader from '../../components/adminster/adminHeader.vue'
  import adminMainComponent from '../../components/adminster/adminMainComponent.vue'
  export default {
    name: 'adminEditorInfo',
    mounted(){

    },
    data(){
      return{

      }
    },
    methods:{

    },
    components:{
      adminMainComponent,
      adminHeader,
      adminLeftMenu
    }
  }
</script>
