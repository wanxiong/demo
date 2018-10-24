<template>
    <div class="outer">
        <el-button type="primary" style="width:100px;" @click="add()">新增</el-button>
        <el-table :data="list" style="width: 100%">
            <el-table-column type="index" label="id" width="180"></el-table-column>
            <el-table-column prop="name" label="组名">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="title" :visible.sync="dialogFormVisible">
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
                list: [],
                dialogFormVisible: false,
                groupName: '',
                title:'新增分组',
                id:'',
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                let _this = this;
                _this.$http.get('/api/group/list').then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.list = r.data;
                    }
                })
            },
            submit(row) {
                let _this = this;
                if(!_this.groupName) {
                   this.$message({
                      message: '组名不能为空',
                      type: 'warning'
                    });
                   return false;
                }
                if( this.title == '新增分组') {
                    let param = new URLSearchParams();
                    param.append("name", _this.groupName);
                    _this.$http.post('/api/group/add', param).then((res) => {
                        let r = res.data;
                        if(r.code == 0) {
                            this.$message({
                             type: 'success',
                             message: '新增成功!'
                            });
                            _this.dialogFormVisible = false;
                            _this.getInfo();
                        } else {
                            this.$message.error(r.message);
                        }
                    })
                } else {
                    let _this = this;
                    let param = new URLSearchParams();
                    param.append("name", this.groupName);
                    param.append("id", this.id);
                    _this.$http.post('/api/group/update', param).then((res) => {
                        let r = res.data;
                        if(r.code == 0) {
                            this.$message({
                             type: 'success',
                             message: '修改成功!'
                            });
                            _this.dialogFormVisible = false;
                            _this.getInfo();
                        } else {
                            this.$message.error(r.message);
                        }
                    })
                }
                
            },
            add() {
                this.title = '新增分组';
                this.dialogFormVisible = true;
                this.groupName = '';
            },
            handleDelete(index, row) {
                let _this = this;
                this.$confirm('此操作将删除该组, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then((res) => {
                    console.log(res)
                    let url = '/api/group/delete/' + row.id;
                    _this.$http.post(url).then((res) => {
                        let r = res.data;
                        if(r.code == 0) {
                            this.$message({
                             type: 'success',
                             message: '删除成功!'
                            });
                            _this.dialogFormVisible = false;
                            _this.getInfo();
                        } else{
                            this.$message.error(r.message);
                        }
                    })
                }, () => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
                  // this.$message({
                  //   type: 'info',
                  //   message: '已取消删除'
                  // });          
                
                
            },
            handleUpdate(index, row) {
                this.groupName = row.name;
                this.title = '修改分组';
                this.dialogFormVisible = true;
                this.id = row.id;
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