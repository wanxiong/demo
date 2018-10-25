<template>
    <div class="outer">
        <div class="search" style="overflow:hidden;">
            <div class="block">
		    <el-date-picker
		      v-model="time"
		      type="date"
		      :editable=false
		      value-format="yyyy-MM-dd"
		      placeholder="请选择开始日期"
              style="margin-right:30px;">
		    </el-date-picker >
            <el-date-picker
              v-model="endtime"
              type="date"
              :editable=false
              value-format="yyyy-MM-dd"
              placeholder="请选择结束日期">
            </el-date-picker>
            <el-select v-model="groupSearchValue" placeholder="请选择分组" style="margin-left:30px;">
                <el-option
                  v-for="item in groupList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
            </el-select>
		    <el-button type="primary" @click="searchInfo()" style="float:right;margin-left:30px;">搜索</el-button>
		  </div>
        </div>
        <el-button  type="primary" style="width:100px;margin-top:20px;" @click="add">新增</el-button>
        <el-table :data="list" border style="width:100%;margin-top:30px;">
            <el-table-column fixed prop="phone" label="手机号" width="130"></el-table-column>
            <el-table-column fixed prop="name" label="姓名" width="150" ></el-table-column>
            <el-table-column fixed prop="groupName" label="所属组" width="150"></el-table-column>
            <el-table-column prop="inviteCount" label="总邀请量"></el-table-column>
            <el-table-column prop="todayInviteCount" width="100" label="下线" ></el-table-column>
            <el-table-column prop="clickCount" align="center"  width="150" label="总点击" ></el-table-column>
            <el-table-column prop="todayClickCount" align="center" width="160" label="老+新点击" ></el-table-column>
            <el-table-column prop="todayClickCountTwo" width="160" label="新客户点击" align="center" ></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" v-if="scope.$index !=list.length-1 " type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button size="mini" v-if="scope.$index !=list.length-1 " type="primary" @click="initGroup(scope.$index, scope.row)">编辑</el-button>
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
        <!--  -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <div class="banner-url">
                <el-input v-model="phone" :disabled="phoneDisabled" placeholder="请输入销售手机号"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="name" :disabled="phoneName" placeholder="请输入销售姓名"></el-input>
            </div>
            <div class="banner-url" style="margin-bottom:50px;">
                <el-select v-model="groupAddValue" placeholder="请选择所在分组" >
                    <el-option
                      v-for="item in groupList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      >
                    </el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'productlist',
        data() {
            return {
                list: [],
                time:null,
                endtime: null,
                dialogSort: false,
                phone:'',
                name:'',
                dialogFormVisible:false,
                dialogFormVisible_: false,
                // 分页
                currentPage: 1,
                oldCurrentPage:1,
                pageSize: 100,
                totalPage: 1,
                groupSearchValue: '',
                groupAddValue: '',
                phoneDisabled: false,
                phoneName: false,
                groupList: null,
                groupId: null,
                title:"新增统计"

            }
        },
        mounted() {
            this.getInfo();
            this.groupInfo();
        },
        watch: {
            
        },
        methods: {
            searchInfo() {
                if(!this.time && !this.endtime) {//都为空
                    this.getInfo();
                } else {//都不为空
                    if(!this.time) {
                        this.$message({
                          message: '请输入开始时间',
                          type: 'warning'
                        });
                        return
                    }
                    if(!this.endtime) {
                        this.$message({
                          message: '请输入结束时间',
                          type: 'warning'
                        });
                        return
                    }
                    if(this.time.replace(/-/g,'') > this.endtime.replace(/-/g,'') ) {
                        this.$message({
                          message: '结束时间不能小于开始时间',
                          type: 'warning'
                        });
                        return
                    }
                    this.getInfo();
                }
                
            },
            getInfo() {
                let _this = this;
                _this.$http.get('/api/sale/list', {
                    params: { 
                        page: _this.currentPage,
                        size: _this.pageSize,
                        startDate: _this.time,
                        endDate: _this.endtime,
                        groupId: _this.groupSearchValue,
                    }
                }).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.totalPage = r.data.total;
                        _this.list = r.data.items;
                    }
                }).catch( err => {
                	console.log(err)
                })
            },
             handleSizeChange(val) {
                
            },
            groupInfo() {
                let _this = this;
                _this.$http.get('/api/group/list').then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        r.data.unshift({
                            id: '',
                            name: ''
                        })
                        _this.groupList = r.data;
                    }
                })
            },
            handleCurrentChange(val,flg) {
                if(flg) return ;
                if(!this.time && !this.endtime) {//都为空
                    this.getInfo();
                    this.oldCurrentPage = val;
                } else {//都不为空
                    if(!this.time) {
                        this.$message({
                          message: '请输入开始时间',
                          type: 'warning'
                        });
                        this.currentPage = this.oldCurrentPage;
                        return
                    }
                    if(!this.endtime) {
                        this.$message({
                          message: '请输入结束时间',
                          type: 'warning'
                        });
                        this.currentPage = this.oldCurrentPage;
                        return
                    }
                    if(this.time.replace(/-/g,'') > this.endtime.replace(/-/g,'') ) {
                        this.$message({
                          message: '结束时间不能小于开始时间',
                          type: 'warning'
                        });
                        this.currentPage = this.oldCurrentPage;
                        return
                    }
                    this.currentPage = val;
                    this.oldCurrentPage = val;
                    this.getInfo();
                }
            },
            // 删除
            handleDelete(index, row) {
                let _this = this;
                let url = '/api/sale/delete/' + row.phone;
                _this.$http.post(url).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        this.$message({message: '删除成功',type: 'success'});
                        _this.getInfo();
                    }
                })
            },
            // 新增
            add() {
                this.phone = '';
                this.name = '';
                this.title = '';
                this.phoneDisabled = false;
                this.phoneName = false;
                this.groupAddValue = '';
                this.title = "新增统计";
                this.dialogFormVisible = true;
            },
            submit() {
                let _this =this;
                let reg = /^[0-9]*$/
                if(!reg.test(this.phone)) {
                    this.$message({
                      message: '请输入正确的手机格式',
                      type: 'warning'
                    });
                    return false;
                }
                if( this.title = '新增统计') {
                    let param = new URLSearchParams();
                    param.append("name", _this.name);
                    param.append("phone", _this.phone);
                    param.append("groupId", _this.groupAddValue);
                    let url = '/api/sale/update';
                    this.$http.post(url,param).then((res) => {
                        let r = res.data;
                        if(r.code == 0) {
                            this.$message({message: '编辑成功',type: 'success'});
                            this.dialogFormVisible = false;
                            _this.getInfo();
                        } else {
                            this.$message.error(r.message);
                        }
                    }).catch( err => {

                    })
                 } else {
                    
                }

            },
            initGroup(index, row) {
                this.phone = '';
                this.name = '';
                this.title = '修改统计'
                this.phone = row.phone;
                this.name = row.name;
                this.phoneDisabled = true,
                this.phoneName = false,
                this.dialogFormVisible = true;
                this.groupAddValue = row.groupName;

            }
           
        }
    }
</script>

<style scoped>
    .banner-url {
        overflow: hidden;
        margin-top: 30px;
    }
    .banner-url input {
        float: left;
        width: 400px;
    }
</style>
