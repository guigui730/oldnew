import * as types from './mutation-types'

const mutations = {

  [types.SET_COLLECTREFRESF](state,collectRefresh) {
    state.collectRefresh = collectRefresh
  },
  [types.SET_CENTER](state,center) {
    state.center = center
  },
  [types.SET_DROPS](state,drops) {
    state.drops = drops
  }
}

export default mutations
