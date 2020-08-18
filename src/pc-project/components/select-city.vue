<template>
  <div>
    <input type="text" 
    :value="searchCode" 
    @input="inputHandle($event)"
    @click="clickHandle($event)"
    />
    <div class="select-city" :style="listStyle" @click="boxEvent">
      <div v-if="(clickboxShow || inputboxShow)&&allCity.length === 0">加载中...</div>

      <div class="click-city" v-if="clickboxShow && allCity.length">
        <div class="title">
          <span class="tit" :class="selectedKey === '热门'?'active':''" @click="select('热门')">热门</span>
          <span class="tit" :class="selectedKey === key?'active':''" v-for="(value,key,index) of splitCityList" :key="index" @click="select(key)">
            {{key}}
          </span>
        </div>
        <div class="split-box hot">
          <template v-if="selectedKey === '热门'">
            <span class="name" v-for="(item, index) of hotCity" :key="index" @click="checkName(item)">{{item.Name}}</span>
          </template>
        </div>
        <div class="split-box" v-for="(value,key,index) of splitCityList" :key="index">
          <!-- <div class="split-tit">{{key}}</div> -->
          <template v-if="selectedKey === key">
            <div v-for="(value1,key1,index1) of value" :key="index1">
              <div class="letter-box clearFix">
                <div class="letter-tit">{{key1}}</div>
                <div class="letter-con">
                  <span class="name" v-for="(item2,index2) of value1" :key="index2" @click="checkName(item2)">{{item2.Name}}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="input-city" v-if="inputboxShow && allCity.length">
        <div v-if="!inputAllCity.length">暂无更多数据</div>
        <template v-if="inputAllCity.length">
          <div class="name-item" v-for="(item, index) of inputAllCity" :key="index"  @click="checkName(item)">{{item.Name}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Model } from 'vue-property-decorator';
import {service} from '@/pc-project/services/interfaces'
import { getPos, stopPropagation } from '@/utils';

/**
 * @init(event: any)  初始要调用此方法
 * @listStyle控制当前组件的位置
 * selected emit事件
 */

@Component
export default class SelectCityComponent extends Vue {
  @Model('change', { type: String }) readonly searchCode!: string

  private listStyle: any = { 'pointer-events': 'auto' };
  private clickboxShow = false; // 点击面板是否显示
  private inputboxShow = false; // 输入面板是否显示
  private allCity: any[] = []; // 所有城市
  private inputAllCity: any[] = []; // 输入的时候显示的列表
  private selectedKey = '热门';
  private hotCity: any[] = []; // 热门城市列表
  private splitCityList: any = { // A-Z面板列表
      'ABC': {},
      'DEFG': {},
      'HJ': {},
      'KL': {},
      'MNPQ': {},
      'RSTW': {},
      'XYZ': {},
  }

  @Emit('selected') private checkName(item: any) {
    this.clickboxShow = false;
    this.inputboxShow = false;
    this.changeEmit(item.Name);
  }

  @Emit('change') private changeEmit(event: any) {}

  public inputHandle(event: any): void {
    this.changeEmit(event.target.value);
    this.init(event);
  }

  clickHandle(event: any): void {
    // this.changeEmit(event.target.value);
    this.init(event);

    this.clickboxShow = false;
    setTimeout(()=>{
      stopPropagation(event);
      this.clickboxShow = true;
    },100)
    this.inputboxShow = false;
  }

  created() {
    service.request({
        url: `/Cities`,
        data: {},
        notLoading: true
    }).then((res: any) => {
      this.allCity = res;
      const allCityList: any = {}; // 所有城市
      this.allCity.forEach((item, index) => {
        if(item.IsHot){
            this.hotCity.push(item);
          }
          const letter = item.Abbreviation.substr(0,1);
          if(item.Level === 1){
            if(!allCityList[letter]){ allCityList[letter] = [] };
            allCityList[letter].push(item);
          }
      })
      
      for(let key in allCityList) {
          for(let key2 in this.splitCityList) {
            if(key2.indexOf(key)!==-1) { // 存在
            if(!this.splitCityList[key2][key]){this.splitCityList[key2][key] = []}
              this.splitCityList[key2][key] = allCityList[key];
            }
          }
      }
    });
    document.addEventListener("click", () => {
      this.clickboxShow = false;
      this.inputboxShow = false;
    })
  }

  select(key: string) {
    this.selectedKey = key;
    console.log(this.selectedKey);
  }

  // 父组件调用
  init(event: any) {
    this.selectedKey = '热门';
    const dom = event.target;
    const _getPos = getPos(dom);
    this.listStyle = {
      ...this.listStyle,
      // 'width': `${_getPos.width}px`,
      'left': `${_getPos.left}px`,
      'top': `${_getPos.top+_getPos.height}px`,
    }

    if(event.type === 'input'){
      this.input(dom.value);
    }
  }

  input(value: string) {
    this.clickboxShow = false;
    this.inputboxShow = true;
    this.inputAllCity = this.allCity.filter(
      item => item.Name.indexOf(value)===0 || 
      item.Pinyin.indexOf(value.toUpperCase())===0 ||
      item.Abbreviation.indexOf(value.toUpperCase())===0
      );
  }

  boxEvent(event: any) {
    stopPropagation(event);
  }
}
</script>

<style scoped lang="less">
.select-city{position: absolute;font-size:12px;box-shadow: 0px 5px 38px #ccc;background:#fff;
  .click-city{background: #fff;width:290px;}
  .input-city{background: #fff;width:200px;max-height: 300px;overflow-y: auto;
    .name-item{padding:3px; cursor: pointer;}
  }
  .name{padding:8px;display: inline-block;cursor: pointer;}
  .title{border-bottom:1px solid #d8d8d8;
    .tit{padding:0 5px;border-bottom:1px solid #d8d8d8;display:inline-block;line-height:24px;cursor: pointer;
      position: relative;bottom:-1px;
      &.active{border:1px solid #ddd;border-bottom:1px solid #fff;}
    }
  }
  .split-box{background: #fff;
    .letter-tit{float: left;width:20px;text-align: center;color:#ff6e00;padding-top:10px;}
    .letter-con{float: left;width: 268px;}
  }

}
</style>

