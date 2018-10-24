<template>
    <div class="myHeader">
        <div class="myHeader-header">
            <div class="express">容易贷后台管理</div>    		
            <div @click="close" class="close">退出</div>
            <div @click="bpassTip = true" class="changepass">修改密码</div>
        </div>
        <el-dialog title="修改密码" :visible.sync="bpassTip" size="tiny">
            <p style="text-align: center;font-size:16px;">新密码：<el-input v-model="newPass" placeholder="请输入新密码" style="width:200px;margin-left:40px" :maxlength="16"></el-input></p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="bpassTip = false">取 消</el-button>
                <el-button type="primary" @click="changePass">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'myHeader',
    data () {
      return {
        bpassTip: false,
        newPass:''
      }
    },
    methods:{
    	close(){
    		let _this = this;
        _this.$http({
          url: '/api/user/adminLogout',
          method: 'post',
        }).then((res) => {
          let r = res.data;
          if(r.code == 0) {
            _this.$router.push("/bgm/login");
          }
        })
    	},
    	changePass(){
    		let _this = this;
        let param = new URLSearchParams();
        param.append("password", _this.newPass);
        _this.$http.post('/api/user/adminPwd', param).then((res) => {
          let r = res.data;
          if(r.code == 0) {
            _this.bpassTip = false;
            _this.$message.success('修改成功,请重新登陆');
            _this.close();
          } else {
            _this.$message('修改失败');
          }
        })
    	}
    }
  }
</script>
 
<style scoped>
  .myHeader{
    height: 100%;
  }
    .myHeader-header{
      width:100%;
      height:100%;
      background-color: #48576a;
      border-bottom:1px solid #F8F8F8;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      box-sizing: border-box;
    }
    .myHeader-header  a{
        display: block;
      }
     .myHeader-header .router-link-active{
        background: #6F7E95;
        color: #fff;
      }
    /*div{
      float:left;
      
      
    }*/
    .logo{
    	float:left;
    	line-height:70px;
    	text-align:center;
      width:108px;
      height:100%;		
      margin-left:19px;
      overflow: hidden;
      background: url('/static/images/logo.svg') no-repeat center;
      background-size: 95%;
  }
  .express{
    width:194px;
    float:left;
    font-size:18px;
    line-height:70px;
    text-align:center;
  }
  .shopCity,.system{
    width:155px;
    font-size:18px;
    border-left:1px solid #F8F8F8;
    border-right:1px solid #F8F8F8;
  }
    .iconfont{
      font-size:20px;
    }
  .close,.changepass{
  	padding-right:30px;
  	cursor:pointer;
  	color:#20a0ff;
  	margin-right:50px;
  	float:right;
  	line-height:70px;
    text-align:center;
  }
</style>