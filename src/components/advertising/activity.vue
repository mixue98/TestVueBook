<template>
   <div id="activity">
        <h3>{{title}}</h3>
        <navmenu></navmenu>
        <comheader></comheader>
   </div>

</template>

<script>
import comheader from '../../components/comheader'
import navmenu from '../../components/navmenu.vue'
  export default {
  	name: 'activity',
  	data(){
  		return{
  			title: '活动结束'
  		}
  	},
    components: {
      navmenu,
      comheader
    }

  }
</script>

<style scoped>
</style>
