<template>
  <div id="app">
    <h2>{{ userInfo.name }}</h2>

    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useState } from '@/hooks'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const storeInfo = useState('modules', ['userInfo'])
    return {
      ...storeInfo
    }
  }
})
</script>

<style lang="less"></style>
