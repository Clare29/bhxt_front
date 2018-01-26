<template>
    <div class="full-screen-wrapper home-wrapper">
        <div class="bg">
          <div class="bg-up">
            <div class="circle fl"></div>
            <img src="./head@2x.png" alt="头像" class="fl">
            <div class="name">张三</div>
            <div class="high">上级:公司</div>
            <p class="team fl">团队:family</p>
          </div>
          <div class="bg-down">
          </div>
          <div class="bg-down-item"><div class="icon1 icon-certificate fl"></div><span>授权证书</span></div>
          <div class="bg-down-item"><div class="icon1 icon-message fl"></div><span>系统消息</span></div>
        </div>
        <div class="middle">
          <div class="fl money">
            <span>余额</span>
            <span>￥1000.00</span>
            <img src="./more@2x.png" class="fr">
          </div>
          <div class="fl daili">
            <img src="./daili@2x.png" class="fr">
            <span>我的客户</span>
          </div>
          <div class="fl chongzhi">
            <img src="./chongzhi@2x.png" class="fr">
            <span>个人中心</span>
          </div>
        </div>
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
//        items1: [
// {
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
//        }
// ],
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
      background-image: url('background@2x.png');
      position: relative;
      .bg-up{
        width: 100%;
        height: 2.6rem;
        padding: 0.7rem 0.3rem;
        color: $color-highlight-background;
        font-size:$font-size-small;
        .circle,img{
          border-radius: 50%;
          background-color: #fff;
          margin-right: 0.5rem;
        }
        .circle{
          width: 1.2rem;
          height: 1.2rem;
          opacity: 0.6;
        }
        img{
          position: absolute;
          top: 0.72rem;
          left: 0.32rem;
          width: 1.12rem;
          height: 1.12rem;
          margin:0.02rem;
        }
        .name{
          font-size:$font-size-large-s;
          width: 80%;
          margin-bottom: 0.2rem;
        }
        .high{
          width: 80%;
          margin-bottom: 0.2rem;
        }
        .team{
          margin-bottom: 0;
        }
      }
      .bg-down{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.9rem;
        background: #000;
        opacity: 0.03;
      }
      .bg-down-item{
        width: 50%;
        height: 0.9rem;
        float: left;
        padding: 0.3rem 0 0.3rem 0.3rem;
        span{
          height: 100%;
          color: $color-highlight-background;
          font-size:$font-size-medium-x;

        }
        .icon1{
          width: 0.32rem;
          height: 100%;
          background-size: 0.32rem;
          margin-left: 0.6rem;
          margin-right: 0.2rem;

        }
        .icon-certificate{
          background-image: url('certificate@2x.png');
        }
        .icon-certificate+span{
          padding-right: 1.1rem;
          border-right: 1px solid #fff;
        }
        .icon-message{
          background-image: url('message@2x.png');
        }
      }
    }
    .middle{
      height: 2.4rem;
      .money{
        width: 100%;
        height: 50%;
        background: $color-highlight-background;
        padding:0.44rem 0.3rem 0.44rem 0.6rem;
        border-bottom:1px solid $color-border;
        span:first-child{
          color: $color-text;
          font-size:$font-size-medium-xx;
          margin-right: 0.4rem;
        }
        span:nth-child(2){
          color: $primary-color;
          font-size:$font-size-large-ss;
        }
        img{
          height: 0.32rem;
          width: 0.16rem;
          background-size: 0.16rem;
        }
      }
    }
  }
</style>
