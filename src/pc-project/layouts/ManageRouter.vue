<template>
    <el-container>
      <HeaderComponent></HeaderComponent>
      <el-container :style="{ minHeight: containerHeight }">
        <el-aside width="200px"><MenuComponent></MenuComponent></el-aside>
        <el-main><router-view/></el-main>
      </el-container>
      <el-footer class="footer">footer</el-footer>
    </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HeaderComponent from './components/HeaderComponent.vue';
import MenuComponent from './components/MenuComponent.vue';

@Component({
  components: { HeaderComponent, MenuComponent },
})
export default class ManageRouter extends Vue {
  private containerHeight ='auto';

  created() {
     this.containerHeight = `${Number(document.documentElement.clientHeight) - 120}px`;
  }
}
</script>

<style scoped lang="less">
.footer{background: #2dc3e8;color:#fff;text-align:center;line-height:60px;}
</style>
