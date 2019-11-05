<template>
    <div id="container">
        <el-form label-position="left" label-width="100px">
            <el-form-item label="试卷名称">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="试卷总分">
                <span>100分</span>
            </el-form-item>
            <el-form-item>
                <el-button id="save-button" type="primary">保存试卷</el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <el-card>
            <div slot="header">
                <span>试题 1</span>
                <el-button class="card-button" type="danger" icon="el-icon-delete" circle></el-button>
                <el-button class="card-button" type="primary" icon="el-icon-edit" @click="visible = true" circle></el-button>
            </div>
            <div>题目</div>
            <div>分数</div>
        </el-card>
            <el-dialog
                title="试题1"
                :visible.sync="visible"
                append-to-body>
                <el-form label-position="left" label-width="100px">
                    <el-form-item label="题目">
                        <el-input type="textarea"></el-input> 
                    </el-form-item>
                    <el-form-item label="题目类型">
                        <el-radio-group v-model="radio">
                            <el-radio :label="3">单选题</el-radio>
                            <el-radio :label="6">多选题</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="题目分数">
                        <el-input type="number"></el-input>
                    </el-form-item>
                    <el-divider>编辑选项</el-divider>
                    <el-form-item label="选项 A">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="选项 B">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="选项 C">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="选项 D">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                    <el-divider>答案与详解</el-divider>
                    <el-form-item label="正确答案">
                        <el-button>A</el-button>
                        <el-button>B</el-button>
                        <el-button>C</el-button>
                        <el-button>D</el-button>
                    </el-form-item>
                    <el-form-item label="题目详解">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="visible = true">保存</el-button>
                </div>
            </el-dialog>
        <el-button id="add-question">+ 添加试题</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            radio: 3,
            visible: false
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

