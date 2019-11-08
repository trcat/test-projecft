<template>
    <container>
       <el-card>
           <el-col 
                :span="20"
                :offset="2">
                <h1>登录</h1>
                <el-form :rules="rules" ref="loginForm" :model="loginForm">
                    <el-form-item prop="account">
                            <el-input 
                                v-model="loginForm.account"
                                :disabled="disabled">
                                <el-select 
                                    slot="prepend"
                                    v-model="loginForm.accountStyle"
                                    :disabled="disabled">
                                    <el-option
                                        v-for="option in loginForm.accountStyleOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"/>
                                </el-select>
                            </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                            <el-input 
                                v-model="loginForm.password"
                                :disabled="disabled">
                                <div slot="prepend">密码</div>
                            </el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class="error-message">{{loginForm.errorMessage}}</span>
                    </el-form-item>
                </el-form>
                <div id="footer">
                    <el-button 
                      type="primary" 
                      @click="onLogin('loginForm')"
                      :disabled="disabled"
                      :loading="loading">登录</el-button>
                    <el-button 
                      @click="onFindPassword"
                      :disabled="disabled">忘记密码</el-button>
                </div>
           </el-col>
       </el-card>
    </container>
</template>

<script>
import centerContainer from "../components/centerContainer.vue";
import $ from "jquery";
import "jquery.cookie";
import API from "./login-rest.js";

let STYLE = {
    defalut: "0",
    email: "1"
  };
let STYLE_MAP = {
    [STYLE.defalut]: "学工号",
    [STYLE.email]: "邮箱"
  };

export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
        errorMessage: "",
        accountStyle: STYLE.defalut,
        accountStyleOptions: [
          {
            value: STYLE.defalut,
            label: STYLE_MAP[STYLE.defalut]
          },
          {
            value: STYLE.email,
            label: STYLE_MAP[STYLE.email]
          }
        ],
      },
      disabled: false,
      loading: false,
      rules: {
        account: [
          {required: true, message: '请输入正确的学工号或邮箱', trigger: "blur"}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: "blur"}
        ]
      }
    };
  },
  components: {
    container: centerContainer
  },
  methods: {
    onLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.loginForm;
          const callback = (data) => {
            if (data.state) {
              //将 token 保存在 cookie，将 user data 保存在 store 中
              $.cookie("token", data.token);
              this.$store.commit("updateUser", data.data);
              //跳转进 user 页面
              this.$router.push("/user");
              
            } else {
              //显示错误讯息
              form.errorMessage = data.message;
              //恢复 input 和 button 成可编辑状态
              this.disabled = true;
              this.loading = true;
            }
          }

          //让 input 和 button 处于 disabled 状态，button 额外处于 loading 状态
          this.disabled = true;
          this.loading = true;

          //更加 accountStyle 呼叫对应的 API 接口实现登录操作
          switch (form.accountStyle) {
            case STYLE.defalut:
              API.loginByAccount(form.account, form.password, callback);
              break;
            case STYLE.email:
              API.loginByEmail(form.account, form.password, callback);
              break;
          }
        } else {
          alert("表单内容有误，请检查并重新填写！");
          return false;
        }
      })
    },
    onFindPassword(e) {
      e.stopPropagation();

      //跳转至忘记密码页面
      this.$router.push("/find-password");
    },
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  width: 70%;
  margin-top: 30%;
  margin-left: auto;
  margin-right: auto;
  .el-col {
    margin-bottom: 30px;
  }
  h1 {
    text-align: center;
  }
  .el-form {
    margin-top: 30px;
    .el-input {
      .el-select {
        width: 100px;
      }
      div {
        width: 60px;
      }
    }
  }
  #footer {
    float: right;
  }
}
</style>
