<template>
<div id="left">

  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-more"></i>
      <span slot="title">图书</span>
    </template>
    <el-menu-item-group>
      <span slot="title">搜索</span>
      <el-menu-item index="1-2"><router-link to="../childBook">童书</router-link></el-menu-item>
      <el-menu-item index="1-2"><router-link to="../education">教育</router-link></el-menu-item>
      <el-menu-item index="1-3"><router-link to="../literature">文学</router-link></el-menu-item>
    </el-menu-item-group>
  </el-submenu>


  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title"><router-link to="../shopcart">购物车</router-link></span>
  </el-menu-item>

  <el-menu-item index="3">
    <i class="el-icon-star-on"></i>
    <span slot="title"><router-link to="../myOrder">我的订单</router-link></span>
  </el-menu-item>

  <el-menu-item index="4">
    <i class="el-icon-star-on"></i>
    <span slot="title"><router-link to="../myCollect">我的收藏</router-link></span>
  </el-menu-item>

  <el-submenu index="4">
    <template slot="title">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="4-1"><router-link to="../information">个人信息</router-link></el-menu-item>
      <el-menu-item index="4-2"><router-link to="../changePass">修改密码</router-link></el-menu-item>
      <el-menu-item index="4-2"><router-link to="../address">我的地址</router-link></el-menu-item>
      <el-menu-item index="4-2"><router-link to="../AccountSecurity">账号安全</router-link></el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>


</div>
</template>


<style>
a:link{color:black;}
a:active{color:#ff0000;}
a:visited{color:black;}
a:hover{color:red;}
.el-menu-vertical-demo{
  /*background: rgb(100,200,100,.5);*/
  /*background-color: green;*/
  /*border: 1px solid red*/
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  #left{
    height: 400px;
    width:150px;
    position: fixed;
    left: 10px;
    top:60px;
    z-index: 10000;
    /*border: 1px solid red;
    background-color: rgba(9, 174, 70, 0.5);*/
  }
</style>

<script>
 import {mapGetters} from 'vuex'
export default {
    data() {
      return {
        isCollapse: true
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
 //var Ctor = Vue.extend(Main)
// new Ctor().$mount('#left')
</script>
