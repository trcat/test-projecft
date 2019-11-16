<template>
    <div v-if="user">
        <el-form label-position="left" label-width="100px" :model="user">
            <el-form-item label="学工号">
                <span>{{user.id}}</span>
            </el-form-item>
            <el-form-item label="姓名">
                <span>{{user.name}}</span>
            </el-form-item>
            <el-form-item v-if="user.identity === 'student'" label="所属班级">
                <span>{{user.class}}</span>
            </el-form-item>
            <el-form-item label="性别">
                <span>{{user.gender}}</span>
            </el-form-item>
            <el-form-item label="联系电话">
                <span>{{user.phone}}</span>
            </el-form-item>
            <el-form-item label="邮箱">
                <span>{{user.email}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="openEditProfileDialog">编 辑</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="编辑个人信息" :visible.sync="editProfile" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form label-position="left" label-width="100px" :model="profileForm" ref="profileForm" :rules="profileFormRules" hide-required-asterisk>
                <el-form-item label="学工号">
                    <el-input v-model="user.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="user.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="profileForm.phone" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" v-model="profileForm.email" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-button @click="openEditPasswordDialog" :disabled="disabled">修改密码</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveProfile('profileForm')" :disabled="disabled" :loading="loading">保 存</el-button>
                <el-button @click="editProfile = false" :disabled="disabled">取 消</el-button>
            </div>
            <el-dialog title="修改密码" :visible.sync="editPassword" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" append-to-body>
                <el-form label-position="left" label-width="100px" :model="passwordForm" ref="passwordForm" :rules="passwordForm" hide-required-asterisk>
                    <el-form-item label="旧密码" prop="oldPassword">
                        <el-input type="password" v-model="passwordForm.oldPassword" show-password :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="passwordForm.newPassword" show-password :disabled="disabled"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="savePassword('passwordForm')" :disabled="disabled" :loading="loading">提交</el-button>
                    <el-button @click="editPassword = false" :disabled="disabled">取 消</el-button>
                </div>
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script>
import API from "./user-profile-rest.js";

export default {
    data() {
       return {
           editProfile: false,
           editPassword: false,
           profileForm: {
               phone: "",
               email: ""
           },
           profileFormRules: {
               phone: [{
                   required: true, message: "请填写正确的电话号码", trigger: "blur"
               }],
               email: [{
                   type: "email", required: true, message: "请填写正确的邮箱地址", trigger: "blur"
               }]
           },
           passwordForm: {
               oldPassword: "",
               newPassword: ""
           },
           passwordFormRules: {
               oldPassword: [{
                   required: true, message: "请填写原先的密码", trigger: "blur"
               }],
               newPassword: [{
                   required: true, message: "请填写新密码", trigger: "blur"
               }]
           },
           loading: false,
           disabled: false
       }
    },
    computed: {
        user() {
            const storeUser = this.$store.state.user;

            if (storeUser) {
                return this._transUserData(storeUser);
            }

            return null;
        }
    },
    methods: {
        openEditProfileDialog(e) {
            e.stopPropagation();

            //给编辑 profile 的 input 赋值
            this.profileForm.phone = this.user.phone;
            this.profileForm.email = this.user.email;
            this.editProfile = true;
        },
        openEditPasswordDialog(e) {
            e.stopPropagation();

            this.passwordForm.oldPassword = "";
            this.passwordForm.newPassword = "";
            this.editPassword = true
        },
        saveProfile(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const callback = (r) => {
                        if (r.state) {
                            //成功，更新返回的 user data 数据至 store
                            this.$store.commit("updateUser", r.data);
                            //弹出编辑成功的字样
                            this.$message({
                                message: "保存成功！",
                                type: "success"
                            });
                        } else {
                            //显示错误讯息
                            this.$message({
                                message: r.message,
                                type: "error"
                            });
                        }

                        //无论正确与否，input 和 button 的状态都会回复
                        this._reset();
                    }
                    
                    //修改 input 和 button 状态
                    this._startLoading();

                    const _userData = Object.assign(this.user, this.profileForm);
                    API.saveProfile(this._transStoreUser(_userData), callback);

                } else {
                    this.$message({
                        message: "表单内容有误，请检查并重新填写！",
                        type: "error"
                    });
                    return false;
                }
            })
        },
        savePassword(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //判断填写的新旧密码是否一致
                    if (this.passwordForm.oldPassword === this.passwordForm.newPassword) {
                        this.$message({
                            message: "新旧密码不能一样！",
                            type: "error"
                        });

                        return false;
                    }

                    const callback = (r) => {
                        if (r.state) {
                            //成功，则显示修改密码成功
                            this.$message({
                                message: "密码修改成功",
                                type: "success"
                            })
                        } else {
                            this.$message({
                                message: r.message,
                                type: "error"
                            });
                        }
                        this._reset();
                    }

                    //更改 input 和 button 状态
                    this._startLoading();

                    const _userData = Object.assign(this.user, this.passwordForm);
                    API.savePassword(this._transStoreUser(_userData), callback);
                } else {
                    this.$message({
                        message: "表单内容有误，请检查并重新填写！",
                        type: "error"
                    });
                    return false;
                }
            })
        },
        /**
         * @param {Object} storeUser 传入的 user 为 store.state.user
         * @return {Object} profile form 可使用的数据
         */
        _transUserData(storeUser) {
            return {
                id: storeUser.id,
                name: storeUser.username,
                phone: storeUser.phone,
                email: storeUser.email,
                gender: storeUser.gender === "male" ? "男" : "女",
                class: storeUser.my_class,
                identity: storeUser.identity
            }
        },
        /**
         * @param {Object} user 传入的 user 为 this.user，既 profile form 可用的数据
         * @param {Object} 可以直接存入 store.state.user 并传给后端的数据结构
         */
        _transStoreUser(user) {
            const result = {
                id: user.id,
                username: user.name,
                phone: user.phone,
                email: user.email,
                gender: user.gender === "男" ? "male" : "female",
                my_class: user.class,
                identity: user.identity,
            }

            if (user.oldPassword && user.newPassword) {
                result.old_password = user.oldPassword;
                result.new_password = user.newPassword;
            }

            return result;
        },
        _startLoading() {
            this.disabled = true;
            this.loading = true;
        },
        _reset() {
            this.disabled = false;
            this.loading = false;
        }
    },
}
</script>

<style lang="scss" scoped>
    .el-form {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
