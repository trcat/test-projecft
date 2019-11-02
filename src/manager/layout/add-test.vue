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
            </div>
            <el-form label-position="left" label-width="100px">
                <el-form-item label="题目">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    
                </el-form-item>
            </el-form>
        </el-card>
        <el-button id="add-question">+ 添加试题</el-button>
    </div>
</template>

<script>
export default {
    
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

