<template>
    <div class="layer-alert-bg">
        <div class="layer-alert">
            <div class="fj-title">{{ title }}</div>
            <div class="fj-content">
                {{ text }}
            </div>
            <div class="fj-btn">
                <button @click.stop="Btn1Callback">{{enterBtnMessage}}</button>
                <button @click.stop="Btn2Callback">{{cancelBtnMessage}}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

declare module 'vue/types/vue' {
    interface Vue {
      shide: Function;
    }
  }

@Component
export default class ConfirmComponent extends Vue {
  @Prop({ type: String, default: '温馨提示' }) private title!: string;

  @Prop({ type: String, default: '' }) private text!: string;

  @Prop({ type: String, default: '确定' }) private enterBtnMessage!: string;

  @Prop({ type: String, default: '取消' }) private cancelBtnMessage!: string;

  @Prop({ type: Function, default() { return () => {}; } }) private finallyCallback!: Function;

  @Prop({ type: Function, default() { return () => {}; } }) private enterBtnCallback!: Function ;

  @Prop({ type: Function, default() { return () => {}; } }) private cancelBtnCallback!: Function ;

  Btn2Callback() {
      this.shide();
      this.cancelBtnCallback();
      this.finallyCallback(0);
  }

  Btn1Callback() {
      const index = this.enterBtnCallback(); // 调用的时候,如果有返回值代表不可以关闭当前组件
      this.finallyCallback(1); // 不管点击了哪个按钮,都会运行这个方法
      if (typeof index === 'function') {
          this.shide();
          return;
      }
      if (index === undefined) {
          this.shide(); // ts文件里面定义的hide方法
      } else {
          console.log('关不掉哦'); // 不允许关闭弹出框
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 .layer-alert-bg {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .layer-alert {
        background: #fff;
        z-index: 100;
        width: 200px;
        padding: 20px 0;
    }

    .fj-title {
        line-height: 26px;
        padding-left: 20px;
    }

    .fj-close {
        float: right;
        margin-right: 20px;
    }

    .fj-content {
        padding: 20px;
    }

    .fj-btn {
        line-height: 20px;
        text-align: center;
        button{margin-right:20px;}
    }
</style>
