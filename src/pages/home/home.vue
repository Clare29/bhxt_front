<template>
    <div class="full-screen-wrapper home-wrapper">
      <scroll ref="scroll" :pullUpLoad="pullUpLoad">
        <div class="bg">
          <router-link tag="div" to="/setting" class="bg-up">
            <div class="circle fl"></div>
            <img src="./head@2x.png" alt="头像" class="fl">
            <div class="name">张三</div>
            <div class="high">上级:公司</div>
            <p class="team fl">团队:family</p>
          </router-link>
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
            <img src="./daili@2x.png">
            <span>意向代理</span>
          </div>
          <div class="fl chongzhi">
            <img src="./chongzhi@2x.png">
            <span>审核充值</span>
          </div>
        </div>
        <div class="blank"></div>
        <!--代理管理-->
        <div class="block">
          <div class="title">
            <span>代理管理</span>
          </div>
          <div v-for="item in dailiManage" class="item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
        </div>
        <div class="blank"></div>
        <!--财务管理-->
        <div class="block">
          <div class="title">
            <span>财务管理</span>
          </div>
          <div v-for="item in caiwuManage" class="item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
        </div>
        <div class="blank"></div>
        <!--订单管理-->
        <div class="block">
          <div class="title">
            <span>订单管理</span>
          </div>
          <div v-for="item in dingdanManage" class="item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
        </div>
        <div class="blank"></div>
        <!--售后管理-->
        <div class="block">
          <div class="title">
            <span>售后管理</span>
          </div>
          <div v-for="item in shouhouManage" class="item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
        </div>
        <div class="blank"></div>
        <!--出货统计-->
        <div class="block">
          <div class="title">
            <span>出货统计</span>
          </div>
          <div v-for="item in chuhuoCalculate" class="item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
        </div>
        <div class="blank"></div>
        <!--产品查询-->
        <div class="block">
          <div class="title">
            <span>产品查询</span>
          </div>
          <div v-for="item in chanpinchaxun" class="item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
</template>
<script>
  import {setTitle} from 'common/js/util';
  import Scroll from 'base/scroll/scroll';
  export default {
    data() {
      return {
//        代理管理
        dailiManage: [{
          text: '代理商结构图',
          src: require('./daili2@2x.png'),
          to: '/my-templet'
        }, {
          text: '意向代理',
          src: require('./constructor@2x.png'),
          to: '/yixiangdaili'

        }, {
          text: '我的推荐',
          src: require('./tuijian@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '代理轨迹',
          src: require('./guiji@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '授权证书',
          src: require('./certification2@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '代理审核',
          src: require('./shenhe@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '申请取消',
          src: require('./cancel@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '下级代理',
          src: require('./xiajidaili@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '邀请链接',
          src: require('./yaoqinglianjie@2x.png'),
          to: '/home/contact-business'
        }],
//        财务管理
        caiwuManage: [{
          text: '我的余额',
          src: require('./wodeyue@2x.png'),
          to: '/my-templet'
        }, {
          text: '申请充值',
          src: require('./shenqingchongzhi@2x.png'),
          to: '/home/contact-business'

        }, {
          text: '审核充值',
          src: require('./shenhechongzhi2@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '推荐奖励',
          src: require('./tuijianjiangli@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '出货奖励',
          src: require('./chuhuojiangli@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '介绍奖励',
          src: require('./jieshaojiangli@2x.png'),
          to: '/home/contact-business'
        }],
//        订单管理
        dingdanManage: [{
          text: '我的订单',
          src: require('./myOrder@2x.png'),
          to: '/my-templet'
        }, {
          text: '在线下单',
          src: require('./zaixianxiadan@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '待处理订单',
          src: require('./daichulidingdan@2x.png'),
          to: '/home/contact-business'
        }],
//        售后管理
        shouhouManage: [{
          text: '申请换货',
          src: require('./shenqinghuanhuo@2x.png'),
          to: '/my-templet'
        }, {
          text: '售后记录',
          src: require('./shouhoujilu@2x.png'),
          to: '/home/contact-business'
        }],
//        出货统计
        chuhuoCalculate: [{
          text: '我的介绍',
          src: require('./wodejieshao@2x.png'),
          to: '/my-templet'
        }, {
          text: '个人业绩',
          src: require('./gerenyeji@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '差价利润',
          src: require('./chajialirun@2x.png'),
          to: '/home/contact-business'
        }],
//        产品查询
        chanpinchaxun: [{
          text: '产品查询',
          src: require('./chanpinchaxun@2x.png'),
          to: '/my-templet'
        }, {
          text: '素材查询',
          src: require('./sucaichaxun@2x.png'),
          to: '/home/contact-business'
        }]
      };
    },
    created() {
      this.first = true;
      this.pullUpLoad = null;
      setTitle('首页');
      this.getInitData();
    },
    updated() {
      this.getInitData();
    },
    computed: {},
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
          setTimeout(() => {
            this.$refs.scroll.refresh();
          }, 40);
        }
      }
    },
    components: {
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
      div{
        height: 50%;
        background: $color-highlight-background;

      }
      .money{
        width: 100%;
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
      .chongzhi,.daili{
        width: 50%;
        padding:0.36rem 0.7rem;
        border-right:1px solid $color-border;
        position: relative;
        img{
          width: 0.4rem;
          margin-right: 0.48rem;
        }
        span{
          /*height: 100%;*/
          position: absolute;
          top: 0.46rem;
          font-size:0.32rem;
        }
      }
      .daili img{
        width: 0.36rem;
      }
    }
    .blank{
      width: 100%;
      height: 0.2rem;
      background: $color-blank;
    }
    .block{
      background: $color-background;
      .title{
        width: 100%;
        height: 0.7rem;
        padding: 0.2rem 0.3rem;
        border-bottom: 1px solid $color-border;
        span{
          padding-left: 0.18rem;
          color: $color-text;
          border-left:8px solid $primary-color;
          font-size: 0.3rem;
        }
      }
      .item {
        width: 33.3%;
        height: 1.9rem;
        padding-top: 0.48rem;
        text-align: center;
        border-bottom:1px solid $color-border;
        border-right:1px solid $color-border;
        display: inline-block;
        img {
          margin-bottom: 0.22rem;
          width: 0.46rem;
          height: 0.46rem;
        }
        span {
          font-size: $font-size-medium;
          color: #666;
          margin: 0 auto;
        }
      }
    }
  }
</style>
