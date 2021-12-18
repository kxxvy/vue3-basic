import { computed } from 'vue'
import { Computed, Mapper, MapperWithNamespace, useStore } from 'vuex'
import { IRootState } from '@/store/types'

export function useMapper(
  mapper: string[],
  mapFn: Mapper<Computed> & MapperWithNamespace<Computed>
) {
  // 拿到store独享
  const store = useStore()

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapFn(mapper)

  // 对数据进行转换
  const storeState: IRootState = {}
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store })
    storeState[fnKey] = computed(fn)
  })

  return storeState
}
