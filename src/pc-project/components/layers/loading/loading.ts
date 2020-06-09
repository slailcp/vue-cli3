import { LoadingParams } from '@/domain/Layer';
import LoadingComponent from './loadingComponent.vue';

export default (Vue: any) => {
  const $loading: Function = (op: LoadingParams) => {
     const LoadTmp = Vue.extend(LoadingComponent);
     const $vm = new LoadTmp();

     document.body.appendChild($vm.$mount().$el);
    if (typeof op === 'string') {
      $vm.message = op; // 传入props
    } else if (typeof op === 'object') {
      Object.assign($vm, op); // 合并参数与实例
    }

    return $vm.$mount().$el;
  };
  return $loading;
};
