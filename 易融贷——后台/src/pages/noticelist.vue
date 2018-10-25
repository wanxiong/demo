<template>
    <div class="outer">
        <el-button type="primary" style="width:100px;" @click="add()">新增</el-button>
        <el-table :data="list" style="width: 100%">
            <el-table-column type="index" label="id" width="180"></el-table-column>
            <el-table-column prop="content" label="内容">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增公告" :visible.sync="dialogFormVisible">
            <div class="banner-url">
                <el-input v-model="content" placeholder="请输入公告内容（最多25个字符）"></el-input>
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
        name: 'noticelist',
        data() {
            return {
                list: [{},{},{}],
                content: '',
                dialogFormVisible: false,
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                let _this = this;
                _this.$http.get('/api/notice/list').then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.list = r.data;
                    }
                })
            },
            submit() {
                let _this = this;
                let param = new URLSearchParams();
                param.append("content", _this.content);
                _this.$http.post('/api/notice/create', param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$message('新增成功');
                        _this.dialogFormVisible = false;
                        _this.getInfo();
                    }
                })
            },
            add() {
                this.dialogFormVisible = true;
                this.content = '';
            },
            handleDelete(index, row) {
                let _this = this;
                let url = '/api/notice/delete/' + row.id;
                _this.$http.post(url).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$message('删除成功');
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
    }
    .banner-url input {
        float: left;
        width: 600px;
    }
</style>