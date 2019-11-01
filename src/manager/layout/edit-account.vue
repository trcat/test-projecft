<template>
    <div id="container">
        <el-input placeholder="输入学工号">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-divider></el-divider>
        <el-card>
            <div slot="header">
                <span>学工号</span>
                <el-button class="card-button" type="danger" icon="el-icon-delete" circle></el-button>
                <el-button class="card-button" type="primary" icon="el-icon-edit" @click="visiable = true" circle></el-button>
            </div>
            <div>姓名</div>
            <div>账号类型</div>
        </el-card>
        <el-dialog title="编辑个人信息" :visible.sync="visiable" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form label-position="left" label-width="100px">
                <span class="error-message">错误讯息</span>
                <el-form-item label="账号类型">
                    <el-radio-group v-model="radio">
                        <el-radio label="管理员">管理员</el-radio>
                        <el-radio label="教师">教师</el-radio>
                        <el-radio label="学生">学生</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="radio === '学生'" label="所属班级">
                    <el-select v-model="value" placeholder="班级">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学工号">
                    <el-input value="xxx"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input value="胡昊"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="gender">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input value="17855860685"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input type="email" value="daydaybigking@sina.com"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">保存</el-button>
                <el-button @click="visiable = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visiable: false
        }
    }
}
</script>

<style lang="scss" scoped>
    #container {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }

    .card-button {
        float: right;
        padding: 8px;
        margin: 2px;
    }
</style>
