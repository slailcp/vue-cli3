<template>
  <div class="">
    <el-row>
      <el-col :span="10">
        <h3>父组件(此处显示子组件操作的操作记录)</h3>
        选择了:{{selectData.name}}<br/>
        删除了:{{deleteData.name}}
        <hr/>

        <EmitComponent sex='女' @add-to-count="returnPersons" @delsemit="delemit"></EmitComponent>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import EmitComponent from '@/pc-project/components/EmitComponent.vue';

@Component({
  components: { EmitComponent },
})
export default class EmitPage extends Vue {
  private selectData = { name: '我还没有名字' };

  private deleteData = { name: '我还没有名字' };

  returnPersons(person: any) {
    this.selectData = person;
  }

  delemit(person: any) {
    this.deleteData = person;
  }
}
</script>
