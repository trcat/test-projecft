<template>
    <div id="container"  v-loading="containerLoading">
        <el-card v-if="papers.length === 0">
            <h1>无任何试卷！</h1>
        </el-card>
        <el-card v-for="item in papers" :key="item.id">
            <div slot="header">
                <span>{{item.paperLib.name}}</span>
                <el-button class="card-button" type="text" @click="test(item)" :disabled="getTestStatus(item.start_time).enable" circle>开始考试 >></el-button>
            </div>
            <div>开始时间: {{getTestStatus(item.start_time).dateString}}（可以通过刷新网页更新试卷状态）</div>
            <div>总分: {{item.paperLib.total}}</div>
            <div>题目数量: {{item.paperLib.question_number}}</div>
        </el-card>
    </div>
</template>

<script>
import API from "./view-test-rest.js";

export default {
    data() {
        return {
            papers: [],
            containerLoading: false,
        }
    },
    methods: {
        test(testData) {
            this.$store.commit("updateCurrentTest", testData);
            this.$router.push("/test");
        },
        getTestStatus(time) {
            const date = new Date(time);
            const dateString = `${date.getFullYear()}/${date.getMonth + 1}/${date.getDate()}/${date.getHours}`;
            const enable = Date.parse(time) - Date.now() < 0;
            
            return {enable, dateString};
        }
    },
    mounted() {
        const callback = (r) => {
            if (r.state) {
                this.papers = r.data
                this.containerLoading = false;
            } 
        }
        this.containerLoading = true;
        API.getTestList(callback);
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
