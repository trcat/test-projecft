<template>
    <div id="container">
        <el-input placeholder="搜索班级" v-model="searchValue" :disabled="disabled">
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
            <el-dialog title="编辑班级信息" :visible.sync="showEditClassDialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                <el-form label-position="left" label-width="100px" :model="editClassForm" ref="editClassForm" :rules="editClassFormRules" :disabled="disabled">
                    <el-form-item label="班级编号">
                        <el-input v-model="editClassForm.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="班级名" prop="class_name">
                        <el-input v-model="editClassForm.class_name"></el-input>
                    </el-form-item>
                    <el-form-item label="班级成员">
                        <el-tag v-for="item in classMembers" :key="item.id" @close="removeMember(item)" closable>
                            {{item.username}} / {{item.id}} / {{item.gender}}
                        </el-tag>
                        <el-tag key="add" @click="addMember(editClassForm)">
                            + 添加成员
                        </el-tag>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :disabled="disabled" :loading="loading" @click="saveClass('editClassForm')" >保 存</el-button>
                    <el-button @click="showEditClassDialog = false" :disabled="disabled">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加成员" :visible.sync="showAddMemberDialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" append-to-body>
                <div id="member-dialog-container">
                    <el-input placeholder="搜索账户" v-model="searchMemberValue" :disabled="disabled">
                        <el-button slot="append" icon="el-icon-search" :disabled="disabled" :loading="loading" @click="searchMember(searchMemberValue)"></el-button>
                    </el-input>
                    <template v-if="member">
                        <el-divider></el-divider>
                        <el-card>
                            <div slot="header">
                                <span>{{member.id}}</span>
                                <el-button class="card-button" type="primary" icon="el-icon-plus" @click="addMember(member)" :disabled="disabled" circle></el-button>
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
            editClassForm: {
                id: "",
                class_name: ""
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

        },
        editClass(classData) {

        },
        deleteClass(classData) {

        },
        saveClass(formName) {

        },
        removeMember(memberData) {

        },
        searchMember(val) {

        },
        addMember(memberData) {

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
