<template>
  <div class="hello">
    <h3>孙子的组件</h3>
    爷爷组件里面的foo:
    <span style="color:#ff6600">{{foo.description}}</span><br/>
    爷爷组件里面的fooReactive:
    <span style="color:#ff6600">{{fooReactive}}</span><br/>
    爷爷组件里面的fooReactiveKey1:
    <span style="color:#ff6600">{{fooReactiveKey1}}</span><br/>
    爷爷组件里面的fooReactiveKey2:
    <span style="color:#ff6600">{{fooReactiveKey2}}</span>
    <span style="padding-left:30px;">
      <span style="color:#ff6600">=> fooReactiveKey2没有些key所以取不到哦</span>
    </span>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Inject, InjectReactive,
} from 'vue-property-decorator';

@Component
export default class ProvideGSonComponent extends Vue {
  @Inject() readonly foo!: string;

  @InjectReactive() fooReactive!: string;

  @InjectReactive('1') fooReactiveKey1!: string;

  @InjectReactive() fooReactiveKey2!: string;
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
