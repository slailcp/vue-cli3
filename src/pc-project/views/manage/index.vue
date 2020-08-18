<template>
    <div class="">
      <div style="width:900px;margin:10px auto;">
        <button @click="alert1">alert1</button>
        <button @click="alert2">alert2</button>
        <button @click="loading">loading</button>
        <button @click="toast">toast</button>
        <button @click="confirm1">confirm1</button>
        <button @click="confirm2">confirm2</button>
      </div>
      <hr/>

      <div style="width:900px;margin:10px auto;">
        <div style="display:inline-block">
          城市选择1
          <SelectCityComponent
          v-model="searchcode1"
          @selected="selected"/>
        </div>   
        <div style="display:inline-block;margin-left:40px;">
          城市选择2
          <SelectCityComponent
          v-model="searchcode2"
          @selected="selected"/>
        </div>
      </div>
      <hr/>

      <div style="width:900px;margin:10px auto;">
        <div style="display:inline-block">
          城市时间1
          <FjDatepickerComponent
            v-model="activeMonth1"
          />
        </div>   
        <div style="display:inline-block;margin-left:40px;">
          城市时间2
          <FjDatepickerComponent
            v-model="activeMonth2"
            type="double"
          />
        </div>
      </div>
      <hr/>

      <div style="width:900px;margin:10px auto;">
        <div style="display:inline-block">
          自动选择1
           <FjAutoCompleteComponent 
            selectKey="name"
            :requestEvent="GetSearchTopTip"
            v-model="autoSearchcode1"
            >
            <template v-slot:aoto="slotProps">
              <div class="slot-item" @click="checkedItem(slotProps)">{{slotProps.item.name}}</div>
            </template>
          </FjAutoCompleteComponent>
        </div>   
        <div style="display:inline-block;margin-left:40px;">
          自动选择2
          <FjAutoCompleteComponent 
            selectKey="name"
            :requestEvent="GetSearchTopTip"
            v-model="autoSearchcode2"
            >
            <template v-slot:aoto="slotProps">
              <div class="slot-item" @click="checkedItem(slotProps)">{{slotProps.item.name}}</div>
            </template>
          </FjAutoCompleteComponent>
        </div>
      </div>
      <hr/>


    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelectCityComponent from '@/pc-project/components/select-city.vue';
import FjDatepickerComponent from '@/pc-project/components/fj-datepicker/fj-datepicker.vue';
import FjAutoCompleteComponent from '@/pc-project/components/aoto-query/fj-auto-complete.vue';
import {service} from '@/pc-project/services/interfaces'
import axios from 'axios'
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';


@Component({
  components: { SelectCityComponent, FjDatepickerComponent, FjAutoCompleteComponent }
})
export default class IndexPage extends Vue {
  private searchcode1 = '';
  private searchcode2 = '';

  private activeMonth1 = '2020-08-17';
  private activeMonth2 = '2020/08/19~2020/08/22';
  private startEnabled = '2020/07/17';
  private endEnabled = '2020-09-22';

  private autoSearchcode1= '';
  private autoSearchcode2 = '';

  selected(cityitem: any) {
    console.log(cityitem);
  }

  checkedItem(aotoItem: any) { console.log(aotoItem) }

  GetSearchTopTip(value: string, callback: Function) {
    let params: any = {}
    if(value) { params = {"name": value}; } 
      service.request({
          url: `/user`,
          data: params,
          notLoading: true
      }).then((res) => {
          if(callback) { callback(res); }
      })
  }

  alert1() {
    this.$layer.alert('我是alert!');
  }

  alert2() {
    this.$layer.alert({
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
  }

  loading() {
    // this.$layer.loading();
    const loading = this.$layer.loading('3秒后关闭哦...');
    setTimeout(() => {
      this.$layer.hide(loading);
    },3000);
  }

  toast() {
    // this.$layer.toast('我是toast!'); // 默认2秒关闭
    this.$layer.toast({
        message: '校验错误!',
        time: 5000
    });
  }

  confirm1() {
    this.$layer.confirm('确认关闭？');
  }

  confirm2() {
    this.$layer.confirm({
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.slot-item{padding: 5px;cursor: pointer;}
button{display: inline-block;margin:5px;}
</style>
