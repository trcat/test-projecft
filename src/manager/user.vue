<template>
    <el-container id="main-container" v-loading="mainLoading">
        <el-aside width="20%">
            <el-menu
                :default-active="activeMenu">
                <el-menu-item index="/user">
                    <i class="el-icon-user"></i>
                    <span>欢迎，{{userName}} !</span>
                </el-menu-item>
                <!-- admin menu -->
                <!-- teacher menu -->
                <!-- student menu -->
            </el-menu>
            <el-button id="out" type="danger">登出</el-button>
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
            isAdmin: false,
            isTecher: false,
            isStudent: false,
            mainLoading: true,
        }
    },
    computed: {
        userName() {
            const storeUser = this.$store.state.user;

            if (storeUser) {
                return storeUser.username;
            }

            return null;
        },
        activeMenu() {
            const route = this.$route;
            const { meta, path} = route;

            if (meta.subActiveMenu) {
                return meta.subActiveMenu
            }

            return path;
        }
    },
    mounted() {
        if (this.userName) {
            //消除页面整体的 loading 状态
            this.mainLoading = false;
        } else {
            this.$router.push("/");
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

