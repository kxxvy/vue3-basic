import { IHomeState } from './types'
const state: IHomeState = {
  name: 'czy'
}

const actions = {
  saveCommonValue({ commit }: any, value: any) {
    commit('SAVE_COMMON_VALUE', value)
  }
}

const mutations = {
  SAVE_COMMON_VALUE(state: IHomeState, obj: any) {
    state[obj.key] = obj.value
    // state.data = data;
  }
}

const getters = {
  nameGetter(
    state: IHomeState,
    getters: any,
    rootState: any,
    rootGetters: any
  ) {
    return state.name + '...'
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
