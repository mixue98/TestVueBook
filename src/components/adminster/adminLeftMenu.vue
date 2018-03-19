<style lang="scss" scoped>
  .textcolor{
    color: white;
  }
  .textcolor:hover{
    color: red;
  }
  .el-menu-vertical-demo{
    width:180px;
    height:600px;
    position:fixed;
    left:0;
    top: 50px;
    color:white;
    background-color:#373d41;
  }
</style>

<template>
  <div>
    <el-row class="">
      <el-col :span="0">
        <el-menu default-active="0" theme="dark" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="1"><i class="el-icon-setting"></i><router-link class="textcolor" to="../adminHome">首页</router-link></el-menu-item>
          <el-menu-item index="2"><i class="el-icon-menu"></i><router-link class="textcolor" to="../manageBook">图书管理</router-link></el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i><router-link class="textcolor" to="../manageOrder">订单管理</router-link></el-menu-item>
          <el-menu-item index="4"><i class="el-icon-setting"></i><router-link class="textcolor" to="../adminManageEvaluate">评价管理</router-link></el-menu-item>
          <el-menu-item index="5"><i class="el-icon-setting"></i><router-link class="textcolor" to="../adminEditorInfo">编辑资料</router-link></el-menu-item>
        </el-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>

</template>

<script></script>
