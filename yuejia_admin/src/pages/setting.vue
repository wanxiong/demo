<template>
    <div class="outer">
        <div class="top">
            <div>基础设置</div>
        </div>
        <div class="row">
            <label>网站名称：</label><el-input class="net-name" v-model="netName" placeholder="请输入对应的网站名称" clearable></el-input>
        </div>
        <div class="row">
            <label>网站首页：</label><el-input class="net-name" v-model="url" placeholder="请输入对应的网站链接" disabled></el-input>
        </div>
        <div class="row">
            <label>网站关键字：</label><el-input class="net-name" v-model="world" placeholder="请输入关键字" clearable></el-input>
        </div>
        <div class="row">
            <label>客服电话（微信）：</label><el-input class="net-name" v-model="phone" placeholder="请输入电话/微信号" clearable></el-input>
        </div>
        <div class="row-line">
            <label>网站描述：</label><el-input class="discribe" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" maxlength="100" placeholder="请输入内容（最多100字）" v-model="discribe">
            </el-input>
        </div>
        <el-button class="submit" type="primary" @click="submit()">保存</el-button>
    </div>
</template>

<script>
    export default {
        name: 'setting',
        data() {
            return {
                netName: '',
                url: '',
                world: '',
                phone: '',
                discribe: '',
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                let _this = this;
                _this.$http.get('/api/website/get').then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.netName = r.data.webName;
                        _this.url = r.data.webUrl;
                        _this.world = r.data.webKeyword;
                        _this.phone = r.data.serviceTel;
                        _this.discribe = r.data.webDesc;
                    }
                })
            },
            submit() {
                let _this = this;
                let param = new URLSearchParams();
                param.append("webName", _this.netName);
                param.append("webUrl", _this.url);
                param.append("webKeyword", _this.world);
                param.append("serviceTel", _this.phone);
                param.append("webDesc", _this.discribe);
                _this.$http.post('/api/website/update', param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$message('保存成功')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .top {
        width: 100%;
        height: 50px;
        border-bottom: 3px solid #e6e6e6;
        position: relative;
    }
    .top div {
        width: 120px;
        height: 50px;
        border-bottom: 3px solid #59cac2;
        font-size: 15px;
        text-align: center;
        line-height: 50px;
        position: absolute;
        left: 0;
        top: 0;
        color: #59cac2;
    }
    .row {
        overflow: hidden;
        margin-top: 30px;
    }
    .row label {
        float: left;
        line-height: 40px;
        font-size: 14px;
        width: 130px;
        margin-left: 30px;
    }
    .row .net-name {
        float: left;
        width: 400px;
    }
    .row-line {
        overflow: hidden;
        margin-top: 30px;
    }
    .row-line label {
        float: left;
        font-size: 14px;
        width: 130px;
        margin-left: 30px;
        line-height: 40px;
    }
    .row-line .discribe {
        float: left;
        width: 400px;
    }
    .submit {
        margin: 50px 0 0 30px;
    }
</style>