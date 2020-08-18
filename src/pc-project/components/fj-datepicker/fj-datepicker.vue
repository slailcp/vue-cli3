<template>
    <div>
        <input type="text" readonly :value="activeMonth" @blur="handleBlur($event)" @click="handleClick($event)" :placeholder="placeholder" />
        <div class="date-wraper" :style="listStyle" v-if="boxShow" @click="boxEvent">
            <div v-for="(value, key, index) in dateData" :key="index" style="float: left;">
              <div class="title">
                <span class="prev" @click="prev(key ,'year')" v-if="index===0"> 《 </span> 
                <span class="prev" @click="prev(key ,'month')" v-if="index===0"> ← </span> 
                {{value.title}}
                <span class="next" @click="next(key ,'month')" v-if="type!=='double' || index===1"> → </span>
                <span class="next" @click="next(key ,'year')"  v-if="type!=='double' || index===1"> 》 </span>
                </div>
              <div class="week">
                <span class="week-item">日</span>
                <span class="week-item">一</span>
                <span class="week-item">二</span>
                <span class="week-item">三</span>
                <span class="week-item">四</span>
                <span class="week-item">五</span>
                <span class="week-item">六</span>
              </div>
              <div class="date">
                <span v-for="(d, i) in value.date" :key="i" class="date-item" 
                :class="[d.classname, type==='double'?' double':'']" 
                @click="selectName(d)">
                    <!-- {{d.year}}-
                    {{d.month}}- -->
                    {{d.day}}
                    <i class="tag" v-if="d.tag && d.tag === 's'">入</i>
                    <i class="tag" v-if="d.tag && d.tag === 'e'">离</i>
                    <i class="tag" v-if="d.tag && d.tag === '今'">今</i>
                </span>
              </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Model } from 'vue-property-decorator';
import { getPos, stopPropagation } from '@/utils';
import Datepicker from './datepicker'
import moment from 'moment'

/**
 * @init(event: any)  父组件要调用此方法，穿如event以及v-model的属性名成
 * @activeMonth v-moddel 跟付组件通讯的
 * @listStyle控制当前组件的位置
 * @startEnabled： 可用的开始时间范围
 * @endEnabled 可用的结束时间范围
 * @type 双日历还是单日历（双日历可以选择入住时间以及离开时间）  'single' | 'double'
 */

@Component
export default class FjDatepickerDoubleComponent extends Vue {
    @Model('change') readonly activeMonth!: string | string[];
    @Prop({ default: '', type: String }) private startEnabled!: string;
    @Prop({ default: '', type: String }) private endEnabled!: string;
    @Prop({ default: '', type: String }) private placeholder!: string;
    @Prop({ default: 'single', type: String }) private type!: 'single' | 'double'; // single  double
    
    private listStyle: any = { 'pointer-events': 'auto' };
    private boxShow = false;
    private dateData: any = null;
    private aotoemptyisShow = false;
    private datepicker = new Datepicker();

    private clickNum = 0;
    private clickarr: string[] = [];

    @Emit('change') private changeEmit(event: string | string[]) {}

    created() {
      document.addEventListener("click", () => { 
        this.boxShow = false;
        this.clickNum = 0;
        this.clickarr = [];
      });
    }

    handleBlur(event: any) {
      // if(this.type === 'double'){
      //   if(this.activeMonth1 && this.activeMonth2){
      //     this.changeEmit(this.activeMonth1 +'~'+this.activeMonth2);
      //   }
        
      // }else{
        this.changeEmit(event.target.value);
      // }
    }
    
    selectName(item: any) {
      if(item.classname&&item.classname.indexOf('disabled')!==-1) {
        return;
      }
      if(this.type ==='double' && item.classname && 
      (item.classname.indexOf('next')!==-1 || item.classname.indexOf('prev')!==-1)){
        return;
      }
      if(this.type==='double') {
        if(this.clickNum < 2){
          this.clickarr.push(`${item.year}-${item.month}-${item.day}`);
          item.classname+=' clicked';
          this.clickNum ++;
        }
        if(this.clickNum ===2){
          let newclickarr = [];
          if(moment(this.clickarr[0]).diff(moment(this.clickarr[1])) > 0){
            newclickarr[0] = this.clickarr[1];
            newclickarr[1] = this.clickarr[0];
          }else{
            newclickarr[0] = this.clickarr[0];
            newclickarr[1] = this.clickarr[1];
          }
         this.clickarr = [...newclickarr]
          if(this.clickarr.length === 2){
            this.changeEmit(this.clickarr.join('~'));
          }
          this.boxShow = false;
          this.clickNum = 0;
          this.clickarr = [];
        }        
      }else{
        const date = `${item.year}-${item.month}-${item.day}`;
        this.changeEmit(date);
        this.boxShow = false;
      }
    }

    prev(date: any, type: 'month' | 'year') {
      const d = moment(Number(date)).add(-1, type).format('YYYY-MM-DD');
      const dateData: any = this.datepicker.init(this.startEnabled,this.endEnabled, this.activeMonth, d, this.type);
      for(let key in dateData) {
        const length = dateData[key].date.length-1;
        if(dateData[key].date[length].classname.indexOf('disabled')!==-1) {
          return;
        }
      }
      this.dateData = dateData;
    }

    // 获取this.dateData中的最小月份
    getMinDate() {
      let minDate = ''
      for(let key in this.dateData) {
        if(minDate === ''){
          minDate =  key;
        }else{
          minDate  = moment(Number(minDate)).diff(Number(minDate)) ? key : minDate;
        }
      }
      return Number(minDate);
    }
      
    next(date: any, type: 'month' | 'year') {
      const d = moment(this.getMinDate()).add(1, type).format('YYYY-MM-DD');
      
      const dateData: any = this.datepicker.init(this.startEnabled,this.endEnabled, this.activeMonth, d, this.type);
      for(let key in dateData) {
        if(dateData[key].date[0].classname.indexOf('disabled')!==-1) {
          return;
        }
      }
      this.dateData = dateData;
    }
       
    handleClick(event: any) {
      this.dateData = this.datepicker.init(this.startEnabled,this.endEnabled, this.activeMonth,'', this.type);
      this.init(event);

      this.boxShow = false;
      setTimeout(()=>{
        stopPropagation(event);
        this.boxShow = true;
      },100)
    }

    init(event: any) {
      const dom = event.target;
      const _getPos = getPos(dom);
      this.listStyle = {
      ...this.listStyle,
      // 'width': `${_getPos.width}px`,
      width:this.type === 'double' ? '440px' :'220px',
      'left': `${_getPos.left}px`,
      'top': `${_getPos.top+_getPos.height}px`,
      }
    }
    boxEvent(event: any) {
        stopPropagation(event);
    }
}
</script>

<style scoped lang="less">
.date-wraper{
  position:absolute;
  background: #fff;
  width:440px;
  border-radius: 5px;
  border:1px solid #d8d8d8;
  text-align: center;
  padding:5px 0;
}
.title{
  .prev{cursor: pointer;}
  .next{cursor: pointer;}
}
.week-item{width: 30px;display: inline-block;}

.date{width:220px;}
.date-item{color: #ccc;width: 30px;height: 30px;line-height:30px;display: inline-block;cursor: pointer;position: relative;
  .tag{position: absolute;top:-8px;right:-5px;font-size: 12px;font-style: normal;transform: scale(.8);}
  &.disabled{color:#ccc;cursor: no-drop;} /* 禁用的日期 */
  &.enabled{color:#333;/* 当前月份可以点击的日期 */
    &:hover{background: blue;color:#fff;border-radius: 30px;}
    &.double.prev:hover{background: none;color:#ccc;cursor: no-drop;}
    &.double.next:hover{background: none;color:#ccc;cursor: no-drop;}
  } 
  &.current{color:red} /* 已经选中的日期 */
  &.prev{color:#ccc} /* 上一个月剩余到本月的日期 */
  &.next{color:#ccc} /* 下一个月剩余到本月的日期 */
  &.today{color:#00a0e9}
  &.clicked{background: blue;border-radius: 50%;color:#fff}
  
}

</style>

