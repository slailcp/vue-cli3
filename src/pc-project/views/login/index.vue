<template>
  <div class="login">
      <h3>登录</h3>
      <el-form :model="ruleForm"
      status-icon :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <div style="text-align:center">
          <el-button type="primary" @click="submitForm()">登录</el-button><br/>
          <a href="h5.html" class="skip-h5">去手机端看看</a>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Ref } from 'vue-property-decorator';
import { Form } from 'element-ui';
import { LoginStoreModule } from '@/pc-project/store/modules/login';
import { AlertParams } from '@/domain/Layer';
import { UserLogin } from '@/domain/User';

// import { aa } from 'h5/mm';

// console.log(aa);

@Component({ name: 'login' })
export default class LoginPage extends Vue {
  @Ref('ruleForm') readonly ruleFormRef!: Form;

  private ruleForm: UserLogin = {
    userName: '貂蝉',
    pass: '123456',
    checkPass: '123456',
  }

  // 校验
  validateuserName = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      callback(new Error('请输入用户名'));
    } else {
      callback();
    }
  }

  validatePass(rule: any, value: string, callback: Function) {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      if (this.ruleForm.checkPass !== '') {
        this.ruleFormRef.validateField('checkPass');
      }
      callback();
    }
  }

  validatePass2 = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.ruleForm.pass) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  }

  private rules = {
    userName: [
      { validator: this.validateuserName, trigger: 'blur' },
    ],
    pass: [
      { validator: this.validatePass, trigger: 'blur' },
    ],
    checkPass: [
      { validator: this.validatePass2, trigger: 'blur' },
    ],
  }

  submitForm() {
    this.ruleFormRef.validate((valid) => {
      if (valid) {
        // this.$store.dispatch('login', this.ruleForm);
        LoginStoreModule.login({ router: this.$router, loginParams: this.ruleForm });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  created() {
    console.log(process.env);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login{width:400px;margin:50px auto;box-shadow: 1px 1px 5px #333;padding:20px;border-radius: 10px;}
h3{text-align: center;}
.skip-h5{
  display: block;
  color:#00a0e9;
  padding-top:15px;
  font-size: 12px;
}
</style>
