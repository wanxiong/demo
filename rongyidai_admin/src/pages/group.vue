<template>
    <div class="outer">
        <el-button type="primary" style="width:100px;" @click="add()">新增</el-button>
        <el-table :data="list" style="width: 100%">
            <el-table-column type="index" label="id" width="180"></el-table-column>
            <el-table-column prop="content" label="组名">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增分组" :visible.sync="dialogFormVisible">
             <div class="banner-url">
                <el-input v-model="groupName" placeholder="请输入新增组名"></el-input>
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
                dialogFormVisible: false,
                groupName: '',
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
                param.append("groupName", _this.groupName);
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
                this.groupName = '';
            },
            handleDelete(index, row) {
                this.$confirm('此操作将删除该组, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    
                  // this.$message({
                  //   type: 'success',
                  //   message: '删除成功!'
                  // });
                }).catch(() => {
                  // this.$message({
                  //   type: 'info',
                  //   message: '已取消删除'
                  // });          
                });
                return false;
                let _this = this;
                let url = '/api/notice/delete/' + row.id;
                _this.$http.post(url).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$message('删除成功');
                        _this.getInfo();
                    }
                })
            },
            handleUpdate(index, row) {
                this.groupName = row.content;
                this.dialogFormVisible = true;
                return;
                this.submit();
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