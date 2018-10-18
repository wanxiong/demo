<template>
    <div>
        <div class="search" style="overflow:hidden;">

            <el-date-picker
              style="margin-right:30px;"
              v-model="starTime"
              type="date"
              value-format='yyyy-MM-dd'
              placeholder="导入开始时间">
            </el-date-picker>
            <el-date-picker
              v-model="endTime"
              type="date"
              value-format='yyyy-MM-dd'
              placeholder="导入结束时间">
            </el-date-picker>

            <el-button type="primary" @click="searchInfo()" style="margin-left:30px;">搜索</el-button>
 
        </div>
        
        <el-table :data="list" border style="width:100%;margin-top: 30px;">
            
            <el-table-column prop="id" align="center" label="手机号码"></el-table-column>
            <el-table-column prop="createTimeStr" align="center" label="导入时间" ></el-table-column>
               
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                layout="prev, pager, next, jumper"
                :total.sync="totalPage"
            >
            </el-pagination>
        </div>

       <div>
          <!-- <el-button type="primary" @click="exportExcl()" style="float:left;margin-left:30px;">导出</el-button> -->
          <span class="totalSize">共{{totalSize}}条</span>
       </div>
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
                starTime: '',
                endTime: '',
                totalSize:'--',
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
                console.log(this.starTime)
                console.log(this.endTime)
                if( this.endTime && 
                    this.starTime && 
                    this.starTime.replace(/\//g,'') > this.endTime.replace(/\//g,'')
                    ) {
                    this.$message({message: '开始时间不能大于结束时间',type: 'warning'});
                    return false
                }
                this.getInfo();
            },
            getInfo() {
                let _this = this;
                _this.$http.get('/api/tel/list', {
                    params: {
                        page: _this.currentPage,
                        size: _this.pageSize,
                        starTime: _this.starTime,
                        endTime: _this.endTime,
                    }
                }).then((res) => {
                    let r = res.data;
                    if(r.code == 200) {
                        _this.totalPage = r.data.total;
                        this.totalSize = r.data.total
                        _this.list = r.data.items;
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
                link.href = downloadUrl + 'bgm/userlist'
                link.setAttribute('download', 'aaa.xlsx')
                document.body.appendChild(link)
                link.click()

            }
        }
    }
</script>
<style scoped>
    .totalSize{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        margin-left: 20px;
        color: #333;
        letter-spacing: 1px;
    }
</style>
