import api from '@/server/home'
import { GET_USER_INFO } from './mutation-types'

export default {
  async getUserInfoAction({ commit }: any) {
    const userId = window.localStorage.getItem('userId')
    const { data: res } = await api.getUserInfo(userId)
    commit(GET_USER_INFO, { data: res })
  }
}
