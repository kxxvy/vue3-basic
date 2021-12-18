import { GET_USER_INFO } from './mutation-types'

import { IModuleState } from './types'

export default {
  [GET_USER_INFO](state: IModuleState, { data }: any) {
    state.userInfo = data
  }
}
