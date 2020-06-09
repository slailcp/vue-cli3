<template>
  <div class="PropSync">
    <h1>父组件</h1>
    like:{{like}}<br/><br/>
    <hr/>
    <PropSyncComponent :like.sync="like"></PropSyncComponent>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import PropSyncComponent from '@/pc-project/components/prop/PropSyncComponent.vue';

@Component({
  components: { PropSyncComponent },
})
export default class PropSyncPage extends Vue {
  private like = '我是like!';
}
</script>
