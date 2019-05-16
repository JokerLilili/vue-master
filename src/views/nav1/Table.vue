<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <Tabmain v-bind:users="users"></Tabmain>

    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!listLoading">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="addForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from '../../common/js/util'
import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api'
import Tabmain from './TabPages/Tabmain'

export default {
  data () {
    return {
      filters: {
        name: ''
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      }

    }
  },
  components: {
    Tabmain
  },
  methods: {
    // 性别显示转换
    formatSex: function (row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
    },
    handleCurrentChange (val) {
      this.page = val
      this.getUsers()
    },
    // 获取用户列表
    getUsers () {
      let para = {
        page: this.page,
        name: this.filters.name
      }
      this.listLoading = true
      getUserListPage(para).then((res) => {
        this.total = res.data.total
        this.users = res.data.users
        this.listLoading = false
      })
    },
    // 显示新增界面
    handleAdd: function () {
      this.addFormVisible = true
      this.addForm = {
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      }
    },

    // 新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            // NProgress.start();
            let para = Object.assign({}, this.addForm)
            para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            addUser(para).then((res) => {
              this.addLoading = false
              // NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getUsers()
            })
          })
        }
      })
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { ids: ids }
        batchRemoveUser(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getUsers()
        })
      }).catch(() => {

      })
    }
  },
  mounted () {
    this.getUsers()
  }
}

</script>

<style scoped>

</style>
