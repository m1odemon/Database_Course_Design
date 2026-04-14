<template>
  <section class="works-page">
    <div class="works-toolbar">
      <div class="works-toolbar__row">
        <div class="works-tabs">
          <button
            v-for="tab in typeTabs"
            :key="tab.value"
            type="button"
            class="works-tab"
            :class="{ 'works-tab--active': query.type === tab.value }"
            @click="selectType(tab.value)"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="works-toolbar__right">
          <el-select v-model="query.tagId" placeholder="标签不限" clearable class="toolbar-select">
            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id" />
          </el-select>
          <el-input
            v-model="query.keyword"
            placeholder="搜索标题或作者..."
            clearable
            class="toolbar-search"
            @keyup.enter="reload"
          />
          <el-button type="primary" @click="reload">查询</el-button>
        </div>
      </div>
    </div>

    <div class="works-grid" v-loading="loading">
      <WorkShelfCard
        v-for="work in page.records"
        :key="work.id"
        :work="work"
        @detail="goDetail"
        @edit="goEdit"
        @delete="removeWork"
      />

      <div v-if="!page.records.length" class="works-empty">
        <p>没有找到符合当前筛选条件的作品。</p>
        <el-button type="primary" @click="resetFilters">清空筛选</el-button>
      </div>
    </div>

    <div class="works-footer">
      <div class="works-footer__count">共 {{ page.total }} 条记录</div>
      <div class="works-footer__pager">
        <el-select v-model="query.pageSize" class="pager-size" @change="handlePageSizeChange">
          <el-option :value="8" label="8 条/页" />
          <el-option :value="12" label="12 条/页" />
          <el-option :value="16" label="16 条/页" />
        </el-select>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="query.pageNum"
          :page-size="query.pageSize"
          :total="page.total"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <div class="tags-section">
      <TagManager :tags="tags" @create="handleCreateTag" @delete="handleDeleteTag" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import TagManager from '../components/TagManager.vue'
import WorkShelfCard from '../components/WorkShelfCard.vue'
import { createTag, deleteTag, deleteWork, getTags, getWorkPage } from '../api/work'

const router = useRouter()
const loading = ref(false)
const tags = ref([])
const page = reactive({
  total: 0,
  records: []
})
const query = reactive({
  keyword: '',
  type: '',
  tagId: null,
  pageNum: 1,
  pageSize: 8
})

const typeTabs = [
  { label: '全部馆藏', value: '' },
  { label: '电影', value: 'movie' },
  { label: '书籍', value: 'book' }
]

async function loadTags() {
  const res = await getTags()
  tags.value = res.data
}

async function loadWorks() {
  loading.value = true
  try {
    const res = await getWorkPage(query)
    Object.assign(page, res.data)
  } finally {
    loading.value = false
  }
}

async function reload() {
  query.pageNum = 1
  await loadWorks()
}

function selectType(type) {
  query.type = type
  reload()
}

function resetFilters() {
  query.keyword = ''
  query.type = ''
  query.tagId = null
  reload()
}

function goDetail(id) {
  router.push(`/works/${id}`)
}

function goEdit(id) {
  router.push(`/works/edit/${id}`)
}

async function removeWork(id) {
  await deleteWork(id)
  ElMessage.success('作品已删除')
  await loadWorks()
}

async function handleCreateTag(name) {
  const value = (name || '').trim()
  if (!value) return
  await createTag({ name: value })
  ElMessage.success('标签已创建')
  await loadTags()
}

async function handleDeleteTag(id) {
  await deleteTag(id)
  ElMessage.success('标签已删除')
  await loadTags()
}

async function handlePageChange(pageNum) {
  query.pageNum = pageNum
  await loadWorks()
}

async function handlePageSizeChange() {
  query.pageNum = 1
  await loadWorks()
}

onMounted(async () => {
  await loadTags()
  await loadWorks()
})
</script>
