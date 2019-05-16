<template>
  <div class="content-right">
    <h1>用户权限控制</h1>
    <ul>
      <li v-for="(item, index) in routeList" :key="index">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Page7.vue',
data(){
  return {
    routeList: []
  }
},
created() {
  this.$router.options.routes.some(item => {
    if (item.children && item.children.length > 1) {
      if (item.children[1].path === '/page7') {
        this.getRouter(item.children[1].children);
        return true;
      }
    }
  });
},
methods:{
  getRouter(arr) {
    let role = sessionStorage.getItem('user') || this.$store.getters.getRoles;
    this.routeList = []
    arr.map(item => {
      if (item.meta.indexOf(JSON.parse(role).username) > -1) {
        this.routeList.push({
          path: item.path,
          name: item.name
        });
      }
    });
  }
}
}
</script>

<style scoped>
  .content-right{
    margin-top: 50px;
  }
  h1{
    text-align: center;
  }
  ul{
    list-style: none;
    display: flex;
  }
  li{
    flex-grow:1;
    text-align: center;
  }
</style>
