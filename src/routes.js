import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import Page7admin from './views/nav3/Page7admin.vue'
import Page7 from './views/nav3/Page7.vue'
import Page7both from './views/nav3/Page7both.vue'
import Page7guest from './views/nav3/Page7guest.vue'
import echarts from './views/charts/echarts.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routerMap = [
  {
    path: '/login',
    component: Login,
    name: '',
    meta: ['admin', 'guest'],
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    meta: ['admin', 'guest'],
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: '导航一',
    meta: ['admin', 'guest'],
    iconCls: 'fa fa-user fa-fw',
    children: [
      { path: '/main', component: Main, name: '主页', meta: ['admin', 'guest'], hidden: true },
      { path: '/table', component: Table, name: 'Table', meta: ['admin', 'guest'] },
      { path: '/form', component: Form, name: 'Form', meta: ['admin', 'guest'] },
      { path: '/user', component: user, name: '列表', meta: ['admin', 'guest'] }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '导航二',
    meta: ['admin', 'guest'],
    iconCls: 'fa fa-id-card-o fa-fw',
    children: [
      { path: '/page4', component: Page4, name: '页面4', meta: ['admin', 'guest'] },
      { path: '/page5', component: Page5, name: '页面5', meta: ['admin', 'guest'] }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '导航三',
    meta: ['admin', 'guest'],
    iconCls: 'fa fa-address-card fa-fw',
    children: [
      { path: '/page6', component: Page6, name: '页面6', meta: ['admin', 'guest'] },
      { path: '/page7',
        component: Page7,
        name: '页面7',
        meta: ['admin', 'guest'],
        iconCls: 'fa fa-address-card fa-fw',
        children: [
          { path: '/Page7admin', component: Page7admin, name: 'admin', meta: ['admin'] },
          { path: '/Page7both', component: Page7both, name: 'both', meta: ['admin', 'guest'] },
          { path: '/Page7guest', component: Page7guest, name: 'guest', meta: ['guest'] }]
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    meta: ['admin', 'guest'],
    iconCls: 'fa fa-bar-chart fa-fw',
    leaf: true,
    children: [
      { path: '/echart', component: echarts, meta: ['admin', 'guest'], name: '单节点' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: 'Charts',
    meta: ['admin', 'guest'],
    iconCls: 'fa fa-bar-chart fa-fw',
    children: [
      { path: '/echarts', component: echarts,meta: ['admin', 'guest'], name: 'echarts' }
    ]
  },
  {
    path: '*',
    meta: ['admin', 'guest'],
    hidden: true,
    redirect: { path: '/404' }
  }
]

const router = new VueRouter({
  routes: routerMap
})
export default router
