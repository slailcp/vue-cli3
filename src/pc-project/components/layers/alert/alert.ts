import { AlertParams } from '@/domain/Layer';
import AlertComponent from './alertComponent.vue';

export default (Vue: any) => {
  const $alert: Function = (op: AlertParams) => {
    // 创建vue构造器
    const AlertTmp = Vue.extend(AlertComponent);
    // 实例化vue实例
    const $vm = new AlertTmp();

    // 添加到浏览器body中
    document.body.appendChild($vm.$mount().$el);
    if (typeof op === 'string') {
      $vm.text = op; // 传入props
    } else if (typeof op === 'object') {
      Object.assign($vm, op); // 合并参数与实例
    }
    // 关闭当前组件,在alert组件内部需要用到
    $vm.shide = () => {
      document.body.removeChild($vm.$mount().$el);
    };

    // 用来关闭组件的
    return $vm.$mount().$el;
  };
  return $alert;
};
