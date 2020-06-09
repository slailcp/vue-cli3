<template>
  <div class="hello">
    <h3>子组件</h3>
    {{name}}
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';

@Component
export default class RefComponent extends Vue {
  @Prop() readonly name: string | undefined;

  private refName = 'ref';

  getname(val: string) {
    alert('子组件的getname方法');
    return `${this.name}.....${val}`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
