<template>
    <el-container id="main-container" v-loading="mainLoading">
        <el-aside width="20%">
            <el-card>
                <div id="timer">
                    <div>考试时间还剩（分钟）:</div>
                    <div id="time">{{time}}</div>
                </div>
            </el-card>
        </el-aside>

        <el-container>
            <el-main>
                <div id="main-content" class="default-box">
                    <el-container>
                        <el-main>
                            <div id="container">
                                <el-card v-for="(item, index) in questions" :key="item.id">
                                    <div id="content">
                                        <span id="index">{{index + 1}}.</span>
                                        <span>{{item.content}}</span>
                                        <span>()</span>
                                        <span id="score">[{{item.score}}分]</span>
                                    </div>
                                    <div id="options">
                                        <el-checkbox-group v-modal="answer[index + 1]">
                                            <el-checkbox v-for="(o, i) in item.options" :key="o" :label="String.fromCharCode(i + 65)">
                                                <span>{{String.fromCharCode(i + 65)}}</span>
                                                <span>{{o}}</span>
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </el-card>
                                <el-button id="submit-button" type="primary" @click="submitAnswer">创建试卷</el-button>
                            </div>
                        </el-main>
                    </el-container>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import API from "./test.js";

export default {
    data() {
        return {
            mainLoading: true,
            time: 0,
            questions: [],
            answer: {}
        }
    },
    methods: {
        submitAnswer() {
            const callback = (r) => {
                if (r.state) {
                    this.$alert(`考试得分: ${r.data.get_score}`, '考试结束', {
                        confirmButtonText: '确定',
                        callback: () => {
                            this.$store.commit("updateCurrentTest", null);
                            this.$router.push("/user/result-test")
                        }
                    });
                }
            }

            this.mainLoading = true;
            API.submitAnswer(this.$store.state.user.id, this.$store.state.currentTest.id, this.answer, callback);
        }
    },
    mounted() {
        if (this.$store.state.currentTest) {
            this.questions = this.$store.state.currentTest.questions;
            this.time = this.$store.state.currentTest.test_time;
            const timer = window.setInterval(() => {
                this.time -= 1;
                if (this.time === 0) {
                    window.clearInterval(timer);
                    this.$alert('时间已经到，禁止答题！', '考试时间到', {
                        confirmButtonText: '确定',
                        callback: () => {
                             this.submitAnswer();
                        }
                    });
                }
            }, 60000)
        } else {
            this.$router.push("/");
        }
    },
}
</script>

<style lang="scss" scoped>
    #main-container {
        width: 100%;
        .el-main {
            #main-content {
                background-color: white;
                padding: 3%;
            }
        }
    }

    #timer {
        text-align: center;
        #time {
            color: gray;
            font-size: 50px;
        }
    }

    #container {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
