<template>
  <div class="">
    <H3>ProvideInjectPage页面(不使用任何prop)</H3>
    <div style="width:500px;margin:10px auto;text-align:left;">
      在ProvideInjectPage页面使用Provide,ProvideReactive定义数据,不需要props传递数据
      然后爷爷套父母,父母套儿子,儿子套孙子,最后在孙子组件里面获取ProvideInjectPage
      里面的信息<br/><br/>
      ProvideInjectPage页面里面的foo:
      <span style="color:#ff6600">{{foo.description}}</span><br/>
      ProvideInjectPage页面里面的fooReactive:
      <span style="color:#ff6600">{{fooReactive}}</span><br/>
      ProvideInjectPage页面里面的fooReactiveKey1:
      <span style="color:#ff6600">{{fooReactiveKey1}}</span><br/>
      ProvideInjectPage页面里面的fooReactiveKey2:
      <span style="color:#ff6600">{{fooReactiveKey2}}</span>
    </div>
    <el-button class="btn" @click="editInfo('foo')">
      Provide-修改foo
    </el-button>
    <el-button class="btn" @click="editInfo('fooReactive')">
      ProvideReactive-修改fooReactive
    </el-button>
    <el-button class="btn" @click="editInfo('fooReactiveKey1')">
      ProvideReactive-修改fooReactiveKey1
    </el-button>
    <el-button class="btn" @click="editInfo('fooReactiveKey2')">
      ProvideReactive-修改fooReactiveKey2
    </el-button>
    <hr/>
    <provideGrandpa></provideGrandpa>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Provide, ProvideReactive,
} from 'vue-property-decorator';
import provideGrandpa from '@/pc-project/components/provide/ProvideGParentComponent.vue';

// const key = Symbol('2');

@Component({
  components: { provideGrandpa },
})
export default class ProvideInjectPage extends Vue {
  @Provide() foo = Symbol('fooaaa');

  @ProvideReactive() fooReactive = 'fooReactive';

  @ProvideReactive('1') fooReactiveKey1 = 'fooReactiveKey1';

  @ProvideReactive('2') fooReactiveKey2 = 'fooReactiveKey2';

  created() {
  }

  editInfo(foo: string) {
    if (foo === 'foo') { this.foo = Symbol('fooaaa111'); }
    if (foo === 'fooReactive') { this.fooReactive = 'fooReactive111'; }
    if (foo === 'fooReactiveKey1') { this.fooReactiveKey1 = 'fooReactiveKey111'; }
    if (foo === 'fooReactiveKey2') { this.fooReactiveKey2 = 'fooReactiveKey222'; }
  }
}
</script>

<style scoped>
.btn{margin:10px;display: block;}
</style>
