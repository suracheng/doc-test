<!--
 * @description:
 * @Author:
 * @Date: 2022-11-09 14:20:50
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import type { Ref } from 'vue'

import VPResetStyleAddDialog from './vp-reset-style-add-dialog.vue'
import { s3FileDownload } from './s3/s3Client'

interface IOption {
  label: string
  value: string
}
interface IOptions extends IOption {
  children: IOption[]
}

const fileDownload = s3FileDownload()
const VPResetStyleAddDialogRef = ref(null)
const cascaderLists: Ref<IOptions[]> = ref([])
const curTheme: Ref<string[]> = ref([])
const themeCascaderRef: Ref<any | null> = ref(null)

// 获取主题样式列表
const getThemeList = async () => {
  const list: any = await fileDownload()
  console.log('list===', list)

  // 根据规则匹配地址, 拼成级联数据 ==> element-plus/style/element-plus-${version}-${project}-reset.css
  if (list) {
    const options: IOptions[] = []

    list.forEach((l: any) => {
      if (/element-plus\/style/.test(l)) {
        const a = l.split('/element-plus/style/').at(-1)
        const b = a.split('-')
        const c = { value: l, label: a }
        const d = options.find((i) => i.label === b[2])

        if (!d) {
          options.push({
            value: b[2],
            label: b[2],
            children: [c],
          })
          return
        }
        d.children.push(c)
      }
    })

    cascaderLists.value = options

    // 当前使用的主题被删除，需重新设置 curTheme.value
    let cur1 = false
    options.forEach((o) => {
      if (o.value === curTheme.value[0]) {
        cur1 = o.children.some((q) => q.value === curTheme.value[1])
        return
      }
    })
    if (!cur1) {
      // 被删除，重新设置默认值
      setDefaultValue()
    }
  }
}

// 新增主题
const addEvent = () => {
  const addTheme = (VPResetStyleAddDialogRef.value as any)?.addTheme

  addTheme && addTheme()
}

// 主题设置
const setThemeStyle = (href: string) => {
  const oldLink = document.getElementById('resetTheme') as HTMLLinkElement

  if (!oldLink) {
    // 新建
    const link = document.createElement('link')
    link.id = 'resetTheme'
    link.rel = 'stylesheet'
    link.href = href

    const head = document.getElementsByTagName('head')
    head[0].appendChild(link)
    return
  }

  // 修改
  oldLink.href = href
}

// 主题切换
const handleChange = (value) => {
  setThemeStyle(value[1])
}

// 编辑主题
const handleEdit = (e, curTheme) => {
  // 阻止事件冒泡
  e.stopPropagation()
  // 回显项目编号 & 上传的版本
  const editThemeStyle = (VPResetStyleAddDialogRef.value as any)?.editThemeStyle

  editThemeStyle && editThemeStyle(curTheme)

  // 手动关闭级联面板
  ;(themeCascaderRef.value as any)?.togglePopperVisible(false)
}

// 设置默认值
const setDefaultValue = () => {
  // 设置默认选中的主题样式
  if (cascaderLists.value?.length) {
    curTheme.value = [
      cascaderLists.value[0].value,
      cascaderLists.value[0].children[0].value,
    ]
    setThemeStyle(cascaderLists.value[0].children[0].value)
  }
}

onMounted(async () => {
  await getThemeList()
  setDefaultValue()
})
</script>

<template>
  <div class="reset-theme-style-wrap">
    <span>Element Plus Style：</span>
    <el-cascader
      ref="themeCascaderRef"
      :options="cascaderLists"
      v-model="curTheme"
      @change="handleChange"
    >
      <template #default="{ node, data }">
        <span>{{ data.label }}</span>
        <el-icon
          class="reset-theme-style-edit"
          v-if="node.level === 2"
          @click="(event) => handleEdit(event, data.label)"
        >
          <Edit />
        </el-icon>
      </template>
    </el-cascader>
    <el-button class="reset-theme-style-add-btn" @click="addEvent"
      >新增主题</el-button
    >
  </div>
  <!-- 新增弹窗 -->
  <VPResetStyleAddDialog
    ref="VPResetStyleAddDialogRef"
    :curTheme="curTheme[1]"
    @confirm="getThemeList"
  />
</template>

<style lang="scss">
@use '../../styles/mixins' as *;
.reset-theme-style {
  &-edit {
    float: right;
    margin-top: 10px;
    margin-left: 15px;
  }
  &-add-btn {
    margin-left: 6px;
    vertical-align: 0px;
  }
}
</style>
