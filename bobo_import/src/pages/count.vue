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
		    <el-button type="primary" @click="searchInfo()" style="float:right;margin-left:30px;">搜索</el-button>
		  </div>
        </div>
        <el-button  type="primary" style="width:100px;margin-top:20px;" @click="add">新增</el-button>
        <el-table :data="list" border style="width:100%;margin-top:30px;">
            <el-table-column fixed prop="phone" label="手机号" ></el-table-column>
            <el-table-column fixed prop="name" label="姓名" ></el-table-column>
            <el-table-column prop="inviteCount" label="总邀请量"></el-table-column>
            <el-table-column prop="todayInviteCount" width="160" label="当前时间区间邀请量" ></el-table-column>
            <el-table-column prop="clickCount" width="160" label="总点击量(已去重)" ></el-table-column>
            <el-table-column prop="todayClickCount" width="240" label="当前时间区间点击量(已去重)" ></el-table-column>
            <el-table-column prop="todayClickCountTwo" width="240" label="今日点击量(已去重)" ></el-table-column>
            <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope">
                    <el-button size="mini" v-if="scope.$index !=list.length-1 " type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog title="新增统计" :visible.sync="dialogFormVisible">
            <div class="banner-url">
                <el-input v-model="phone" placeholder="请输入销售手机号"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="name" placeholder="请输入销售姓名"></el-input>
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
        created() {
              var Time= this.initTime();
              this.endtime = Time;
              this.time = Time;
        },
        data() {
            return {
                list: [],
                time:new Date(),
                endtime: new Date(),
                dialogSort: false,
                phone:'',
                name:'',
                dialogFormVisible:false,
                defaultTime:new Date(),
                // 分页
                currentPage: 1,
                oldCurrentPage:1,
                pageSize: 30,
                totalPage: 1,
            }
        },
        mounted() {
            this.getInfo();
        },
        watch: {
            
        },
        methods: {
            initTime() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                if (month < 10) {
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }
                var nowDate = year + "-" + month + "-" + day;
                return nowDate;
            },
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
            handleCurrentChange(val,flg) {
                if(flg) return ;
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
                let param = new URLSearchParams();
                param.append("name", _this.name);
                param.append("phone", _this.phone);
                let url = '/api/sale/create';
                this.$http.post(url,param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        this.$message({message: '新增成功',type: 'success'});
                        this.dialogFormVisible = false;
                        _this.getInfo();
                    } else {
                        this.$message.error(r.message);
                    }
                }).catch( err => {

                })

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
