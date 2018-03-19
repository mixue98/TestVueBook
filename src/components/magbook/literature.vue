<template>
  <div id="literature">
	 <p>{{title}}</p>
	  <comheader></comheader>
    <navmenu></navmenu>
  </div>
</template>


<script>
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'

  export default{
    name: 'literature',
    data(){
        return{
          title:'文学读物'
        }
    },
     components: {
       comheader,
       navmenu
    }
  }
</script>

<style scoped>
#manager{
  border: 1px solid red;
  width: 80%;height: 50px;
  margin: 10% auto;
}
.addbook{
  color: red;
}
 .bookimg {
    height: 200px;
  }
  .text{
    text-align: center;
  }
  .listContainer {
    padding-top: 30px;
  }
</style>
