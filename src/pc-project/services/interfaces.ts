import { Vue } from 'vue-property-decorator';
import axios from 'axios';
import { User } from '@/domain/User';

function decoratorclass(target: any) {
//   console.log(target);
}

type Method = 'get' | 'GET' | 'delete' | 'DELETE' |
'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' |
'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'link' |
'LINK' | 'unlink' | 'UNLINK' | undefined;

@decoratorclass
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
    const types: Method = opt.type || 'get';
    return new Promise<User[]>((reslove, reject) => {
      axios({
        method: types,
        url: opt.url,
        params,
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
