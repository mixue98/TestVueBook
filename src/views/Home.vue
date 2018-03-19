<template>
  <div id="home">
    <comheader></comheader>
    <comsearch></comsearch>
    <navigation></navigation>
    <navmenu></navmenu>
    <banner></banner>
    <showBook></showBook>
    <!--<backtop></backtop>-->
    <backtoTop></backtoTop>
    <hotRecoment></hotRecoment>
    <comfooter></comfooter>

</div>
</template>

<script>
 import comheader from '../components/comheader.vue'
 import comfooter from '../components/comfooter'
 import showBook from '../components/showBook.vue'
 import navmenu from '../components/navmenu.vue'
 import banner from '../components/banner.vue'
 import comsearch from '../components/comm/comsearch.vue'
 import navigation from '../components/comm/navigation.vue'
 import hotRecoment from '../components/comm/hotRecoment.vue'
 import backtop from '../components/comm/backTop.vue'
 import backtoTop from '../components/comm/backtoTop.vue'

  export default {
    name: 'home',
    components: {
      comsearch,
      comheader,
      comfooter,
      showBook,
      navmenu,
      banner,
      navigation,
      hotRecoment,
      backtop,
      backtoTop
    }
    /*computed: {
      author () {
        return this.$store.state.author
      }
    }*/
  }
</script>

<style scoped style='scss'>
</style>
