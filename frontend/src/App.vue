<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="app-header__inner">
        <div class="app-header__left">
          <RouterLink to="/works" class="brand">
            <span class="brand__title">阅微</span>
            <span class="brand__subtitle">我的个人记录</span>
          </RouterLink>

          <div class="header-breadcrumb">
            <RouterLink to="/works">首页</RouterLink>
            <span>/</span>
            <span>{{ breadcrumb }}</span>
          </div>
        </div>

        <div class="app-header__right">
          <RouterLink to="/works/create" class="header-create-btn">
            <span>＋</span>
            <span>新增作品</span>
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const breadcrumb = computed(() => {
  const path = route.path
  if (path === '/works') return '作品管理'
  if (path === '/works/create') return '新增作品'
  if (path.startsWith('/works/edit/')) return '编辑作品'
  if (path.startsWith('/works/')) return '作品详情'
  return '作品管理'
})
</script>
