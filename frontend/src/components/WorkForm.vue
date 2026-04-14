<template>
  <section class="work-form-page">
    <button type="button" class="form-back-link" @click="$router.push('/works')">
      ← 返回列表
    </button>

    <div class="work-form-panel">
      <div class="work-form-panel__head">
        <span class="work-form-panel__accent"></span>
        <div>
          <h1>{{ isEdit ? '编辑作品' : '新增作品' }}</h1>
        </div>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="work-form">
        <div class="work-form-grid">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入作品标题" />
          </el-form-item>

          <el-form-item label="原名">
            <el-input v-model="form.originalTitle" placeholder="可选" />
          </el-form-item>

          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择类型">
              <el-option label="电影" value="movie" />
              <el-option label="书籍" value="book" />
            </el-select>
          </el-form-item>

          <el-form-item label="导演/作者">
            <el-input v-model="form.creator" placeholder="请输入导演/作者" />
          </el-form-item>

          <el-form-item label="发行年份">
            <el-input v-model="form.year" placeholder="例如：2024" />
          </el-form-item>

          <el-form-item label="封面链接" class="span-2">
            <el-input v-model="form.coverUrl" placeholder="请输入图片 URL" />
          </el-form-item>

          <el-form-item label="评分">
            <div class="form-rating-row">
              <el-rate v-model="rateValue" :max="5" />
              <span class="form-rating-text">{{ form.rating ? `${form.rating}/10` : '暂无' }}</span>
            </div>
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option label="看过" value="completed" />
              <el-option label="想看 / 想读" value="wishlist" />
            </el-select>
          </el-form-item>

          <el-form-item label="标签" class="span-2">
            <el-select
              v-model="form.tagIds"
              multiple
              collapse-tags
              collapse-tags-tooltip
              placeholder="输入标签后可选择"
            >
              <el-option
                v-for="tag in tags"
                :key="tag.id"
                :label="tag.name"
                :value="tag.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="完成日期">
            <el-date-picker
              v-model="form.finishedDate"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择日期"
            />
          </el-form-item>

          <el-form-item label="简介" class="span-2">
            <el-input
              v-model="form.description"
              type="textarea"
              :rows="7"
              placeholder="落笔写下此刻的心得..."
            />
          </el-form-item>
        </div>

        <div class="work-form-actions">
          <el-button @click="$router.push('/works')">取消</el-button>
          <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  tags: {
    type: Array,
    default: () => []
  },
  submitting: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])
const formRef = ref()
const form = ref({
  title: '',
  originalTitle: '',
  type: 'movie',
  creator: '',
  year: '',
  coverUrl: '',
  description: '',
  status: 'wishlist',
  rating: null,
  finishedDate: '',
  tagIds: []
})

watch(
  () => props.modelValue,
  (value) => {
    form.value = {
      title: value.title || '',
      originalTitle: value.originalTitle || '',
      type: value.type || 'movie',
      creator: value.creator || '',
      year: value.year || '',
      coverUrl: value.coverUrl || '',
      description: value.description || '',
      status: value.status || 'wishlist',
      rating: value.rating ?? null,
      finishedDate: value.finishedDate || '',
      tagIds: value.tagIds || []
    }
  },
  { immediate: true, deep: true }
)

const rateValue = computed({
  get() {
    return form.value.rating ? Math.round(form.value.rating / 2) : 0
  },
  set(value) {
    form.value.rating = value ? value * 2 : null
  }
})

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

async function handleSubmit() {
  await formRef.value.validate()
  emit('submit', {
    ...form.value,
    coverUrl: form.value.coverUrl || null,
    description: form.value.description || null,
    finishedDate: form.value.finishedDate || null,
    tagIds: form.value.tagIds || []
  })
}
</script>
