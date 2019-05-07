<template>
    <div class="outer">
        <el-button type="primary" style="width:100px;margin-top:20px;" @click="add()">新增</el-button>
        
        <el-table :data="list" border style="width:100%;margin-top:30px;">
            <el-table-column fixed prop="id" label="排序" width="80"></el-table-column>
            <el-table-column prop="productName" label="产品名称"></el-table-column>
            <el-table-column prop="productDescription" label="额度" width="180"></el-table-column>
            <el-table-column prop="accessNumber" label="点击量" width="120"></el-table-column>
            <el-table-column prop="realAccessNumber" label="实际访问量" width="120"></el-table-column>
            <el-table-column prop="todayAccessNumber" label="当前区间访问量" width="120"></el-table-column>
            <el-table-column label="状态" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.status==1 ? '已调用' : '下架'}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="400">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" v-show="scope.row.status == 1" @click="slodOut(scope.$index, scope.row)">下架</el-button>
                    <el-button size="mini" v-show="scope.row.status == 2" @click="slodIn(scope.$index, scope.row)">上架</el-button>
                    <el-button size="mini" type="primary" @click="subLink(scope.$index, scope.row)">分销</el-button>
                    <el-button size="mini" type="primary" @click="lookSub(scope.$index, scope.row)">查看</el-button>
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
                <el-input v-model="bannerName" placeholder="请输入产品名称"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="bannerLink" placeholder="请输入产品链接"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="bannerNumber" placeholder="请输入已放款人数"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="bannerTimeLimit" placeholder="请输入期限范围"></el-input>
            </div>
             <div class="banner-url">
                <el-input v-model="bannerQuota" placeholder="请输入额度范围"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="bannerInterest" placeholder="请输入利息范围（例如：1%-2%）"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="bannerAwait" placeholder="请输入审核时间（单位小时）"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="bannerDes" placeholder="请输入产品描述"></el-input>
            </div>
            <div class="banner-url">
                <el-input v-model="accessNumber" placeholder="请输入产品浏览量"></el-input>
            </div>
            <!-- <div class="banner-url">
                <el-switch
                    v-model="switc">
                </el-switch>
                <span style="margin-left: 10px;">下架</span>
            </div> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分销 -->
        <el-dialog title="新增分销" :visible.sync="subDialogFormVisible">
            <div class="banner-url">
                <el-input v-model="subPhone" placeholder="请输入手机号" maxlength="11"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="subDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="subSubmit()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分销 -->
        <!-- 列表 -->
        <el-dialog title="分销一览" :visible.sync="lookDialogFormVisible" class="dialog-share">
            <el-table :data="lookList" border style="width:100%;margin-top:30px;">
                <el-table-column fixed prop="id" label="排序" ></el-table-column>
                <el-table-column prop="productName" label="产品名称" ></el-table-column>
                <el-table-column prop="saleName" label="分销人员" ></el-table-column>
                <el-table-column label="分销链接">
                    <template slot-scope="scope">
                        <span>{{shareUrl + 'shareCode=' + scope.row.shareCode + '&productId=' + scope.row.productId}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 列表 -->
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
                switc: false,
                dialogFormVisible: false,
                subDialogFormVisible: false,
                lookDialogFormVisible: false,
                dialogSort: false,
                fileList2: [],
                bannerName: '',
                bannerLink: '',
                bannerDes: '',
                bannerAwait: '',
                bannerInterest: '',
                bannerQuota: '',
                bannerNumber: '',
                accessNumber: '',
                bannerTimeLimit: '',
                isEdit: '',
                selectid: '',
                searchName: '',
                searchStatus: '',
                intro: '',
                passRate: '',
                timeLimit: '',
                dailyRate: '',
                value: '',
                subPhone: '',
                sortId: '',
                lookList: [],
                // 分页
                currentPage: 1,
                pageSize: 10,
                totalPage: 1,
                shareUrl: 'http://www.dxcqp.com:8083/special?'
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
            uploadUrl:() => {
                console.log(uploadUrl)
                return uploadUrl +'api/file/uploadimg';
            }
        },
        methods: {
            getInfo() {
                var _this = this;
                // <span>{{scope.row.status==1 ? '已调用' : '下架'}}</span>
                this.$http.get('/api/product/adminList', {
                    params: {
                        page: _this.currentPage,
                        size: _this.pageSize,
                        name: '',
                        flag: 2,
                       // status: 1, // 已上架
                       // startDate: _this.time,
                      //  endDate: _this.endtime
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
                param.append("productDescription", _this.bannerQuota);
                param.append("accessNumber", _this.accessNumber); // 产品浏览量
                param.append("loanCount", _this.bannerNumber); // 已放款人数
                param.append("detail", _this.bannerDes); // 产品描述
                param.append("waitTime", _this.bannerAwait); // 审核时间
                param.append("interestRange", _this.bannerInterest); // 利息范围
                param.append("timeLimit", _this.bannerTimeLimit); // 期限范围
                param.append("flag", 2); // 特殊标志  当前页面API的标识
                //param.append("status", _this.switc ? 2: 1); // 上架 下载
                
                _this.$http.post(_this.isEdit==false ? '/api/product/create' : '/api/product/update/'+_this.selectid, param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.dialogFormVisible = false;
                        _this.$message({ message: r.message, type: 'success' });
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
                this.bannerAwait = '';
                this.bannerInterest = '';
                this.bannerQuota = '';
                this.bannerNumber = '';
                this.bannerTimeLimit = '';
                this.switc = false;
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
                this.switc = false;
                this.bannerAwait = '';
                this.bannerInterest = '';
                this.bannerQuota = '';
                this.bannerNumber = '';
                this.bannerTimeLimit = '';
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
                        _this.bannerDes = r.data.detail;
                        _this.accessNumber = r.data.accessNumber;
                        this.switc = r.data.status == 1 ? false: true;
                        this.bannerAwait = r.data.waitTime;
                        this.bannerInterest = r.data.interestRange;
                        this.bannerQuota = r.data.productDescription;
                        this.bannerNumber = r.data.loanCount;
                        this.bannerTimeLimit = r.data.timeLimit;
                        this.bannerAwait = r.data.waitTime;
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
                        _this.$message({ message:'删除成功', type: 'success' });
                        _this.getInfo();
                    }
                })
            },
            // 图片上传之前
            updateBefore(file) {
                console.log(this.fileList2.length, '// 图片列表')
                if(this.fileList2.length >= 1){
                    this.$message({ message:'更新成功', type: 'success' });
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
                this.currentPage = val;
                this.getInfo();
            },
             // 下架
            slodOut(index, row) {
                let _this = this;
                let url = '/api/product/out/' + row.id;
                _this.$http.post(url).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$message({ message:'已下架', type: 'success' });
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
                        _this.$message({ message:'已上架', type: 'success' });
                        _this.getInfo();
                    }
                })
            },
             // 删除
            handleDelete(index, row) {
                let _this = this;
                let url = '/api/product/delete/' + row.id;
                this.$confirm('此操作将删除该产品, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then((res) => {
                    console.log(res)
                    _this.$http.post(url).then((res) => {
                        let r = res.data;
                        if(r.code == 0) {
                            _this.$message({ message:'删除成功', type: 'success' });
                            _this.getInfo();
                        }
                    })
                }, () => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            //
            subLink(index, row) {
                this.subDialogFormVisible = true
                this.subId = row.id;
            },
            //
            subSubmit() {
                var _this =this;
                if(!(/^1[345678]\d{9}$/.test(this.subPhone))) {
                    _this.$toast('手机号格式不正确');
                    _this.phone = '';
                    return;
                }
                let param = new URLSearchParams();
                param.append("productId", this.subId);
                param.append("phone", this.subPhone);
                _this.$http.post('/api/product/addSaleUrl', param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.subDialogFormVisible = false;
                        this.subPhone = '';
                        _this.$message({ message: res.message || '分销成功', type: 'success' });
                    } else {
                        this.$message.error(r.message);
                    }
                })
            },
            //
            lookSub(index, row) {
                let _this = this;
                let url = '/api/product/findSaleUrl?productId=' + row.id;
                _this.$http.get(url).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        this.lookList = res.data.data
                        this.lookDialogFormVisible = true
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
    .dialog-share > div {
        width: 80%;
        max-height: 80%;
        overflow-y: scroll;
    }
</style>