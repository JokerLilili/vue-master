const actions = {
  increment ({ commit }) {
    commit('INCREMENT')
  },
  decrement ({ commit }) {
    commit('DECREMENT')
  },
  addRoles ({ commit }, { roles }) {
    commit('addRoles', { roles })
  },
  addVisitedViews ({ commit }, view) { // 通过解构赋值得到commit方法
    commit('ADD_VISITED_VIEWS', view) // 去触发ADD_VISITED_VIEWS，并传入参数
  },
  delVisitedViews ({ commit, state }, view) { // 删除数组存放的路由之后，需要再去刷新路由，这是一个异步的过程，需要有回掉函数，所以使用并返回promise对象，也可以让组件在调用的时候接着使用.then的方法
    // commit('DEL_VISITED_VIEWS',view)
    return new Promise((resolve) => { // resolve方法：未来成功后回掉的方法
      commit('DEL_VISITED_VIEWS', view)
      resolve([...state.visitedviews])
    })
  },
  delView ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedviews: [...state.visitedviews],
        cachedViews: [...state.visitedviews]
      })
    })
  },
  delVisitedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedviews])
    })
  },
  delCachedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedviews: [...state.visitedviews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedviews])
    })
  },
  delOthersCachedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedviews: [...state.visitedviews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews ({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedviews])
    })
  },
  delAllCachedViews ({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView ({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}
export default actions
