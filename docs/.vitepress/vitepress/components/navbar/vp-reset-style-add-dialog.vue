<!--
 * @description:
 * @Author:
 * @Date: 2022-11-09 14:20:50
-->
<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import { ElMessage, ElMessageBox, genFileId } from 'element-plus'
import { DeleteFilled } from '@element-plus/icons-vue'

import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  FormRules,
  FormInstance,
} from 'element-plus'

import { S3ClientUpload, s3FileDelete } from './s3/s3Client'

const clientUpload = S3ClientUpload()
const deleteFile = s3FileDelete()
const emit = defineEmits(['confirm'])
const props = defineProps({
  curTheme: {
    type: String,
    defult() {
      return ''
    },
  },
})
const formLabelWidth = '130px'
const others = reactive({
  dialogVisible: false,
  isEdit: false,
  editTheme: '',
})
// const dialogVisible = ref(false)
// const isEdit = ref(false)
const uploadRef = ref<UploadInstance>()
const ruleFormRef = ref<FormInstance | null>(null)
const fileInfo: any = reactive({
  file: null,
  version: '',
  project: '',
})
const rules = reactive<FormRules>({
  version: [
    {
      required: true,
      message: '请输入版本号！',
      trigger: 'change',
    },
    {
      pattern: /^([0-9]\d|[0-9])(.([0-9]\d|\d)){2}$/,
      message: '请输入正确版本号（三位）！',
      trigger: 'change',
    },
  ],
  project: [
    {
      required: true,
      message: '请输入项目代号！',
      trigger: 'change',
    },
  ],
})

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`确认删除该主题?`).then(
    () => true,
    () => false
  )
}

// 文件删除
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  fileInfo.file = null
}

// 文件修改
const handleChange: UploadProps['onChange'] = (uploadFile) => {
  fileInfo.file = uploadFile
}

// 编辑主题 - 弹层显隐切换
const toggleVisible = () => {
  others.dialogVisible = !others.dialogVisible
}

// 数据清除重置
const resetData = () => {
  // 清除上传的文件
  uploadRef.value?.clearFiles()
  // 清除校验
  ruleFormRef.value?.resetFields()

  // 清除数据
  fileInfo.version = ''
  fileInfo.project = ''
  fileInfo.file = null
}

// 主题新增
const addTheme = async () => {
  await nextTick()
  toggleVisible()
  resetData()
  console.log('新增===', fileInfo)
}

// 主题编辑 回显
const editThemeStyle = (curTheme) => {
  // 获取当前点击的数据 回显
  others.editTheme = curTheme
  const a = curTheme!.split('/element-plus/style/').at(-1)
  const b = a!.split('-')

  others.isEdit = true

  fileInfo.version = b[2]
  fileInfo.project = b[3]
  fileInfo.file = null
  uploadRef.value?.clearFiles()

  toggleVisible()

  console.log('编辑回显===', fileInfo)
}

// 确定
const submitForm = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      if (!fileInfo.file) {
        return ElMessage.error('请上传样式表！')
      }

      // 编辑 ==> 需要把前一条的文件删除，重新上传
      if (others.isEdit) {
        // 删除
        const key = others.editTheme?.split('/element-plus/style/')[1]

        console.log('key====', key)
        deleteFile(`element-plus/style/${key}`)
        others.isEdit = false
      }
      // 通过后端获取到上传参数
      clientUpload(fileInfo, () => {
        emit('confirm')
        // TODO 确定弹窗关闭之后 清空表单内容
        toggleVisible()
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 取消
const resetForm = () => {
  toggleVisible()
  resetData()
  console.log('取消====', fileInfo)
}

// 复制功能
const copy = () => {
  const dom: Element | null = document.querySelector('#copy_text')

  if (dom) {
    const range = document.createRange()
    range.selectNode(dom)

    const selection = window.getSelection()

    if (selection!.rangeCount > 0) {
      selection!.removeAllRanges()
    }
    selection!.addRange(range)

    return document.execCommand('copy')
  }
}

const handleCopy = () => {
  const result = copy()

  if (result) {
    ElMessage.success('复制内容成功')
  } else {
    ElMessage.error('复制失败，可选中内容手动复制')
  }
}

defineExpose({
  addTheme,
  editThemeStyle,
})
</script>

<template>
  <el-dialog
    v-model="others.dialogVisible"
    custom-class="theme-style-set-dialog"
    title="编辑主题"
    width="480px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleFormRef"
      :model="fileInfo"
      :rules="rules"
      label-width="120px"
      status-icon
    >
      <el-form-item
        v-if="curTheme"
        label="当前主题引用地址:"
        :label-width="formLabelWidth"
      >
        <span id="copy_text">
          {{ curTheme }}
        </span>
        <el-button class="copy-btn" @click="handleCopy"> 复制 </el-button>
      </el-form-item>
      <el-form-item
        label="项目代号:"
        prop="project"
        :label-width="formLabelWidth"
      >
        <el-input v-model="fileInfo.project" />
      </el-form-item>
      <el-form-item
        label="上传版本:"
        prop="version"
        :label-width="formLabelWidth"
      >
        <el-input v-model="fileInfo.version" />
      </el-form-item>
      <el-form-item label="主题上传:" :label-width="formLabelWidth">
        <el-upload
          ref="uploadRef"
          class="upload-reset-style"
          action=""
          accept=".css"
          :auto-upload="false"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-change="handleChange"
        >
          <el-button>选择文件</el-button>
        </el-upload>
        <!-- <div class="" v-if="fileInfo.uploadDataName" @click="onFileDelete">
          <span>{{ fileInfo.uploadDataName }}</span>
          <el-icon>
            <DeleteFilled />
          </el-icon>
        </div> -->
      </el-form-item>
      <el-form-item>
        <div class="upload-btn">
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.copy-btn {
  margin-top: 5px;
  height: 26px;
}
.el-form-item__content {
  width: 200px;
  .el-input {
    width: 160px;
  }
}

.upload-btn {
  margin-left: 52%;
}
#copy_text {
  line-height: 14px;
}
:deep(.el-input__inner) {
  font-size: 14px !important;
}
:deep(.el-form-item__label) {
  margin-left: 0 !important;
  color: #333;
  font-size: 14px !important;
  height: 28px;
  line-height: 28px;
  margin-right: 12px;
  padding: 0;
}
:global(.theme-style-set-dialog .el-upload-list) {
  width: 270px;
}
:global(.theme-style-set-dialog .el-dialog__body) {
  padding: 20px 30px !important;
}
:global(.theme-style-set-dialog
    .el-form-item.is-required
    .el-form-item__label:before) {
  content: '*';
  color: var(--el-color-danger);
  margin-right: 4px;
  display: inline-block;
}
</style>
