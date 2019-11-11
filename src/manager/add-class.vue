<template>
    <el-form label-position="left" label-width="100px" :model="form" ref="form" :rules="rules" :disabled="disabled" hide-required-asterisk>
        <el-form-item label="班级名" prop="className">
            <el-input v-model="form.class_name">
                <el-button slot="append" type="primary" :loading="loading" @click="createClass('form')">提交</el-button>
            </el-input>
        </el-form-item>
    </el-form>
</template>

<script>
import API from "./add-class-rest.js";

export default {
    data() {
        return {
            form: {
                class_name: ""
            },
            rules: {
                className: [{
                    required: true, message: "请填写班级名", trigger: "blur"
                }]
            },
            disabled: false,
            loading: false
        }
    },
    methods: {
        createClass(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const callback = (r) => {
                        this.$message({
                            message: r.message,
                            type: r.state ? "success" : "error"
                        });
                        this.form.class_name = "";
                        this.disabled = false;
                        this.loading = false;
                    }

                    this.disabled = true;
                    this.loading = true;
                    API.createClass(this.form.class_name, callback);
                } else {
                    this.$message({
                        message: "请填写班级名",
                        type: "error"
                    })
                }
            })
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

