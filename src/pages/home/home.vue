<template>
    <div class="full-screen-wrapper home-wrapper">
        <div class="bg">
          <div class="bg-down">
            <div class="bg-down-item">授权证书</div>
            <div class="bg-down-item">系统消息</div>
          </div>
        </div>
        <!--<div class="middle">-->
          <!--<router-link tag="div" to="/my-templet/templet-details?moren=1" class="fl sendReport">-->
            <!--<span>发起调查</span>-->
            <!--<img src="./发送报告@2x.png" class="fr">-->
          <!--</router-link>-->
          <!--<router-link tag="div" to="/customers" class="fl myClient">-->
            <!--<span>我的客户</span>-->
            <!--<img src="./我的客户@2x.png" class="fr">-->
          <!--</router-link>-->
          <!--<router-link tag="div" to="/user" class="personalCenter fl">-->
            <!--<span>个人中心</span>-->
            <!--<img src="./个人中心@2x.png" class="fr">-->
          <!--</router-link>-->
        <!--</div>-->
        <div class="blank"></div>
        <div class="smallIcons">
          <div v-for="item in items1" class="fl item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
          <div v-for="item in items2" class="fl item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
          <div v-for="item in items3" class="fl item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
        </div>
      <router-view></router-view>
    </div>
</template>
<script>
  import slider from 'base/slider/slider';
  import {formatImg, setTitle} from 'common/js/util';
  import Scroll from 'base/scroll/scroll';
  import {getBannerList} from 'api/general';
  export default {
    data() {
      return {
        banners: [],
//        items1: [{
//          text: '资信模板',
//          src: require('./资信报告@2x.png'),
//          to: '/my-templet'
//        }, {
//          text: '资信跟踪',
//          src: require('./信息跟踪@2x.png'),
//          to: '/home/contact-business'
//
//        }, {
//          text: '资信联动',
//          src: require('./资信联动@2x.png'),
//          to: '/home/contact-business'
//        }],
//        items2: [{
//          text: '资金代收',
//          src: require('./资金代收@2x.png'),
//          to: '/home/contact-business'
//        }, {
//          text: '资金代付',
//          src: require('./资金代付@2x.png'),
//          to: '/home/contact-business'
//        }, {
//          text: '资金账本',
//          src: require('./资金账本@2x.png'),
//          to: '/home/contact-business'
//        }],
//        items3: [{
//          text: '我的申请',
//          src: require('./合同@2x.png'),
//          to: '/home/my-apply'
//        }, {
//          text: '转赠处理',
//          src: require('./存管@2x.png'),
//          to: '/home/orders'
//        }, {
//          text: 'APP下载',
//          src: require('./more@2x.png'),
//          to: '/home/qrcode'
//        }],
        pullUpLoad: null
      };
    },
    mounted: function () {
      this.$nextTick(function () {
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 20);
      });
    },
    created() {
      this.first = true;
      setTitle('首页');
      this.getInitData();
    },
    updated() {
      this.getInitData();
    },
    computed: {
      showDots() {
        return this.banners.length > 1;
      },
      loop() {
        return this.banners.length > 1;
      }
    },
    methods: {
      shouldGetData() {
        if (this.$route.path === '/home') {
          setTitle('首页');
          return this.first;
        }
        return false;
      },
      getInitData() {
        if (this.shouldGetData()) {
          this.first = false;
          this.loadingFlag = true;
          this.getBanners().then(() => {
            this.loadingFlag = false;
            setTimeout(() => {
              this.$refs.scroll.refresh();
            }, 20);
          }).catch(() => {
            this.loadingFlag = false;
          });
        }
      },
      getImgSyl(imgs) {
        return {
          backgroundImage: `url('${formatImg(imgs)}')`
        };
      },
      getBanners() {
        return getBannerList('index_banner').then((data) => {
          this.banners = data;
        });
      }
    },
    components: {
      slider,
      Scroll
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .home-wrapper {
    .fl {
      float: left;
    }
    .fr {
      float: right;
    }
    .bg{
      height: 3.5rem;
      background-image: url('./背景@2x.png');
      position: relative;
      .bg-down{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.9rem;
        background: #000;
        opacity: 0.03;
      }
    }
  }
</style>
