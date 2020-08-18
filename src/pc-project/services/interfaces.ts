import { Vue } from 'vue-property-decorator';
import axios from 'axios';
import { User } from '@/domain/User';
import { Canceler } from 'axios';

function decoratorclass(target: any) {
  //   console.log(target);
}

type Method = 'get' | 'GET' | 'delete' | 'DELETE' |
'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' |
'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'link' |
'LINK' | 'unlink' | 'UNLINK' | undefined;
export type RequestParams = { url: string; data?: any; type?: Method; notLoading?: boolean, cancel?: Function }
const BASE_URL = process.env.VUE_APP_BASE_PC; // 全局接口地址

@decoratorclass
export default class Service extends Vue {
  request(opt: RequestParams) {
    let params = {};
    if (opt.data) {
      params = opt.data;
    }
    let loading: any = null;
    if (!opt.notLoading) {
      loading = this.$layer.loading();
    }
    const types: Method = opt.type || 'get';
    return new Promise<any>((reslove, reject) => {
      console.log(params)
      axios({
        method: types,
        url: `${BASE_URL}${opt.url}`,
        [types==='get'?'params':'data']: params,
        cancelToken: new axios.CancelToken((c: Canceler) => {
          if(opt.cancel){
            opt.cancel(c); // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
          }
        }),
      }).then((res) => {
        if (res.status === 200) {
          reslove(res.data);
        } else {
          console.log('error');
        }
      }).catch((error) => {
        reject(error);
          console.log(error);
      }).finally(() => {
        this.$layer.hide(loading);
      });
    });
  }
}

export const service = new Service(); // 减少页面上 new Service()； 直接调用 Service里面的方法


/** 举例
 * @url接口地址
 * @data参数
 * @type请求方式 选填 默认post
 * @cancel是否取消当前请求
 * @notLoading不使用默认的loading弹出层
service.request({
    url: `http://192.168.2.222:8005/Hotel/HotelDetailRoomPlanRate`,
    data:{"TripType":"0"},
    type: 'post',
    cancel: (c: Canceler) => {
      setTimeout(() => { // 条件
        c('取消HotelDetailRoomPlanRate的请求');
      },200)
    }
});
*/
