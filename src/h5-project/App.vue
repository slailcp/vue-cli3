<template>
  <div id="h5">
    <div class="banner">
      <img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1913214116,3912663704&fm=26&gp=0.jpg"/>
    </div>
    <div class="nav-box">
      <router-link class="nav" to="/">机票</router-link>
      <router-link class="nav" to="/hotel">酒店</router-link>
      <router-link class="nav" to="/train">火车票</router-link>
      <router-link class="nav" to="/car">打车</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'app',
})
export default class App extends Vue {
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState({
        ...this.$store.state,
        ...JSON.parse(sessionStorage.getItem('store')),
      });
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });

    console.log(process.env);
  }
}
</script>

<style scoped lang="less">
.banner{height:6rem;width:100%;overflow: hidden;
  img{width:100%}
}
.nav-box{display: flex;background:#fff;
  .nav{
    flex:1;text-align: center;position: relative;line-height:2rem;
    &::before{content:"";display: block;border-left:1px solid #d8d8d8;position: absolute;width: 1px;left:0;top:0;bottom:0;}
    &:first-child{
      &::before{border:0;}
    }
    &.router-link-exact-active{background: #00a0e9;color:#fff;}
  }
}
</style>
