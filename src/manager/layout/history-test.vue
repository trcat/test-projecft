<template>
    <div id="container">
        <el-card>
            <div slot="header">
                <span>试卷1</span>
                <el-button class="card-button" type="danger" icon="el-icon-delete" circle></el-button>
                <el-button class="card-button" type="success" icon="el-icon-s-promotion" @click="dispatch = true" circle ></el-button>
                <el-button class="card-button" type="primary" icon="el-icon-edit" circle></el-button>
                <el-button class="card-button" icon="el-icon-view" circle></el-button>
            </div>
            <div>xxxxxx</div>
            <div>x x x x x x</div>
        </el-card>
        <el-dialog
            title="试题1"
            :visible.sync="dispatch"
            append-to-body>
            <el-form label-position="left" label-width="100px">
                <el-form-item label="开始时间">
                    <el-col :span="6">
                        <el-date-picker
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="持续时间">
                    <el-col :span="3">
                        <el-input type="number"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <el-transfer
                filterable
                filter-placeholder="请输入班级名">
            </el-transfer>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="visible = true">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dispatch: false
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

    .card-button {
        float: right;
        padding: 8px;
        margin: 2px;
    }
</style>
