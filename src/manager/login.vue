<template>
    <div id="login-main">
        <div id="login-title">
            登录
        </div>
        <div id="login-content">
            <div 
                id="login-error-message"
                class="error-message">
                {{errorMessage}}
            </div>
            <div class="login-input">
                <el-input 
                    placeholder="学工号"
                    v-model="account"></el-input>
            </div>
            <div class="login-input">
                <el-input 
                    placeholder="密码"
                    v-model="password"></el-input>
            </div>
            <div id="login-forget-password">
                <el-link >忘记密码</el-link>
            </div>
        </div>
        <div id="login-button">
            <el-button type="primary"
                       class="button">登录</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                errorMessage: "登录失败",
                account: "",
                password: ""
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import url(../scss/message.scss);

    #login-main {
        width: 314px;
        height: 366px;
        margin-top: 229px;
        margin-left: auto;
        margin-right: auto;
        border-style: solid;
        border-width: 1px;
        border-color: #ffffff;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        #login-title {
            font-size: 24px;
            text-align: center;
            margin-top: 34px;
        }
        #login-content {
            overflow: hidden;
            width: 240px;
            margin-top: 25px;
            margin-left: auto;
            margin-right: auto;
            font-size: 14px;
            #login-error-message {
                height: 20px;
            }
            .login-input {
                margin-top: 10px;
            }
            #login-forget-password {
                margin-top: 10px;
                float: right;
            }
        }
        #login-button {
            width: 240px;
            margin-top: 26px;
            margin-left: auto;
            margin-right: auto;
            .button {
                width: 100%;
            }
        }
    }
</style>