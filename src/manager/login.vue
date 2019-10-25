<template>
    <div id="login-main">
        <div id="login-title">
            登录
        </div>
        <div id="login-content">
            <div id="login-error-message">
                <span class="error-message"></span>
            </div>
            <div id="login-input">
                <el-input></el-input>
            </div>
            <div id="login-input">
                <el-input></el-input>
            </div>
            <div id="login-forget-password">
                <a id="forget">忘记密码</a>
            </div>
        </div>
        <div id="login-button">
            <el-button></el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }

</script>

<style lang="scss" scoped>
    #login-main {
        width: 314px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px;
    }
</style>