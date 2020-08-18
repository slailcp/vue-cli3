<template>
  <div class="menu">
     <el-col>
      <el-menu
        default-active="2"
        class="menu-inner"
        :router="isRouter"
        @select="handleSelect"
        >
        <el-menu-item v-for="(item, index) of menu"
        v-bind:key="index"
        :index="item.link">
          <i class="el-icon-document"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <el-menu-item index="40" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

type MenuItem = {
  name: string;
  link: string;
}

@Component
export default class MenuComponent extends Vue {
  private isRouter = true;

  private menu: MenuItem[] = [
    { name: 'index', link: '/manage/index' },
    { name: 'emit', link: '/manage/Emitpage' },
    { name: 'model', link: '/manage/Modelpage' },
    { name: 'props', link: '/manage/PropsPage' },
    { name: 'propsync', link: '/manage/PropSyncPage' },
    { name: 'provideInject', link: '/manage/ProvideInjectPage' },
    { name: 'ref', link: '/manage/RefPage' },
    { name: 'watch', link: '/manage/WatchPage' },
    { name: 'router', link: '/manage/RouterPage' },
  ]

  public handleSelect(key: string, keyPath: any[]) {
    console.log(key);
    console.log(keyPath);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.menu{height: 100%;border-right:1px solid #d8d8d8;}
.menu-inner{border:0}
</style>
