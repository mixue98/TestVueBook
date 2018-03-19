
<template>
    <div class="pay">
         <h3>{{title}}</h3>
         <comheader></comheader>
         <navmenu></navmenu>
    </div>
</template>

<script>
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
    export default {
        name: 'pay',
        mounted(){

        },
        data(){
        	return {
        		title: '发货'
        	}
        },
        methods: {
            
      },
       components: {
       comheader,
       navmenu
    }
    
  }
</script>
<style lang="scss" scoped>
  
</style>
