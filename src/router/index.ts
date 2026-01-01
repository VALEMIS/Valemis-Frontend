import { createRouter, createWebHistory } from "vue-router";

// Main Views
import Dashboard from "../views/Dashboard.vue";

// 1. Asset Inventory Module
import AsetInventori from "../views/AsetInventori.vue";

// 2. Land Acquisition/Compensation Module
import TambahPembebasanLahan from "../views/TambahPembebasanLahan.vue";
import DetailPembebasanLahan from "../views/DetailPembebasanLahan.vue";
import TambahPemilikLahan from "../views/TambahPemilikLahan.vue";
import Project from "../views/Project.vue";
// 3. Land Inventory Module
import LandInventory from "../views/LandInventory.vue";
import PendataanGeospatialLahanBebas from "../views/PendataanGeospatialLahanBebas.vue";
import DetailProject from "../views/DetailProject.vue";
// 4. Land Compliance Module
import LandCompliance from "../views/LandCompliance.vue";
import PengecekanIzinLahan from "../views/PengecekanIzinLahan.vue";

// 5. Land Litigasi/Claim Module
import Litigasi from "../views/Litigasi.vue";
import ClaimLitigasi from "../views/ClaimLitigasi.vue";
import TambahLitigasi from "../views/TambahLitigasi.vue";
import TambahParcelLitigasi from "../views/TambahParcelLitigasi.vue";

// 6. Stakeholder Management Module
import StakeHolderAdvanced from "../views/StakeHolderAdvanced.vue";
import TambahStakeHolder from "../views/TambahStakeHolder.vue";
import DetailStakeHolder from "../views/DetailStakeHolder.vue";

// 7. Census Survey Module
import CensusSurvey from "../views/CensusSurvey.vue";

// Legacy - to be deprecated
import LahanBebas from "../views/LahanBebas.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Dashboard
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },

    // ===== 1. ASSET INVENTORY MODULE =====
    {
      path: "/asset-inventory",
      name: "asset-inventory",
      component: AsetInventori,
    },

    // ===== 2. LAND ACQUISITION/COMPENSATION MODULE =====
    {
      path: "/project",
      name: "project",
      component: Project,
    },
    {
      path: "/project/:id_project",
      name: "project_detail",
      component: DetailProject,
    },
    {
      path: "/project/:id_project/land-acquisition",
      name: "detail-land-acquisition",
      component: DetailPembebasanLahan,
    },
    {
      path: "/project/:id_project/land-inventory",
      name: "land-inventory",
      component: LandInventory,
    },

    // ===== 4. LAND COMPLIANCE MODULE =====
    {
      path: "/land-compliance",
      name: "land-compliance",
      component: LandCompliance,
    },
    {
      path: "/land-compliance/pengecekan-izin",
      name: "pengecekan-izin-lahan",
      component: PengecekanIzinLahan,
    },

    // ===== 5. LAND LITIGASI/CLAIM MODULE =====
    {
      path: "/land-litigasi",
      name: "land-litigasi",
      component: Litigasi,
    },
    {
      path: "/land-litigasi/claim/:id",
      name: "claim-litigasi",
      component: ClaimLitigasi,
    },
    {
      path: "/land-litigasi/tambah",
      name: "tambah-litigasi",
      component: TambahLitigasi,
    },
    {
      path: "/land-litigasi/tambah-parcel",
      name: "tambah-parcel-litigasi",
      component: TambahParcelLitigasi,
    },

    // ===== 6. STAKEHOLDER MANAGEMENT MODULE =====
    {
      path: "/stakeholder-management",
      name: "stakeholder-management",
      redirect: "/stakeholder-management/advanced",
    },
    {
      path: "/stakeholder-management/basic",
      name: "stakeholder-basic",
      redirect: "/stakeholder-management/advanced",
    },
    {
      path: "/stakeholder-management/advanced",
      name: "stakeholder-advanced",
      component: StakeHolderAdvanced,
    },
    {
      path: "/stakeholder-management/tambah",
      name: "tambah-stake-holder",
      component: TambahStakeHolder,
    },
    {
      path: "/stakeholder-management/detail/:id",
      name: "detail-stake-holder",
      component: DetailStakeHolder,
    },
    {
      path: "/stakeholder-management/edit/:id",
      name: "edit-stake-holder",
      component: TambahStakeHolder,
    },

    // ===== 7. CENSUS SURVEY MODULE =====
    {
      path: "/census-survey",
      name: "census-survey",
      component: CensusSurvey,
    },

    // ===== LEGACY ROUTES (For backward compatibility) =====
    {
      path: "/aset-inventori",
      redirect: "/asset-inventory",
    },
    {
      path: "/asset-inventory-larap/asset-inventory",
      redirect: "/asset-inventory",
    },
    {
      path: "/pembebasan-lahan",
      redirect: "/land-acquisition",
    },
    {
      path: "/pembebasan-lahan/project",
      redirect: "/land-acquisition-project",
    },
    {
      path: "/litigasi",
      redirect: "/land-litigasi",
    },
    {
      path: "/stake-holder",
      redirect: "/stakeholder-management/advanced",
    },
    {
      path: "/geospasial/lahan-bebas",
      name: "lahan-bebas",
      component: LahanBebas,
    },
  ],
});

export default router;
