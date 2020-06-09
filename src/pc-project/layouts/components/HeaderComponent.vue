<template>
  <el-header class="header">
    <el-row :gutter="20">
      <el-col :span="16"><div class="header-left">USER-MANAGE</div></el-col>
      <el-col :span="8">
        <div class="header-right" v-if="LoginStoreModule.loginInfo">
          <img class="imgurl" :src="LoginStoreModule.loginInfo.imgurl"/>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <span class="username">{{LoginStoreModule.loginInfo.username}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { LoginStoreModule } from '@/pc-project//store/modules/login';

type HeaderDropdown = 'logout';

@Component
export default class HeaderComponent extends Vue {
  @Prop() private msg!: string;

  private LoginStoreModule: any = LoginStoreModule;

  handleCommand(command: HeaderDropdown) {
    if (command === 'logout') {
      this.LoginStoreModule.loginOut(this.$router);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header{background: #2dc3e8;line-height: 60px;color:#fff;}
.header-right{height: 60px;line-height: 60px;float: right;background-color:none;
  .imgurl{width:30px;display: inline-block;vertical-align: middle;}
  .el-dropdown-link{cursor: pointer;color:#fff;}
  .username{padding-left:20px;}
  .el-icon-arrow-down{transition: 1s;}
  .el-dropdown-link:hover .el-icon-arrow-down{transform: rotate(180deg);}
}

</style>
