<template>
  <div class="Props">
    <h1>父组件</h1>
    <div>
      name: {{name}}<br/>
      age: {{age}}<br/>
      sex: {{sex}} (sex并没有传给子组件)<br/>
    </div>

    <hr/>
    <PropComponent :name="name" :age="age"></PropComponent>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import PropComponent from '@/pc-project/components/prop/PropComponent.vue';

@Component({
  components: {
    PropComponent,
  },
})
export default class PropsPage extends Vue {
  private name = '张三';

  private age = 1;

  private sex = 'nan';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
