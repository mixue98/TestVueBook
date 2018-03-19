<template>
  <div id="address">

	 <comheader></comheader>
     <navmenu></navmenu>
	  <div  class="myads">
      <p class="p1">{{msg}}</p>
	        <el-button class="newadd" type="primary" @click="showAddDialog">新增</el-button>
		    <el-table :data="address" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
	                style="width: 100%;margin-left:10px" class="table_col">
	            <el-table-column type="selection" width="55"></el-table-column>
	            <el-table-column type="index" width="60"></el-table-column>
	          <!-- prop 传值-->
	            <el-table-column prop="aid" label="地址id" class="aid" sortable></el-table-column>
	            <el-table-column prop="aname" label="收货人"  sortable></el-table-column>
	            <el-table-column prop="aphone" label="号码"  sortable></el-table-column>
	            <el-table-column prop="asite" label="所在地区" sortable></el-table-column>
	            <el-table-column prop="asited" label="详细地址" width="" sortable></el-table-column>
	            <el-table-column prop="apostcode" label="邮编"  sortable></el-table-column>

	            <el-table-column label="操作" >
		            <template scope="scope">
		              <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
		              <el-button type="danger" @click="delAdress(scope.$index,scope.row)" size="small">删除</el-button>
		            </template>
	            </el-table-column>
	        </el-table>

	        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
		        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
		          <el-form-item label="姓名" prop="aname">
		            <el-input v-model="editForm.aname" auto-complete="off"></el-input>
		          </el-form-item>
		          <el-form-item label="号码" prop="aphone">
		            <el-input v-model="editForm.aphone" auto-complete="off"></el-input>
		          </el-form-item>
		          <el-form-item label="所在地区" prop="asite">
		            <el-input v-model="editForm.asite" auto-complete="off"></el-input>
		          </el-form-item>
		          <el-form-item label="详细地址" prop="asited">
		            <el-input v-model="editForm.asited" auto-complete="off"></el-input>
		          </el-form-item>
		          <el-form-item label="邮编" prop="apostcode">
		            <el-input v-model="editForm.apostcode" auto-complete="off"></el-input>
		          </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		          <el-button @click.native="editFormVisible = false">取消</el-button>
		          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
		        </div>
		    </el-dialog>


		    <el-dialog title="新增地址" v-model="addFormVisible" :close-on-click-modal="false">
		        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
		          <el-form-item label="姓名" prop="aname">
		            <el-input v-model="addForm.aname" auto-complete="off"></el-input>
		          </el-form-item>
		          <el-form-item label="号码" prop="aphone">
		            <el-input v-model="addForm.aphone" auto-complete="off"></el-input>
		          </el-form-item>
		          <el-form-item label="所在地区" prop="asite">
		            <el-input v-model="addForm.asite" auto-complete="off"></el-input>
		          </el-form-item>
		          <el-form-item label="详细地址" prop="asited">
		            <el-input v-model="addForm.asited" auto-complete="off"></el-input>
		          </el-form-item>
		          <el-form-item label="邮编" prop="apostcode">
		            <el-input v-model="addForm.apostcode" auto-complete="off"></el-input>
		          </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		          <el-button @click.native="addFormVisible = false">取消</el-button>
		          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
		        </div>
		    </el-dialog>
	  </div>
  </div>
</template>
<script>
import {findAllAddress,deleteAddress,addAddress,updateAddress} from '../../api/account.js'
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
  export default{
    name: 'address',
    data(){
    	var validatePhone=(rule,value,cb) =>{
    		debugger
    		let reg=/^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/
    		if(value === ''){

    			cb(new Error("请输入手机号"))
    			console.log("phoneweikong")
    		} else if (!reg.test(value)){
    			cb(new Error("请输入正确的手机号码"))
    		} else {
    			cb()
    		}
    	}
    	var validatePostCode=(rule,value,cb) =>{
    	    debugger
    		let reg=/^[1-9][0-9]{5}$/
    		if(value===""){
    			cb(new Error("邮编不能为空"))
    		}else if(!reg.test(value)){
    			cb(new Error("请输入正确的邮编"))
    		}else{
    		    cb()
    		}
    	}
        return{
          msg:'我的地址',
          address: [],
          listLoading: false,
          sels: [], //列表选中列

           //新增相关数据
	        addFormVisible: false,//新增界面是否显示
	        addLoading: false,
	        addFormRules: {
	          aname: [
	            {required: true, message: '请输入收货人姓名', trigger: 'blur'}
	          ],
	          aphone: [
	            { required: true, message: '请输入号码', trigger: 'blur'},
	            {validator:validatePhone}
	          ],
	          asite: [
	            {required: true, message: '请输入地区', trigger: 'blur'}
	          ],
	          asited: [
	            {required: true, message: '请输入详细地址', trigger: 'blur'}
	          ],
	          apostcode: [
	            {validator:validatePostCode, trigger: 'blur'}  //required: true, message: '请输入邮编'
	          ]
	        },
	        addForm: {
	          aname: '',
	          aphone: '',
	          asite: '',
	          asited: '',
	          apostcode: ''
	        },

	         //编辑相关数据
	        editFormVisible: false,//编辑界面是否显示
	        editLoading: false,
	        editFormRules: {
	          aname: [
	            {required: true, message: '请输入收货人姓名', trigger: 'blur'}
	          ],
	          aphone: [
	            {required: true, message: '请输入号码', trigger: 'blur'},
	            {validator:validatePhone}
	          ],
	          asite: [
	            {required: true, message: '请输入地区', trigger: 'blur'}
	          ],
	          asited: [
	            {required: true, message: '请输入详细地址', trigger: 'blur'}
	          ],
	          apostcode: [
	            {required: true, message: '请输入邮编', trigger: 'blur'},
	            {validator:validatePostCode}
	          ]
	        },
	        editForm: {
	          aname: '',
	          aphone: '',
	          asite: '',
	          asited: '',
	          apostcode: ''
	        },

        }
    },
     mounted(){
        this.getAddress()
    },
    methods:{
    	//获取地址
    	getAddress(){
    		let userJsonStr = sessionStorage.getItem('user')
          	if(userJsonStr){
          		userJsonStr=JSON.parse(userJsonStr)
          		this.name=userJsonStr.cname

    		let para = {
    			name:this.name
	        };
	        this.listLoading = true;
	        findAllAddress(para).then((res) => {
	        	console.log(res.data.length)
	        		this.address = res.data;
	                this.listLoading = false;
	        })
    		}

    	},
    	//新增地址
	    showAddDialog(){
	    	debugger
	    	if(this.address.length>=5){
	        		this.$message({message:"最多填写5个地址！",duration:1500})
	    	}else{
	    		this.addFormVisible = true;
		        this.addForm = {
		          aname: '',
		          aphone: '',
		          asite: '',
		          asited: '',
		          apostcode: '',
		        //  cid: '1356506281@qq.com' //获取用户
		          cid:this.name
		        }
            }

	    },
	    //新增提交
	    addSubmit: function () {
	    	debugger
	    	console.log("dizhi"+this.address.length)

	    		this.$refs.addForm.validate((valid) => {
	            if (valid) {
		            this.addLoading = true

		            let para = Object.assign({}, this.addForm)
		            addAddress(para).then((res) => {
		              this.addLoading = false

		              this.$message({
		                message: '新增成功',
		                type: 'success'
		              })
		              this.$refs['addForm'].resetFields()
		              this.addFormVisible = false
		              this.getAddress()
		            })
	          }
	        })



        },

           //显示编辑界面
        showEditDialog: function (index, row) {
	      	// this.$message({message:"此功能暂时未开发",duration:1500})
	        this.editFormVisible = true;
	        this.editForm = Object.assign({}, row);
        },

       //编辑提交
        editSubmit: function () {
	        this.$refs.editForm.validate((valid) => {
	          if (valid) {
	            this.$confirm('确认提交吗？', '提示', {}).then(() => {
	              this.editLoading = true

	              let para = Object.assign({}, this.editForm)

	              updateAddress(para).then((res) => {
	                this.editLoading = false

	                this.$message({
	                  message: '提交成功',
	                  type: 'success'
	                });
	                this.$refs['editForm'].resetFields()
	                this.editFormVisible = false
	                this.getAddress();
	              });
	            });
	          }
	        });
        },
         //多选状态
	    selsChange: function (sels) {
        this.sels = sels;
        },
        //删除地址
	    delAdress(index, row){
	    	this.$confirm('确认删除该地址吗?', '提示', {type: 'warning'}).then(() => {
            this.listLoading = true
	          let para = {
	           // name:"1356506281@qq.com", //暂时写死
	            aid: row.aid     //
	          }

          deleteAddress(para).then((res) => {
            this.listLoading = false
            console.log(2)
            debugger
            if(res.data==="成功！"){
              this.listLoading = false
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getAddress()
            }else{
              this.listLoading = false
              this.$message({
                message: '删除失败',
                type: 'error'
              })
              console.log(res.data)
            }
          })
        }).catch((res) => {
              console.log('err')
              console.log(data)
        })

	    }
    },
    components: {
       comheader,
       navmenu
    }
  }
</script>
<style scoped>
.aid{
	display:none;
}
.newadd{
	float:left;
	margin:10px 10px;
}
.myads{
	width:80%;
	margin:60px 10%;
}
.table_col{
  text-align:left;
 }
.p1{
	margin:20px auto;
	font-size:20px;
}
.warp{
	width: 50%;
	margin:20px auto;
}
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
