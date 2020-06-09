<template>
  <el-row class="prop-model">
    <el-col :span="10">
      <h3>子组件--prop写法 </h3>
      更改fooOriginal:
      <el-input
      :value="originalData"
      @input="change($event)"
      placeholder="请输入内容"></el-input>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ModelOriginal',
  props: {
    value: String,
    originalData: {
      type: String,
      default: 'Foo!!',
    },
  },
  methods: {
    change(val) {
      this.$emit('changeData', val);
    },
  },
};
</script>

<style scoped>
</style>
