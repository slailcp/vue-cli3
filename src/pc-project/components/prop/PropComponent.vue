<template>
  <div class="hello">
    <h1>子组件</h1>
    name: {{name}}<br/>
    age: {{age}}<br/>
    sex: {{sex}}(没接收到父组件的sex,默认为false)<br/>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, PropSync,
} from 'vue-property-decorator';

@Component
export default class PropComponent extends Vue {
   @Prop() readonly name!: string | undefined;

   @Prop({ default: 30, type: Number }) private age!: number;

   @Prop([String, Boolean]) private sex!: string | boolean;
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
