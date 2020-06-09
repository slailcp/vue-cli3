import { ToastParams } from '@/domain/Layer';
import ToastComponent from './toastComponent.vue';

export default (Vue: any) => {
  const $toast: Function = (op: ToastParams) => {
     const ToastTmp = Vue.extend(ToastComponent);
     const $vm = new ToastTmp();

     document.body.appendChild($vm.$mount().$el);
    if (typeof op === 'string') {
      $vm.message = op; // 传入props
    } else if (typeof op === 'object') {
      Object.assign($vm, op); // 合并参数与实例
    }
    setTimeout(() => {
      document.body.removeChild($vm.$mount().$el);
    }, op.time || 2000);

    return $vm.$mount().$el;
  };
  return $toast;
};
