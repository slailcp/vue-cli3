<template>
  <div class="PropSync">
    <h3>父组件</h3>
    <div>点击按钮可以看下console的打印信息</div>
    <button @click="getRef('btn')">操作"花真美"的ref</button><br/><br/><br/>
    <button @click="getRef('com')">操作'RefComponent'的ref</button><br/><br/>
    <button ref="aButton" style="padding:20px;">花真美</button><br/>

    <br/><hr/><br/>
    <RefComponent name="RefComponent组件" ref="RefComponent"></RefComponent><br/>
    msg:{{msg}}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import RefComponent from '@/pc-project/components/RefComponent.vue';

@Component({
  components: { RefComponent },
})
export default class RefPage extends Vue {
  // @Ref() readonly RefComponent!: RefComponent;
  @Ref('RefComponent') readonly RefC!: RefComponent;

  @Ref('aButton') readonly ref!: HTMLButtonElement;

  private msg = '';

  getRef(type: string) {
    if (type === 'btn') {
      console.log(this.ref);
      this.ref.style.backgroundColor = 'red';
      this.ref.style.color = '#fff';
    }
    if (type === 'com') {
      console.log(this.RefC);
      // this.msg = this.RefC.getname('ddd');
    }
  }
  // @Ref('aButton') readonly button!: HTMLButtonElement
}
</script>
