<template>
    <el-container id="main-container">
        <el-aside width="20%">
            <el-menu
                default-active="1">
                <el-menu-item index="/user/profile">
                    <span>欢迎，DayDayBigKing</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>管理账号</template>
                    <el-menu-item index="history-test">添加账号</el-menu-item>
                    <el-menu-item >编辑账号</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-menu"></i>管理班级</template>
                    <el-menu-item>添加班级</el-menu-item>
                    <el-menu-item>编辑班级</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"> <i class="el-icon-menu"></i>管理试卷</template>
                    <el-menu-item>添加试卷</el-menu-item>
                    <el-menu-item>编辑试卷</el-menu-item>
                    <el-menu-item>拍卷历史</el-menu-item>
                </el-submenu>
                <el-menu-item index="5">
                    <i class="el-icon-menu"></i>
                    <span>考试</span>
                </el-menu-item>
                <el-menu-item index="6">
                    <i class="el-icon-menu"></i>
                    <span>已完成考试</span>
                </el-menu-item>
            </el-menu>
            <el-button id="out" type="danger">登出</el-button>
            <el-card>
                <div id="timer">
                    <div>考试时间还剩（分钟）:</div>
                    <div id="time">xxx</div>
                </div>
            </el-card>
        </el-aside>
        
        <el-container>
            <el-main>
                <div id="main-content" class="default-box">
                    <el-container>
                        <el-main>
                            <router-view></router-view>
                        </el-main>
                    </el-container>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            active: "1"
        }
    }
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

    #out {
        width: 100%;
        margin-top: 10%;
    }

    #timer {
        text-align: center;
        #time {
            color: gray;
            font-size: 50px;
        }
    }
</style>

