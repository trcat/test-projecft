<template>
    <div>
        <el-page-header content="考试结果">
        </el-page-header>
        <el-divider>概况</el-divider>
        <div class="container">
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
        </div>
        <el-divider>试题</el-divider>
        <div class="container">
            <el-card>
                <div slot="header">
                    <span>题目1</span>
                    <el-button class="card-button" type="text" @click="visible=true" circle>查看详情 >></el-button>
                </div>
                <div>xxxxxx</div>
                <div>x x x x x x</div>
            </el-card>
            <el-dialog title="题目1" :visible.sync="visible" append-to-body>
                <el-form label-position="left" label-width="100px">
                    <el-form-item label="正确答案:">
                        <span>lalalalalal</span>
                    </el-form-item>
                    <el-form-item label="题目详解:">
                        <span>lalalalalallalalalalala</span>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            tableData: [
                {score: "100 分", total: "100 分", name: "DayDay"}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }

    .card-button {
        float: right;
        padding: 8px;
        margin: 2px;
    }
</style>
