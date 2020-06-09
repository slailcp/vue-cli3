<template>
  <div class="">
    <el-row>
      <el-col :span="15">
        <h1>child:{{child}}</h1>
        修改child:<input type="text" v-model="child"/>
        <el-table
          :data="animalData"
          style="width: 100%">
          <el-table-column
            prop="type"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="eat"
            label="食物">
          </el-table-column>
        </el-table><br/>
        <button @click="changeChild()" style="margin-right:10px;">修改child</button>
        <button @click="editAnimalData()">修改表格中的小猫</button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Watch, Component } from 'vue-property-decorator';

interface Animal {
  type: string;
  eat: string;
}

@Component
export default class WatchPage extends Vue {
  private animalData: Animal[] = [
    { type: '狗狗', eat: '火腿' },
    { type: '猫猫', eat: '鱼' },
  ];

  private child = '';

  private zhanwei = '';

  @Watch('child')
  onChildChanged(newValue: string, oldValue: string) {
    this.zhanwei = 'onChildChanged';
    console.log(newValue);
    console.log(oldValue);
  }

  @Watch('animalData', { immediate: true, deep: true })
  onAnimalDataChanged(newValue: Animal[], oldValue: Animal[]) {
    this.zhanwei = 'onAnimalDataChanged';
    console.log(newValue);
    console.log(oldValue);
  }

  editAnimalData(): void {
    this.animalData[0].eat = '修改小猫的eat';
  }

  changeChild(): void {
    this.child = 'changeChild';
  }
}
</script>
