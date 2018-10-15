<template>
    <div class="outer">
        <el-button type="primary" style="width:100px;" @click="add()">新增</el-button>
        <el-table :data="tableData" border style="width:100%;margin-top:20px;">
            <el-table-column fixed prop="id" label="id" width="90"></el-table-column>
            <el-table-column prop="bannerLink" label="链接"></el-table-column>
            <el-table-column label="图片" width="260">
                <template slot-scope="scope">
                    <img :src="imgUrl+scope.row.bannerUrl" width="200px"/>
                </template>
            </el-table-column>
            <el-table-column prop="bannerName" label="名称" width="160"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="轮播编辑" :visible.sync="dialogFormVisible">
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
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {imgUrl, uploadUrl} from '@/api/config'
    export default {
        name: 'bannerlist',
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                fileList2: [],
                bannerName: '',
                bannerLink: '',
                isEdit: '',
                selectid: '',
                // addfileList: [], // 图片列表
            }
        },
        mounted() {
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
            getInfo() {
                let _this = this;
                _this.$http.get('/api/banner/list').then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.tableData = r.data;
                    }
                }).catch((error) => {
                    console.log(error, 'error')
                })
            },
            submit() {
                let _this = this;
                let param = new URLSearchParams();
                param.append("bannerName", _this.bannerName);
                param.append("bannerUrl", _this.fileList2[0].response.data);
                param.append("bannerLink", _this.bannerLink);
                _this.$http.post(_this.isEdit==false ? '/api/banner/create' : '/api/banner/update/'+_this.selectid, param).then((res) => {
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
                this.dialogFormVisible = true;
            },
            // 编辑
            handleEdit(index, row) {
                let _this = this;
                _this.isEdit = true;
                _this.fileList2 = [];
                _this.bannerName = '';
                _this.bannerLink = '';
                _this.selectid = row.id;
                _this.dialogFormVisible = true;
                _this.$http.get('/api/banner/get/'+row.id).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        let response = {
                            data: r.data.bannerUrl
                        }
                        let data = {
                            name: r.data.bannerUrl,
                            url: _this.imgUrl + r.data.bannerUrl,
                            response: response,
                        }
                        _this.fileList2.push(data);
                        console.log(data, 'data')
                        _this.bannerName = r.data.bannerName;
                        _this.bannerLink = r.data.bannerLink;
                    }
                })
            },
            // 删除
            handleDelete(index, row) {
                let _this = this;
                let url = '/api/banner/delete/' + row.id;
                _this.$http.post(url).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$message('删除成功');
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
            }
        }
    }
</script>

<style>
    .banner-url {
        overflow: hidden;
        margin-top: 30px;
    }
    .banner-url input {
        float: left;
        width: 400px;
    }
</style>