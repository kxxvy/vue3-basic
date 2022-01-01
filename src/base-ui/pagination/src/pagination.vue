<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-model:currentPage="curPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
  >
  </el-pagination>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: () => [20, 40, 60, 80]
    },
    pageSize: {
      type: Number,
      default: 20
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    total: {
      type: Number,
      default: 0
    }
  },
  emits: ['handleSizeChangeEvent', 'handleCurrentChangeEvent'],
  setup(props, { emit }) {
    const curPage = computed(() => {
      return props.currentPage
    })
    const handleSizeChange = (val: number) => {
      emit('handleSizeChangeEvent', val)
    }

    const handleCurrentChange = (val: number) => {
      emit('handleCurrentChangeEvent', val)
    }

    return {
      curPage,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped></style>
