<template>
  <section class="tag-manager">
    <button type="button" class="tag-manager__toggle" @click="expanded = !expanded">
      <span class="eyebrow">Tags</span>
      <strong>标签管理</strong>
      <span class="tag-manager__toggle-icon">{{ expanded ? '−' : '+' }}</span>
    </button>

    <div v-if="expanded" class="tag-manager__body">
      <div class="tag-manager__head">
        <p>输入标签后可快速添加，点击已有标签可删除。</p>
      </div>

      <div class="tag-manager__create">
        <el-input
          v-model="name"
          placeholder="输入标签后回车或点击添加..."
          @keyup.enter="submit"
        />
        <el-button type="primary" @click="submit">添加</el-button>
      </div>

      <div class="tag-manager__list" v-if="tags.length">
        <button
          v-for="tag in tags"
          :key="tag.id"
          type="button"
          class="tag-manager__item"
          @click="remove(tag.id)"
        >
          <span>{{ tag.name }}</span>
          <span>×</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  tags: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['create', 'delete'])
const name = ref('')
const expanded = ref(false)

function submit() {
  emit('create', name.value)
  name.value = ''
}

function remove(id) {
  emit('delete', id)
}
</script>
