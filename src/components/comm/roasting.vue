<style lang="scss" scoped>
  .shell{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
/*    margin: 50px auto;*/
    background-color: #fff;
    overflow: hidden;
    position: relative;
  }
  .gallery{
    width: 100%;
    /*height: 300px;*/
    float: left;
    /*border: 1px solid red;*/
    /*margin-right:5px ;*/
    position: relative;
  }
  /*.content{
    float: left;
    width: 800px;
    border: 1px solid green;
    height: 400px;
  }*/
  .min-gallery{
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: 400px;
    height: 80px;
    border: 1px solid green ;
  }

  .el-carousel__indicators--outside{
    margin-top: 20px;
    height: 80px;
    border: 1px solid teal;
  }

  /*蒙版*/
  #gallery-mask{
    width: 175px;
    height: 175px;
    background: #9ABCF2;
    opacity: 0.5;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 10;
    /*display: none;*/
  }
  .el-carousel__item img{
    background-size: 300px 300px;
  }
  #max-gallery{
    width: 400px;
    height: 300px;
    border: 1px solid red;
    position: absolute;
    /*left: 420px;*/
    top: 10px;
    overflow: hidden;
    /*display: none;*/
  }
  .el-carousel__indicators--outside button{
    width: 78px;
    height:78px;
    background: url(../../assets/books/roasting/r001.jpg) 0px 0px no-repeat;
    background-size: 80px 80px;
    opacity: 1;
    box-sizing: border-box;
  }
  .el-carousel__indicator{
    padding: 0px;
    margin:0px 5px;
    box-sizing: border-box;
  }
  .el-carousel__indicator.is-active{
    border: 1px solid red;
  }
  .el-carousel{
    overflow-y:hidden ;
  }
  #max-gallery img{
    position:absolute;
    left: 0px;
    top: 0px;
  }
</style>

<template>
    <div class="shell">
      <div class="gallery">
        <el-carousel height="300px" :autoplay="false" arrow="never" indicator-position="outside">
          <el-carousel-item v-for="item in Gallery" :key="item">
            <img :src="item.src" @mouseenter.stop="enter($event.target),isshow()" @mousemove.stop="move($event)" @mouseleave.stop="leave()"/>
          </el-carousel-item>
        </el-carousel>
        <p id="gallery-mask" @mouseenter.stop="isshow()" @mousemove.stop="move($event)" @mouseleave.stop="leave()" v-show = "istrue" v-bind:style="{top:maskTop +'px' , left:maskLeft +'px'}"></p>
      </div>
      <div id="max-gallery"  v-show = "istrue">
        <img :src="Gallery[max_index].maximg"  v-bind:style="{top:-maxTop +'px' , left: -maxLeft +'px'}"/>
      </div>
    <!--  <div class="content">
        &lt;!&ndash;<img src="../../assets/books/roasting/r001.jpg"/>&ndash;&gt;
      </div>-->
    </div>
</template>

<script>
  export default {
    name: 'shell',
    data(){
      return {
            Gallery:[
              {
                src:"http://img3m8.ddimg.cn/92/3/23464478-3_w_1.jpg",
                minimg:"http://gd1.alicdn.com/imgextra/i4/1998529822/TB2p7NtoXXXXXabXXXXXXXXXXXX_!!1998529822.jpg_80x80.jpg_.webp",
                maximg:"http://gd1.alicdn.com/imgextra/i4/1998529822/TB2p7NtoXXXXXabXXXXXXXXXXXX_!!1998529822.jpg_800x800.jpg_.webp"
              },
              {
                src:"http://img3m8.ddimg.cn/92/3/23464478-4_w_1.jpg",
                minimg:"https://gd1.alicdn.com/imgextra/i8/TB1dPdTJVXXXXXvXFXXYXGcGpXX_M2.SS2_80x80.jpg",
                maximg:"https://gd1.alicdn.com/imgextra/i8/TB1dPdTJVXXXXXvXFXXYXGcGpXX_M2.SS2_800x800.jpg_.webp"
              },
              {
                src:"http://img3m8.ddimg.cn/92/3/23464478-5_w_3.jpg",
                minimg:"http://gd1.alicdn.com/imgextra/i3/TB13lVLJVXXXXXbXVXXYXGcGpXX_M2.SS2_80x80.jpg",
                maximg:"https://gd1.alicdn.com/imgextra/i3/TB13lVLJVXXXXXbXVXXYXGcGpXX_M2.SS2_800x800.jpg_.webp"
              },
              {
                src:"http://img3m8.ddimg.cn/92/3/23464478-1_w_5.jpg",
                minimg:"http://img.alicdn.com/bao/uploaded/i1/TB1SXWWPpXXXXavXXXXXXXXXXXX_!!0-item_pic.jpg_80x80q90.jpg",
                maximg:"https://img.alicdn.com/bao/uploaded/i1/TB1SXWWPpXXXXavXXXXXXXXXXXX_!!0-item_pic.jpg_800x800q90.jpg"
              }
            ],
            max_index : 0 ,
            maxLeft : 0 ,
            maxTop : 0 ,
            maskLeft : 0,
            maskTop : 0,
            istrue : false
          }
    },
    mounted :function(){
      var vm=this;
      (function minimg(){
        var btns=document.getElementsByClassName("el-carousel__button");
        //给btn的背景赋值
        setTimeout(function(){
          for(var i = 0;i < btns.length;i++){
            btns[i].style.background="url("+vm.Gallery[i].minimg+")";
          }
        })
      })();
    },
    methods:{
      isshow:function(){
        this.istrue = true ;
      },
      enter:function(target){
        this.max_index=$(target).parent().index();
      },
      move:function(ev){
//					debugger;
        var vm=this;
        var min_box = document.getElementsByClassName('gallery')[0];
        var max_box = document.querySelectorAll("#max-gallery img")[0];
        var Mask = document.getElementById('gallery-mask');
        var e=ev||window.event;
        var MaskW=e.clientX-vm.offset(min_box).left-Mask.offsetWidth/2;
        var MaskH=e.clientY-vm.offset(min_box).top-Mask.offsetHeight/2;
        var MaskT=min_box.offsetHeight-Mask.offsetHeight;
        var MaskL=min_box.offsetWidth-Mask.offsetWidth;
        if (MaskW<0) {
          MaskW=0;
        }else if (MaskW>=MaskL) {
          MaskW=MaskL;
        }
        if (MaskH<0) {
          MaskH=0;
        }else if(MaskH>=MaskT){
          MaskH=MaskT;
        }
        vm.maskLeft=MaskW;
        vm.maskTop=MaskH;
        var bili=max_box.offsetWidth/(min_box.offsetWidth+vm.offset(min_box).top);
        vm.maxLeft = MaskW*bili;
        vm.maxTop = MaskH*bili;
      },
      leave:function(){
        this.istrue = false ;
      },
      offset:function (obj){
//					debugger;
        var i=0,j=0;
        while (obj){
          i+=obj.offsetLeft;
          j+=obj.offsetTop;
          obj=obj.offsetParent;
        }
        return{left:i,top:j};
      }
    }

}
</script>
