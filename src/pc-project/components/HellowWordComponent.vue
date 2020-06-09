<template>
  <div class="hello">

  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';

type Person = {name: string; age: number; sex: string };

@Component
export default class HellowWordComponent extends Vue {
  @Prop() readonly sex: string | undefined;

  private name: string | undefined;

  private age: number | undefined;

  private person: Person = { name: '我是子组件的张三', age: 1, sex: '男' };

  @Emit()
  addToCount(p: Person) {
    console.log(p);
    return this.person;
  }

  mounted() {
    console.log(`mounted:${this.name}`);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
