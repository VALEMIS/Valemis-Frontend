<template>
  <Panel header="Map Controls" :toggleable="true" :collapsed="collapsed" @update:collapsed="$emit('update:collapsed', $event)">
    <div class="map-layer-control">
      <!-- Layers Section -->
      <div class="mb-4">
        <h5 class="m-0 mb-2 text-sm font-semibold text-600">
          <i class="bi bi-layers mr-1"></i>
          Layers
        </h5>
        <div class="flex flex-column gap-2">
          <div v-for="layer in layers" :key="layer.id" class="flex align-items-center">
            <Checkbox
              :modelValue="layer.enabled"
              :binary="true"
              :inputId="layer.id"
              @update:modelValue="$emit('toggleLayer', layer.id)"
            />
            <label :for="layer.id" class="ml-2 text-sm cursor-pointer flex-1">
              {{ layer.label }}
            </label>
            <Badge
              :value="layer.data.length"
              severity="secondary"
            />
          </div>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="mb-4">
        <h5 class="m-0 mb-2 text-sm font-semibold text-600">
          <i class="bi bi-funnel mr-1"></i>
          Filters
        </h5>

        <!-- Desa Filter -->
        <div class="mb-2">
          <label class="block text-xs text-500 mb-1">Desa</label>
          <Dropdown
            :modelValue="filters.desa"
            :options="desaOptions"
            placeholder="All Desa"
            class="w-full text-sm"
            :showClear="true"
            @update:modelValue="$emit('updateFilter', 'desa', $event)"
          />
        </div>

        <!-- Project Filter -->
        <div class="mb-2">
          <label class="block text-xs text-500 mb-1">Project</label>
          <Dropdown
            :modelValue="filters.project"
            :options="projectOptions"
            placeholder="All Projects"
            class="w-full text-sm"
            :showClear="true"
            @update:modelValue="$emit('updateFilter', 'project', $event)"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <Button
          label="Reset"
          size="small"
          severity="secondary"
          outlined
          class="flex-1"
          @click="$emit('resetFilters')"
        />
        <Button
          icon="bi bi-download"
          size="small"
          severity="secondary"
          outlined
          v-tooltip.top="'Export Map'"
          @click="$emit('exportMap')"
        />
      </div>

      <!-- Legend -->
      <Divider />
      <div>
        <h5 class="m-0 mb-2 text-sm font-semibold text-600">
          <i class="bi bi-palette mr-1"></i>
          Legend
        </h5>
        <div class="flex flex-column gap-1">
          <div
            v-for="legend in legends"
            :key="legend.label"
            class="flex align-items-center text-sm"
          >
            <span
              class="legend-color mr-2"
              :style="{ backgroundColor: legend.color }"
            ></span>
            <span class="flex-1">{{ legend.label }}</span>
            <Badge :value="legend.count" severity="secondary" />
          </div>
        </div>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Panel from 'primevue/panel'
import Checkbox from 'primevue/checkbox'
import Badge from 'primevue/badge'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Tooltip from 'primevue/tooltip'
import type { MapLayer, MapFilter, MapLegend } from '@/types/dashboard'

interface Props {
  layers: MapLayer[]
  filters: MapFilter
  legends: MapLegend[]
  desaOptions?: string[]
  projectOptions?: string[]
  collapsed?: boolean
}

interface Emits {
  (e: 'update:collapsed', value: boolean): void
  (e: 'toggleLayer', layerId: string): void
  (e: 'updateFilter', type: string, value: any): void
  (e: 'resetFilters'): void
  (e: 'exportMap'): void
}

const props = withDefaults(defineProps<Props>(), {
  desaOptions: () => ['Sorowako', 'Magani', 'Wewangriu', 'Nikkel', 'Tarowang', 'Timampu', 'Nuha'],
  projectOptions: () => ['Project Alpha', 'Project Beta', 'Project Gamma'],
  collapsed: false
})

defineEmits<Emits>()
</script>

<style scoped>
.map-layer-control {
  font-size: 0.875rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  display: inline-block;
  border: 1px solid var(--surface-border);
}

:deep(.p-panel-header) {
  padding: 0.75rem 1rem;
}

:deep(.p-panel-content) {
  padding: 1rem;
}
</style>
