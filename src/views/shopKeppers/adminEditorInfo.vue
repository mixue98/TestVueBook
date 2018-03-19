<style lang="scss">
</style>

<template>
  <div id="adminEditorInfo">
    <adminHeader></adminHeader>
    <adminLeftMenu></adminLeftMenu>
         <p>xinxi</p>
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
