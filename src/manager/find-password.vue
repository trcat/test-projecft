<template>
    <container>
        <el-card>
            <h1>找回密码</h1>
            <el-form 
                :model="findForm" 
                :rules="rules" 
                ref="findForm"
                label-position="left"
                label-width="80px"
                hide-required-asterisk>
                <el-form-item prop="account" label="学工号">
                    <el-input v-model="findForm.account" :disabled="disabled"/>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input type="email" v-model="findForm.email" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="error-message">{{findForm.errorMessage}}</span>
                </el-form-item>
            </el-form>
            <div id="footer">
                <el-button 
                    type="primary" 
                    @click="setEmail('findForm')"
                    :disabled="disabled"
                    :loading="loading">
                    {{buttonName}}
                </el-button>
            </div>
        </el-card>
    </container>
</template>

<script>
import centerContainer from "../components/centerContainer.vue";
import API from "./find-password-rest.js";
import { setInterval, clearInterval } from 'timers';

const buttonName = "发送验证码至邮箱";
let timer = null;
let count = 60;

export default {
    data() {
        return {
            findForm: {
                account: "",
                email: "",
                errorMessage: ""
            },
            rules: {
                account: [
                    {required: true, message: '请输入正确的学工号', trigger: "blur"}
                ],
                email: [
                    {type: "email", required: true, message: '请输入已绑定的邮箱', trigger: "blur"}
                ]
            },
            buttonName: buttonName,
            disabled: false,
            loading: false
        }
    },
    components: {
        container: centerContainer
    },
    methods: {
        _reset() {
            this.disabled = false;
            this.loading = false;
            this.buttonName = buttonName;
            clearInterval(timer);
            count = 60;
            timer = null;
        },
        /**
         * @param {string} formName
         */
        setEmail(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const form = this.findForm;
                    const callback = function (data) {
                        if (data.state) {
                            //将 data 存至 localstorage，修改密码时用
                            localStorage.setItem("modifyPasswordData", data.data);
                        } else {
                            //显示错误讯息
                            form.errorMessage = data.message;
                            //恢复 input 和 button 促使状态
                            this._reset();
                        }
                    }

                    //更改 input 和 button 的状态
                    this.disabled = true;
                    this.loading = true;
                    //button 倒计时 60s
                    this.buttonName = `邮件已发送，${count} 秒后可重新发送！`
                    timer = setInterval(() => {
                        if (count === 0) {
                            //当 60s 倒计时结束后，恢复 input 和 button 的状态
                            this._reset();
                        } else {
                            count = count - 1;
                            this.buttonName = `邮件已发送，${count} 秒后可重新发送！`
                        }
                    }, 1000);
                    //呼叫后端 API 实现发送验证码的操作
                    API.getModifyPasswordData(form.account, form.email, callback);
                } else {
                    alert("表单内容有误，请检查并重新填写！");
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-card {
        width: 70%;
        margin-top: 30%;
        margin-left: auto;
        margin-right: auto;
        padding: 5%;
        .el-form {
            margin-top: 30px;
            .el-input {
                .el-select {
                    width: 100px;
                }
            }
        }
        #footer {
            float: right;
        }
    }
</style>

