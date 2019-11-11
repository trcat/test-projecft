<template>
    <div id="container">
        <el-form label-position="left" label-width="100px" :model="testForm" ref="testForm" rules="testFormRules" :disabled="disabled" hide-required-asterisk>
            <el-form-item label="试卷名称" prop="name">
                <el-input v-model="testForm.name"></el-input>
            </el-form-item>
            <el-form-item label="试卷总分">
                <span>{{testForm.total}} 分</span>
            </el-form-item>
            <el-form-item>
                <el-button id="save-button" type="primary" @click="saveTest">保存试卷</el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <el-card v-for="(item, index) in questions" :key="item.id">
            <div slot="header">
                <span>试题 {{index}}} </span>
                <el-button class="card-button" type="danger" icon="el-icon-delete" @click="deleteQuestion(item)" circle></el-button>
                <el-button class="card-button" type="primary" icon="el-icon-edit" @click="addQuestion" circle></el-button>
            </div>
            <div>题目: {{item.content}}</div>
            <div>分数: {{item.total}}</div>
        </el-card>
        <el-button id="add-question" @click="addQuestion">+ 添加试题</el-button>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="showQuestionDialog"
            append-to-body>
            <el-form label-position="left" label-width="100px" :model="dialogForm" ref="dialogForm" rules="dialogFormRules" :disabled="disabled" hide-required-asterisk>
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
                    <el-input type="number" v-model="dialogForm.score"></el-input>
                </el-form-item>
                <el-divider>编辑选项</el-divider>
                <el-form-item label="选项 A" prop="optionA">
                    <el-input type="textarea" v-model="dialogForm.options.A.content"></el-input>
                </el-form-item>
                <el-form-item label="选项 B" prop="optionB">
                    <el-input type="textarea" v-model="dialogForm.options.B.content"></el-input>
                </el-form-item>
                <el-form-item label="选项 C" prop="optionC">
                    <el-input type="textarea" v-model="dialogForm.options.C.content"></el-input>
                </el-form-item>
                <el-form-item label="选项 D" prop="optionD">
                    <el-input type="textarea" v-model="dialogForm.options.D.content"></el-input>
                </el-form-item>
                <template v-if="dialogForm.type==='multiple'">
                    <el-form-item label="选项 E" prop="optionE">
                        <el-input type="textarea" v-model="dialogForm.options.E.content"></el-input>
                    </el-form-item>
                    <el-form-item label="选项 F" prop="optionF">
                        <el-input type="textarea" v-model="dialogForm.options.F.content"></el-input>
                    </el-form-item>
                </template>
                <el-divider>答案与详解</el-divider>
                <el-form-item label="正确答案">
                    <el-button @click="configAnswer('A')" :type="dialogForm.answerButtons.A.type">A</el-button>
                    <el-button @click="configAnswer('B')" :type="dialogForm.answerButtons.B.type">B</el-button>
                    <el-button @click="configAnswer('C')" :type="dialogForm.answerButtons.C.type">C</el-button>
                    <el-button @click="configAnswer('D')" :type="dialogForm.answerButtons.D.type">D</el-button>
                    <template v-if="dialogForm.type==='multiple'">
                        <el-button @click="configAnswer('E')" :type="dialogForm.answerButtons.E.type">E</el-button>
                        <el-button @click="configAnswer('F')" :type="dialogForm.answerButtons.F.type">F</el-button>
                    </template>
                </el-form-item>
                <el-form-item label="题目详解" prop="description">
                    <el-input type="textarea" v-model="dialogForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showQuestionDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveQuestion">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            testForm: {
                name: "",
                total: 0
            },
            testFormRules: {

            },
            question: [],
            dialogTitle: "",
            showQuestionDialog: false,
            disabled: false,
            loading: false
        }
    },
    methods: {
        saveTest() {

        },
        addQuestion() {

        },
        deleteQuestion(questionData) {

        },

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
