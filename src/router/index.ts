import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AsetInventori from '../views/AsetInventori.vue'
import PembebasanLahan from '../views/PembebasanLahan.vue'
import Litigasi from '../views/Litigasi.vue'
import LahanBebas from '../views/LahanBebas.vue'
import PengecekanIzinLahan from '../views/PengecekanIzinLahan.vue'
import StakeHolder from '../views/StakeHolder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/aset-inventori',
      name: 'aset-inventori',
      component: AsetInventori
    },
    {
      path: '/pembebasan-lahan',
      name: 'pembebasan-lahan',
      component: PembebasanLahan
    },
    {
      path: '/litigasi',
      name: 'litigasi',
      component: Litigasi
    },
    {
      path: '/geospasial/lahan-bebas',
      name: 'lahan-bebas',
      component: LahanBebas
    },
    {
      path: '/geospasial/pengecekan-izin-lahan',
      name: 'pengecekan-izin-lahan',
      component: PengecekanIzinLahan
    },
    {
      path: '/stake-holder',
      name: 'stake-holder',
      component: StakeHolder
    }
  ]
})

export default router
