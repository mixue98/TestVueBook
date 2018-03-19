<template>
   <div id="comm">
     <comheader></comheader>
     <navmenu></navmenu>
     <banner></banner>
     <comfooter></comfooter>
   </div>
</template>
<script>
  import comheader from '../../components/comheader.vue'
  import comfooter from '../../components/comfooter'
  import showBook from '../../components/showBook.vue'
  import navmenu from '../../components/navmenu.vue'
  import banner from '../../components/banner.vue'
  export default{
    name: 'comm',
    data(){
        return{
        }
    },
    components: {
      comheader,
      comfooter,
      showBook,
      navmenu,
      banner
    }
  }
</script>

<style scoped lang="scss">

</style>
