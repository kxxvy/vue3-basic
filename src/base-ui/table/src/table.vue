<template>
  <el-table
    :data="tableData"
    border
    ref="multipleTable"
    tooltip-effect="dark"
    :header-cell-style="{ background: '#f9f9f9', color: '#999' }"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    v-bind="childrenProps"
  >
    <el-table-column
      v-if="showSelectColumn"
      type="selection"
      align="center"
    ></el-table-column>
    <el-table-column
      v-if="showIndexColumn"
      type="index"
      label="序号"
      align="center"
    ></el-table-column>
    <template v-for="propItem in propList" :key="propItem.prop">
      <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
        <template #default="scope">
          <slot :name="propItem.slotName" :row="scope.row">
            {{ scope.row[propItem.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tableData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['handleSelectionChangeEvent'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('handleSelectionChangeEvent', value)
    }

    return {
      handleSelectionChange
    }
  }
})
</script>

<style lang="less" scoped></style>
