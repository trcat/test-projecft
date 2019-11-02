<template>
    <div>
        <el-form label-position="left" label-width="100px">
            <el-form-item label="学工号">
                <span>xxxxxx</span>
            </el-form-item>
            <el-form-item label="姓名">
                <span>DayDayBigKing</span>
            </el-form-item>
            <el-form-item v-if="type === '学生'" label="所属班级">
                <span>计算机141班</span>
            </el-form-item>
            <el-form-item label="性别">
                <span>男</span>
            </el-form-item>
            <el-form-item label="联系电话">
                <span>17855860685</span>
            </el-form-item>
            <el-form-item label="邮箱">
                <span>daydaybigking@sina.com</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="visiable = true">编辑</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="编辑个人信息" :visible.sync="visiable" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form label-position="left" label-width="100px">
                <span class="error-message">错误讯息</span>
                <el-form-item label="学工号">
                    <el-input value="xxx" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input value="胡昊" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input value="17855860685"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input type="email" value="daydaybigking@sina.com"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-button @click="inner = true">修改密码</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">保存</el-button>
                <el-button @click="visiable = false">取 消</el-button>
            </div>
            <el-dialog title="修改密码" :visible.sync="inner" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" append-to-body>
                <el-form label-position="left" label-width="100px">
                    <span class="error-message">错误讯息</span>
                    <el-form-item label="旧密码">
                        <el-input type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" show-password></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary">提交</el-button>
                    <el-button @click="inner = false">取 消</el-button>
                </div>
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
       return {
           type: "学生",
           visiable: false,
           inner: false
       }
    }
}
</script>

<style lang="scss" scoped>
    .el-form {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
