<template>
  <div class="modal fade" ref="modalRef" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">Dokumen Lahan</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>

        <div class="modal-body">
          <!-- LIST DOCUMENT -->
          <ul class="list-group mb-3" v-if="documents.length">
            <li
              v-for="doc in documents"
              :key="doc.id_document"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              {{ doc.nama_dokumen }}
              <button
                class="btn btn-sm btn-danger"
                @click="deleteDoc(doc.id_document)"
              >
                Hapus
              </button>
            </li>
          </ul>

          <p v-else class="text-muted">Belum ada dokumen</p>

          <!-- ADD DOCUMENT -->
          <input
            type="file"
            class="form-control"
            multiple
            @change="onAddFile"
          />
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="close">Tutup</button>
          <button class="btn btn-primary" @click="uploadFiles">Simpan</button>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from 'vue'
import axios from 'axios'
import { Modal } from 'bootstrap'

const props = defineProps<{
  documents: any[]
  landId: number | null
  show: boolean
}>()

const modalRef = ref<HTMLElement | null>(null)
const emit = defineEmits(['close','refresh'])
let modalInstance: Modal | null = null

const newFiles = ref<File[]>([])

onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value)
  }
})

watch(
  () => props.show,
  (val) => {
    if (!modalInstance) return
    val ? modalInstance.show() : modalInstance.hide()
  }
)

const close = () => {
  modalInstance?.hide()
  emit('refresh') 
  emit('close')
}

const onAddFile = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  newFiles.value.push(...Array.from(files))
}

const uploadFiles = async () => {
  if (!props.landId || newFiles.value.length === 0) return

  for (const file of newFiles.value) {
    const fd = new FormData()
    fd.append('id_lahan', props.landId.toString())
    fd.append('nama_dokumen', file.name)
    fd.append('file', file)

    await axios.post(
      'http://127.0.0.1:8000/api/spatial/LandInventoryDocument/',
      fd
    )
  }

  newFiles.value = []
  emit('refresh') 
}

const deleteDoc = async (docId: number) => {
  await axios.delete(
    `http://127.0.0.1:8000/api/spatial/LandInventoryDocument/${docId}/`
  )
}
</script>
