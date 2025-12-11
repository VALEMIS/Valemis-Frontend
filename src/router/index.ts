import { createRouter, createWebHistory } from 'vue-router'

// Modern Pages
import DashboardModern from '../views/DashboardModern.vue'
import AsetInventoriModern from '../views/AsetInventoriModern.vue'
import TambahAsetInventoriModern from '../views/TambahAsetInventoriModern.vue'
import PembebasanLahanModern from '../views/PembebasanLahanModern.vue'
import TambahPembebasanLahanModern from '../views/TambahPembebasanLahanModern.vue'
import DetailPembebasanLahanModern from '../views/DetailPembebasanLahanModern.vue'
import TambahPemilikLahanModern from '../views/TambahPemilikLahanModern.vue'
import LitigasiModern from '../views/LitigasiModern.vue'
import ClaimLitigasiModern from '../views/ClaimLitigasiModern.vue'
import TambahLitigasiModern from '../views/TambahLitigasiModern.vue'
import TambahParcelLitigasiModern from '../views/TambahParcelLitigasiModern.vue'
import LahanBebasModern from '../views/LahanBebasModern.vue'
import PengecekanIzinLahanModern from '../views/PengecekanIzinLahanModern.vue'
import StakeHolderModern from '../views/StakeHolderModern.vue'
import DetailStakeHolderModern from '../views/DetailStakeHolderModern.vue'
import TambahStakeHolderModern from '../views/TambahStakeHolderModern.vue'

// New Modern Modules
import LARAPModern from '../views/LARAPModern.vue'
import LandInventoryModern from '../views/LandInventoryModern.vue'
import LandComplianceModern from '../views/LandComplianceModern.vue'
import PendataanGeospatialModern from '../views/PendataanGeospatialModern.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardModern
    },
    {
      path: '/aset-inventori',
      name: 'aset-inventori',
      component: AsetInventoriModern
    },
    {
      path: '/aset-inventori/tambah',
      name: 'tambah-aset-inventori',
      component: TambahAsetInventoriModern
    },
    {
      path: '/pembebasan-lahan',
      name: 'pembebasan-lahan',
      component: PembebasanLahanModern
    },
    {
      path: '/pembebasan-lahan/tambah',
      name: 'tambah-pembebasan-lahan',
      component: TambahPembebasanLahanModern
    },
    {
      path: '/pembebasan-lahan/detail/:id',
      name: 'detail-pembebasan-lahan',
      component: DetailPembebasanLahanModern
    },
    {
      path: '/pembebasan-lahan/tambah-pemilik',
      name: 'tambah-pemilik-lahan',
      component: TambahPemilikLahanModern
    },
    {
      path: '/litigasi',
      name: 'litigasi',
      component: LitigasiModern
    },
    {
      path: '/litigasi/claim/:id',
      name: 'claim-litigasi',
      component: ClaimLitigasiModern
    },
    {
      path: '/litigasi/tambah',
      name: 'tambah-litigasi',
      component: TambahLitigasiModern
    },
    {
      path: '/litigasi/tambah-parcel',
      name: 'tambah-parcel-litigasi',
      component: TambahParcelLitigasiModern
    },
    {
      path: '/geospasial/lahan-bebas',
      name: 'lahan-bebas',
      component: LahanBebasModern
    },
    {
      path: '/geospasial/pengecekan-izin-lahan',
      name: 'pengecekan-izin-lahan',
      component: PengecekanIzinLahanModern
    },
    {
      path: '/stake-holder',
      name: 'stake-holder',
      component: StakeHolderModern
    },
    {
      path: '/stake-holder/tambah',
      name: 'tambah-stake-holder',
      component: TambahStakeHolderModern
    },
    {
      path: '/stake-holder/detail/:id',
      name: 'detail-stake-holder',
      component: DetailStakeHolderModern
    },
    {
      path: '/stake-holder/edit/:id',
      name: 'edit-stake-holder',
      component: TambahStakeHolderModern
    },
    // LARAP Module
    {
      path: '/larap',
      name: 'larap',
      component: LARAPModern
    },
    // Land Inventory Module
    {
      path: '/land-inventory',
      name: 'land-inventory',
      component: LandInventoryModern
    },
    // Land Compliance Module
    {
      path: '/land-compliance',
      name: 'land-compliance',
      component: LandComplianceModern
    },
    // Pendataan Geospatial Module
    {
      path: '/pendataan-geospatial',
      name: 'pendataan-geospatial',
      component: PendataanGeospatialModern
    }
  ]
})

export default router
