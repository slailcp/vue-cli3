<template>
  <div class="hello">
    <h3>儿子的组件</h3>
    <hr/>
    <ProvideGSonComponent></ProvideGSonComponent>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';

import ProvideGSonComponent from './ProvideGSonComponent.vue';

@Component({
  components: { ProvideGSonComponent },
})
export default class ProvideSonComponent extends Vue {

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
