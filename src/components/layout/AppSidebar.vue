<template>
  <aside class="app-sidebar">
    <!-- Header with Logo -->
    <div class="sidebar-header">
      <router-link to="/" class="brand-link">
        <div class="logo-wrapper">
          <img src="/assets/img/Logo.png" alt="Logo" class="sidebar-logo">
        </div>
        <div class="brand-info">
          <h1 class="brand-title">LAMIS</h1>
          <p class="brand-subtitle">Land Management Integrated System</p>
        </div>
      </router-link>
    </div>

    <!-- Navigation Menu -->
    <div class="sidebar-wrapper">
      <nav class="sidebar-nav">
        <ul class="nav-menu">
          <!-- Dashboard -->
          <li class="nav-item">
            <router-link to="/" class="nav-link" :class="{ active: route.path === '/' }">
              <i class="nav-icon pi pi-gauge"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/project" class="nav-link" :class="{ active: route.path.startsWith('/project') }">
              <i class="nav-icon pi pi-map"></i>
              <span>Project</span>
            </router-link>
          </li>

          <!-- Project-Based Modules (only show when project is selected) -->
          <li v-if="projectId">
          <li class="nav-item project-indicator" v-if="projectMeta">
            <div class="project-card">
              <span class="project-label">Active Project</span>
              <div class="project-name">
                {{ projectMeta.nama_project }}
              </div>
            </div>
          </li>
          <li class="nav-header">PROJECT MODULES</li>
          <li class="nav-item">
            <router-link :to="`/project/${projectId}/asset-inventory`" class="nav-link"
              :class="{ active: route.path.startsWith(`/project/${projectId}/asset-inventory`) }">
              <i class="nav-icon pi pi-box"></i>
              <span>Asset Inventory</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/project/${projectId}/land-acquisition`" class="nav-link"
              :class="{ active: route.path.startsWith(`/project/${projectId}/land-acquisition`) }">
              <i class="nav-icon pi pi-map"></i>
              <span>Land Acquisition</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/project/${projectId}/land-inventory`" class="nav-link"
              :class="{ active: route.path.startsWith(`/project/${projectId}/land-inventory`) }">
              <i class="nav-icon pi pi-layers"></i>
              <span>Land Inventory</span>
            </router-link>
          </li>
          </li>

          <!-- General Modules (always visible) -->
          <li class="nav-header">GENERAL MODULES</li>
          <li class="nav-item">
            <router-link to="/land-compliance" class="nav-link"
              :class="{ active: route.path.startsWith('/land-compliance') }">
              <i class="nav-icon pi pi-shield"></i>
              <span>Land Compliance</span>
            </router-link>
          </li>

          <!-- 5. Land Litigasi/Claim Module -->
          <li class="nav-item">
            <router-link to="/land-litigasi" class="nav-link"
              :class="{ active: route.path.startsWith('/land-litigasi') }">
              <i class="nav-icon pi pi-exclamation-triangle"></i>
              <span>Land Litigasi/Claim</span>
            </router-link>
          </li>

          <!-- 6. Stakeholder Management Module -->
          <li class="nav-item">
            <router-link to="/stakeholder-management/advanced" class="nav-link"
              :class="{ active: route.path.startsWith('/stakeholder-management') }">
              <i class="nav-icon pi pi-users"></i>
              <span>Stakeholder Management</span>
            </router-link>
          </li>

          <!-- 4. Land Compliance Module -->

        </ul>
      </nav>

      <!-- Tagline at bottom of menu -->
      <div class="menu-tagline">
        <img src="/assets/img/Tagline.png" alt="Tagline" class="tagline-img">
      </div>
    </div>

    <!-- Footer with Account only -->
    <div class="sidebar-footer">
      <div class="account-section">
        <div class="account-button" @click="toggleAccountMenu">
          <i class="pi pi-user account-icon"></i>
          <span class="account-email">admin@valemis.id</span>
          <i class="pi pi-chevron-down dropdown-icon" :class="{ 'rotate': showAccountMenu }"></i>
        </div>
        <transition name="dropdown">
          <div v-if="showAccountMenu" class="account-dropdown">
            <button class="logout-button" @click="handleLogout">
              <i class="pi pi-sign-out"></i>
              <span>Keluar</span>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, watch, ref } from 'vue';
import axios from 'axios';

const projectMeta = ref<any>(null)
const loadingProject = ref(false)
const showAccountMenu = ref(false)

const route = useRoute()
const router = useRouter()

const projectId = computed(() => route.params.id_project)

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value
}

const handleLogout = () => {
  // Add your logout logic here
  console.log('Logging out...')
  // Example: clear session, redirect to login
  // router.push('/login')
  showAccountMenu.value = false
}

watch(
  projectId,
  async (newId) => {
    if (!newId) {
      projectMeta.value = null
      return
    }

    loadingProject.value = true
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/spatial/Project/${newId}`
      )
      projectMeta.value = res.data
    } catch (err) {
      console.error("Failed to fetch project metadata", err)
      projectMeta.value = null
    } finally {
      loadingProject.value = false
    }
  },
  { immediate: true }
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.app-sidebar {
  width: 280px;
  height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Header Section */
.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid #e9ecef;
  background: #ffffff;
}

.brand-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-wrapper {
  flex-shrink: 0;
}

.sidebar-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.brand-info {
  flex: 1;
}

.brand-title {
  font-size: 24px;
  font-weight: 700;
  color: #212529;
  margin: 0;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 14px;
  color: #6c757d;
  margin: 2px 0 0 0;
  line-height: 1.2;
}

/* Navigation Section */
.sidebar-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0 0 0;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.sidebar-nav {
  padding: 0;
  flex: 1;
}

.nav-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 4px 12px;
}

.nav-header {
  padding: 12px 16px 8px 16px;
  margin: 8px 12px 4px 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6c757d;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #495057;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 15px;
  font-weight: 500;
  position: relative;
  background: transparent;
}

.nav-link span {
  line-height: 1;
  display: inline-block;
}

.nav-link:hover {
  background: #e9ecef;
  color: #212529;
}

.nav-link.active {
  background: #1e5bb8;
  color: #ffffff;
}

.nav-link.active:hover {
  background: #174a94;
  color: #ffffff;
}

.nav-link.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.nav-icon {
  font-size: 18px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.external-icon {
  margin-left: auto;
  font-size: 14px;
}

/* Project Indicator */
.project-indicator {
  margin: 12px;
}

.project-card {
  background: #ffffff;
  border-left: 4px solid #1e5bb8;
  border-radius: 8px;
  padding: 12px 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.project-label {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6c757d;
  margin-bottom: 4px;
  font-weight: 600;
}

.project-name {
  font-size: 14px;
  font-weight: 600;
  color: #212529;
  line-height: 1.3;
  word-break: break-word;
}

/* Menu Tagline */
.menu-tagline {
  padding: 20px;
  text-align: center;
  background: #f8f9fa;
  margin-top: auto;
}

.menu-tagline .tagline-img {
  max-width: 200px;
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* Footer Section */
.sidebar-footer {
  border-top: 1px solid #e9ecef;
  padding: 16px 20px;
  background: #ffffff;
}

.account-section {
  position: relative;
}

.account-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.account-button:hover {
  background: #e9ecef;
}

.account-icon {
  font-size: 18px;
  color: #495057;
  flex-shrink: 0;
}

.account-email {
  flex: 1;
  font-size: 14px;
  color: #212529;
  font-weight: 500;
}

.dropdown-icon {
  font-size: 12px;
  color: #6c757d;
  transition: transform 0.2s ease;
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

.account-dropdown {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: 8px;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.logout-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #dc3545;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.logout-button:hover {
  background: #fff5f5;
}

.logout-button i {
  font-size: 16px;
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Scrollbar Styling */
.app-sidebar::-webkit-scrollbar {
  width: 6px;
}

.app-sidebar::-webkit-scrollbar-track {
  background: #f8f9fa;
}

.app-sidebar::-webkit-scrollbar-thumb {
  background: #dee2e6;
  border-radius: 3px;
}

.app-sidebar::-webkit-scrollbar-thumb:hover {
  background: #adb5bd;
}
</style>
