<template>
  <div class="app-wrapper">
    <AppSidebar />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppSidebar from './layout/AppSidebar.vue'

onMounted(() => {
  // Initialize OverlayScrollbars for sidebar
  const sidebarWrapper = document.querySelector('.sidebar-wrapper')
  if (sidebarWrapper && (window as any).OverlayScrollbarsGlobal?.OverlayScrollbars !== undefined) {
    (window as any).OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
      scrollbars: {
        theme: 'os-theme-light',
        autoHide: 'leave',
        clickScroll: true
      }
    })
  }
})
</script>

<style scoped></style>
