<template>
    <div class="layer-alert-bg">
        <div class="layer-alert">
            <div class="fj-content">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LoadingComponent extends Vue {
  @Prop({ type: String, default: '正在加载中...' }) private message!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 .layer-alert-bg {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .layer-alert {
        background: url('../../../../assets/gif/loading.gif') no-repeat;
        background-size: 100px;
        z-index: 100;
        min-width: 100px;
        min-height: 100px;
        padding-top: 120px;
        color: #fff;
        text-align: center;
    }

</style>
