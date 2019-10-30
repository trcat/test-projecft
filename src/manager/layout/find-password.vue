<template>
    <div id="form" class="default-box">
        <h2>找回密码</h2>
        <el-form id="form-content" label-width="100px" label-position="left">
            <el-form-item label="学工号">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="已绑定邮箱">
                <el-input type="email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">发送验证邮件至邮箱</el-button>
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

