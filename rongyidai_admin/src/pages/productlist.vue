<template>
    <div class="outer">
        <div class="search" style="overflow:hidden;">
            <el-input v-model="searchName" placeholder="请输入产品名称" style="float:left;width:200px;"></el-input>
            <el-select v-model="value" placeholder="请选择" style="float:left;margin-left:30px;">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
             <el-date-picker
              v-model="time"
              type="date"
              :editable=false
              value-format="yyyy-MM-dd"
              placeholder="请选择开始日期"
              style="margin-left:30px;float:left;width:200px;">
            </el-date-picker >
            <el-date-picker
              v-model="endtime"
              type="date"
              :editable=false
              value-format="yyyy-MM-dd"
              placeholder="请选择结束日期"
              style="margin-left:30px;float:left;width:200px;">
            </el-date-picker >
            <el-button type="primary" @click="searchInfo()" style="float:left;margin-left:30px;">搜索</el-button>
        </div>
        <el-button type="primary" style="width:100px;margin-top:20px;" @click="add()">新增</el-button>
        <el-table :data="list" border style="width:100%;margin-top:30px;">
            <el-table-column fixed prop="id" label="排序" width="80"></el-table-column>
            <el-table-column prop="productName" label="产品名称"></el-table-column>
            <el-table-column prop="productDescription" label="额度" width="180"></el-table-column>
            <el-table-column prop="accessNumber" label="点击量" width="120"></el-table-column>
            <el-table-column prop="realAccessNumber" label="实际访问量" width="120"></el-table-column>
            <el-table-column prop="todayAccessNumber" label="当前区间访问量" width="120"></el-table-column>
            <el-table-column prop="sort" label="排序值" width="120"></el-table-column>
            <el-table-column label="状态" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.status==1 ? '已调用' : '下架'}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="mini" @click="showSort(scope.$index, scope.row)">排序</el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" v-show="scope.row.status == 1" @click="slodOut(scope.$index, scope.row)">下架</el-button>
                    <el-button size="mini" v-show="scope.row.status == 2" @click="slodIn(scope.$index, scope.row)">上架</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="产品编辑" :visible.sync="dialogFormVisible">
            <el-upload
                class="upload-demo"
                :action=uploadUrl
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList2"
                :before-upload="updateBefore"
                :on-success="addSuccess"
                list-type="picture"
            >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div class="banner-url">
                <el-input v-model="bannerName" placeholder="请输入轮播名称"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="bannerLink" placeholder="请输入轮播链接"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="bannerDes" placeholder="请输入额度"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="accessNumber" placeholder="请输入点击量"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="sort" placeholder="请输入排序值(值越大越置上)"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>

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
    import {imgUrl, uploadUrl} from '@/api/config'
    export default {
        name: 'productlist',
        data() {
            return {
                list: [],
                dialogFormVisible: false,
                dialogSort: false,
                fileList2: [],
                bannerName: '',
                bannerLink: '',
                bannerDes: '',
                time: '',
                endtime: '',
                accessNumber: '',
                sort: '',
                isEdit: '',
                selectid: '',
                searchName: '',
                searchStatus: '',
                intro: '',
                passRate: '',
                timeLimit: '',
                dailyRate: '',
                sort: '',
                options: [{value: '选项1', label: '已调用'}, {value: '选项2', label: '下架'}],
                value: '',
                sortId: '',
                // 分页
                currentPage: 1,
                pageSize: 10,
                totalPage: 1,
            }
        },
        mounted() {
            var oDate = new Date();
            var oYear = oDate.getFullYear();
            var oMonth = oDate.getMonth()+1;
            oMonth = oMonth>=10? oMonth:'0'+oMonth;
            var oDay = oDate.getDate();
            oDay = oDay>=10? oDay:'0'+oDay;
            var theDate = oYear+"-"+oMonth+"-"+oDay;
            this.time = theDate;
            this.endtime = theDate;
            this.getInfo();
        },
        computed:{
            imgUrl: () => {
                return imgUrl;
            },
            uploadUrl:() => {
                console.log(uploadUrl)
                return uploadUrl +'api/file/uploadimg';
            }
        },
        methods: {
            searchInfo() {
                console.log(this.value, 'value')
                if(this.value == '选项1' ) {
                    this.searchStatus = 1;
                } else if(this.value == '') {
                    this.searchStatus = '';
                } else {
                    this.searchStatus = 2;
                }

                this.getInfo(this.searchStatus);
            },
            getInfo(status) {
                let _this = this;
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
                _this.$http.get('/api/product/adminList', {
                    params: {
                        page: _this.currentPage,
                        size: _this.pageSize,
                        name: _this.searchName,
                        status: status,
                        startDate: _this.time,
                        endDate: _this.endtime
                    }
                }).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.totalPage = r.data.total;
                        _this.list = r.data.items;
                    }
                })
            },
            submit() {
                let _this = this;
                let param = new URLSearchParams();
                param.append("productName", _this.bannerName);
                param.append("productUrl", _this.fileList2[0].response.data);
                param.append("productLink", _this.bannerLink);
                param.append("productDescription", _this.bannerDes);
                param.append("accessNumber", _this.accessNumber);
                param.append("sort", _this.sort);
                _this.$http.post(_this.isEdit==false ? '/api/product/create' : '/api/product/update/'+_this.selectid, param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.dialogFormVisible = false;
                        _this.getInfo();
                        _this.fileList2 = [];
                    }
                })
            },
            // 新增
            add() {
                this.isEdit = false;
                this.fileList2 = [];
                this.bannerName = '';
                this.bannerLink = '';
                this.bannerDes = '';
                this.accessNumber = '';
                this.sort = '';
                this.intro = '';
                this.passRate = '';
                this.timeLimit = '';
                this.dailyRate = '';
                this.dialogFormVisible = true;
            },
            // 编辑
            handleEdit(index, row) {
                let _this = this;
                _this.isEdit = true;
                _this.fileList2 = [];
                _this.bannerName = '';
                _this.bannerLink = '';
                _this.bannerDes = '';
                _this.accessNumber = '';
                _this.sort = '';
                _this.selectid = row.id;
                _this.dialogFormVisible = true;
                _this.$http.get('/api/product/get/'+row.id).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        let response = {
                            data: r.data.productUrl
                        }
                        let data = {
                            name: r.data.productUrl,
                            url: _this.imgUrl + r.data.productUrl,
                            response: response
                        }
                        _this.fileList2.push(data);
                        _this.bannerName = r.data.productName;
                        _this.bannerLink = r.data.productLink;
                        _this.bannerDes = r.data.productDescription;
                        _this.accessNumber = r.data.accessNumber;
                    }
                })
            },
            // 删除
            handleDelete(index, row) {
                let _this = this;
                let url = '/api/product/delete/' + row.id;
                _this.$http.post(url).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$message('删除成功');
                        _this.getInfo();
                    }
                })
            },
            // 下架
            slodOut(index, row) {
                let _this = this;
                let url = '/api/product/out/' + row.id;
                _this.$http.post(url).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$message('已下架');
                        _this.getInfo();
                    }
                })
            },
            // 上架
            slodIn(index, row) {
                let _this = this;
                let url = '/api/product/put/' + row.id;
                _this.$http.post(url).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$message('已上架');
                        _this.getInfo();
                    }
                })
            },
            // 图片上传之前
            updateBefore(file) {
                console.log(this.fileList2.length, '// 图片列表')
                if(this.fileList2.length >= 1){
                    this.$message("更新成功")
                }
            },
            //图片上传成功
            addSuccess(response, file, fileList) {
                if(response.code == 0) {
                    this.fileList2 = [];
                    this.fileList2.push(file);
                    console.log(this.fileList2, 'file')
                } else {
                    this.$message.error(response.error_msg)
                    this.fileList2 = [];
                }
            },
            handleRemove(file, fileList) {
                this.fileList2 = [];
            },
            handlePreview(file) {
                //
            },
            handleSizeChange(val) {
            },
            handleCurrentChange(val) {
                if(this.value != '') {
                    if(this.value == '选项1') {
                        this.searchStatus = 1;
                    } else {
                        this.searchStatus = 2;
                    }
                }
                this.currentPage = val;
                this.getInfo(this.searchStatus);
            },
            showSort(index, row) {
                this.sort = '';
                this.sortId = row.id;
                this.dialogSort = true;
            },  
            submitSort() {
                let _this = this;
                _this.$http({
                    method: 'post',
                    url: '/api/product/sort/' + _this.sortId,
                    params: {
                        sort: _this.sort,
                    }
                }).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.dialogSort = false;
                        _this.getInfo();
                    }
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
<style>
    .el-input-group__prepend{
        width: 70px !important;
    }
</style>