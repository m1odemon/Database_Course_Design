import { createRouter, createWebHistory } from 'vue-router'
import WorkListView from '../views/WorkListView.vue'
import WorkCreateView from '../views/WorkCreateView.vue'
import WorkEditView from '../views/WorkEditView.vue'
import WorkDetailView from '../views/WorkDetailView.vue'

const routes = [
  { path: '/', redirect: '/works' },
  { path: '/works', component: WorkListView },
  { path: '/works/create', component: WorkCreateView },
  { path: '/works/edit/:id', component: WorkEditView },
  { path: '/works/:id', component: WorkDetailView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

