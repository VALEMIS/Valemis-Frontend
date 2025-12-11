<template>
  <div class="modern-page">
    <!-- Header -->
    <div class="page-header">
      <router-link to="/pembebasan-lahan" class="btn-back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </router-link>
      <h2 class="page-title">Tambah Pembebasan Lahan</h2>
    </div>

    <!-- Map Section -->
    <div class="map-card">
      <div class="card-header">
        <h3 class="card-title">Digitasi Lahan (Leaflet Draw)</h3>
        <div class="map-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Klik dan gambar polygon untuk menandai area lahan</span>
        </div>
      </div>
      <div class="map-container">
        <div id="drawMap" class="draw-map">
          <div class="map-placeholder">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
              <line x1="8" y1="2" x2="8" y2="18"></line>
              <line x1="16" y1="6" x2="16" y2="22"></line>
            </svg>
            <p>Draw land boundary on map</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="form-card">
      <div class="card-header">
        <h3 class="card-title">Form Data Lahan</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit" class="modern-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="parcelId">Parcel ID</label>
              <input type="text" id="parcelId" placeholder="PRC-XXX" required />
            </div>

            <div class="form-group">
              <label for="luasLahan">Luas Lahan (m²)</label>
              <input type="number" id="luasLahan" placeholder="500" min="0" step="0.01" required />
            </div>

            <div class="form-group">
              <label for="namaKepalaKeluarga">Nama Kepala Keluarga</label>
              <input type="text" id="namaKepalaKeluarga" placeholder="Nama lengkap" required />
            </div>

            <div class="form-group">
              <label for="alamat">Alamat</label>
              <input type="text" id="alamat" placeholder="Alamat lengkap" required />
            </div>

            <div class="form-group">
              <label for="desa">Desa</label>
              <input type="text" id="desa" placeholder="Nama desa" required />
            </div>

            <div class="form-group">
              <label for="kecamatan">Kecamatan</label>
              <input type="text" id="kecamatan" placeholder="Nama kecamatan" required />
            </div>

            <div class="form-group">
              <label for="kabupaten">Kabupaten</label>
              <input type="text" id="kabupaten" placeholder="Nama kabupaten" required />
            </div>

            <div class="form-group">
              <label for="statusPembebasan">Status Pembebasan</label>
              <select id="statusPembebasan" required>
                <option value="">Pilih status</option>
                <option>Belum Dibebaskan</option>
                <option>Dalam Proses</option>
                <option>Sudah Dibebaskan</option>
              </select>
            </div>

            <div class="form-group">
              <label for="tanggalPembebasan">Tanggal Pembebasan</label>
              <input type="date" id="tanggalPembebasan" />
            </div>

            <div class="form-group full-width">
              <label for="catatan">Catatan</label>
              <textarea id="catatan" rows="4" placeholder="Tambahkan catatan atau informasi tambahan..."></textarea>
            </div>
          </div>

          <!-- File Upload -->
          <div class="upload-section">
            <div class="upload-header">
              <h4 class="upload-title">Dokumen Pendukung</h4>
              <span class="upload-hint">Sertifikat, Peta, atau dokumen lainnya</span>
            </div>
            <div class="upload-area">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p class="upload-text">Drag & drop files here or click to browse</p>
              <p class="upload-subtext">PDF, JPG, PNG up to 10MB</p>
            </div>

            <!-- Uploaded Files List -->
            <div class="uploaded-files" v-if="uploadedFiles.length > 0">
              <div class="file-item" v-for="(file, index) in uploadedFiles" :key="index">
                <div class="file-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                </div>
                <div class="file-info">
                  <div class="file-name">{{ file.name }}</div>
                  <div class="file-size">{{ file.size }}</div>
                </div>
                <button type="button" class="file-remove" @click="removeFile(index)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <router-link to="/pembebasan-lahan" class="btn-cancel">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel
            </router-link>
            <button type="submit" class="btn-submit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const uploadedFiles = ref<Array<{ name: string; size: string }>>([])

const handleSubmit = () => {
  console.log('Form submitted')
}

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1)
}
</script>

<style scoped>
.modern-page {
  padding: 0;
}

.page-header {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  color: #374151;
  text-decoration: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  border: 1px solid #E5E7EB;
}

.btn-back:hover {
  background: #F9FAFB;
  transform: translateX(-4px);
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1E293B;
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
}

.map-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6B7280;
}

.map-info svg {
  color: #3B82F6;
}

.map-container {
  padding: 0;
}

.draw-map {
  height: 500px;
  background: #F9FAFB;
  position: relative;
}

.map-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #9CA3AF;
}

.map-placeholder svg {
  margin-bottom: 12px;
}

.map-placeholder p {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.card-body {
  padding: 24px;
}

.modern-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.upload-section {
  margin-top: 8px;
}

.upload-header {
  margin-bottom: 16px;
}

.upload-title {
  font-size: 16px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 4px 0;
}

.upload-hint {
  font-size: 13px;
  color: #9CA3AF;
}

.upload-area {
  border: 2px dashed #E5E7EB;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-area:hover {
  border-color: #4F46E5;
  background: #F9FAFB;
}

.upload-area svg {
  color: #9CA3AF;
  margin-bottom: 12px;
}

.upload-text {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 4px 0;
}

.upload-subtext {
  font-size: 12px;
  color: #9CA3AF;
  margin: 0;
}

.uploaded-files {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 10px;
  border: 1px solid #E5E7EB;
}

.file-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4F46E5;
}

.file-info {
  flex: 1;
}

.file-name {
  font-size: 14px;
  font-weight: 600;
  color: #1E293B;
}

.file-size {
  font-size: 12px;
  color: #9CA3AF;
}

.file-remove {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: white;
  color: #EF4444;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.file-remove:hover {
  background: #FEE2E2;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
}

.btn-cancel {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #F3F4F6;
  color: #374151;
  text-decoration: none;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #E5E7EB;
}

.btn-submit {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
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
