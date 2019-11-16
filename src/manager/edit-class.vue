<template>
    <div id="container">
        <el-input placeholder="请输入班级名" v-model="searchValue" :disabled="disabled">
            <el-button slot="append" icon="el-icon-search" :disabled="disabled" :loading="loading" @click="searchClass(searchValue)"></el-button>
        </el-input>
        <template v-if="classes.length > 0">
            <el-divider></el-divider>
            <el-card v-for="item in classes" :key="item.id">
                <div slot="header">
                    <span>{{item.class_name}}</span>
                    <el-button class="card-button" type="danger" icon="el-icon-delete" @click="deleteClass(item)" :disabled="disabled" :loading="loading" circle></el-button>
                    <el-button class="card-button" type="primary" icon="el-icon-edit" @click="editClass(item)" :disabled="disabled" circle></el-button>
                </div>
                <div>班级编号: {{item.id}}</div>
            </el-card>
            <el-dialog title="编辑班级信息" :visible.sync="showEditClassDialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" v-loading="loadingClassMembers">
                <el-form label-position="left" label-width="100px" :model="editClassForm" ref="editClassForm" :rules="editClassFormRules" :disabled="disabled" hide-required-asterisk>
                    <el-form-item label="班级编号">
                        <el-input v-model="editClassForm.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="班级名" prop="class_name">
                        <el-input v-model="editClassForm.class_name"></el-input>
                    </el-form-item>
                    <el-form-item label="班级成员">
                        <el-tag v-for="item in editClassForm.classMembers" :key="item.id" @close="removeMember(item)" closable>
                            {{item.username}} / {{item.id}} / {{item.gender}}
                        </el-tag>
                        <el-tag key="add" @click="showAddMemberDialog=true;searchValue='';member=null">
                            + 添加成员
                        </el-tag>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :disabled="disabled" :loading="loading" @click="saveClass('editClassForm')" >保 存</el-button>
                    <el-button @click="showEditClassDialog = false" :disabled="disabled">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加成员" :visible.sync="showAddMemberDialog" :close-on-press-escape="false" :show-close="false" append-to-body>
                <div id="member-dialog-container">
                    <el-input placeholder="请输入学工号" v-model="searchMemberValue" :disabled="disabled">
                        <el-button slot="append" icon="el-icon-search" :disabled="disabled" :loading="loading" @click="searchMember(searchMemberValue)"></el-button>
                    </el-input>
                    <template v-if="member">
                        <el-divider></el-divider>
                        <el-card>
                            <div slot="header">
                                <span>{{member.id}}</span>
                                <el-button class="card-button" type="primary" icon="el-icon-plus" @click="addMember(member, editClassForm)" :disabled="disabled" circle></el-button>
                            </div>
                            <div>姓名: {{member.username}}</div>
                            <div>账号类型: {{member.identity}}</div>
                        </el-card>
                    </template>
                </div>
            </el-dialog>
        </template>
    </div>
</template>

<script>
import API from "./edit-class-rest.js";
import userProfilAPI from "./user-profile-rest.js";
import editAccountAPI from "./edit-account-rest.js";


export default {
    data() {
        return {
            searchValue: "",
            searchMemberValue: "",
            disabled: false,
            loading: false,
            classes: [],
            member: null,
            showEditClassDialog: false,
            showAddMemberDialog: false,
            loadingClassMembers: false,
            editClassForm: {
                id: "",
                class_name: "",
                classMembers: []
            },
            editClassFormRules: {
                class_name: [{
                    required: true, message: "请输入正确的班级名！", trigger: "blur"
                }]
            }
        };
    },
    methods: {
        searchClass(val) {
            const callback = (r) => {
                this.$message({
                    message: r.message,
                    type: r.state ? "success" : "error"
                });

                if (r.state) {
                    this.classes = r.data;
                    if (this.classes.length === 0) {
                        this.$message({
                            message: "未找到匹配内容！"
                        });
                    }
                }

                this._reset();
            };

            this._loading();
            API.searchClass(val, callback);
        },
        editClass(classData) {
            this.editClassForm.id = classData.id;
            this.editClassForm.class_name = classData.class_name;
            this.showEditClassDialog = true;

            const callback = (r) => {
                if (r.state) {
                    console.log('member');
                    console.log(r.data.data);
                    this.editClassForm.classMembers = r.data.data;
                    this.loadingClassMembers = false;
                }
            }
            this.loadingClassMembers = true;
            API.getClassMembers(classData.id, 100, 1, callback);

        },
        deleteClass(classData) {
            const callback = (r) => {
                if (r.state) {
                    this.$message({
                        message: "成功删除编辑！",
                        type: "success"
                    });

                    const newClass = [];
                    this.classes.forEach((i) => {
                        if (i.id !== classData.id) {
                            newClass.push(i);
                        }
                    });
                    this.classes = newClass;
                } else {
                    this.$message({
                        message: r.message,
                        type: "error"
                    });
                }

                this._reset();
            }

            this._loading();
            API.deleteClass(classData.id, callback);
        },
        saveClass(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const callback = (r) => {
                        this.$message({
                            message: r.message,
                            type: r.state ? "success" : "error"
                        });
                        this._reset();
                    }

                    this._loading();
                    API.saveClass(this.editClassForm.id, this.editClassForm.class_name, callback);
                } else {
                    this.$message({
                        message: "表单内容有误，请检查并重新填写！",
                        type: "error"
                    })
                    return false;
                }
            })
        },
        removeMember(memberData) {
            const callback = (r) => {
                this.$message({
                    message: r.message,
                    type: r.state ? "success" : "error"
                });

                if (r.state) {
                    const members = [];
                    this.editClassForm.classMembers.forEach((i) => {
                        if (i.id !== memberData.id) {
                            members.push(i);
                        }
                    });
                    this.editClassForm.classMembers = members;
                }

                this._reset();
            }
            const _data = Object.assign({}, memberData);
            _data.my_class = null;

            this._loading();
            userProfilAPI.saveProfile(_data, callback);
        },
        searchMember(val) {
            const callback = (r) => {
                this.$message({
                    message: r.message,
                    type: r.state ? "success" : "error"
                });
                
                if (r.state) {
                    this.member = r.data;
                    if (!this.member) {
                        this.$message({
                            message: "未找到匹配内容！"
                        })
                    }
                }

                this._reset();
            }

            this._loading();
            editAccountAPI.searchUser(val, callback);
        },
        addMember(memberData, classData) {
            const callback = (r) => {
                this.$message({
                    message: r.message,
                    type: r.state ? "success" : "error"
                });

                if (r.state) {
                    const members = this.editClassForm.classMembers.concat();
                    members.push(r.data)
                    this.editClassForm.classMembers = members;
                    this.member = null;
                }

                this._reset();
            }
            const _data = Object.assign({}, memberData);
            _data.my_class = classData.id;

            this._loading();
            userProfilAPI.saveProfile(_data, callback);
        },
        _loading() {
            this.disabled = true;
            this.loading = true;
        },
        _reset() {
            this.disabled = false;
            this.loading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    #container {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
        #member-dialog-container {
            width: 60%;
            margin-left: auto;
            margin-right: auto;
        }
    }

    .card-button {
        float: right;
        padding: 8px;
        margin: 2px;
    }
</style>
