 import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
  MutationAction,
} from 'vuex-module-decorators';
import { User } from '@/domain/User';
import store from '@/pc-project/store';
import Service from '@/pc-project/services/interfaces';

const service = new Service();

// export type User = {
//     username: string;
//     password: string;
// }

@Module({
  name: 'passenger', namespaced: true, store, dynamic: true,
})
export default class PassengerStore extends VuexModule {

}

export const PassengerStoreModule = getModule(PassengerStore);
