<template>
  <div
    @click.stop="handleSelectWidget()"
    :class="[item.wgClassName?item.wgClassName:'widget-view',{active: selectWg.key === item.key}]"
    :style="wgViewStyle"
  >
    <i class="el-icon-rank" v-if="Array.isArray(item.list)"></i>
    <component :is="wgNameMap[item.type]" :item="item" />
    <span
      title="删除"
      @click.stop="handleWidgetDelete()"
      v-if="selectWg.key === item.key"
      class="widget-action-btn widget-action-delete el-icon-delete"
    ></span>
    <span
      title="复制"
      @click.stop="handleWidgetClone()"
      v-if="clonebtn"
      class="widget-action-btn widget-action-clone el-icon-document-copy"
    ></span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {
    WgPhone: () => import('./wg-phone'),
    WgInput: () => import('./wg-input'),
    WgCheckbox: () => import('./wg-checkbox'),
    WgSelect: () => import('./wg-select'),
    WgSwitch: () => import('./wg-switch'),
    WgDate: () => import('./wg-date'),
    WgImgshow: () => import('./wg-imgshow'),
    WgImgslide: () => import('./wg-imgslide'),
    WgButton: () => import('./wg-button'),
    WgStaticText: () => import('./wg-statictext'),
    WgSplitLine: () => import('./wg-splitLine'),
    WgHpicker: () => import('./wg-hpicker'),
    WgWechat: () => import('./wg-wechat'),
    WgMarquee: () => import('./wg-marquee'),
    WgAgreement: () => import('./wg-agreement'),
    WgFormList: () => import('./wg-formlist')
  },
  props: {
    item: Object,
    index: Number,
    data: Array
  },
  data() {
    return {
      wgNameMap: {
        phone: 'WgPhone', // 手机
        input: 'WgInput', // 输入框
        checkbox: 'WgCheckbox', // 选择框
        select: 'WgSelect', // 下拉选择
        switch: 'WgSwitch', // 开关
        date: 'WgDate', // 日期选择
        imgShow: 'WgImgshow', // 图片展示
        imgSlide: 'WgImgslide', // 图片轮播
        button: 'WgButton', // 按钮
        staticText: 'WgStaticText', // 文本描述
        splitLine: 'WgSplitLine', // 分割线
        hPicker: 'WgHpicker', // 横向滑动自动选择
        wechat: 'WgWechat', // 表单内容区
        marquee: 'WgMarquee', // 微信关注
        agreement: 'WgAgreement', // 跑马灯
        formList: 'WgFormList', // 用户协议
      }
    }
  },
  computed: {
    clonebtn() {
      if (this.selectWg.fixedBottom) return false;
      if (Array.isArray(this.selectWg.list)) return false;
      if (this.selectWg.key === this.item.key) return true;
      return false;
    },
    wgViewStyle() {
      if (Array.isArray(this.item.list)) return { ...this.item.style, backgroundImage: `url(${this.item.backgroundImage})` };
      if (this.item.position) return this.item.position;
      return {}
    },
    ...mapState({
      selectWg: state => state.common.selectWg
    })
  },
  methods: {
    handleSelectWidget() {
      this.$store.commit('setSelectWg', this.data[this.index]);
      this.$store.commit('setConfigTab', "widget");
    },
    handleWidgetDelete() {
      if (this.data.length - 1 === this.index) {
        if (this.index === 0) {
          this.$store.commit('setSelectWg', {})
        } else {
          this.$store.commit('setSelectWg', this.data[this.index - 1])
        }
      } else {
        this.$store.commit('setSelectWg', this.data[this.index + 1])
      }
      this.$nextTick(() => {
        this.data.splice(this.index, 1)
      })
    },
    handleWidgetClone() {
      let cloneData = this.$util.deepClone(this.data[this.index]);
      cloneData.key = cloneData.type + '_' + Date.now() + '_' + Math.ceil(Math.random() * 1000000);
      this.$nextTick(() => {
        this.data.splice(this.index, 0, cloneData)
        this.$store.commit('setSelectWg', this.data[this.index + 1])
      })
    },
  }
}
</script>
