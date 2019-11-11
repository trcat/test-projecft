<template>
    <div id="container">
        <el-form label-position="left" label-width="100px" :model="testForm" ref="testForm" :rules="testFormRules" :disabled="disabled" hide-required-asterisk>
            <el-form-item label="试卷名称" prop="name">
                <el-input v-model="testForm.name"></el-input>
            </el-form-item>
            <el-form-item label="试卷总分">
                <span>{{testForm.total}} 分</span>
            </el-form-item>
            <el-form-item>
                <el-button id="save-button" type="primary" @click="saveTest('testForm')" :loading="loading">创建试卷</el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <el-card v-for="(item, index) in questions" :key="item.id">
            <div slot="header">
                <span>试题 {{index}}} </span>
                <el-button class="card-button" type="danger" icon="el-icon-delete" @click="deleteQuestion(item)" circle></el-button>
                <el-button class="card-button" type="primary" icon="el-icon-edit" @click="editQuestion(item, index)" circle></el-button>
            </div>
            <div>题目: {{item.content}}</div>
            <div>分数: {{item.total}}</div>
        </el-card>
        <el-button id="add-question" @click="addQuestion">+ 添加试题</el-button>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="showQuestionDialog"
            :close-on-click-modal="false" 
            :close-on-press-escape="false" 
            :show-close="false"
            append-to-body>
            <el-form label-position="left" label-width="100px" :model="dialogForm" ref="dialogForm" :rules="dialogFormRules" :disabled="disabled" hide-required-asterisk>
                <el-form-item label="题目" prop="content">
                    <el-input type="textarea" v-model="dialogForm.content"></el-input> 
                </el-form-item>
                <el-form-item label="题目类型" prop="type">
                    <el-radio-group v-model="dialogForm.type">
                        <el-radio label="single">单选题</el-radio>
                        <el-radio label="multiple">多选题</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="题目分数" prop="score">
                    <el-input type="number" v-model="dialogForm.score">
                        <span slot="append">分</span>
                    </el-input>
                </el-form-item>
                <el-divider>编辑选项</el-divider>
                <el-form-item label="选项 A">
                    <el-input type="textarea" v-model="dialogForm.options.A.content"></el-input>
                </el-form-item>
                <el-form-item label="选项 B">
                    <el-input type="textarea" v-model="dialogForm.options.B.content"></el-input>
                </el-form-item>
                <el-form-item label="选项 C">
                    <el-input type="textarea" v-model="dialogForm.options.C.content"></el-input>
                </el-form-item>
                <el-form-item label="选项 D">
                    <el-input type="textarea" v-model="dialogForm.options.D.content"></el-input>
                </el-form-item>
                <template v-if="dialogForm.type==='multiple'">
                    <el-form-item label="选项 E">
                        <el-input type="textarea" v-model="dialogForm.options.E.content"></el-input>
                    </el-form-item>
                    <el-form-item label="选项 F">
                        <el-input type="textarea" v-model="dialogForm.options.F.content"></el-input>
                    </el-form-item>
                </template>
                <el-divider>答案与详解</el-divider>
                <el-form-item label="正确答案">
                    <el-button @click="configAnswer('A')" :type="dialogForm.options.A.type">A</el-button>
                    <el-button @click="configAnswer('B')" :type="dialogForm.options.B.type">B</el-button>
                    <el-button @click="configAnswer('C')" :type="dialogForm.options.C.type">C</el-button>
                    <el-button @click="configAnswer('D')" :type="dialogForm.options.D.type">D</el-button>
                    <template v-if="dialogForm.type==='multiple'">
                        <el-button @click="configAnswer('E')" :type="dialogForm.options.E.type">E</el-button>
                        <el-button @click="configAnswer('F')" :type="dialogForm.options.F.type">F</el-button>
                    </template>
                </el-form-item>
                <el-form-item label="题目详解" prop="description">
                    <el-input type="textarea" v-model="dialogForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showQuestionDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveQuestion('dialogForm')">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import API from "./add-test-rest.js";

export default {
    data() {
        return {
            testForm: {
                name: "",
                total: 0
            },
            testFormRules: {
                name: [{
                    required: true, message: "请填写试卷名称", trigger: "blur"
                }]
            },
            questions: [],
            dialogTitle: "",
            dialogForm: {
                id: "",
                content: "",
                type: "single",
                sroce: "",
                options: {
                    A: {
                        content: "",
                        type: ""
                    },
                    B: {
                        content: "",
                        type: ""
                    },
                    C: {
                        content: "",
                        type: ""
                    },
                    D: {
                        content: "",
                        type: ""
                    },
                    E: {
                        content: "",
                        type: ""
                    },
                    F: {
                        content: "",
                        type: ""
                    },
                },
                answer: [],
                description: "",
            },
            dialogFormRules: {
                content: [{
                    required: true, message: "请填写题目文本！", trigger: "blur"
                }],
                type: [{
                    required: true, message: "请选择题目类型！", trigger: "blur"
                }],
                score: [{
                    required: true, message: "请设置题目得分！", trigger: "blur"
                }]
            },
            showQuestionDialog: false,
            disabled: false,
            loading: false
        }
    },
    methods: {
        saveTest(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.questions.length === 0) {
                        this.$message({
                            message: "试卷至少要有一题！",
                            type: "error"
                        });
                        return false;
                    }

                    const callback = (r) => {
                        this.$message({
                            message: r.message,
                            type: r.state ? "success" : "error"
                        });
                        
                        this._reset();
                    }
                    this._loading();
                    const _data = {
                        name: this.testForm.name,
                        question_number: this.questions.length,
                        total: this.testForm.total,
                        user: this.$store.state.user,
                        questions: this.questions.map((q) => {
                            const r = {
                                type: q.type,
                                content: q.content,
                                score: parseInt(q.score),
                                description: q.description,
                                answer: q.answer,
                                questions: [
                                    q.questions.A.content,
                                    q.questions.B.content,
                                    q.questions.C.content,
                                    q.questions.D.content
                                ]
                            };

                            if (r.type === "multiple") {
                                r.questions.push(q.questions.E.content);
                                r.questions.push(q.questions.F.content);
                            }
                        })
                    };
                    API.createTest(_data, callback);
                } else {
                    this.$message({
                        message: "表单内容有误，请检查并重新填写！",
                        type: "error"
                    });
                    return false;
                }
            })
        },
        addQuestion() {
            this.dialogTitle = "添加试题"
            this.dialogForm = {
                id: Date.now().toString(),
                content: "",
                type: "single",
                sroce: "",
                options: {
                    A: {
                        content: "",
                        type: ""
                    },
                    B: {
                        content: "",
                        type: ""
                    },
                    C: {
                        content: "",
                        type: ""
                    },
                    D: {
                        content: "",
                        type: ""
                    },
                    E: {
                        content: "",
                        type: ""
                    },
                    F: {
                        content: "",
                        type: ""
                    },
                },
                answer: [],
                description: "",
            }
            this.showQuestionDialog = true;
        },
        editQuestion(questionData, index) {
            this.dialogTitle = `编辑试题 ${index}`;
            this.dialogForm = questionData;
            this.showQuestionDialog = true;
        },
        deleteQuestion(questionData) {
            const result = [];
            this.questions.forEach((q) => {
                if (q.id !== questionData.id) {
                    result.push(q);
                }
            });
            this.questions = result;
            this._computeTotal();
        },
        saveQuestion(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let stop = false;
                    for (let o in this.dialogForm.options) {
                        if (!this.dialogForm.options[o].content) {
                            this.$message({
                                message: "选项内容不能为空！",
                                type: "error"
                            });
                            stop = true;
                            break;
                        }
                    }

                    if (stop) {
                        return false;
                    }
                    
                    if (this.dialogForm.answer.length === 0) {
                        this.$message({
                            message: "请设置试题答案！",
                            type: "error"
                        });
                        return false;
                    }

                    const questions = this.questions.concat();
                    this.questions.forEach((q, index) => {
                        if (q.id === this.dialogForm.id) {
                            questions[index] = this.dialogForm;
                            stop = true;
                        }
                    })
                    if (!stop) {
                        questions.push(this.dialogForm.id);
                    }
                    this.questions = questions;
                    
                    this._computeTotal();
                    this.$message({
                        message: "试题保存成功！",
                        type: "success"
                    });
                } else {
                    this.$message({
                        message: "表单内容有误，请检查并重新填写！",
                        type: "error"
                    });
                    return false;
                }
            })
        },
        configAnswer(buttonName) {
            if (this.dialogForm.type === "single") {
                this._resetOptionButtons();
                this.dialogForm.options[buttonName].type = "success";
                this.dialogForm.answer = [buttonName];
            } else {
                this.dialogForm.options[buttonName].type = "success";
                const answer = this.dialogForm.answer.concat();
                answer.push(buttonName);
                this.dialogForm.answer = answer;
            }
        },
        _loading() {
            this.disabled = true;
            this.loading = true;
        },
        _reset() {
            this.disabled = false;
            this.loading = false;
        },
        _resetOptionButtons() {
            for(let o in this.dialogForm.options) {
                this.dialogForm.options[o].type = "";
            }
        },
        _computeTotal() {
            let count = 0;
            this.questions.forEach((q) => {
                count += parseInt(q.score);
            })
            this.testForm.total = count;
        }
    }
}
</script>

<style lang="scss" scoped>
    #container {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }

    #save-button {
        float: right;
    }

    #add-question {
        margin-top: 5%;
        width: 100%;
    }

    .card-button {
        float: right;
        padding: 8px;
        margin: 2px;
    }
</style>
