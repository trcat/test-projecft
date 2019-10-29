<template>
    <div id="form" class="default-box">
        <h2>修改秘密</h2>
        <el-form id="form-content" label-width="100px" label-position="left">
            <el-form-item label="新密码" required="true">
                <el-input type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" required="true">
                <el-input type="email" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">提交</el-button>
            </el-form-item>
        </el-form>
        <div class="error-message">错误讯息</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    #form {
        margin-top: 10%;
        padding: 5%;
    }
    #form-content {
        margin-top: 5%;
    }
</style>
