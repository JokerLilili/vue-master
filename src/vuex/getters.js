
const getters = {
  getCount: state => state.count,
  getRoles: state => state.roles,
  visitedviews :state => state.visitedviews,
  cachedViews: state => state.tagsView.cachedViews,
}

export default getters
