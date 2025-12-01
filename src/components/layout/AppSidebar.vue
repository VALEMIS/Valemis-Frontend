<template>
  <aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
    <div class="sidebar-brand">
      <router-link to="/" class="brand-link">
        <span class="brand-text fw-light">LM APP</span>
      </router-link>
    </div>
    
    <div class="sidebar-wrapper">
      <nav class="mt-2">
        <ul
          class="nav sidebar-menu flex-column"
          data-lte-toggle="treeview"
          role="navigation"
          aria-label="Main navigation"
          data-accordion="false"
          id="navigation"
        >
          <li class="nav-item" :class="{ active: route.path === '/' }">
            <router-link to="/" class="nav-link">
              <i class="nav-icon bi bi-speedometer"></i>
              <p>Dashboard</p>
            </router-link>
          </li>

          <li class="nav-item" :class="{ active: route.path.startsWith('/aset-inventori') }">
            <router-link to="/aset-inventori" class="nav-link">
              <i class="nav-icon bi bi-geo-alt"></i>
              <p>Aset Inventori</p>
            </router-link>
          </li>
          
          <li class="nav-item" :class="{ active: route.path.startsWith('/pembebasan-lahan') }">
            <router-link to="/pembebasan-lahan" class="nav-link">
              <i class="nav-icon bi bi-map"></i>
              <p>Pembebasan Lahan</p>
            </router-link>
          </li>
          
          <li class="nav-item" :class="{ active: route.path.startsWith('/litigasi') }">
            <router-link to="/litigasi" class="nav-link">
              <i class="nav-icon bi bi-pin-map"></i>
              <p>Litigasi/Claim Lahan</p>
            </router-link>
          </li>
          
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon bi bi-globe"></i>
              <p>
                Geospasial
                <i class="nav-arrow bi bi-chevron-right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/geospasial/lahan-bebas" class="nav-link">
                  <i class="nav-icon bi bi-circle"></i>
                  <p>Lahan Bebas</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/geospasial/pengecekan-izin-lahan" class="nav-link">
                  <i class="nav-icon bi bi-circle"></i>
                  <p>Pengecekan Izin Lahan</p>
                </router-link>
              </li>
            </ul>
          </li>
          
          <li class="nav-item" :class="{ active: route.path.startsWith('/stake-holder') }">
            <router-link to="/stake-holder" class="nav-link">
              <i class="nav-icon bi bi-person"></i>
              <p>Stake Holder / Identitas</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
</style>
