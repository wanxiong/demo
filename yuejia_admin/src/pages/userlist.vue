<template>
    <div>
        <div class="search" style="overflow:hidden;">
            <el-input v-model="searchName" placeholder="请输入用户名" style="float:left;width:200px;"></el-input>
            <el-input v-model="searchPhone" placeholder="请输入手机号" style="float:left;width:200px;margin-left:30px;"></el-input>
            <el-input v-model="searchRefer" placeholder="请输入邀请人手机号" style="float:left;width:200px;margin-left:30px;"></el-input>
            <el-button type="primary" @click="searchInfo()" style="float:left;margin-left:30px;">搜索</el-button>
            <el-button type="primary" @click="exportExcl()" style="float:left;margin-left:30px;">导出</el-button>
        </div>
        
        <el-table :data="list" border style="width:100%;margin-top:30px;">
            <el-table-column fixed type="index" label="id" width="60"></el-table-column>
            <el-table-column prop="name" label="用户"></el-table-column>
            <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
            <el-table-column prop="password" label="登录密码" width="160"></el-table-column>
            <el-table-column prop="referrer" label="推荐人" width="120"></el-table-column>
            <el-table-column prop="referrerName" label="推荐人姓名" width="120"></el-table-column>
            <el-table-column prop="inviteCount" label="邀请人数" width="80"></el-table-column>
             <el-table-column prop="todayInviteCount" label="今日邀请数" width="80"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="loginCount" label="登录次数" width="60"></el-table-column>
            <!-- <el-table-column prop="wechatAccount" label="微信号" width="140"></el-table-column>
            <el-table-column prop="alipayAccount" label="支付宝号" width="140"></el-table-column> -->
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改登陆密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                layout="prev, pager, next, jumper"
                :total.sync="totalPage"
            >
            </el-pagination>
        </div>

        <el-dialog :title.sync="title" :visible.sync="dialogFormVisible">
            
            <div class="banner-url">
                <el-input v-model="newPass" placeholder="请输入新的密码"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {downloadUrl} from '@/api/config'
    export default {
        name: 'userlist',
        data() {
            return {
                list: [],
                dialogFormVisible: false,
                newPass: '',
                title: '',
                thisPhone: '',
                searchName: '',
                searchPhone: '',
                searchRefer: '',

                currentPage: 1,
                pageSize: 10,
                totalPage: 1,
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            searchInfo() {
                this.getInfo();
            },
            getInfo() {
                let _this = this;
                _this.$http.get('/api/user/list', {
                    params: {
                        page: _this.currentPage,
                        size: _this.pageSize,
                        name: _this.searchName,
                        phone: _this.searchPhone,
                        referrer: _this.searchRefer,
                    }
                }).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.totalPage = r.data.total;
                        _this.list = r.data.items;
                    }
                })
            },
            handleEdit(index, row) {
                let _this = this;
                _this.dialogFormVisible = true;
                let name = row.name || '此用户';
                _this.title = '修改'+name+'的登陆密码';
                _this.thisPhone = row.phone;
            },
            submit() {
                let _this = this;
                let param = new URLSearchParams();
                param.append("password", _this.newPass);
                let url = '/api/user/pwd/' + _this.thisPhone;
                _this.$http.post(url, param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$message('修改成功');
                        _this.dialogFormVisible = false;
                        _this.getInfo();
                    }
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getInfo();
            },
            // 导出文件
            exportExcl() {
                let _this = this;
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = downloadUrl + 'api/user/export '
                link.setAttribute('download', '用户列表.xlsx')
                document.body.appendChild(link)
                link.click()

            }
        }
    }
</script>
