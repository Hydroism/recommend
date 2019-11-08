<template>
    <div>
        <div class="nav">
            <van-nav-bar title="类别列表"/>
        </div>

        <div>
            <van-row>
                <van-col span="6">
                    <div id="left-nav">
                        <ul>
                            <li v-for="(item, index) in category" :key="index"
                                @click="clickCategory(item.ID)"
                                :class="{'category-active':curCategoryId === item.ID}">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tab-categorySub">
                        <van-tabs v-model="curCategoryIndex" @click="clickCategorySub">
                            <van-tab v-for="(item, index) in categorySub" :key="index"
                                     :title="item.MALL_SUB_NAME">
                            </van-tab>
                        </van-tabs>
                    </div>

                    <div class="list-div">
                        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                            <van-list v-model="loading"
                                      :finished="finished" finished-text="没有更多了~"
                                      :error.sync="error" error-text="请求失败，点击重新加载"
                                      @load="onLoad">
                                <div class="list-item"
                                     v-for="(item, index) in categoryGoodsList" :key="index"
                                     @click="goGoodsInfo(item.ID)">
                                    <div class="list-item-img">
                                        <img v-lazy="item.IMAGE1" width="100%"/>
                                    </div>
                                    <div class="list-item-info">

                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>

</template>

<script>
    import {NavBar, Row, Col, Tabs, Tab, PullRefresh, List, Toast} from 'vant'
    import {PageQuery} from '../util/pageQuery'

    export default {
        name: "Category",
        components: {
            'van-nav-bar': NavBar,
            'van-row': Row,
            'van-col': Col,
            'van-tabs': Tabs,
            'van-tab': Tab,
            'van-pull-refresh': PullRefresh,
            'van-list': List,
        },
        data() {
            return {
                category: null,
                categorySub: null,
                categoryGoodsList: [],
                curCategoryId: '',
                curCategorySubId: '',
                curCategoryIndex: '0',
                isLoading: false,
                loading: false,
                finished: false,
                error: false,
                pageQuery: new PageQuery(),
            }
        },
        created() {
            this.getCategoryList();
        },
        methods: {
            getCategoryList() {
                this.$api.service.getCategoryList().then(re => {
                    this.category = re.data;
                    if (this.category.length !== 0) {
                        this.clickCategory(this.category[0].ID);
                    }
                })
            },
            getCategorySubList(categoryId) {
                this.$api.service.getCategorySubList(categoryId).then(re => {
                    this.categorySub = re.data;
                    if (this.categorySub.length !== 0) {
                        this.clickCategorySub(0);
                    }
                })
            },
            queryCategoryGoodsList(categorySubId) {
                return new Promise(((resolve, reject) => {
                    this.$api.service.queryCategoryGoodsList({
                        categorySubId: categorySubId,
                        pageQuery: this.pageQuery
                    }).then(re => {
                        this.categoryGoodsList = [...this.categoryGoodsList, ...re.data];
                        this.pageQuery.covertResponses(re.pageQuery);
                        resolve()
                    }, err => {
                        this.error = true;
                        Toast(err.message);
                    }).catch(() => {
                        this.error = true;
                    })
                }))
            },
            clickCategory(categoryId) {
                this.curCategoryId = categoryId;
                this.getCategorySubList(this.curCategoryId);
            },
            clickCategorySub(index, title) {
                this.curCategorySubId = this.categorySub[index].ID;
                this.categoryGoodsList = [];
                this.finished = false;
                this.pageQuery.resetPage();
            },
            goGoodsInfo(goodsId) {

            },
            onRefresh() {
                setTimeout(() => {
                    this.isLoading = false;
                }, 500)
            },
            onLoad() {
                setTimeout(() => {
                    this.queryCategoryGoodsList(this.curCategorySubId).then(() => {
                        this.loading = false;
                        if (this.categoryGoodsList.length >= this.pageQuery.totalNum) {
                            this.finished = true;
                        }
                    });
                }, 500);
            }
        }
    }
</script>

<style scoped lang="scss">
    #left-nav {
        background-color: $color-category-bg;
        ul li {
            line-height: 2rem;
            border-bottom: 1px solid $color-light-border;
            padding: 3px;
            font-size: 0.8rem;
            text-align: center;
        }
        .category-active {
            background-color: $color-white;
        }
    }


</style>