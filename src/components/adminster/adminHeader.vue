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
 /*   padding-right: 12px;*/
  }
  .userinfo-inner{
    cursor: pointer;
    color: #fff;
    /*padding-left: 10px;*/
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
<template>
  <div>
    <el-row class="container">
      <el-col :span="24" class="topbar-wrap">
        <div class="topbar-logo topbar-btn">
          <a href="/"><img src="../../assets/shopkpper/klogo2.png" style="width:42px;margin-top: 5px;"></a>
        </div>
        <div class="topbar-title topbar-btn">
          <span>书城网商家</span>
        </div>
        <div class="topbar-account topbar-btn">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link userinfo-inner"><img src="../../assets/shopkpper/user.png" style="margin-right: 10px" width="16" height="16"> {{sysUserName}} <img src="../../assets/shopkpper/xiala.png" style="margin-right: 10px" ></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link to="/user/profile">个人信息</router-link></el-dropdown-item>
              <el-dropdown-item><router-link :to="'/user/changepwd'">修改密码</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="../admin">退出登录</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        sysUserName: null,
        sysUserAvatar: '',
        collapsed: false,
      }
    },
    mounted(){
      this.getuser()
    },
    methods:{
      getuser(){
        debugger
        let userJsonStr = sessionStorage.getItem('adminUser')
        if (userJsonStr) {
          userJsonStr = JSON.parse(userJsonStr)
          this.sysUserName = userJsonStr.mname
        }
        //this.sysUserName = this.name
      },
    }
  }
</script>
