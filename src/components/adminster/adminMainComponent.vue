<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../../assets/shopkpper/klogo2.png" style="width:42px;margin-top: 5px;"></a>
      </div>
      <div class="topbar-title topbar-btn">
        <span>书城网商家</span>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i><img src="../../assets/shopkpper/user.png" width="16" height="16"> {{sysUserName}} <img src="../../assets/shopkpper/xiala.png" > <i class="iconfont icon-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link to="/user/profile">个人信息</router-link></el-dropdown-item>
            <el-dropdown-item><router-link :to="'/user/changepwd'">修改密码</router-link></el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i><img src="../../assets/shopkpper/left_suo.png" v-show="!collapsed" width="16" height="16">
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i><img src="../../assets/shopkpper/right_suo.png" v-show="collapsed" width="16" height="16">
        </div>
      </aside>
      <el-col :span="0">
        <el-menu default-active="0" theme="dark" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="1"><i class="el-icon-setting"></i><router-link class="textcolor" to="../adminHome">首页</router-link></el-menu-item>
          <el-menu-item index="2"><i class="el-icon-menu"></i><router-link class="textcolor" to="../manageBook">图书管理</router-link></el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i><router-link class="textcolor" to="../adminManageOrder">订单管理</router-link></el-menu-item>
          <el-menu-item index="4"><i class="el-icon-setting"></i><router-link class="textcolor" to="../adminManageEvaluate">评价管理</router-link></el-menu-item>
          <el-menu-item index="5"><i class="el-icon-setting"></i><router-link class="textcolor" to="../adminEditorInfo">编辑资料</router-link></el-menu-item>
        </el-menu>
        </el-menu>
      </el-col>
      <!--右侧内容区-->
      <!--<section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
              &lt;!&ndash;<manageBook></manageBook>&ndash;&gt;
              <manageOrder></manageOrder>
            </transition>
          </el-col>
        </div>
      </section>-->
    </el-col>
  </el-row>
</template>
<script>
  import { bus } from '../../utils/bus'
  export default {
    name: 'home',
    created(){
      bus.$on('setUserName', (text) => {
        this.sysUserName = text;
    })
    },
    data () {
      return {
        sysUserName: '用户名',
        sysUserAvatar: '',
        collapsed: false,
      }
    },
    components:{
    },
    methods: {
      handleOpen() {
        },
      handleClose() {
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      logout(){
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('access-user');
        _this.$router.push('/login');
      }).catch(() => {

        });
      }
    },
    mounted() {
      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
      }
    }
  }
</script>


<style>
  .el-menu-item, .el-submenu__title {
    color: #fff;
  }
  .el-submenu__title:hover {
    background-color: #00C1DE;
  }
  .el-submenu .el-menu-item {
    width: 180px;
    background-color: #333744
  }
  .el-submenu .el-menu-item:hover {
    background-color: #4A5064
  }
  .el-submenu .el-menu-item.is-active, .el-menu-item.is-active,
  .el-submenu .el-menu-item.is-active:hover, .el-menu-item.is-active:hover {
    background-color: #00C1DE;
    color: #fff;
  }
  .el-menu .iconfont{
    vertical-align: baseline;
    margin-right: 6px;
  }

  .warp-breadcrum{
    padding: 10px 0px;
    border-bottom: 1px solid #efefef;
  }
  .warp-main{
    padding-top: 20px;
  }
  /*ziji*/
  .icon-user{
    background: url("../../assets/shopkpper/user.png") no-repeat center;
    width: 32px;
    height: 32px;
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
  .shezhi{
    color:white;
    width:180px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

  .topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0px;

  .topbar-btn {
    color: #fff;
  }
  .topbar-btn:hover {
    background-color: #4A5064;
  }
  .topbar-logo {
    float: left;
    text-align: center;
    width: 49px;
    border-right: 1px solid #000;
    line-height: 26px;
  }
  .topbar-title {
    float: left;
    text-align: center;
    width: 129px;
    border-right: 1px solid #000;
  }
  .topbar-account {
    float: right;
    padding-right: 12px;
  }
  .userinfo-inner{
    cursor: pointer;
    color: #fff;
    padding-left: 10px;
  }
  }
  .main {
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0px;
    overflow: hidden;
  }
  aside {
    flex: 0 0 180px;
    width: 180px;
  .el-menu {
    height: 100%;
    border-radius: 0px;
    background-color: #333744;
  }
  .collapsed {
    width: 50px;
  .submenu {
    position: absolute;
    top: 0px;
    left: 50px;
    z-index: 9999;
    height: auto;
    display: none;
  }
  }
  }
  .menu-collapsed {
    flex: 0 0 50px;
    width: 50px;
  }
  .menu-expanded {
    flex: 0 0 180px;
    width: 180px;
  }
  .menu-toggle {
    background: #4A5064;
    text-align: center;
    color: white;
    height: 26px;
    line-height: 30px;
  }
  .content-container {
    background: #fff;
    flex: 1;
    overflow-y: auto;
    padding: 10px;

  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }
  }
  }
  .textcolor{
    color: white;
  }
  .textcolor:hover{
    color: red;
  }
</style>
