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
       <!--  <el-button size="mini" v-if="scope.$index !=list.length-1 " type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            
            <el-table-column fixed label="序号" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.$index !=list.length-1 ">{{scope.row.id}}</span>
                    <span v-else>总计</span>
                </template>
            </el-table-column>
           <!--  <el-table-column fixed v-if="" prop="index" label="序号" width="80"></el-table-column> -->
            <el-table-column prop="totolNum" align="center" label="导入数量"></el-table-column>
            <el-table-column prop="repeatNum" align="center" label="重复数量" ></el-table-column>
            <el-table-column prop="validNum" align="center" label="有效数量" ></el-table-column>
            <el-table-column prop="createTimeStr" align="center" label="导入时间" ></el-table-column>
            <el-table-column prop="fileName" align="center" label="文件名" ></el-table-column>
            <el-table-column prop="" align="center" label="操作" >
                <template slot-scope="scope">
                    <el-button v-if="scope.$index !=list.length-1 " type="primary" size="small" @click="exportExcl(scope.$index, scope.row)">下载</el-button>
                    <el-button v-if="scope.$index !=list.length-1 " type="danger" size="small" @click="deleteLog(scope.$index, scope.row)">删除</el-button>
                    <span v-else></span>
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
          :action=uploadUrl
          :on-remove="handleRemove"
          :file-list="fileList"
          :multiple="false"
          list-type="text"
          :on-success="uploadSuccess"
          :on-error="uploadErr"
          :before-upload="uploadBefore"
          accept="text/plain"
          :on-progress="uploadProgress"
          :headers="header"
          :on-change="uploadChange"
          :auto-upload="true">
          <el-button slot="trigger" size="small" type="primary">导入数据</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
          <span class="totalSize">共{{totalSize}}条</span>
        </el-upload>
          
       </div>
       <!--  -->
       <div class="uploadState"  v-if="percentInsert != 0">
            <div  class="uploadState_con">
                <el-progress type="circle" :percentage=percent>
                </el-progress>
                <div class="insertDb" >数据正在入库，请耐心等待,当前进度{{percentData}}%</div>
           </div>

       </div>
    </div>
</template>

<script>
    let timer = null;
    import {uploadUrl, downloadUrl} from '@/api/config'
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
                flag:false,
                totalPage: 1,
                percent:0,
                percentInsert:0,
                percentData:0,
                maxSize: 20, //最大长度10M
            }
        },
        computed: {
            uploadUrl: () => {
                return uploadUrl + 'api/file/import';
            },
            header: () => {
                return {Authorization: localStorage.getItem('token')};
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            searchInfo() {
                if( this.endTime && 
                    this.starTime && 
                    this.starTime.replace(/\//g,'') > this.endTime.replace(/\//g,'')
                    ) {
                    this.$message({message: '开始时间不能大于结束时间',type: 'warning'});
                    return false
                }
                this.getInfo();
            },
            initId(index) {
                console.log(index)
            },
            deleteLog(index,row) {
                 this.$alert(`你将删除文件 ${row.fileName}`, '文件删除', {
                  confirmButtonText: '确定',
                  callback: action => {
                    console.log(action)
                    if( action== 'confirm') {
                        this.$http.post(`/api/log/delete/${row.id}`, {
                            params: {}
                        }).then((res) => {
                            let r = res.data;
                            if(r.code == 200) {
                                this.$message({
                                    message:`${r.message}`,
                                    type: 'success'
                                });
                                this.getInfo();
                            } else {
                                this.$message.error({ message: `${r.message}`});
                            }
                        })
                    } else {
                        this.$message({
                          type: 'info',
                          message: `已取消`
                        });
                    }
                  }
                })
                
            },
            getInfo() {
                let _this = this;
                _this.$http.get('/api/log/list', {
                    params: {
                        page: _this.currentPage,
                        size: _this.pageSize,
                        endTime:this.endTime,
                        starTime:this.starTime
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
            exportExcl(index, row) {
                let _this = this;
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = downloadUrl + `api/file/export/${row.id}`
                link.setAttribute('download', `${row.id}.xlsx`)
                document.body.appendChild(link)
                link.click()

            },
            submitUpload() {
                return
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
            },
            uploadSuccess(res) {
                clearInterval(timer);
                this.flag = false;
                this.percent = 0;
                this.percentInsert = 0;
                this.percentData = 100;
                this.$refs.upload.clearFiles();
                if (res.code != '200') {
                    this.$message({ message: `${res.message}`,type: 'warning'});
                    return false;
                } 
                this.$message({
                    message:'导入成功',
                    type: 'success'
                });
                this.getInfo();
            },
            uploadErr(err) {
                alert(err)
                this.flag = false;
                this.percent = 0;
                clearInterval(timer);
                this.percentInsert = 0;
                this.$refs.upload.clearFiles();
                this.$message.error({ message: `${err.data.message}`});

            },
            uploadProgress(event, file, fileList) {
                this.percent = parseInt(event.percent);
                if(this.percent == '100') {
                    this.percentInsert = 1;
                    if (this.percentData < 100) {
                        timer = setInterval(this.upprogress, 1000)
                    }
                }
            },
            uploadBefore(file) {
                if(this.flag) {
                    this.$message({ message: '已有文件在上传中',type: 'warning'});
                    return false;
                }
                let txt = file.type === 'image/jpeg';
                let size = (file.size / 1024 / 1024);
                if(size > this.maxSize) {
                    this.$message({ message: '文字最大不能超过20M',type: 'warning'})
                    return false;
                }
                this.percentData = 0;
                this.flag = true;
            },
            uploadChange(file, fileList) {
                if(fileList.length>1){
                    fileList.shift();
                    //this.$refs.upload.clearFiles();
                }
            },
            upprogress() {
                if(this.percentData == '100'){ return false};
                this.$http.get('http://www.dxcqp.com:8082/api/file/progress', {
                }).then((res) => {
                    let r = res.data;
                    if(r.code == 200) {
                        if(this.percentData == '100') {

                        } else {
                            if (r.data > 0) {
                                this.percentData = r.data
                            }
                         
                        }
                    } 
                })
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
    .uploadState{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        background-color: rgba(0,0,0,.5);
        z-index: 999;
        height: 100%;
    }
    .uploadState_con{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .insertDb{
        font-size:16px;color:#fff;margin-top: 20px;
        position: absolute;
        display: inline-block;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 150%);
        width: 300px;
    }
</style>
<style>
    .el-progress__text{
        color: #fff !important;
    }
</style>
