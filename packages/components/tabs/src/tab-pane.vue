<template>
  <div
    v-if="shouldBeRender"
    v-show="active"
    :id="`pane-${paneName}`"
    :class="ns.b()"
    role="tabpanel"
    :aria-hidden="!active"
    :aria-labelledby="`tab-${paneName}`"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  inject,
  markRaw,
  reactive,
  ref,
  watch,
} from 'vue'
import { eagerComputed } from '@vueuse/core'
import { tabsRootContextKey } from '@element-plus/tokens'
import { throwError } from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'
import { tabPaneProps } from './tab-pane'

const COMPONENT_NAME = 'ElTabPane'
defineOptions({
  name: 'ElTabPane',
})
const props = defineProps(tabPaneProps)

const instance = getCurrentInstance()!
const tabsRoot = inject(tabsRootContextKey)
if (!tabsRoot)
  throwError(COMPONENT_NAME, 'usage: <el-tabs><el-tab-pane /></el-tabs/>')

const ns = useNamespace('tab-pane')

const index = ref<string>()
const isClosable = computed(() => props.closable || tabsRoot.props.closable)
const active = eagerComputed(
  () => tabsRoot.currentName.value === (props.name || index.value)
)
const loaded = ref(active.value)
const paneName = computed(() => props.name || index.value)
const shouldBeRender = eagerComputed(
  () => !props.lazy || loaded.value || active.value
)

watch(active, (val) => {
  if (val) loaded.value = true
})

tabsRoot.updatePaneState(
  reactive({
    uid: instance.uid,
    instance: markRaw(instance),
    props,
    paneName,
    active,
    index,
    isClosable,
  })
)
</script>
