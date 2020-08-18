<template>
    <div>
        <input type="text" :value="searchCode" @input="inputHandle($event)" @click="clickHandle($event)" />
        <div class="aoto-query" :style="listStyle" v-if="boxShow" @click="boxEvent">
            <div v-if="!AllData.length && !aotoemptyisShow">加载中。。。</div>
            <div v-if="searchCode!==''&&aotoemptyisShow">暂无更多数据</div>
            <template v-if="AllData.length">
            <div v-for="(aotoitem, index) of AllData" :key="index" @click="selectName(aotoitem)">
                <slot name="aoto" :item="aotoitem"></slot>
            </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Model } from 'vue-property-decorator';
import { getPos, stopPropagation, debounce } from '@/utils';
import {service} from '@/pc-project/services/interfaces';

/**
 * <slot>上的自定义属性，可以在父组件上使用 <template v-slot:aoto="slotProps">{{slotProps.item}}</template> 获取
 * @init(event: any, modelName: any)  父组件要调用此方法，穿如event以及v-model的属性名成
 * @listStyle控制当前组件的位置
 * @selectKey 选中的项的字段名称
 * @requestEvent 父传过来的请求数据方法 Function
 */

@Component
export default class FjAutoCompleteComponent extends Vue {
    @Model('change', { type: String }) readonly searchCode!: string;
    @Prop() private requestEvent!: Function;
    @Prop({ default: 'Name', type: String }) private selectKey!: string;
    
    private listStyle: any = { 'pointer-events': 'auto' };
    private boxShow = false;
    private AllData: any[] = [];
    private aotoemptyisShow = false;

    @Emit('change') private changeEmit(event: any) {}

    private selectName(item: any) { 
        this.changeEmit(item[this.selectKey]);
        this.boxShow = false;
    }
       
    created() {
        document.addEventListener("click", () => { this.boxShow = false;});
    }

    getthis() { return this; }
    inputHandle = debounce((event: any, model:any) => {
        const that = this.getthis(); // 由于使用 fn = () => {} 会导致this失效，先使用此方法代替this，后面优化
        that.init(event);
        that.AllData = [];
        that.aotoemptyisShow = false;
        this.changeEmit(event.target.value);
    },1000)

    clickHandle(event: any) {
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
        'width': `${_getPos.width}px`,
        'left': `${_getPos.left}px`,
        'top': `${_getPos.top+_getPos.height}px`,
        }
        this.boxShow = true;
        if(this.requestEvent){
            this.requestEvent(event.target.value, (res: any) => {
                this.AllData = res;
                if(this.AllData.length === 0){
                    this.aotoemptyisShow = true;
                }
            });
        }
        
    }
    boxEvent(event: any) {
        stopPropagation(event);
    }
}
</script>

<style scoped lang="less">
.aoto-query{position:absolute;background: #fff;box-shadow: 0px 5px 38px #ccc;}
</style>

