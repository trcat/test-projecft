<template>
    <div id="container" v-loading="containerLoading">
        <el-card v-if="papers.length === 0">
            <h1>无任何试卷！</h1>
        </el-card>
        <el-card v-for="item in papers" :key="item.id">
            <div slot="header">
                <span>{{item.name}}</span>
                <el-button class="card-button" type="text" @click="viewTest(item)" circle>查看考试结果 >></el-button>
            </div>
            <div>考试时间: {{item.start_time.getFullYear()}}-{{item.start_time.getMonth() + 1}}-{{item.start_time.getDate()}}</div>
            <div>总分: {{item.total}}</div>
            <div>题目数量: {{item.question_number}}</div>
        </el-card>
        <el-pagination 
            v-if="user && user.identity === 'teacher'"
            layout="prev, pager, next" 
            :page-count="total" 
            :page-size.sync="limit" 
            :current-page.sync="currentPage" 
            :disabled="disabled" 
            @current-change="getTestList"
            @prev-click="getTestList"
            @next-click="getTestList"
            hide-on-single-page/>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="showTableDialog">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="username"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="get_score"
                    label="得分">
                </el-table-column>
                <el-table-column
                    prop="my_class"
                    label="所在班级"
                    width="180">
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="showTestDialog">
            <el-table
                :data="tableData"
                style="width: 100%"
                border>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column
                    prop="score"
                    label="考试最终成绩"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="total"
                    label="试卷总分"
                    width="180">
                </el-table-column>
            </el-table>
            <el-divider>试题</el-divider>
            <el-card v-for="(item, index) in questions" :key="item.id">
                <div slot="header">
                    <span>题目{{index + 1}}</span>
                </div>
                <div id="content">
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
                <el-form label-position="left" label-width="100px">
                    <el-form-item label="所选答案:">
                        <span>{{item.user_answer}}</span>
                    </el-form-item>
                    <el-form-item label="正确答案:">
                        <span>{{item.answer}}</span>
                    </el-form-item>
                    <el-form-item label="题目详解:">
                        <span>{{item.description}}</span>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
import API from "./result-test-rest.js";

export default {
    data() {
        return {
            papers: [],
            total: 0,
            limit: 10,
            containerLoading: false,
            disabled: false,
            currentPage: 1,
            dialogTitle: "",
            tableData: null,
            questions: [],
            showTableDialog: false,
            showTestDialog: false,
        }
    },
    computed: {
        user() {
            if (this.$store.state.user) {
                return this.$store.state.user;
            }

            return null;
        }
    },
    methods: {
        getTestList(currentPage) {
            const callback = (r) => {
                if (r.state) {
                    this.papers = r.data.data;
                    this.total = r.data.totalPage;
                } else {
                    this.$message({
                        message: r.message,
                        type: "error"
                    });
                }

                this.containerLoading = false;
            }
            this.containerLoading = true;
            API.getTestList(this.user, callback, 10, currentPage);
        },
        viewTest(testData) {
            if (this.user.identity === "teacher") {
                this.viewTestByTeacher(testData);
            } else if (this.user.identity === "student") {
                this.viewTestByStudent(testData);
            }
        },
        viewTestByTeacher(testData) {
            const callback = (r) => {
                if (r.state) {
                    this.tableData = r.data.data;
                    this.dialogTitle = `查看试卷 ${testData.id} 结果`
                    this.showTableDialog = true;
                }

                this._reset();
            }
            this._loading();
            API.getTestResult(this.user, testData.id, callback, testData.start_time);
        },
        viewTestByStudent(testData) {
            const callback = (r) => {
                if (r.state) {
                    this.dialogTitle = `查看试卷 ${testData.id} 结果`
                    this.tableData = {
                        score: r.data.score,
                        total: r.data.paperLib.total
                    }
                    this.questions = r.data.paperLib.questions;
                    this.showTestDialog = true;
                    this._reset();
                }
            }
            this._loading();
            API.getTestResult(this.user, testData.id, callback);
        },
        _loading() {
            this.disabled = true;
        },
        _reset() {
            this.disabled = false;
        }
    },
    mounted() {
        this.user && this.getTestList(1);
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
