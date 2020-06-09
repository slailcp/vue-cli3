import { AlertParams } from '@/domain/Layer';
import LayerAlert from './alert/alert';
import LayerLoad from './loading/loading';
import LayerToast from './toast/toast';
import LayerConfirm from './confirm/confirm';

const $hide = (ele: any | null) => {
    if (ele === null) {
        return;
    }
    // 在页面中查找alert，如有还存在的话就移除掉
    const alertEles = document.querySelectorAll('.layer-alert-bg');
    alertEles.forEach((aele) => {
      if (ele === aele) { document.body.removeChild(ele); }
    });
  };

export default {
  install(Vue: any) {
    Vue.prototype.$layer = {
        alert: LayerAlert(Vue),
        loading: LayerLoad(Vue),
        toast: LayerToast(Vue),
        hide: $hide,
        confirm: LayerConfirm(Vue),
    };
  },
};

/**
 * @alert / confirm
 * this.$layer.alert('我是alert!');
 * this.$layer.alert({
      title: 'alerttitle',
      text: 'alerttext',
      btnMessage: 'string',
      finallyCallback: (num: number | string) => { // num: 0 close  1 btn
       console.log(num);
      },
      btnCallback: () => {
        console.log('btnCallback');
        return false; // 阻止弹出框关闭;
      },
      closeCallback: () => { },
    });

 * @loading
    this.$layer.loading();
    this.$layer.loading('正在加载中...');
 * @toast
    this.$layer.toast('校验错误!'); // 默认2000毫秒后关闭
    this.$layer.toast({
        message: '校验错误!',
        time: 5000
    });
 * @hide
    const alert = this.$layer.alert('显示一个alert!');
    const loading = this.$layer.loading('显示一个alert!');
    this.$layer.hide(alert);
    this.$layer.hide(loading);
 */
