import Vue from 'vue';
import {
    Module,
    VuexModule,
    Mutation,
    Action,
    getModule,
    MutationAction,
} from 'vuex-module-decorators';
import { User, UserLogin } from '@/domain/User';
import Service from '@/pc-project/services/interfaces';
import store from '@/pc-project/store';
import VueRouter from 'vue-router';

const $vm = new Vue();
const service = new Service();

@Module({
    name: 'login', dynamic: true, store,
})
export default class LoginStore extends VuexModule {
    loginInfo: User | null = {
        username: '',
        imgurl: '',
    }

    @Mutation
    curUserData(data: User) {
      this.loginInfo = data;
    }

    @Action
    loginOut(router: VueRouter) {
      $vm.$layer.confirm({
        text: '确定退出?',
        enterBtnCallback: () => {
          const loading = $vm.$layer.loading();
          setTimeout(() => {
            this.context.commit('curUserData', null);
            $vm.$layer.hide(loading);
            $vm.$layer.toast('退出成功');
            router.push({ path: '/' });
            localStorage.removeItem('LOGININFO');
            sessionStorage.removeItem('store');
          }, 2000);
        },
      });
    }

    @MutationAction({ mutate: ['loginInfo'] })
    async login(params: {router: VueRouter; loginParams: UserLogin}) {
      const { router, loginParams } = params;
      let loginInfo: User | null = null;
      const response: any = await service.request({
        url: '/user',
        data: { name: loginParams.userName, password: loginParams.pass },
      });
      if (!response.length) {
        $vm.$layer.toast('账号或者密码不正确');
        loginInfo = null;
      } else {
        if (loginParams.userName === response[0].name
          && loginParams.pass === response[0].password) {
            $vm.$layer.toast('登录成功');
            loginInfo = {
              username: response[0].name,
              imgurl: response[0].imgurl,
            };
            localStorage.setItem('LOGININFO', JSON.stringify(loginInfo));
            router.push({ path: '/manage' });
          }
      }
      return {
        loginInfo,
      };
    }
}

export const LoginStoreModule = getModule(LoginStore);
