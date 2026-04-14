<template>
  <section v-loading="loading" class="detail-page">
    <div v-if="detail" class="detail-hero-card">
      <div class="detail-hero-card__media">
        <div class="detail-book">
          <img v-if="detail.coverUrl" :src="detail.coverUrl" :alt="detail.title" />
          <div v-else class="detail-book__empty">
            <span>{{ detail.type === 'movie' ? '电影' : '书籍' }}</span>
            <strong>{{ detail.title }}</strong>
          </div>
        </div>
      </div>

      <div class="detail-hero-card__body">
        <div class="detail-hero-card__top">
          <button type="button" class="back-link" @click="$router.push('/works')">返回作品列表</button>
          <el-button type="primary" @click="$router.push(`/works/edit/${detail.id}`)">编辑作品</el-button>
        </div>

        <div>
          <p class="eyebrow">Work Detail</p>
          <h1>{{ detail.title }}</h1>
          <p class="detail-creator">{{ detail.creator || '未填写创作者' }}</p>
        </div>

        <div class="detail-facts">
          <div class="detail-fact">
            <span>类型</span>
            <strong>{{ detail.type === 'movie' ? '电影' : '书籍' }}</strong>
          </div>
          <div class="detail-fact">
            <span>状态</span>
            <strong>{{ detail.status === 'completed' ? '已完成' : '想看 / 想读' }}</strong>
          </div>
          <div class="detail-fact">
            <span>评分</span>
            <strong>{{ detail.rating ? `${detail.rating}/10` : '未评分' }}</strong>
          </div>
          <div class="detail-fact">
            <span>完成日期</span>
            <strong>{{ detail.finishedDate || '未填写' }}</strong>
          </div>
        </div>

        <div class="detail-tag-row">
          <span v-for="tag in detail.tags" :key="tag.id" class="tag-dot">{{ tag.name }}</span>
        </div>

        <div class="detail-summary-block">
          <h3>简介与备注</h3>
          <p>{{ detail.description || '还没有补充简介，可以先留下一个短短的印象。' }}</p>
        </div>

        <div class="detail-actions-row">
          <el-button type="primary" plain @click="openCreateReview">写一条感想</el-button>
        </div>
      </div>
    </div>

    <div class="reviews-panel panel-paper">
      <div class="section-head">
        <div>
          <p class="eyebrow">Reviews</p>
          <h2>感想与笔记</h2>
          <p>把第一次看完时的心情、复盘后的想法和短评都留在这里。</p>
        </div>
        <el-button type="primary" @click="openCreateReview">新增感想</el-button>
      </div>

      <div v-if="reviews.length" class="review-stack">
        <article v-for="review in reviews" :key="review.id" class="review-sheet">
          <div class="review-sheet__head">
            <div>
              <h3>{{ review.title || '未命名感想' }}</h3>
              <p>{{ formatTime(review.updatedTime || review.createdTime) }}</p>
            </div>
            <div class="review-sheet__actions">
              <el-button link type="primary" @click="openEditReview(review)">编辑</el-button>
              <el-popconfirm title="确定删除这条感想吗？" @confirm="removeReview(review.id)">
                <template #reference>
                  <el-button link type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>

          <div class="review-sheet__content">
            {{ review.content }}
          </div>
        </article>
      </div>

      <div v-else class="empty-gallery">
        <h3>还没有感想</h3>
        <p>先留下一条短评，之后再补充成长文也完全没问题。</p>
        <el-button type="primary" @click="openCreateReview">写第一条感想</el-button>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑感想' : '新增感想'"
      width="680px"
    >
      <el-form ref="reviewFormRef" :model="reviewForm" :rules="reviewRules" label-position="top">
        <el-form-item label="标题">
          <el-input v-model="reviewForm.title" placeholder="例如：结尾比我想象中更克制" />
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-input
            v-model="reviewForm.content"
            type="textarea"
            :rows="10"
            placeholder="写下观后感、读后感，或者一段给未来自己的提醒。"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="editor-actions">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitReview">保存感想</el-button>
        </div>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import {
  createReview,
  deleteReview,
  getReviews,
  getWorkDetail,
  updateReview
} from '../api/work'

const route = useRoute()
const loading = ref(false)
const detail = ref(null)
const reviews = ref([])
const dialogVisible = ref(false)
const editingId = ref(null)
const reviewFormRef = ref()
const reviewForm = ref({
  title: '',
  content: ''
})

const reviewRules = {
  content: [{ required: true, message: '请输入感想正文', trigger: 'blur' }]
}

function formatTime(value) {
  return value ? value.replace('T', ' ').slice(0, 16) : ''
}

async function loadDetail() {
  loading.value = true
  try {
    const [detailRes, reviewsRes] = await Promise.all([
      getWorkDetail(route.params.id),
      getReviews(route.params.id)
    ])
    detail.value = detailRes.data
    reviews.value = reviewsRes.data
  } finally {
    loading.value = false
  }
}

function openCreateReview() {
  editingId.value = null
  reviewForm.value = { title: '', content: '' }
  dialogVisible.value = true
}

function openEditReview(review) {
  editingId.value = review.id
  reviewForm.value = { title: review.title || '', content: review.content }
  dialogVisible.value = true
}

async function submitReview() {
  await reviewFormRef.value.validate()
  const payload = {
    workId: Number(route.params.id),
    title: reviewForm.value.title || null,
    content: reviewForm.value.content
  }
  if (editingId.value) {
    await updateReview(editingId.value, payload)
    ElMessage.success('感想已更新')
  } else {
    await createReview(payload)
    ElMessage.success('感想已新增')
  }
  dialogVisible.value = false
  await loadDetail()
}

async function removeReview(id) {
  await deleteReview(id)
  ElMessage.success('感想已删除')
  await loadDetail()
}

onMounted(loadDetail)
</script>
