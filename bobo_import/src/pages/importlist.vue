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
        
        <el-table :data="list" border style="width:100%;margin-top:30px;">
            <el-table-column fixed prop="name" label="序号" type="index" width="80"></el-table-column>
            <el-table-column prop="phone" align="center" label="导入数量"></el-table-column>
            <el-table-column prop="inviteCount" align="center" label="重复数量" ></el-table-column>
            <el-table-column prop="inviteCount" align="center" label="有效数量" ></el-table-column>
            <el-table-column prop="createTime" align="center" label="导入时间" ></el-table-column>
            <el-table-column prop="" align="center" label="操作" >
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="downloadItem(scope.$index, scope.row)">下载</el-button>
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

       <div>
          <el-upload
          class="upload-demo"
          ref="upload"
          :action=downloadUrl
          :on-remove="handleRemove"
          :file-list="fileList"
          :multiple="false"
          list-type="text"
          :on-success="uploadSuccess"
          :on-error="uploadErr"
          :before-upload="uploadBefore"
          accept="text/plain"
          :on-progress="uploadProgress"
          :on-change="uploadChange"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">导入数据</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <span class="totalSize">共{{totalSize}}条</span>
        </el-upload>
          
       </div>
    </div>
</template>

<script>
    import {downloadUrl} from '@/api/config'
    export default {
        name: 'importlist',
        data() {
            return {
                list: [],
                limit:1,
                dialogFormVisible: false,
                starTime: '',
                endTime: '',
                totalSize:'--',
                fileList:[],
                currentPage: 1,
                pageSize: 10,
                totalPage: 1,
                maxSize: 2, //最大长度10M
            }
        },
        computed: {
            downloadUrl: () => {
                return downloadUrl;
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
                //this.getInfo();
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

            },
            downloadItem(index, row) {//导出部分文件
                console.log(row)
            },
            submitUpload() {
                console.log(this.fileList)
                return
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            uploadSuccess() {

            },
            uploadErr() {
                this.$message.error({ message: '文件上传失败'});
            },
            uploadProgress(event, file, fileList) {
                console.log(event.percent);
            },
            uploadBefore(file) {
                console.log(file)
                let txt = file.type === 'image/jpeg';
                let size = (file.size / 1024 / 1024);
                if(size > this.maxSize) {
                    this.$message({ message: '文字最大不能超过5M',type: 'warning'})
                    return false;
                }
            },
            uploadChange(file, fileList) {
                console.log(fileList)
                if(fileList.length>1){
                    fileList.shift();
                    //this.$refs.upload.clearFiles();
                }
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
