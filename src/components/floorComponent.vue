<template>
    <div>
        <div class="floor-title">{{floorTitle}}</div>
        <div class="floor1">
            <div class="floor-one img" v-if="floorData.length>0">
                <img v-lazy="floorData[0].image" width="100%"/>
            </div>
            <div class="floor-two">
                <div class="img" v-if="floorData.length>1">
                    <img v-lazy="floorData[1].image" width="100%">
                </div>
                <div class="img" v-if="floorData.length>2">
                    <img v-lazy="floorData[2].image" width="100%">
                </div>
            </div>
        </div>
        <div class="floor2" v-if="floorData.length>3">
            <div v-for="(item, index) in floorData.slice(3)" :key="index" class="img">
                <img v-lazy="item.image" width="100%">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'floor-component',
        props: {
            floorData: Array,
            floorTitle: String,
    },
    watch: {
        floorData: function (val) {
            // console.log(this.floorData);
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .floor-title {
        text-align: center;
        background-color: $color-light;
        padding: .3rem;
        @extend .common-sub-font;
    }

    .floor1 {
        display: flex;
        justify-content: space-between;
        & > div {
            width: 50%;
        }
        .floor-one {
            border-top: 1px solid $color-light-border;
            border-right: 1px solid $color-light-border;
            &.img {
                height: 9.722rem;
            }
        }
        .floor-two .img {
            border-top: 1px solid $color-light-border;
            height: 4.861rem;
        }
    }

    .floor2 {
        display: flex;
        flex-wrap: wrap;
        & > div {
            width: 50%;
            height: 4.861rem;
            border-top: 1px solid $color-light-border;
        }
        & > div:nth-of-type(odd) {
            border-right: 1px solid $color-light-border;
        }
    }

</style>
