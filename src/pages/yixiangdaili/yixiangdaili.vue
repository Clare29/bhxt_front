<template>
  <transition name="slide">
    <div class="orders-wrapper">
      <div class="category-wrapper">
        <category-scroll :currentIndex="currentIndex"
                         :categorys="categorys"
                         @select="selectCategory"
                         bgColor="#f2f2f2"
                         deColor="#b3b3b3"
                         acColor="#004e7e"></category-scroll>
      </div>
      <scroll ref="scroll"
              :data="currentList.data"
              :pullup="pullup"
              @scrollToEnd="getPageOrders"
              class="orders-content">
        <div v-show="!currentList.hasMore && !(currentList.data && currentList.data.length)" class="no-result-wrapper">
          <no-result title="抱歉，暂无订单"></no-result>
        </div>
      </scroll>
      <div v-show="fetching" class="loading-container">
        <div class="loading-wrapper">
          <loading title=""></loading>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
//  import {CATEGORYS, LIMIT, ORDER_STATUS} from './config';
  import {CATEGORYS, LIMIT} from './config';
  import CategoryScroll from 'base/category-scroll/category-scroll';
  import Scroll from 'base/scroll/scroll';
  import NoResult from 'base/no-result/no-result';
  import Loading from 'base/loading/loading';
  import Confirm from 'base/confirm/confirm';
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import {SET_ORDER_LIST, SET_CURRENT_ORDER} from 'store/mutation-types';
//  import {getPageOrders, cancelBook, receiveOrder} from 'api/biz';
  import {getPageOrders} from 'api/biz';
  import {commonMixin} from 'common/js/mixin';
//  import {formatAmount, setTitle} from 'common/js/util';
  import {setTitle} from 'common/js/util';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        currentCode: '',
        fetching: false,
        pullup: true,
        categorys: CATEGORYS,
        currentIndex: +this.$route.query.index || 0,
        text: ''
      };
    },
    created() {
      this.first = true;
      this.getInitData();
    },
    computed: {
      currentList() {
        let _curListObj = this.orderList[this.categorys[this.currentIndex].key];
        if (!_curListObj) {
          _curListObj = {
            start: 1,
            limit: LIMIT,
            hasMore: true,
            data: [],
            key: this.categorys[this.currentIndex].key
          };
        }
        return _curListObj;
      },
      ...mapGetters(['orderList'])
    },
    methods: {
      getInitData() {
        if (this.shouldGetData()) {
          this.first = false;
          // 清除缓存的订单列表数据
          this.setOrderList({});
          this.getPageOrders();
        }
      },
      getPageOrders() {
        let key = this.categorys[this.currentIndex].key;
        let status = key === 'all' ? '' : key;
        let statusList = status.split('||');
        if (statusList.length > 1) {
          status = statusList;
        }
        if (this.currentList.hasMore) {
          getPageOrders(this.currentList.start, this.currentList.limit, status).then((data) => {
            let _orderOri = this.orderList[key];
            let _order;
            if (!_orderOri) {
              _order = {
                start: 1,
                limit: LIMIT,
                hasMore: true,
                data: [],
                key: key
              };
            } else {
              _order = {
                ..._orderOri
              };
            }
            if (data.list.length < _order.limit || data.totalCount <= _order.limit) {
              _order.hasMore = false;
            }
            _order.start++;
            let _currentList = {
              ..._order
            };
            _currentList.data = _currentList.data.concat(data.list);
            let _orderList = {
              ...this.orderList,
              [_currentList['key']]: _currentList
            };
            this.setOrderList(_orderList);
          });
        }
      },
      selectCategory(index) {
        this.currentIndex = index;
        this.$refs.scroll.scrollTo(0, 0);
        if (!this.currentList.data.length && this.currentList.hasMore) {
          this.getPageOrders();
        }
      },
      shouldGetData() {
        if (this.$route.path === '/user/order') {
          setTitle('订单列表');
          return this.first;
        }
        return false;
      },
      ...mapMutations({
        'setOrderList': SET_ORDER_LIST,
        'setCurrentOrder': SET_CURRENT_ORDER
      }),
      ...mapActions([
        'editOrderListByRating',
        'editOrderListByCancel',
        'editOrderListByReceived'
      ])
    },
    updated() {
      this.getInitData();
    },
    components: {
      CategoryScroll,
      Scroll,
      NoResult,
      Loading,
      Confirm
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";

  .orders-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f5;

    .category-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      overflow: hidden;
      height: 0.8rem;
      line-height: 0.8rem;
      background: #f2f2f2;
    }

    .loading-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);

      .loading-wrapper {
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translate3d(0, -50%, 0);
      }
    }

    .orders-content {
      position: absolute;
      top: 0.8rem;
      left: 0;
      width: 100%;
      bottom: 0;
      background: #fff;

      ul {
        padding: 0 0.36rem;
        font-size: $font-size-medium;

        li {
          padding: 0.32rem 0.24rem 0.26rem;
          border-bottom: 1px solid #a1a1a1;
          color: #333;

          .time {
            margin-bottom: 0.28rem;
          }

          .code {
            margin-bottom: 0.22rem;
          }

          .fl {
            float: left;
          }

          .fr {
            float: right;
          }

          .btn {
            display: inline-block;
            padding: 0.05rem 0.21rem 0.07rem;
            margin-left: 0.2rem;
            border: 1px solid #d2d2d2;
            border-radius: 0.28rem;
            color: $primary-color;

            &.cancel {
              color: #b3b3b3;
            }
          }

          .status {
            display: inline-block;
            padding: 0.05rem 0.21rem 0.07rem;
            border-radius: 0.28rem;
            background: $primary-color;
            color: #fff;
          }
        }
      }

      .orders-loading {
        padding-top: 0.4rem;
      }

      .no-result-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
