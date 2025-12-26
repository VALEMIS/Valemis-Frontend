<template>
  <aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
    <div class="sidebar-brand">
      <router-link to="/" class="brand-link">
        <div class="brand-wrapper">
          <span class="brand-text">LAMIS — Land Management<br>Integrated System</span>
        </div>
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
          <!-- Dashboard -->
          <li class="nav-item" :class="{ active: route.path === '/' }">
            <router-link to="/" class="nav-link">
              <i class="nav-icon bi bi-speedometer"></i>
              <p>Dashboard</p>
            </router-link>
          </li>

          <li class="nav-header">MAIN MODULES</li>

          <!-- 1. Asset Inventory Module -->
          <li class="nav-item" :class="{ active: route.path.startsWith('/asset-inventory') }">
            <router-link to="/asset-inventory" class="nav-link">
              <i class="nav-icon bi bi-archive-fill"></i>
              <p>Asset Inventory</p>
            </router-link>
          </li>

          <!-- 2. Land Acquisition/Compensation Module -->
          <li class="nav-item" :class="{ active: route.path.startsWith('/land-acquisition') }">
            <router-link to="/land-acquisition" class="nav-link">
              <i class="nav-icon bi bi-map-fill"></i>
              <p>Land Acquisition</p>
            </router-link>
          </li>

          <!-- 3. Land Inventory Module -->
          <li class="nav-item" :class="{ active: route.path.startsWith('/land-inventory') }">
            <router-link to="/land-inventory" class="nav-link">
              <i class="nav-icon bi bi-layers-fill"></i>
              <p>Land Inventory</p>
            </router-link>
          </li>

          <!-- 4. Land Compliance Module -->
          <li class="nav-item" :class="{ active: route.path.startsWith('/land-compliance') }">
            <router-link to="/land-compliance" class="nav-link">
              <i class="nav-icon bi bi-shield-check"></i>
              <p>Land Compliance</p>
            </router-link>
          </li>
          
          <!-- 5. Land Litigasi/Claim Module -->
          <li class="nav-item" :class="{ active: route.path.startsWith('/land-litigasi') }">
            <router-link to="/land-litigasi" class="nav-link">
              <i class="nav-icon bi bi-exclamation-triangle-fill"></i>
              <p>Land Litigasi/Claim</p>
            </router-link>
          </li>

          <!-- 6. Stakeholder Management Module -->
          <li class="nav-item" :class="{ active: route.path.startsWith('/stakeholder-management') }">
            <router-link to="/stakeholder-management/advanced" class="nav-link">
              <i class="nav-icon bi bi-people-fill"></i>
              <p>Stakeholder Management</p>
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
.brand-link {
  padding: 1rem 0.5rem;
  display: block;
}

.brand-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.brand-text {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
  display: block;
  color: #fff;
  letter-spacing: 0.3px;
}
</style>
