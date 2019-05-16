import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  roles: '',
  count: 10,
  visitedviews: [], // 存放所有浏览过的且不重复的路由数据
  cachedViews: []
}

// 定义所需的 mutations
const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
  addRoles (state, { roles }) {
    state.roles = roles
  },
  ADD_VISITED_VIEWS: (state, view) => { // 打开新页签--添加路由数据的方法
    if (state.visitedviews.some(v => v.path == view.path)) return
    state.visitedviews.push({
      name: view.name,
      path: view.path,
      title: view.name || 'no-title'
    })
  },
  DEL_VISITED_VIEWS: (state, view) => { // 关闭页签--删除路由数据的方法
    for (let [i, v] of state.visitedviews.entries()) {
      if (v.path === view.path) {
        state.visitedviews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedviews = state.visitedviews.filter(v => {
      return v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews = state.cachedViews.slice(index, index + 1)
        break
      }
    }
  },
  DEL_ALL_VISITED_VIEWS: state => {
    state.visitedviews = []
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedviews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
