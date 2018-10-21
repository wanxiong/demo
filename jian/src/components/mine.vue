<template>
    <div class="outer">
        <div class="top">
            <span>{{name}}</span>
        </div>
        
        <div class="handle">
            <div v-for="item in list" @click="toLink(item)">
                <p>
                <i class="iconfont iconleft" v-html="item.icon"></i>
                <span>{{item.name}}</span>
                <i class="iconfont iconright" >&#xe64a;</i>
                </p>
            </div>
        </div>
        <mt-popup
            class="model_Contactus"
          v-model="popupVisible"
          position="right">
          <p class="model_content_header">联系我们<i class="iconfont " @click="closeModel">&#xe64a;</i></p>
            <div class="model_content">
              <p><img src="../assets/img/qrcode.jpg"  alt="二维码"></p>
              <p>添加掌柜微信&nbsp;&nbsp;jun870824</p>
            </div>
        </mt-popup>
        <mt-popup
            class="model_Contactus model_reject"
          v-model="popupVisible_"
          position="right">
          <p class="model_content_header">拒就赔服务<i class="iconfont " @click="closeModel">&#xe64a;</i></p>
          <div class="model_text">
              <p>1.活动期间，被拒我就陪</p>
              <p>2.活动期间，百分百包赔</p>
              <p>3.活动期间，从头赔到尾</p>
          </div>
        </mt-popup>
        <mt-popup
            class="popupVisible_logout_logo"
          v-model="popupVisible_logout"
          >
          <div class="popupVisible_logout">
          <p>提示</p>
          <p>此操作将退出登录, 是否继续?</p>
          <p>
              <button @click="cancel">取消</button>
            <button type="primary" @click="logout">确认</button>
          </p>
          
          </div>
        </mt-popup>

        <bottom></bottom>
    </div>
</template>

<script>
    import bottom from '../components/bottom';
    export default {
        name: 'mine',
        data() {
            return {
                popupVisible: false,
                popupVisible_: false,
                popupVisible_logout: false,
                list: [
                    {icon: '&#xe605;', name: '拒就陪服务', code: '1', path: '/applyfor'},
                    {icon: '&#xe60d;', name: '联系我们', code: '2', path: ''},
                    {icon: '&#xe626;', name: '分享', code: '3', path: ''},
                    {icon: '&#xe792;', name: '退出', code: '4', path: '/login'},
                    // {icon: '&#xe624;', name: '设置', code: '5', path: '/mineinfo'},
                ],
                name: '',
                phone: '',
            }
        },
        components: {
			bottom,
		},
        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                let _this = this;
                
            },
            toLink(item) {
                if(item.code == '2') {
                    this.popupVisible = true;
                } else if(item.code == '1') {
                    this.popupVisible_ = true;
                } else if(item.code == '4') {
                    this.popupVisible_logout = true;
                } else if(item.code == '3') {
                    this.$router.push({name: 'promotion'});
                }
                return 
                let _this = this;
                if(item.path == '' && item.code == '5') {
                    _this.$toast('敬请期待');
                    return;
                }
                if(item.path == '' && item.code == '6') {
                    _this.$toast('客服正忙，请稍后再试')
                }
                _this.$router.push(item.path);
            },
            closeModel() {
                this.popupVisible = false;
                this.popupVisible_ = false;
            },
            cancel() {
                this.popupVisible_logout = false;
            },
            logout() {
                this.$http.post('/api/auth/logout', {}).then((res) => {
                    let r = res.data;
                    if(r.code == 200) {
                        this.$toast(r.message)
                       localStorage.removeItem('token');
                       this.$router.push({name: 'login'});
                    } else {
                        this.$toast(r.message);
                        
                    }
                    this.popupVisible_logout = false;
                }).catch( res => {

                })
            }
        }
    }
</script>

<style scoped>
    .outer {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        background-color: #f5f5f5;
    }
    .top {
        width: 100%;
        background: url('../assets/img/my_home.png') no-repeat;
        background-size: 100%;
        height: 3rem;
        overflow: hidden;
    }
    .top span {
        display: block;
        font-size: 0.36rem;
        color: #fff;
        line-height: 0.46rem;
        text-align: center;
        margin-top: 2rem;
    }
    .handle {
        overflow: hidden;
        background: #fff;
    }
    .handle div {
      font-size: 16px;
      padding:  18px 0;
      border-bottom: 1px solid #eee;
    }
    .handle div > p {
        padding: 0 15px;
        position: relative;

    }
    .handle div > p i,.handle div > p sapn{
        display: inline-block;
    }
    .handle div:nth-of-type(1) {
        margin-left: 0;
    }
    .handle div:nth-of-type(4) {
        margin-left: 0;
    }

    .iconfont{
        font-size: 26px;
    }
    .iconright{
        float: right;
        color: #dedede;
        font-size: 22px;
    }
    .iconleft{
        color: #a2a2a2;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .handle div span {
        color: #434343;
        margin-left:30px;
    }
    .model_Contactus{
        background-color: #fff;
        width: 100%;
        height: 100%;
    }
    .model_content{
        position: absolute;
        left: 50%; 
        top: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #333;
        font-size: 18px;
    }
    .model_content_header{
        height: 43px;
        width: 100%;
        z-index: 999;
        background: #00a2ff;
        font-size: 16px;
        color: #fff;
        line-height: 43px;
        margin: 0 auto;
        width: 100%;
        text-align: center;
        position: relative;
    }
    .model_content_header i{
        position: absolute;
        left: 0;
        transform: rotate(180deg);
        font-size: 22px;
        padding:0 10px; 
    }
    .model_content img{
        max-width: 320px;
        display: block;
        height: auto;
        margin:  0 auto;
        width: 60%;
    }
    .model_reject{
        background-color: #f5f5f5;
       
    }
    .model_text{
         padding: 20px 20px 0; 
         font-size: 16px;
         color: #666;
         line-height: 20px;
    }
    .popupVisible_logout_logo{
        width: 80%;
        padding: 10px 20px; 
        border-radius: 5px;
    }
    .popupVisible_logout > p:nth-of-type(1){
        font-size: 16px;
        color: #303133;
        padding: 10px 0;
    }
    .popupVisible_logout > p:nth-of-type(1){
        font-size: 14px;
        color: #606266;
        padding: 10px 0;
    }
    .popupVisible_logout > p > button:nth-of-type(1){
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        border-color: #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
    }
    .popupVisible_logout > p:nth-of-type(3) {
        text-align: right;
    }
    .popupVisible_logout > p >button:nth-of-type(2){
        margin-left: 10px;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #dcdfe6;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
    }

</style>
