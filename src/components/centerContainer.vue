<template>
    <el-container>
        <el-main>
            <el-col :span="8" :offset="8">
                <slot></slot>
            </el-col>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "centerContainer"
}
</script>

<style lang="scss" scoped>
.default-col-side {
    min-height: 1px;
}
</style>
