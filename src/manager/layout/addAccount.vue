<template>
    <el-form label-position="left" label-width="100px">
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
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input type="email"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">创建账号</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            radio: "学生",
            gender: "",
            value: "",
            options: [{label:"计算机 141", value:"计算机 141"},{label:"计算机 131", value:"计算机 131"}]
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-form {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
