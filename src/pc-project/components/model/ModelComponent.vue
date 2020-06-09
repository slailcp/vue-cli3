<template>
  <el-row class="prop-model">
    <el-col :span="10">
      <h3>子组件--model+ts写法 </h3>
      更改fooTs:
    <el-input
      :value="checked" @input="inputHandle($event)"
      placeholder="请输入内容"></el-input>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {
  Component, Vue, Model, Emit,
} from 'vue-property-decorator';

@Component
export default class ModelComponent extends Vue {
  @Model('change', { type: String }) readonly checked!: string

  @Emit('change') private changeEmit(event: any) {}

  public inputHandle(value: string): void {
    this.changeEmit(value);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
