<template>
  <!--编辑界面-->
  <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="editForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="editForm.sex">
          <el-radio class="radio" :label="1">男</el-radio>
          <el-radio class="radio" :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="editForm.addr"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!--<el-button @click.native="editFormVisible = false">取消</el-button>-->
      <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import util from '../../../common/js/util'
import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../api/api'
export default {
  name: 'Tabchange',
  props: [
    'editForm',
    'editFormVisible'
  ],
  data () {
    return {
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            let para = Object.assign({}, this.editForm)
            para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            editUser(para).then((res) => {
              this.editLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.$parent.getFatherUser()
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
