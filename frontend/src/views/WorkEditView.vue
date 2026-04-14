<template>
  <WorkForm :model-value="form" :is-edit="true" :tags="tags" :submitting="submitting" @submit="submit" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import WorkForm from '../components/WorkForm.vue'
import { getTags, getWorkDetail, updateWork } from '../api/work'

const route = useRoute()
const router = useRouter()
const submitting = ref(false)
const tags = ref([])
const form = ref({
  title: '',
  type: 'movie',
  creator: '',
  coverUrl: '',
  description: '',
  status: 'wishlist',
  rating: null,
  finishedDate: '',
  tagIds: []
})

async function submit(payload) {
  submitting.value = true
  try {
    await updateWork(route.params.id, payload)
    ElMessage.success('作品更新成功')
    router.push(`/works/${route.params.id}`)
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  const [tagsRes, detailRes] = await Promise.all([
    getTags(),
    getWorkDetail(route.params.id)
  ])
  tags.value = tagsRes.data
  const detail = detailRes.data
  form.value = {
    title: detail.title,
    type: detail.type,
    creator: detail.creator,
    coverUrl: detail.coverUrl,
    description: detail.description,
    status: detail.status,
    rating: detail.rating,
    finishedDate: detail.finishedDate,
    tagIds: (detail.tags || []).map((tag) => tag.id)
  }
})
</script>

