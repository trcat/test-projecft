<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="8"><div class="default-col-side"></div></el-col>
                <el-col :span="8">
                    <router-view></router-view>
                </el-col>
                <el-col :span="8"><div class="defauklt-col-side"></div></el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

</style>

