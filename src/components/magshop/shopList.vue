<style lang="scss" scoped>
  #shoplist{
    width: 100%;
    /*margin: 10px 15% 10px 5%;*/
    /*background-color: coral;*/
 /*   font-size: 18px;*/
    margin: 10px auto;
    text-align: left;
  }
  .shops-list{
   width: 100%;
    float: left;
    text-align: left;
    margin: 10px auto ;
    border: 1px solid gainsboro;
  }
  .shops-list-desc{
    /*border: 1px solid green;*/
    width: 25%;
    float: left;
  }
  .shops-list-hot-show{
    width: 65%;
    float: left;
  }
  .site-clo{
    float: right;
    width: 10%;
    margin: 50px auto;
  }
  /*走马灯*/
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;

  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<template>
  <div id="shoplist">
    <p style="margin-bottom: 10px">全部店铺列表</p>
    <li class="shops-list" > <!--v-for="shop in shops" :key="shop"-->

        <div class="shops-list-desc">
          <router-link to="../currentShop"  class="shop">
            <p class="shops-list-img"><img src="../../assets/zanwu.png" height="150" width="150"></p>
            <p class="shops-list-name">{{ title }}</p>
          </router-link>
          <p class="shops-list-rank">店铺等级：{{rank}}</p>
          <!--添加标签-->
          <div class="shops-list-tag">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              :closable="true"
              :close-transition="false"
              @close="handleClose(tag)"
            >
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

          </div>
        </div>
        <!--店铺热销商品展示-->
         <div class="shops-list-hot-show">
          <P>店铺热销商品展示</P>
          <router-link to="../currentShop">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          </router-link>
        </div>

        <p class="site-clo"><el-button type="primary" @click="cancel(book.bid,book_number)">取消收藏</el-button></p>
    </li>
    <el-col :span="24" class="toolbar">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total" @current-change="handleCurrentChange" :page-size="size"
        style="margin-bottom:50px;float: right">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dynamicTags: ['标签一'],
        inputVisible: false,
        inputValue: '',
        title: '店铺名称',
        rank: '1级',
        shops:[],
        total:50,
        page:4,
        size:10,
      };
    },
    methods: {
      handleCurrentChange(val){
        this.page=val
      },
      cancel(index,row){

      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
      });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>
