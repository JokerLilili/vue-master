<template>
  <div class="tags-view-container">
    <scroll class="tags-view-wrapper">
      <strong class="title">{{$route.name}}</strong>
      <router-link v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path"
                   class="tags-view-item" :class="isActive(tag)?'active':''"
                   @click.middle.native="delSelectTag(tag)"
                   @contextmenu.prevent.native="openMenu(tag,$event)">
        {{tag.title}}
        <span class='el-icon-close' @click.prevent.stop="delSelectTag(tag)"></span>
      </router-link>
      <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
        <li @click="refreshSelectedTag(selectedTag)">刷新</li>
        <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="delSelectTag(selectedTag)">关闭</li>
        <li @click="closeOthersTags">关闭其他</li>
        <li @click="closeAllTags(selectedTag)">关闭所有</li>
      </ul>
      <el-breadcrumb separator="/" class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </scroll>
  </div>
</template>

<script>
import scroll from './scroll'

export default {
  inject: ['keychange'],
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  components: {
    scroll
  },
  computed: {
    visitedViews () { // store中取值
      return this.$store.state.visitedviews
    }
  },
  created () {
    this.addViewTags()
  },
  watch: {
    $route () {
      this.addViewTags()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    isActive (route) {
      return route.path === this.$route.path
    },
    addViewTags () { // 路由改变时执行的方法
      if (this.$route.name) {
        const route = this.$route
        this.$store.dispatch('addVisitedViews', route)
      }
    },
    delSelectTag (route) { // 先提交删除数据的方法,数组删除出掉数据后，如果关闭的是当前打开的路由需要将路由改为数组最后一次push进去的路由
      this.$store.dispatch('delVisitedViews', route).then((views) => {
        if (this.isActive(route)) { // 只有在关闭当前打开的标签页才会有影响
          let lastView = views.slice(-1)[0] // 选取路由数组中的最后一位
          if (lastView) {
            this.$router.push(lastView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    refreshSelectedTag (view) {
      this.keychange()
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        // this.moveToCurrentTag()
      })
    },
    closeAllTags (view) {
      this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.$router.push('/')
      })
    },
    openMenu (tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left
      const offsetWidth = this.$el.offsetWidth
      const maxLeft = offsetWidth - menuMinWidth
      const left = e.clientX

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    float: left;
    .tags-view-wrapper {
      .title {
        line-height: 34px;
        text-align: center;
        width: 60px;
        float: left;
        color: #475669;
      }
      .breadcrumb-inner {
        line-height: 34px;
        margin-right: 10px;
        float: right;
      }
      .tags-view-item {
        border-radius: 5px;
        text-decoration: none;
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;

        &:first-of-type {
          margin-left: 15px;
        }

        &:last-of-type {
          margin-right: 15px;
        }

        &.active {
          background-color: #20a0ff;
          color: #fff;
          border-color: #20a0ff;

          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: fixed;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
