<template>
    <div id="container">
        <el-input placeholder="输入班级名">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-divider></el-divider>
        <el-card>
            <div slot="header">
                <span>计算机141</span>
                <el-button class="card-button" type="danger" icon="el-icon-delete" circle></el-button>
                <el-button class="card-button" type="primary" icon="el-icon-edit" @click="visiable = true" circle></el-button>
            </div>
            <div>班级人数</div>
        </el-card>
        <el-dialog title="编辑班级信息" :visible.sync="visiable" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-dialog title="编辑班级名" :visible.sync="innerC" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" append-to-body>
                <el-form label-position="left" label-width="100px">
                    <el-form-item label="旧班级名">
                        <el-input value="计算机141" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="新班级名">
                        <el-input></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary">提交</el-button>
                    <el-button @click="innerC = false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加成员" :visible.sync="innerS" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" append-to-body>
                <div id="dialog-title">
                    <el-input placeholder="输入学工号">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-divider></el-divider>
                    <el-card>
                        <div slot="header">
                            <span>学工号</span>
                            <el-button class="card-button" type="primary" icon="el-icon-plus" @click="innerS = false" circle></el-button>
                        </div>
                        <div>姓名</div>
                    </el-card>
                </div>
            </el-dialog>
            <el-form label-position="left" label-width="100px">
                <span class="error-message">错误讯息</span>
                <el-form-item label="班级名">
                    <el-input value="计算机141" disabled>
                        <el-button slot="append" @click="innerC = true">修改班级名</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="班级成员">
                    <el-tag closable>胡昊</el-tag>
                    <el-tag closable>来银峰</el-tag>
                    <el-button class="button-new-tag" size="small" @click="innerS = true">+ 新增成员</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">保存</el-button>
                <el-button @click="visiable = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visiable: false,
            innerC: false,
            innerS: false
        }
    }
}
</script>

<style lang="scss" scoped>
    #container {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }

    #dialog-title {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }

    .card-button {
        float: right;
        padding: 8px;
        margin: 2px;
    }
</style>

