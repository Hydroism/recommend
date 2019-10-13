<template>
    <div class="body" @click="refresh">
        <div class="container">
            <div class="offline-icon"></div>
            <div class="common-title">点击屏幕刷新</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FailPage",
        methods:{
            refresh:function () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .body {
        width: 100%;
        height: 100%;
        background-color: $color-light;
    }
    .container{
        align-items: center;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 10rem;
        justify-content: space-around;
        font-weight: bold;
        .offline-icon{
            width: 4rem;
            height: 4rem;
            @include bis("../assets/images/offline.png");
        }
    }
</style>