<template>
  <div class="Model">
    <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="prop写法" name="first">
          <h3> 父组件 </h3>
          <div>fooOriginal: {{fooOriginal}}</div><br/>
          <modelOriginal
            value="some value"
            :originalData="fooOriginal"
            @changeData="val => { fooOriginal = val }">
          </modelOriginal>
        </el-tab-pane>

        <el-tab-pane label="model写法" name="second">
          <h3> 父组件 </h3>
          <div>foo : {{foo}}</div><br/>
          <Model v-model="foo" value="some value"></Model>
        </el-tab-pane>

        <el-tab-pane label="model+ts写法" name="third">
          <h3> 父组件 </h3>
          <div>fooTs : {{fooTs}}</div><br/>
          <ModelComponent v-model="fooTs" value="some value"></ModelComponent>
        </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModelOriginal from '@/pc-project/components/model/Model-original.vue';
import Model from '@/pc-project/components/model/Model.vue';
import ModelComponent from '@/pc-project/components/model/ModelComponent.vue';

@Component({
  components: {
    ModelOriginal, ModelComponent, Model,
  },
})
export default class ModelPage extends Vue {
  private activeName = 'first';

  private fooOriginal = 'prop写法';

  private foo = 'App Foo!';

  private fooTs = 'App Foo!';

  handleClick(tab: any, event: any) {
    console.log(tab, event);
  }
}

</script>
