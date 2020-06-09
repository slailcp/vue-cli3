<template>
  <div class="">
    Router:
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  beforeRouteLeave(to: any, from: any, next: any) {
    console.log('beforeRouteLeave');
    next();
  },
  beforeRouteEnter(to: any, from: any, next: any) {
    console.log('beforeRouteLeave');
    next();
  },
})
export default class RouterPage extends Vue {
}
</script>
