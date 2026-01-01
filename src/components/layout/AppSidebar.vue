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
              <i class="nav-icon pi pi-gauge" style="font-size: 1rem;"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: route.path.startsWith('/project') }">
            <router-link to="/project" class="nav-link">
              <i class="nav-icon pi pi-map" style="font-size: 1rem;"></i>
              <p>Project</p>
            </router-link>
          </li>

          

          <!-- 1. Asset Inventory Module -->
          

          <li
            v-if="projectId"
            class="nav-item"
          >
            <li class="nav-item project-indicator" v-if="projectMeta">
              <div class="project-card">
                <span class="project-label">Active Project</span>
                <div class="project-name">
                  {{ projectMeta.nama_project }}
                </div>
              </div>
            </li>
            <li class="nav-header">MAIN MODULES</li>
            <li class="nav-item" :class="{ active: route.path.startsWith('/asset-inventory') }">
              <router-link to="/asset-inventory" class="nav-link">
                <i class="nav-icon pi pi-box" style="font-size: 1rem;"></i>
                <p>Asset Inventory</p>
              </router-link>
            </li>
            <!-- 2. Land Acquisition/Compensation Module -->
            <li class="nav-item" :class="{ active: route.path.startsWith(`/project/${projectId}/land-acquisition`) }">
              <router-link :to="`/project/${projectId}/land-acquisition`" class="nav-link">
                <i class="nav-icon pi pi-map" style="font-size: 1rem;"></i>
                <p>Land Acquisition</p>
              </router-link>
            </li>

            <!-- 3. Land Inventory Module -->
            <li class="nav-item" :class="{ active: route.path.startsWith(`/project/${projectId}/land-inventory`) }">
              <router-link :to="`/project/${projectId}/land-inventory`" class="nav-link">
                <i class="nav-icon pi pi-layers" style="font-size: 1rem;"></i>
                <p>Land Inventory</p>
              </router-link>
            </li>

          </li>
          <li v-else>
            <li class="nav-item" :class="{ active: route.path.startsWith('/land-compliance') }">
              <router-link to="/land-compliance" class="nav-link">
                <i class="nav-icon pi pi-shield" style="font-size: 1rem;"></i>
                <p>Land Compliance</p>
              </router-link>
            </li>

            <!-- 5. Land Litigasi/Claim Module -->
            <li class="nav-item" :class="{ active: route.path.startsWith('/land-litigasi') }">
              <router-link to="/land-litigasi" class="nav-link">
                <i class="nav-icon pi pi-exclamation-triangle" style="font-size: 1rem;"></i>
                <p>Land Litigasi/Claim</p>
              </router-link>
            </li>

            <!-- 6. Stakeholder Management Module -->
            <li class="nav-item" :class="{ active: route.path.startsWith('/stakeholder-management') }">
              <router-link to="/stakeholder-management/advanced" class="nav-link">
                <i class="nav-icon pi pi-users" style="font-size: 1rem;"></i>
                <p>Stakeholder Management</p>
              </router-link>
            </li>
          </li>
          
          <!-- 4. Land Compliance Module -->
          
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import router from '../../router'
import { computed, watch,ref } from 'vue';
import axios from 'axios';

const projectMeta = ref<any>(null)
const loadingProject = ref(false)

const route = useRoute()

const projectId = computed(() => route.params.id_project)
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
.project-indicator {
  padding: 12px 16px;
}

.project-card {
  background: linear-gradient(135deg, #eeeeee, #eef1f5);
  border-left: 4px solid #3b82f6; /* blue accent */
  border-radius: 6px;
  padding: 10px 12px;
}

.project-label {
  display: block;
  font-size: 12pt;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #383b42;
  margin-bottom: 4px;
}

.project-name {
  font-size: 16pt;
  font-weight: 600;
  color: #111827;
  line-height: 1.3;
  word-break: break-word;
}
</style>
