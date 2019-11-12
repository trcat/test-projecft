<template>
    <div id="container" v-loading="containerLoading">
        <el-card v-if="papers.length === 0">
            <h1>无任何试卷！</h1>
        </el-card>
        <el-card v-for="item in papers" :key="item.id">
            <div slot="header">
                <span>{{item.name}}</span>
                <el-button class="card-button" type="danger" icon="el-icon-delete" @click="deleteTest(item)" :disabled="disabled" circle></el-button>
                <el-button class="card-button" type="success" icon="el-icon-s-promotion" @click="dispatchTest(item)" :disabled="disabled" circle ></el-button>
                <el-button class="card-button" type="primary" icon="el-icon-edit" @click="editTest(item)" :disabled="disabled" circle></el-button>
                <el-button class="card-button" icon="el-icon-view" @click="viewTest(item)" circle></el-button>
            </div>
            <div>试卷创建时间: {{item.add_time.getFullYear()}}-{{item.add_time.getMonth() + 1}}-{{item.add_time.getDate()}}</div>
            <div>总分: {{item.total}}</div>
            <div>题目数量: {{item.question_number}}</div>
        </el-card>
        <el-pagination 
            layout="prev, pager, next" 
            :page-count="total" 
            :page-size.sync="limit" 
            :current-page.sync="currentPage" 
            :disabled="disabled" 
            @current-change="getTestList"
            @prev-click="getTestList"
            @next-click="getTestList"
            hide-on-single-page/>
        <!-- View -->
        <el-dialog :title="currentTest.name" :visible.sync="showViewDialog">
            <el-form label-position="left" label-width="100px">
                <el-form-item label="总分">
                    <span>{{currentTest.total}}</span>
                </el-form-item>
                <el-form-item label="题目数量">
                    <span>{{currentTest.question_number}}</span>
                </el-form-item>
            </el-form>
            <el-divider>试题</el-divider>
            <el-card v-for="(item, index) in currentTest.questions" :key="item.id">
                <div id="content">
                    <span id="index">{{index + 1}}.</span>
                    <span>{{item.content}}</span>
                    <span>()</span>
                    <span id="score">[{{item.score}}分]</span>
                </div>
                <div id="options">
                    <div v-for="(o, i) in item.options" :key="o">
                        <el-checkbox>
                            <span>{{String.fromCharCode(i + 65)}}</span>
                            <span>{{o}}</span>
                        </el-checkbox>
                    </div>
                </div>
            </el-card>
        </el-dialog>
        <!-- Edit -->
        <el-dialog :title="currentTest.name" :visible.sync="showEditDialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <div>
                <el-form label-position="left" label-width="100px" :model="currentTest" ref="currentTest" :rules="currentTestRules" :disabled="disabled" hide-required-asterisk>
                    <el-form-item label="试卷名称" prop="name">
                        <el-input v-model="currentTest.name"></el-input>
                    </el-form-item>
                    <el-form-item label="试卷总分">
                        <span>{{currentTest.total}} 分</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button id="save-button" type="primary" @click="saveTest('currentTest')">保存修改</el-button>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <el-card v-for="(item, index) in currentTest.questions" :key="item.id">
                    <div slot="header">
                        <span>试题 {{index + 1}}} </span>
                        <el-button class="card-button" type="danger" icon="el-icon-delete" @click="deleteQuestion(item)" :disabled="disabled" circle></el-button>
                        <el-button class="card-button" type="primary" icon="el-icon-edit" @click="editQuestion(item, index)" :disabled="disabled" circle></el-button>
                    </div>
                    <div>题目: {{item.content}}</div>
                    <div>分数: {{item.total}}</div>
                </el-card>
                <el-button id="add-question" @click="addQuestion">+ 添加试题</el-button>
                <el-dialog
                    :title="currentQuestion.id"
                    :visible.sync="showQuestionDialog"
                    :close-on-click-modal="false" 
                    :close-on-press-escape="false" 
                    :show-close="false"
                    append-to-body>
                    <el-form label-position="left" label-width="100px" :model="currentQuestion" ref="currentQuestion" :rules="currentQuestionRules" :disabled="disabled" hide-required-asterisk>
                        <el-form-item label="题目" prop="content">
                            <el-input type="textarea" v-model="currentQuestion.content"></el-input> 
                        </el-form-item>
                        <el-form-item label="题目类型" prop="type">
                            <el-radio-group v-model="currentQuestion.type">
                                <el-radio label="single">单选题</el-radio>
                                <el-radio label="multiple">多选题</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="题目分数" prop="score">
                            <el-input type="number" v-model="currentQuestion.score">
                                <span slot="append">分</span>
                            </el-input>
                        </el-form-item>
                        <el-divider>编辑选项</el-divider>
                        <el-form-item label="选项 A">
                            <el-input type="textarea" v-model="currentQuestion.options.A.content"></el-input>
                        </el-form-item>
                        <el-form-item label="选项 B">
                            <el-input type="textarea" v-model="currentQuestion.options.B.content"></el-input>
                        </el-form-item>
                        <el-form-item label="选项 C">
                            <el-input type="textarea" v-model="currentQuestion.options.C.content"></el-input>
                        </el-form-item>
                        <el-form-item label="选项 D">
                            <el-input type="textarea" v-model="currentQuestion.options.D.content"></el-input>
                        </el-form-item>
                        <template v-if="currentQuestion.type==='multiple'">
                            <el-form-item label="选项 E">
                                <el-input type="textarea" v-model="currentQuestion.options.E.content"></el-input>
                            </el-form-item>
                            <el-form-item label="选项 F">
                                <el-input type="textarea" v-model="currentQuestion.options.F.content"></el-input>
                            </el-form-item>
                        </template>
                        <el-divider>答案与详解</el-divider>
                        <el-form-item label="正确答案">
                            <el-button @click="configAnswer('A')" :type="currentQuestion.options.A.type">A</el-button>
                            <el-button @click="configAnswer('B')" :type="currentQuestion.options.B.type">B</el-button>
                            <el-button @click="configAnswer('C')" :type="currentQuestion.options.C.type">C</el-button>
                            <el-button @click="configAnswer('D')" :type="currentQuestion.options.D.type">D</el-button>
                            <template v-if="currentQuestion.type==='multiple'">
                                <el-button @click="configAnswer('E')" :type="currentQuestion.options.E.type">E</el-button>
                                <el-button @click="configAnswer('F')" :type="currentQuestion.options.F.type">F</el-button>
                            </template>
                        </el-form-item>
                        <el-form-item label="题目详解" prop="description">
                            <el-input type="textarea" v-model="currentQuestion.description"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="showQuestionDialog = false" :disabled="disabled">取 消</el-button>
                        <el-button type="primary" @click="saveQuestion('currentQuestion')" :disabled="disabled">保 存</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-dialog>
        <!-- Dispatch -->
        <el-dialog
            :title="currentDispatch.name"
            :visible.sync="showDispatchDialog"
            :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form label-position="left" label-width="100px" :model="currentDispatch" ref="currentDispatch" :rules="currentDispatchRules" :disabled="disabled" hide-required-asterisk>
                <el-form-item label="开始时间" prop="start_time">
                    <el-col :span="6">
                        <el-date-picker
                            type="datetime"
                            placeholder="选择日期时间"
                            v-model="currentDispatch.start_time">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="持续时间" prop="test_time">
                    <el-col :span="3">
                        <el-input type="number" v-model="currentDispatch.test_time"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <el-transfer v-model="currentDispatch.classes" :data="dispatchableClasses" :titles="['可选班级', '派卷班级']"/>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDispatchDialog = false">取 消</el-button>
                <el-button type="primary" @click="disaptch('currentDispatch')">派 卷</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import API from "./edit-test-rest.js";
import addAccountAPI from "./add-account-rest.js";

export default {
    data() {
        return {
            papers: [],
            total: 0,
            limit: 10,
            currentPage: 1,
            currentTest: {
                id: "",
                name: "",
                question_number: 0,
                total: 0,
                questions: []
            },
            currentTestRules: {
                name: [{
                    required: true, message: "请填写试卷名称", trigger: "blur"
                }]
            },
            currentQuestion: {
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
            currentQuestionRules: {
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
            currentDispatch: {
                start_time: new Date(),
                test_time: 0,
                classes: [],
            },
            currentDispatchRules: {
                start_time: [{
                    required: true, message: "请填写考试开始时间！", trigger: "blur"
                }],
                test_time: [{
                    required: true, message: "请填写考试时长！", trigger: "blur"
                }]
            },
            dispatchableClasses: null,
            disabled: false,
            showViewDialog: false,
            showEditDialog: false,
            showDispatchDialog: false,
            showQuestionDialog: false,
            containerLoading: false,
        }
    },
    methods: {
        //main
        deleteTest(testData) {
            const callback = (r) => {
                if (r.state) {
                    const _papers = [];
                    this.papers.forEach((i) => {
                        if (i.id !== testData.id) {
                            _papers.push(i);
                        }
                    })
                    this.papers = _papers;
                }

                this.$message({
                    message: r.message,
                    type: r.state ? "success" : "error"
                });
                this._reset();
            }
            this._loading();
            API.deleteTest(testData.id, callback);
        },
        disaptchTest(testData) {
            const callback = (r) => {
                if (r.state) {
                    this.dispatchableClasses = r.data.map((i) => {
                        return {
                            key: i.id,
                            label: i.class_name
                        }
                    });
                    this.currentTest.id = testData.id;
                    this.currentDispatch = {
                        start_time: new Date(),
                        test_time: 0,
                        classes: []
                    };
                    this.showDispatchDialog = true;
                }
            }

            this._loading();
            addAccountAPI.getClassOptions(callback);
        },
        editTest(testData) {
            const callback = (r) => {
                if (r.state) {
                    const obj = {
                        id: testData.id,
                        name: testData.name,
                        question_number: testData.question_number,
                        total: testData.total,
                        questions: r.data.data
                    };
                    this.currentTest = obj;
                    this._reset();
                    this.showEditDialog = true;
                }
            }

            this._loading();
            API.getQuestionsById(testData.id, callback);
        },
        viewTest(testData) {
            const callback = (r) => {
                if (r.state) {
                    const obj = {
                        id: testData.id,
                        name: testData.name,
                        question_number: testData.question_number,
                        total: testData.total,
                        questions: r.data.data
                    };
                    this.currentTest = obj;
                    this._reset();
                    this.showViewDialog = true;
                }
            };
            this._loading();
            API.getQuestionsById(testData.id, callback);
        },
        getTestList(page) {
            const callback = (r) => {
                if (r.state) {
                    this.papers = r.data.data;
                    this.total = r.data.totalPage
                } else {
                    this.$message({
                        message: r.message,
                        type: "error"
                    });
                }

                this.containerLoading = false;
            }
            this.containerLoading = true;
            //获取列表数据
            API.getTestList(this.limit, page, callback);
        },
        //edit
        saveTest(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.currentTest.questions.length === 0) {
                        this.$message({
                            message: "试卷至少要有一题！",
                            type: "error"
                        });
                        return false;
                    }

                    const _data = {
                        id: this.currentTest.id,
                        name: this.currentTest.name,
                        question_number: this.currentTest.questions.length,
                        total: this.currentTest.total,
                        user: this.$store.state.user,
                        questions: this.currentTest.questions
                    };

                    const callback = (r) => {
                        this.$message({
                            message: r.message,
                            type: r.state ? "success" : "error"
                        });
                        
                        const _papers = this.papers.concat();
                        this.papers.forEach((i, index) => {
                            if (i.id === _data.id) {
                                _papers[index].name = _data.name;
                                _papers[index].question_number = this.currentTest.questions.length;
                                _papers[index].total = this.currentTest.total;
                            }
                        })
                        this.papers = _papers;
                        this._reset();
                    }
                    this._loading();
                    API.saveTest(_data, callback);
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
            this.currentQuestion = {
                id: `添加试题 ${Date.now().toString()}`,
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
        editQuestion(questionData) {
            let _question = questionData;
            _question.options = {};
            for (let i = 0; i < questionData.options.length; i++) {
                let key = String.fromCharCode(i + 65);
                _question.options[key] = {
                    content: questionData.options[i] ? questionData.options[i] : "",
                    type: questionData.answer.includes(key) ? "success" : ""
                };
            }
            this.currentQuestion = _question;
            this.showQuestionDialog = true;
        },
        deleteQuestion(questionData) {
            const result = [];
            this.currentTest.questions.forEach((q) => {
                if (q.id !== questionData.id) {
                    result.push(q);
                }
            });
            this.currentTest.questions = result;
            this._computeTotal();
        },
        saveQuestion(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let stop = false;
                    for (let o in this.currentQuestion.options) {
                        if (!this.currentQuestion.options[o].content) {
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
                    
                    if (this.currentQuestion.answer.length === 0) {
                        this.$message({
                            message: "请设置试题答案！",
                            type: "error"
                        });
                        return false;
                    }

                    let questions = this.currentQuestion.questions.concat();
                    this.currentQuestion.questions.forEach((q, index) => {
                        if (q.id === this.currentQuestion.id) {
                            questions[index] = Object.assign({}, this.currentQuestion);
                            for (let i in this.currentQuestion.options) {
                                questions[index].options = this.currentQuestion.options[i].content;
                            }
                            stop = true;
                        }
                    })
                    if (!stop) {
                        let _r = this.currentQuestion;
                        _r.options = [];
                        for (let i in this.currentQuestion.options) {
                            _r.options.push(this.currentQuestion.options[i].content);
                        }
                        questions.push(_r);
                    }
                    this.currentTest.questions = questions;
                    
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
            if (this.currentQuestion.type === "single") {
                this._resetOptionButtons();
                this.currentQuestion.options[buttonName].type = "success";
                this.currentQuestion.answer = [buttonName];
            } else {
                this.currentQuestion.options[buttonName].type = "success";
                const answer = this.currentQuestion.answer.concat();
                answer.push(buttonName);
                this.currentQuestion.answer = answer;
            }
        },
        _resetOptionButtons() {
            for(let o in this.currentQuestion.options) {
                this.currentQuestion.options[o].type = "";
            }
        },
        _computeTotal() {
            let count = 0;
            this.currentTest.questions.forEach((q) => {
                count += parseInt(q.score);
            })
            this.currentTest.total = count;
        },
        //dispatch
        dispatch(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const _data = this.currentDispatch;
                    _data.user_id = this.$store.state.user.id;
                    _data.paperLib = this.currentTest.id;
                    const callback = (r) => {
                        this.$message({
                            message: r.message,
                            type: r.state ? "success" : "error"
                        });
                        this._reset();
                    };
                    this._loading();
                    API.dispatchTest(_data, callback);
                } else {
                    this.$message({
                        message: "表单内容有误，请检查并重新填写！",
                        type: "error"
                    });
                    return false;
                }
            })
        },
        //private
        _loading() {
            this.disabled = true;
        },
        _reset() {
            this.disabled = false;
        },
    },
    mounted() {
        this.getTestList(this.currentPage);
    }
}
</script>

<style lang="scss" scoped>
    #container {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }

    .card-button {
        float: right;
        padding: 8px;
        margin: 2px;
    }

    .el-card {
        #content {
            font-size: 14px;
            #score {
                color: gray
            }
            #index {
                margin-right: 20px;
            }
            #options {
                margin-top: 35px;
                div {
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
