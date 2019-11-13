<template>
    <container>
        <el-card>
            <el-button type="text" @click="returnToLoginIn">
                <h1>404</h1>
            </el-button>
        </el-card>
    </container>
</template>

<script>
import centerContainer from "../components/centerContainer.vue";

export default {
    components: {
        container: centerContainer
    },
    methods: {
        returnToLoginIn() {
            this.$router.push("/");
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-card {
        width: 70%;
        margin-top: 30%;
        margin-right: auto;
        margin-left: auto;
        height: 300px;
        position: relative;
        .el-button {
            width: 70%;
            height: 10%;
            position:absolute;
            top:50%;
            left:50%;
            margin:-5% 0 0 -35%;
        }
    }
</style>
