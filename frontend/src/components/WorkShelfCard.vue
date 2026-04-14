<template>
  <article class="work-card">
    <div class="work-card__cover">
      <img v-if="work.coverUrl" :src="work.coverUrl" :alt="work.title" />
      <div v-else class="work-card__cover-empty">
        <span>{{ typeLabel }}</span>
      </div>

      <div class="work-card__badges">
        <span class="work-badge">{{ typeLabel }}</span>
        <span class="work-badge">{{ statusLabel }}</span>
      </div>
    </div>

    <div class="work-card__body">
      <div class="work-card__title-row">
        <h3>{{ work.title }}</h3>
        <div v-if="work.rating" class="work-card__rating">★ {{ work.rating }}</div>
      </div>

      <div class="work-card__subtitle">
        {{ work.creator || '未填写创作者' }}
        <span v-if="displayYear"> · {{ displayYear }}</span>
      </div>

      <div class="work-card__date">{{ displayDate }}</div>

      <div class="work-card__actions">
        <el-button link type="primary" @click="$emit('detail', work.id)">详情</el-button>
        <el-button link @click="$emit('edit', work.id)">编辑</el-button>
        <el-popconfirm title="确定删除这条作品记录吗？" @confirm="$emit('delete', work.id)">
          <template #reference>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  work: {
    type: Object,
    required: true
  }
})

defineEmits(['detail', 'edit', 'delete'])

const typeLabel = computed(() => (props.work.type === 'movie' ? '电影' : '书籍'))
const statusLabel = computed(() => (props.work.status === 'completed' ? '看过' : '待看'))

const displayYear = computed(() => {
  if (props.work.finishedDate) return props.work.finishedDate.slice(0, 4)
  if (props.work.createdTime) return String(props.work.createdTime).slice(0, 4)
  return ''
})

const displayDate = computed(() => {
  if (props.work.finishedDate) return props.work.finishedDate
  if (props.work.createdTime) return String(props.work.createdTime).slice(0, 10)
  return '暂无日期'
})
</script>
