<template>
  <WorkForm :model-value="form" :tags="tags" :submitting="submitting" @submit="submit" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import WorkForm from '../components/WorkForm.vue'
import { createWork, getTags } from '../api/work'

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
    const res = await createWork(payload)
    ElMessage.success('作品创建成功')
    router.push(`/works/${res.data}`)
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  const res = await getTags()
  tags.value = res.data
})
</script>

