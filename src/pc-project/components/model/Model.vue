<template>
  <el-row class="prop-model">
    <el-col :span="10">
      <h3>子组件--model写法 </h3>
      更改foo:
      <el-input
      :value="checked"
      @input="inputHandle($event)"
      placeholder="请输入内容"></el-input><br/><br/>
      <el-button type="primary" @click="ClickEvent()">点击更改foo</el-button>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Model',
  model: {
    prop: 'checked', // prop使默认的是value,也可以自定义,
    event: 'change', // 父组件需要触发的事件.
  },
  props: {
    value: String, // 该组件默认的value
    checked: { // 可以用来自定义 父组件v-model的value
      type: String,
      default: '0',
    },
  },
  methods: {
    inputHandle(val) {
      this.$emit('change', val);
    },
    ClickEvent() {
      this.$emit('change', '哎呀!被更改了!');
    },
  },
};
</script>
