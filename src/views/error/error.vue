<template>
  <div class="error">
    <p class="headline">{{ tipWords }}</p>
    <p class="info">{{ desWords }}</p>
    <p @click="back" class="return-home">返回首页</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    let tipWords
    let desWords
    tipWords = ref('对不起，您没有权限')
    desWords = ref('请联系管理员开通本页面的权限再来访问吧~')

    const router = useRouter()

    if (router.currentRoute.value.path === '/404') {
      tipWords = '找不到页面'
      desWords = '请检查您输入的网址是否正确'
    }

    const back = () => {
      router.replace('/')
    }

    return {
      tipWords,
      desWords,
      back
    }
  }
})
</script>
<style lang="less" scoped>
.animat(@duration, @delay) {
  animation-name: slideUp;
  animation-duration: @duration;
  animation-delay: @delay;
  animation-fill-mode: forwards;
  opacity: 0;
}
.error {
  background: #f0f2f5;
  height: 100vh;
  text-align: center;
  padding-top: 24vh;
  .headline {
    font-size: 0.2rem;
    line-height: 0.24rem;
    color: #1482f0;
    margin-bottom: 0.1rem;
    .animat(0.5s, 0.1s);
  }
  .info {
    font-size: 0.13rem;
    line-height: 0.21rem;
    color: grey;
    margin-bottom: 0.3rem;
    .animat(0.5s, 0.2s);
  }
  .return-home {
    display: inline-block;
    width: 1.1rem;
    height: 0.36rem;
    background: #1482f0;
    border-radius: 1rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.14rem;
    line-height: 0.36rem;
    cursor: pointer;
    .animat(0.5s, 0.3s);
  }
}
@keyframes slideUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
