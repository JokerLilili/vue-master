<template>
  <div>
  <!--列表-->
  <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
            style="width: 100%;">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column type="index" width="60">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120" sortable>
    </el-table-column>
    <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
    </el-table-column>
    <el-table-column prop="age" label="年龄" width="100" sortable>
    </el-table-column>
    <el-table-column prop="birth" label="生日" width="120" sortable>
    </el-table-column>
    <el-table-column prop="addr" label="地址" min-width="180" sortable>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Tabchange v-bind:editFormVisible="editFormVisible" v-bind:editForm="editForm"></Tabchange>
  </div>
</template>

<script>
import Tabchange from './Tabchange'
import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../api/api'

export default {
  name: 'Tabmain',
  props: ['users'],
  data () {
    return {
      listLoading: false,
      sels: [],

      // 编辑界面数据
      editForm: {
        id: 0,
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      },
      editFormVisible: false// 编辑界面是否显示
    }
  },
  components: {
    Tabchange
  },
  created () {
    console.log(this.users)
  },
  methods: {
    selsChange: function (sels) {
      this.sels = sels
    },
    formatSex: function (row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
    },
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    getFatherUser () {
      this.editFormVisible = false
      this.$parent.getUsers()
    },
    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { id: row.id }
        removeUser(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$parent.getUsers()
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>

</style>
