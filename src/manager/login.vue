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
                    :disabled="disabled"
                    v-model="account"></el-input>
            </div>
            <div class="login-input">
                <el-input 
                    placeholder="密码"
                    type="password"
                    v-model="password"
                    :disabled="disabled"
                    show-password></el-input>
            </div>
            <div id="login-forget-password">
                <el-link @click="findPassword">忘记密码</el-link>
            </div>
        </div>
        <div id="login-button">
            <el-button type="primary"
                       class="button"
                       :loading="loading"
                       :disabled="disabled"
                       @click="login">登录</el-button>
        </div>
    </div>
</template>

<script>

    import API from "../API/login.js";

    const errorMessages = {
        empty: "账号或密码填写有误！"
    };

    export default {
        name: "Login",
        data() {
            return {
                errorMessage: "",
                account: "",
                password: "",
                loading: false,
                disabled: false,
            }
        },
        methods: {
            login(e) {
                e.stopPropagation();
                this._clearErrorMessage();
                //step 1，检查 input 是否都有内容
                if (this.account && this.password) {
                    //step 2, 修改 input & button 状态
                    this.loading = true;
                    this.disabled = true
                    //step 3，呼叫后端 API 申请登录
                    const callback = (data) => {
                        if (data.success) {
                            this.loading = false;
                            //step 4, 记录 userId & token 至 cookie 中
                            
                            this.$store.commit("setUserId", this.account);
                            this.$store.commit("setToken", data.token);
                            //step 5, 跳转至主页面
                            this.$router.push("/main");
                        } else {
                            //登录失败，恢复 input & button 可编辑状态
                            this.loading = false;
                            this.disabled = false;
                            this._showErrorMessage(data.message);
                        }
                    }
                    API.login(this.account, this.password, callback);
                    
                } else {
                    this._showErrorMessage(errorMessages.empty);
                }
            },
            findPassword(e) {
                e.stopPropagation();
                this.$router.push("/find-password");
            },
            _showErrorMessage(message) {
                alert(message);
                this.errorMessage = message;
            },
            _clearErrorMessage() {
                this.errorMessage = "";
            },
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