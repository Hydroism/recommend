<template>
    <div class="goods" v-if="goodsDetailInfo">
        <div class="navbar-div">
            <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="topimage-div">
            <img :src="goodsDetailInfo.IMAGE1" width="100%"/>
        </div>

        <div class="goods-base-info">
            <div class="goods-name">{{goodsDetailInfo.NAME}}</div>
            <div class="goods-price">价格 ：￥{{goodsDetailInfo.PRESENT_PRICE | moneyFilter}}元</div>
        </div>

        <div class="goods-detail">
            <van-tabs animated sticky swipeable>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsDetailInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="商品评论">
                    <div class="comment"></div>
                    暂无评论
                </van-tab>
            </van-tabs>
        </div>

        <div class="goods-bottom">
            <div>
                <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>

    </div>
</template>

<script>
    import {NavBar, Tab, Tabs} from 'vant'
    import {toMoney} from "../filters/moneyFilter";


    export default {
        name: "Goods",
        components: {
            'van-nav-bar': NavBar,
            'van-tabs': Tabs,
            'van-tab': Tab,
        },
        created() {
            this.goodsId = this.$route.query.goodsId;
            this.getData2();
        },
        data() {
            return {
                goodsId: '',
                goodsDetailInfo: null
            }
        },
        methods: {
            getData() { //post
                this.$api.service.getGoodsDetail({goodsId: this.goodsId}).then(re => {
                    this.goodsDetailInfo = re.data;
                })
            },
            getData2() {  //get
                this.$api.service.getGoodsDetail2(this.goodsId).then(re => {
                    this.goodsDetailInfo = re.data;
                })
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            addGoodsToCart() {
                console.log("加入购物车" + this.goodsId);
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
    .goods {
        height: 100%;
    }

    .goods-base-info {
        text-align: center;
        background: $color-light-tint;
        padding: .5rem 0;

        .goods-price {
            @extend .common-sub-font;
        }
    }

    .goods-detail {
        min-height: 100%;
        .detail {
            font-size: 0;
        }
    }

    .goods-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #FFF;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
        & > div {
            flex: 1;
            padding: 5px;
        }
    }

</style>