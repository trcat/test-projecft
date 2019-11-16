<template>
    <el-form label-position="left" label-width="100px" :model="form" ref="form" :rules="rules" :disabled="disabled" hide-required-asterisk>
        <el-form-item label="账号类型">
            <el-radio-group v-model="form.identity">
                <el-radio label="student">学生</el-radio>
                <el-radio label="teacher">教师</el-radio>
                <el-radio label="administrator">管理员</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.identity === 'student'" label="所属班级" prop="class">
            <el-select v-model="form.class" placeholder="班级">
                <el-option v-if="form.classOptions.length === 0" v-loading="formLoading" key="empty" value="empty" label="无可选班级"></el-option>
                <el-option
                    v-for="item in form.classOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学工号" prop="id">
            <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
                <el-radio label="male">男</el-radio>
                <el-radio label="female">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="loading" @click="createAccount('form')">创建账号</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import API from "./add-account-rest.js";

export default {
    data() {
        return {
            form: {
                identity: "student",
                class: null,
                classOptions: [],
                id: "",
                name: "",
                gender: "male",
                phone: "",
                email: "",
            },
            disabled: false,
            loading: false,
            formLoading: true,
            rules: {
                id: [{
                    required: true, message: "请填写学工号", trigger: "blur"
                }],
                name: [{
                    required: true, message: "请填写姓名", trigger: "blur"
                }],
                phone: [{
                    required: true, message: "请填写联系方式", trigger: "blur"
                }],
                email: [{
                    required: true, message: "请填写邮箱地址", trigger: "blur"
                }]
            }
        }
    },
    methods: {
        createAccount(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const callback = (r) => {
                        if (r.state) {
                            this.$message({
                                message: "创建成功！",
                                type: "success"
                            });
                        } else {
                            this.$message({
                                message: r.message,
                                type: "error"
                            });
                        }
                        
                        this.disabled = false;
                        this.loading = false;
                    }
                    
                    //修改 input 和 button 状态
                    this.disabled = true;
                    this.loading = true;
                    //转换数据
                    const _data = {
                        identity: this.form.identity,
                        my_class: this.form.class ? this.form.class : null,
                        id: this.form.id,
                        username: this.form.name,
                        gender: this.form.gender,
                        phone: this.form.phone,
                        email: this.form.email,
                    }
                    API.createAccount(_data, callback);
                } else {
                    this.$message({
                        message: "表单内容有误，请检查并重新填写！",
                        type: "error"
                    });
                    return false;
                }
            })
        }
    },
    mounted() {
        //获取 class options
        const callback = (r) => {
            let classOptions = [{
                value: "-1",
                label: "班级数据获取失败！"
            }];

            if (r.state) {
                classOptions = r.data.map((r) => {
                    return {
                        value: r.id,
                        label: r.class_name
                    }
                })
            }

            this.form.classOptions = classOptions;
        }

        API.getClassOptions(callback);
    },
    updated() {
        if (this.formLoading) {
            this.formLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-form {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
