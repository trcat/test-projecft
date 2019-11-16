<template>
    <container>
        <el-card>
            <el-button 
                type="text" 
                @click="getResetPassword" 
                :disabled="disabled"
                :loading="loading">
                <h1>{{buttonName}}</h1>
            </el-button>
        </el-card>
    </container>
</template>

<script>
import centerContainer from "../components/centerContainer.vue";
import API from "./modify-password-rest.js";

const buttonName = "发送重置密码至邮箱";
let timer = null;
let count = 60;

export default {
    data() {
        return {
            disabled: false,
            loading: false,
            buttonName: buttonName
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
        getResetPassword() {
            const data = localStorage.getItem("modifyPasswordData");
            
            const callback = (data) => {
                if (!data.state) {
                    alert(data.message);
                    this._reset();
                }
            }

            //更改 button 状态
            this.disabled = true;
            this.loading = true;

            //开始记时间，60s 后可重复操作
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

            //将 localStorage 中的 data 传至 API 中实现发送重置密码邮件的操作
            API.modifyPassword(data, callback);
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-card {
        width: 70%;
        margin-top: 30%;
        margin-right: auto;
        margin-left: auto;
        height: 300px;
        position: relative;
        .el-button {
            width: 70%;
            height: 10%;
            position:absolute;
            top:50%;
            left:50%;
            margin:-5% 0 0 -35%;
        }
    }
</style>
