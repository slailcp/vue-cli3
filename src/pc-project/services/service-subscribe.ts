import { Vue } from 'vue-property-decorator';
import axios from 'axios';
import { Observable } from 'rxjs';

type Method = 'get' | 'GET' | 'delete' | 'DELETE' |
'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' |
'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'link' |
'LINK' | 'unlink' | 'UNLINK' | undefined;

export default class LoginService extends Vue {
  public cancel: any = null;

  request(opt: { url: string; data?: any; type?: Method; notLoading?: boolean }) {
    let params = {};
    if (opt.data) {
      params = opt.data;
    }
    let loading: any = null;
    if (!opt.notLoading) {
      loading = this.$layer.loading();
    }

    const cancel: any = null;
    const types: Method = opt.type || 'get';
    console.log(params);
    const ret = {
        service: new Observable((observer) => {
          axios({
            method: types,
            url: opt.url,
            params,
            cancelToken: new axios.CancelToken((c) => {
              ret.cancel = c;
            // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
            }),
          }).then((res) => {
            if (res.status === 200) {
              observer.next(res.data);
            } else {
              console.log('error');
            }
          }).catch((error) => {
              console.log(error);
          }).finally(() => {
            this.$layer.hide(loading);
          });
        }),
       cancel,
    };
    return ret;
  }

  // 取消请求
  cancelEvent(c: any) {
    c();
  }
}

/**
 * @post
    例子：
    const loginService = new LoginService();
    const ser = loginService.request({ url: 'http://localhost:3000/user', data: {}, type: 'post', notLoading: true }); // notLoading: 没有loading
    ser.service
    .subscribe((item) => {
      console.log(item);
    });

    @cancelEvent
    setTimeout(() => {
      loginService.cancelEvent(ser.cancel);
    }, 10);
 */
