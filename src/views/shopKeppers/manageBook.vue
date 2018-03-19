<style  lang="scss">
#MBook{
}
.demo-table-expand label {
  font-weight: bold;
}
  .tf{
    text-align: left;
    text-overflow:ellipsis;
  }
  .warp{
    margin: 80px 0 0 200px;
  }
</style>

<template>
  <div id="MBook">
    <adminHeader></adminHeader>
    <adminLeftMenu></adminLeftMenu>
    <el-row class="warp">
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/adminHome' }"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>图书管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="24" class="warp-main">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;float: left;margin-left: 0;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.name" placeholder="书名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="SearchGoods">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="showAddDialog">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="books" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;" class="tf">
	        <el-table-column type="selection" width="55"></el-table-column>
	        <el-table-column type="index" width="60"></el-table-column>

	        <el-table-column prop="bid" label="书编号" width="120"  sortable ></el-table-column>
	        <el-table-column prop="bname" label="书名" width="120" sortable ></el-table-column>
	        <el-table-column prop="bauthor" label="作者" width="120"sortable></el-table-column>
            <el-table-column prop="bprice" label="价格" width="120" sortable></el-table-column>
	        <el-table-column prop="bstock" label="库存" width="120" sortable></el-table-column>
	        <el-table-column prop="bpress" label="出版社" width="120" sortable></el-table-column>
	        <el-table-column prop="bpage" label="总页数" width="120" sortable></el-table-column>
	        <el-table-column prop="bphoto" label="照片" width="120" sortable></el-table-column>
	        <el-table-column prop="bclassify" label="分类" width="120" sortable></el-table-column>
	        <el-table-column prop="bdate" label="出版日期" width="150" sortable></el-table-column>
	        <el-table-column prop="bintro" label="简介" width="150" max-height="50" sortable></el-table-column>
            <el-table-column label="操作" fixed="right" width="150" >
            <template scope="scope">
              <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
              <el-button type="danger" @click="delBook(scope.$index,scope.row)" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar" >
        <!--  <el-button type="danger" class="tf"  @click="batchDeleteBook" :disabled="this.sels.length===0">批量删除</el-button>-->
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="total"
                         style="float:right;">
          </el-pagination>
        </el-col>
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
          <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
             <el-form-item label="书名" prop="bname">
              <el-input v-model="editForm.bname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="bauthor">
              <el-input v-model="editForm.bauthor" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="bpress">
              <el-input  v-model="editForm.bpress" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="bprice">
              <el-input  v-model="editForm.bprice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="editForm.bdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="页数" prop="bpage">
              <el-input  v-model="editForm.bpage" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="bstock">
              <el-input  v-model="editForm.bstock" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" prop="bphoto">
              <el-input type="file"  v-model="editForm.bphoto" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="bclassify">
              <el-input  v-model="editForm.bclassify" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="bintro">
              <el-input type="textarea" v-model="editForm.bintro" :rows="8"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
          </div>
        </el-dialog>
        <!--新增界面
        -->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
          <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
            <el-form-item label="书名" prop="bname">
              <el-input v-model="addForm.bname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="bauthor">
              <el-input v-model="addForm.bauthor" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="bpress">
              <el-input  v-model="addForm.bpress" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="bprice">
              <el-input  v-model="addForm.bprice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="addForm.bdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="页数" prop="bpage">
              <el-input  v-model="addForm.bpage" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="bstock">
              <el-input  v-model="addForm.bstock" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="上传图片" prop="bphoto">
              <el-input type="file"  v-model="addForm.bphoto" auto-complete="off"></el-input>
            </el-form-item>

            <el-upload
			  class="upload-demo"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :file-list="fileList">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>

             <el-select v-model="value" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>

            <el-form-item label="分类" prop="bclassify">
              <el-input  v-model="addForm.bclassify" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="bintro">
              <el-input type="textarea" v-model="addForm.bintro" :rows="8"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import adminLeftMenu from '../../components/adminster/adminLeftMenu.vue'
  import adminHeader from '../../components/adminster/adminHeader.vue'
  import util from '../../utils/util'
  import {findAllBooks,addBooks,updateBook,removeBook,searchBook} from '../../api/account'
export default {
  name:'MBook',
    data(){
	    return {
	    filters: {
	      name: ''
	    },
	     fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
	      options: [{
          value: '选项1',
          label: '童书'
        }, {
          value: '选项2',
          label: '文学'
        }, {
          value: '选项3',
          label: '教育'
        }],
        value: '',
	    books: [],
	    total: 0,
	    page: 1,
	    size:8,
	    listLoading: false,
	    sels: [], //列表选中列
	    //编辑相关数据
	    editFormVisible: false,//编辑界面是否显示
	    editLoading: false,
	    editFormRules: {
	      bname: [
	        {required: true, message: '请输入书名', trigger: 'blur'}
	      ],
	      bauthor: [
	        {required: true, message: '请输入作者', trigger: 'blur'}
	      ],
	      bprice: [
	        {required: true, message: '请输入价格', trigger: 'blur'}
	      ],
	      bdate: [
	        {required: true, message: '请选择时间', trigger: 'blur'}
	      ],
	      bpress: [
	        {required:false}
	      ],
	       bpage: [
	        {required:false}
	      ],
	       bstock: [
	        {required:true, message: '请填入库存量' ,trigger: 'blur'}
	      ],
	       bphoto: [
	        {required:false}
	      ],
	       bintro: [
	        {required:false}
	      ],
	       bclassify: [
	        {required:true,message: '请选择分类', trigger: 'blur'}
	      ]
	    },
	    editForm: {
	       //id: 0,
	       bname: '',
	       bauthor: '',
	       bprice: '',
	       bdate: '',
	       bpress:'',
	       bpage:'',
	       bstock:'',
	       bphoto: '',
	       bintro: '',
	       bclassify: ''
	    },
	    //新增相关数据
	    addFormVisible: false,//新增界面是否显示
	    addLoading: false,
	    addFormRules: {
	      bname: [
	        {required: true, message: '请输入书名', trigger: 'blur'}
	      ],
	      bauthor: [
	        {required: true, message: '请输入作者', trigger: 'blur'}
	      ],
	      bprice: [
	        {required: true, message: '请输入价格', trigger: 'blur'}
	      ],
	      bdate: [
	        {required: true, message: '请选择时间', trigger: 'blur'}
	      ],
	      bpress: [
	        {required:false}
	      ],
	       bpage: [
	        {required:false}
	      ],
	       bstock: [
	        {required:true, message: '请填入库存量' ,trigger: 'blur'}
	      ],
	       bphoto: [
	        {required:false}
	      ],
	       bintro: [
	        {required:false}
	      ],
	       bclassify: [
	        {required:true,message: '请选择分类', trigger: 'blur'}
	      ]
	    },
	    addForm: {
	       bname: '',
	       bauthor: '',
	       bprice: '',
	       bdate: '',
	       bpress:'',
	       bpage:'',
	       bstock:'',
	       bphoto: '',
	       bintro: '',
	       bclassify: ''
	    }
	  }
  },
  mounted() {
    this.getBooks();
  },
  components:{
    adminHeader,
    adminLeftMenu
  },
  methods:{
  	SearchGoods(){
  		 this.listLoading = true
      let para={
      	key:this.filters.name
      }
      searchBook(para).then((res)=>{
        console.log(res.data)
        this.books=res.data
        this.listLoading = false;

      }).catch((res)=>{
      	 this.$message({message:"异常",duration:1500})
      })
  	},
  	handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getBooks();
      },
      //获取用户列表
    getBooks() {
        debugger
        let para = {
          page: this.page,
          name: this.filters.name,
          size:this.size
        };
        this.listLoading = true;
        findAllBooks(para).then((res) => {
          this.total = res.data.totalElements;
        this.books = res.data.content;
        this.listLoading = false;
    })
      },
    selsChange: function (sels) {
        this.sels = sels;
    },
      //删除
    delBook: function (index, row) {
    	debugger
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
          this.listLoading = true;
        //NProgress.start();
        let para = {bid: row.bid};
        console.log("id"+row.bid)
        removeBook(para).then((res) => {
        	if(res.data==="成功！"){
        		this.listLoading = false;
	            this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
              this.getBooks();
        	}else{
                  this.$message({message:"删除失败",duration:1500})
        	}
      });
      }).catch((res) => {
      	this.$message({message:"异常",duration:1500})
        });
    },
      //显示编辑界面
    showEditDialog: function (index, row) {
    	debugger
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row)
    },
      //编辑
    editSubmit: function () {
    	debugger
    	console.log(10)
        this.$refs.editForm.validate((valid) => {
          if (valid) {
          	console.log(11)
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.publishAt = (!para.bdate || para.bdate == '') ? '' : util.formatDate.format(new Date(para.bdate), 'yyyy-MM-dd');
            updateBook(para).then((res) => {
            	console.log(12)
            	if(res.data==="成功！"){
                    this.editLoading = false;
		            this.$message({
		              message: '提交成功',
		              type: 'success'
		            });
		            this.$refs['editForm'].resetFields();
		            this.editFormVisible = false;
		            this.getBooks();
            	}else{
            		 this.$message({message:"编辑失败",duration:1500})
            	}
            }).catch((res)=>{
            	this.$message({message:"异常",duration:1500})
            })
          });
          }
        });
    },
    showAddDialog: function () {
        this.listLoading = false
        this.addFormVisible = true;
        this.addForm = {
           bname: '',
	       bauthor: '',
	       bprice: '',
	       bdate: '',
	       bpress:'',
	       bpage:'',
	       bstock:'',
	       bphoto: '',
	       bintro: '',
	       bclassify: ''
        };
    },
      //新增
    addSubmit: function () {
      	debugger
        this.$refs.addForm.validate((valid) => {
        	console.log(1)
          if (valid) {
          	console.log(2)
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            para.bdate = (!para.bdate || para.bdate == '') ? '' : util.formatDate.format(new Date(para.bdate), 'yyyy-MM-dd');
            addBooks(para).then((res) => {
            	console.log(3)
              this.addLoading = false;
            //NProgress.done();
            if(res.data==="成功！"){
              this.$message({
              message: '提交成功',
              type: 'success'
	            });
              console.log(4)
	            this.$refs['addForm'].resetFields();
	            this.addFormVisible = false;
	            this.getBooks();
            }else{
            	this.$message({
              message: '提交失败',
              type: 'error'
	            });
            }

          });
          }
        });
      },
      //批量删除
    batchDeleteBook: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
        //NProgress.start();
        let para = {ids: ids};
        reqBatchDeleteBook(para).then((res) => {
          this.listLoading = false;
        //NProgress.done();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getBooks();
      });
      }).catch(() => {

        });
    }

  }
}
</script>
