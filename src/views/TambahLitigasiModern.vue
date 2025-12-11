<template>
  <div class="modern-page">
    <!-- Header -->
    <div class="page-header">
      <div class="header-content">
        <router-link to="/litigasi" class="btn-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Kembali
        </router-link>
        <div class="header-title">
          <h1>Tambah Litigasi Baru</h1>
          <p>Lengkapi form di bawah untuk mengajukan claim litigasi</p>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="map-card">
      <div class="card-header">
        <h3 class="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Lokasi Sengketa
        </h3>
        <span class="help-text">Klik pada peta untuk menandai lokasi sengketa</span>
      </div>
      <div id="map" ref="mapContainer" class="map-container"></div>
    </div>

    <!-- Form Section -->
    <form @submit.prevent="handleSubmit" class="form-card">
      <div class="card-header">
        <h3 class="card-title">Informasi Claim</h3>
      </div>
      <div class="card-body">
        <div class="form-grid">
          <div class="form-group">
            <label for="claimId">Claim ID <span class="required">*</span></label>
            <input type="text" id="claimId" v-model="formData.claimId" class="form-input" placeholder="CLM-XXX" required />
          </div>

          <div class="form-group">
            <label for="jenisClaim">Jenis Claim <span class="required">*</span></label>
            <select id="jenisClaim" v-model="formData.jenisClaim" class="form-select" required>
              <option value="">Pilih jenis claim</option>
              <option>Sengketa Batas Lahan</option>
              <option>Sengketa Kepemilikan</option>
              <option>Sengketa Kompensasi</option>
              <option>Kerusakan Properti</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div class="form-group">
            <label for="namaPenggugat">Nama Penggugat <span class="required">*</span></label>
            <input type="text" id="namaPenggugat" v-model="formData.namaPenggugat" class="form-input" placeholder="Masukkan nama lengkap" required />
          </div>

          <div class="form-group">
            <label for="nik">NIK <span class="required">*</span></label>
            <input type="text" id="nik" v-model="formData.nik" class="form-input" placeholder="16 digit NIK" maxlength="16" required />
          </div>

          <div class="form-group">
            <label for="nomorTelepon">Nomor Telepon</label>
            <input type="tel" id="nomorTelepon" v-model="formData.nomorTelepon" class="form-input" placeholder="0812xxxxxxxx" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="formData.email" class="form-input" placeholder="email@example.com" />
          </div>

          <div class="form-group">
            <label for="tanggalPengajuan">Tanggal Pengajuan <span class="required">*</span></label>
            <input type="date" id="tanggalPengajuan" v-model="formData.tanggalPengajuan" class="form-input" required />
          </div>

          <div class="form-group">
            <label for="status">Status <span class="required">*</span></label>
            <select id="status" v-model="formData.status" class="form-select" required>
              <option value="">Pilih status</option>
              <option>Baru</option>
              <option>Verifikasi</option>
              <option>Dalam Proses</option>
              <option>Mediasi</option>
              <option>Selesai</option>
              <option>Ditolak</option>
            </select>
          </div>

          <div class="form-group full-width">
            <label for="alamat">Alamat Penggugat <span class="required">*</span></label>
            <textarea id="alamat" v-model="formData.alamat" class="form-textarea" rows="2" placeholder="Masukkan alamat lengkap" required></textarea>
          </div>

          <div class="form-group full-width">
            <label for="deskripsi">Deskripsi Claim <span class="required">*</span></label>
            <textarea id="deskripsi" v-model="formData.deskripsi" class="form-textarea" rows="4" placeholder="Jelaskan detail sengketa atau claim yang diajukan" required></textarea>
          </div>

          <div class="form-group full-width">
            <label for="dokumen">Upload Dokumen Pendukung</label>
            <div class="file-upload-area" @click="triggerFileInput">
              <input type="file" ref="fileInput" @change="handleFileUpload" multiple accept=".pdf,.jpg,.jpeg,.png" style="display: none;" />
              <div class="upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p class="upload-text">Click to upload or drag and drop</p>
              <p class="upload-hint">PDF, JPG, PNG (max. 10MB each)</p>
            </div>
            <div v-if="uploadedFiles.length > 0" class="uploaded-files">
              <div v-for="(file, index) in uploadedFiles" :key="index" class="uploaded-file">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span>{{ file.name }}</span>
                <button type="button" @click.stop="removeFile(index)" class="remove-file">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <router-link to="/litigasi" class="btn-cancel">Batal</router-link>
          <button type="submit" class="btn-submit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Simpan Claim
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const router = useRouter()
const mapContainer = ref<HTMLDivElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const formData = ref({
  claimId: '',
  jenisClaim: '',
  namaPenggugat: '',
  nik: '',
  nomorTelepon: '',
  email: '',
  tanggalPengajuan: '',
  status: '',
  alamat: '',
  deskripsi: ''
})

const uploadedFiles = ref<File[]>([])

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    uploadedFiles.value.push(...Array.from(target.files))
  }
}

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1)
}

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  alert('Claim litigasi berhasil disimpan!')
  router.push('/litigasi')
}

onMounted(() => {
  if (mapContainer.value) {
    const map = L.map(mapContainer.value).setView([-6.2088, 106.8456], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    let marker: L.Marker | null = null

    map.on('click', (e: L.LeafletMouseEvent) => {
      if (marker) {
        map.removeLayer(marker)
      }
      marker = L.marker(e.latlng).addTo(map)
        .bindPopup('Lokasi Sengketa').openPopup()
    })
  }
})
</script>

<style scoped>
.modern-page {
  padding: 0;
}

.page-header {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-back:hover {
  background: #4F46E5;
  color: white;
  border-color: transparent;
}

.header-title h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 4px 0;
}

.header-title p {
  font-size: 14px;
  color: #6B7280;
  margin: 0;
}

.map-card, .form-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 24px;
}

.card-header {
  padding: 24px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.help-text {
  font-size: 13px;
  color: #9CA3AF;
}

.map-container {
  height: 400px;
  width: 100%;
}

.card-body {
  padding: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.required {
  color: #EF4444;
}

.form-input, .form-select, .form-textarea {
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  color: #1F2937;
  transition: all 0.2s;
  font-family: inherit;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.file-upload-area {
  border: 2px dashed #E5E7EB;
  border-radius: 12px;
  padding: 40px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: #F9FAFB;
}

.file-upload-area:hover {
  border-color: #4F46E5;
  background: #EEF2FF;
}

.upload-icon {
  color: #9CA3AF;
  margin-bottom: 16px;
}

.upload-text {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 4px 0;
}

.upload-hint {
  font-size: 13px;
  color: #9CA3AF;
  margin: 0;
}

.uploaded-files {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.uploaded-file {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
}

.uploaded-file svg:first-child {
  color: #4F46E5;
}

.remove-file {
  margin-left: auto;
  width: 24px;
  height: 24px;
  border: none;
  background: #FEE2E2;
  color: #EF4444;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-file:hover {
  background: #EF4444;
  color: white;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #F3F4F6;
}

.btn-cancel {
  padding: 12px 24px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn-cancel:hover {
  background: #F3F4F6;
}

.btn-submit {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}
</style>
