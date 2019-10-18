<template>
    <div v-if="goodsDetailInfo">
        {{goodsDetailInfo.NAME}}
    </div>
</template>

<script>
    export default {
        name: "goods",
        created() {
            this.goodsId = this.$route.query.goodsId;
            this.getData();
        },
        data() {
            return {
                goodsId: '',
                goodsDetailInfo: null
            }
        },
        methods: {
            getData() {
                this.$api.service.getGoodsDetail({goodsId: this.goodsId}).then(re => {
                    if (re.success) {
                        this.goodsDetailInfo = re.data;
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>