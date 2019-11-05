<template>
    <div id="container">
        <el-card>
            <div id="content">
                <span id="index">1.</span>
                <span>这是题目的正文内容，吧啦吧啦吧啦吧啦吧啦</span>
                <span>()</span>
                <span id="score">[15分]</span>
            </div>
            <div id="options">
                <div>
                    <el-checkbox>
                        <span>A.</span>
                        <span>xxxxxxxxxxxxx</span>
                    </el-checkbox>
                </div>
                <div>
                    <el-checkbox>
                        <span>B.</span>
                        <span>xxxxxxxxxxxxx</span>
                    </el-checkbox>
                </div>
                <div>
                    <el-checkbox>
                        <span>C.</span>
                        <span>xxxxxxxxxxxxx</span>
                    </el-checkbox>
                </div>
                <div>
                    <el-checkbox>
                        <span>D.</span>
                        <span>xxxxxxxxxxxxx</span>
                    </el-checkbox>
                </div>
            </div>
        </el-card>
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
</style>
