<template>
  <div class="hello">
    <h3>爷爷的组件</h3>
    <hr/>
    <ProvideParentComponent></ProvideParentComponent>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';

import ProvideParentComponent from './ProvideParentComponent.vue';

@Component({
  components: { ProvideParentComponent },
})
export default class ProvideGParentComponent extends Vue {

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
