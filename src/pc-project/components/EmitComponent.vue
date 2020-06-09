<template>
  <div class="hello">
    <h3>子组件</h3>
    <el-table
      :data="persons"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="addToCount(scope.row)" type="text" size="small">选择</el-button>
          <el-button @click="delToCount(scope.row, scope.$index)"
            type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';

type Person = {name: string; age: number; sex: string };

@Component
export default class PropComponent extends Vue {
  private name: string | undefined;

  private age: number | undefined;

  private persons: Person[] = [
    { name: '貂蝉', age: 1, sex: '女' },
    { name: '小乔', age: 2, sex: '女' },
    { name: '西施', age: 3, sex: '女' },
    { name: '王昭君', age: 4, sex: '女' },
    { name: '杨玉环', age: 5, sex: '女' },
    { name: '大乔', age: 6, sex: '女' },
    { name: '张春华', age: 7, sex: '女' },
  ];

  @Prop(String) readonly sex: string | undefined;

  // 父组件使用  @delsemit="eventclick()"
  @Emit('delsemit') private delEmitClick(p: Person) {}

  @Emit() // 如果此处不设置别名字,则默认使用下面的函数命名
  addToCount(p: Person) { // 此处命名如果有大写字母则需要用横线隔开  @add-to-count
    // return this.persons[1]; // 此处不return,则会默认使用括号里的参数p;
  }

  delToCount(p: Person, index: number) {
    this.persons.splice(index, 1);
    this.delEmitClick(p);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
