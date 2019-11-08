<template>
    <div class="goods-info" @click="goGoodsPage">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="100%"/>
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter}}</div>
    </div>
</template>

<script>
    import {toMoney} from "../filters/moneyFilter";

    export default {
        name: "goodsInfoComponent",
        created() {
        },
        props: {
            goodsImage: String,
            goodsName: String,
            goodsPrice: Number,
            goodsId: String
        },
        methods: {
            goGoodsPage() {
                this.$router.push({name: 'Goods', query: {goodsId: this.goodsId}})
            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money);
            }
        }
    }
</script>

<style scoped lang="scss">

    .goods-info {
        text-align: center;

        .goods-name {
            height: 1.52rem;
            overflow: hidden;
            @extend .common-font;
        }

        .goods-price {
            @extend .common-sub-font
        }
    }

    .goods-image {
        width: 8.8rem;
        height: 8.8rem;
        position: relative;
    }
</style>