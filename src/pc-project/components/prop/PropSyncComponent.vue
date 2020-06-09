<template>
  <div class="hello">
    <h2>子组件</h2>
    <div style="padding:20px 0;">PropSync更改父组件传过来的prop,父组件传过来的like通过PropSync改名为syncedlike</div>
    <div>
      syncedlike:
      <span style="color:#ff6600">{{ syncedlike }}</span>
    </div>
    <button @click="editLike()">修改like</button>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, PropSync,
} from 'vue-property-decorator';

@Component
export default class PropSyncComponent extends Vue {
  @PropSync('like', { type: String }) syncedlike!: string; // 用来实现组件的双向绑定,子组件可以更改父组件穿过来的值

  editLike(): void {
    this.syncedlike = '哎呀!被修改了!'; // 双向绑定,更改syncedlike会更改父组件的like
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
