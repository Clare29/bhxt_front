<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" name="mobile" v-model="mobile" v-validate="'required|mobile'" placeholder="请输入手机号">
          <span v-show="errors.has('mobile')" class="error-tip">{{errors.first('mobile')}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">密码</div>
        <div class="item-input-wrapper">
          <input type="password" class="item-input" v-model="pwd" v-validate="'required|min:6'" placeholder="请输入密码">
          <span v-show="errors.has('pwd')" class="error-tip">{{errors.first('pwd')}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click="login">登录</button>
      </div>
      <div class="other-info">
        <router-link to="/register">立即注册</router-link>
        <router-link to="/find-pwd">找回密码</router-link>
      </div>
    </div>
    <full-loading v-show="loadFlag" title="登录中..."></full-loading>
  </div>
</template>
<script>
  import {login} from 'api/user';
  import {setTitle, setUser} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import FullLoading from 'base/full-loading/full-loading';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        loadFlag: false,
        mobile: '',
        pwd: ''
      };
    },
    created() {
      setTitle('登录');
    },
    methods: {
      login() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadFlag = true;
            login(this.mobile, this.pwd).then((data) => {
              setUser(data);
              this.loadFlag = false;
              this.$router.replace('/home');
            }).catch(() => {
              this.loadFlag = false;
            });
          }
        });
      }
    },
    components: {
      FullLoading
    }
  };
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/scss/variable";

  .change-mobile-wrapper {
    background-color: $color-background;
    .other-info {
      margin-top: 0.4rem;
      padding: 0 0.3rem;
      a {
        font-size: $font-size-medium-s;
        color: #fbab46;
        float: left;
        &+a {
          float: right;
        }
      }
    }
  }
</style>
