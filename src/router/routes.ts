import { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'manual', component: () => import('pages/Manual.vue') },
      { path: 'contact', component: () => import('pages/Contact.vue') },
      { path: 'license', component: () => import('pages/License.vue') }
    ]
  }
]
export default routes
