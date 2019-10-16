<template>
    <div class="login-bg">
        <van-nav-bar title="用户登录"
                     left-text="返回"
                     left-arrow
                     @click-left="goBack"
        />

        <div class="login-logo"></div>

        <van-cell-group>
            <van-field v-model="userName" type="text" required clearable :error-message="userNameMsg"
                       label="用户名" right-icon="question-o" placeholder="请输入用户名"
            />

            <van-field v-model="password" type="password" required autocomplete="false" :error-message="passwordMsg"
                       label="密码" placeholder="请输入密码"
            />
        </van-cell-group>
        <div class="login-btns">
            <p class="login-tip">没有账号自动注册</p>
            <van-button type="info" @click="login">登录</van-button>
        </div>
    </div>
</template>

<script>
    import {Field, NavBar, CellGroup, Toast} from 'vant'

    export default {
        name: "Login",
        components: {
            'van-nav-bar': NavBar,
            "van-cell-group": CellGroup,
            "van-field": Field,
        },
        data() {
            return {
                userName: "Hydroism",
                password: "123456",
                userNameMsg: '',
                passwordMsg: ''
            }
        },
        created() {
            if (localStorage.userInfo) {
                Toast.success('已登录!');
                this.$router.go(-1)
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            login: function () {
                if (!this.validData()) {
                    return
                }
                let para = {
                    userName: this.userName,
                    password: this.password
                };
                this.$api.service.login(para).then(res => {
                    if (res.success) {
                        Toast.success('登录成功');
                        localStorage.userInfo = {userName: this.userName};
                        this.$router.push({path: 'home'})
                    } else {
                        Toast.fail(res.message);
                    }
                })
            },
            validData() {
                let isValid = true;
                this.userNameMsg = '';
                this.passwordMsg = '';
                if (this.userName.length < 5) {
                    this.userNameMsg = '用户名字数不能少于5位';
                    isValid = false;
                }
                if (this.password.length < 6) {
                    this.passwordMsg = '用户密码不能少于6位';
                    isValid = false;
                }
                return isValid;
            }
        }
    }
</script>

<style scoped lang="scss">
    .login-bg {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        background-color: #f8f8f8;
    }

    .login-logo {
        width: 8rem;
        height: 6rem;
        margin: auto;
        @include bis('../assets/logo.png')
    }

    .login-btns {
        width: 100%;
        margin-top: 0.5rem;
        padding: 0 0.5rem;

        & > button {
            margin-bottom: 1rem;
            width: 100%;
        }
    }

    .login-tip {
        text-align: right;
        font-size: .6rem;
        margin-bottom: .5rem;
        color: $color-tip-text;
    }
</style>