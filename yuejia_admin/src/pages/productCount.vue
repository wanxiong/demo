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
        <el-table :data="list" border style="width:100%;margin-top:30px;">
            <el-table-column fixed prop="userId" label="手机号" ></el-table-column>
            <el-table-column fixed prop="userName" label="姓名" ></el-table-column>
            <el-table-column prop="createTime" label="访问时间"></el-table-column>
            <el-table-column prop="productName" label="产品名称"></el-table-column>
            
            <!-- <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope">
                    <el-button size="mini" v-if="scope.$index !=list.length-1 " type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                layout="prev, pager, next, jumper"
                :total.sync="totalPage"
            >
            </el-pagination>
        </div>
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
                _this.$http.get('/api/apply/adminList', {
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
