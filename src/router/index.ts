import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AsetInventori from '../views/AsetInventori.vue'
import TambahAsetInventori from '../views/TambahAsetInventori.vue'
import PembebasanLahan from '../views/PembebasanLahan.vue'
import TambahPembebasanLahan from '../views/TambahPembebasanLahan.vue'
import DetailPembebasanLahan from '../views/DetailPembebasanLahan.vue'
import TambahPemilikLahan from '../views/TambahPemilikLahan.vue'
import Litigasi from '../views/Litigasi.vue'
import ClaimLitigasi from '../views/ClaimLitigasi.vue'
import TambahLitigasi from '../views/TambahLitigasi.vue'
import TambahParcelLitigasi from '../views/TambahParcelLitigasi.vue'
import LahanBebas from '../views/LahanBebas.vue'
import PengecekanIzinLahan from '../views/PengecekanIzinLahan.vue'
import StakeHolder from '../views/StakeHolder.vue'
import TambahStakeHolder from '../views/TambahStakeHolder.vue'
import DetailStakeHolder from '../views/DetailStakeHolder.vue'

// New Modules
import LARAP from '../views/LARAP.vue'
import LandInventory from '../views/LandInventory.vue'
import LandCompliance from '../views/LandCompliance.vue'
import PendataanGeospatialLahanBebas from '../views/PendataanGeospatialLahanBebas.vue'

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
      path: '/aset-inventori/tambah',
      name: 'tambah-aset-inventori',
      component: TambahAsetInventori
    },
    {
      path: '/pembebasan-lahan',
      name: 'pembebasan-lahan',
      component: PembebasanLahan
    },
    {
      path: '/pembebasan-lahan/tambah',
      name: 'tambah-pembebasan-lahan',
      component: TambahPembebasanLahan
    },
    {
      path: '/pembebasan-lahan/detail/:id',
      name: 'detail-pembebasan-lahan',
      component: DetailPembebasanLahan
    },
    {
      path: '/pembebasan-lahan/tambah-pemilik',
      name: 'tambah-pemilik-lahan',
      component: TambahPemilikLahan
    },
    {
      path: '/litigasi',
      name: 'litigasi',
      component: Litigasi
    },
    {
      path: '/litigasi/claim/:id',
      name: 'claim-litigasi',
      component: ClaimLitigasi
    },
    {
      path: '/litigasi/tambah',
      name: 'tambah-litigasi',
      component: TambahLitigasi
    },
    {
      path: '/litigasi/tambah-parcel',
      name: 'tambah-parcel-litigasi',
      component: TambahParcelLitigasi
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
    },
    {
      path: '/stake-holder/tambah',
      name: 'tambah-stake-holder',
      component: TambahStakeHolder
    },
    {
      path: '/stake-holder/detail/:id',
      name: 'detail-stake-holder',
      component: DetailStakeHolder
    },
    {
      path: '/stake-holder/edit/:id',
      name: 'edit-stake-holder',
      component: TambahStakeHolder
    },
    // LARAP Module
    {
      path: '/larap',
      name: 'larap',
      component: LARAP
    },
    // Land Inventory Module
    {
      path: '/land-inventory',
      name: 'land-inventory',
      component: LandInventory
    },
    // Land Compliance Module
    {
      path: '/land-compliance',
      name: 'land-compliance',
      component: LandCompliance
    },
    // Pendataan Geospatial Lahan Bebas Module
    {
      path: '/pendataan-geospatial',
      name: 'pendataan-geospatial',
      component: PendataanGeospatialLahanBebas
    }
  ]
})

export default router
