<template>
    <container>
       <el-card>
           <el-col 
                :span="20"
                :offset="2">
                <h1>登录</h1>
                <el-form>
                    <el-form-item>
                            <el-input 
                                v-model="account">
                                <el-select 
                                    slot="prepend"
                                    v-model="accountType">
                                    <el-option
                                        v-for="option in accountTypeOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"/>
                                </el-select>
                            </el-input>
                    </el-form-item>
                    <el-form-item>
                            <el-input 
                                v-model="password">
                                <span slot="prepend">密码</span>
                            </el-input>
                    </el-form-item>
                </el-form>
                <div id="footer">
                    <el-button type="primary" @click="onLogin">登录</el-button>
                    <el-button onFindPassage>忘记密码</el-button>
                </div>
           </el-col>
       </el-card>
    </container>
</template>

<script>
import centerContainer from "../components/centerContainer.vue";

let ACCOUNT_TYPE = {
  defalut: "0",
  email: "1"
};
let ACCOUNT_TYPE_MAP = {
  [ACCOUNT_TYPE.defalut]: "学工号",
  [ACCOUNT_TYPE.email]: "邮箱"
};

export default {
  data() {
    return {
      account: "",
      password: "",
      accountType: ACCOUNT_TYPE.defalut,
      accountTypeOptions: [
        {
          value: ACCOUNT_TYPE.defalut,
          label: ACCOUNT_TYPE_MAP[ACCOUNT_TYPE.defalut]
        },
        {
          value: ACCOUNT_TYPE.email,
          label: ACCOUNT_TYPE_MAP[ACCOUNT_TYPE.email]
        }
      ]
    };
  },
  components: {
    container: centerContainer
  },
  methods: {
      onLogin(e) {
          e.stopPropagation();
          
      },
      onFindPassage(e) {
          e.stopPropagation();
      }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 30%;
  .el-col {
      margin-bottom: 30px;
  }
  h1 {
    text-align: center;
  }
  .el-form {
    margin-top: 30px;
    .el-select {
      width: 100px;
    }
  }
  #footer {
      float: right;
  }
}
</style>
