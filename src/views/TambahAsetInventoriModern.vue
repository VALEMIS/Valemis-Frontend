<template>
  <div class="modern-page">
    <!-- Header -->
    <div class="page-header">
      <div class="header-content">
        <router-link to="/aset-inventori" class="btn-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Kembali
        </router-link>
        <div class="header-title">
          <h1>Tambah Aset Inventori</h1>
          <p>Lengkapi form untuk menambahkan aset baru ke dalam sistem</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <form @submit.prevent="handleSubmit" class="form-card">
      <div class="card-header">
        <h3 class="card-title">Informasi Aset</h3>
      </div>
      <div class="card-body">
        <div class="form-grid">
          <div class="form-group">
            <label for="kodeAset">Kode Aset <span class="required">*</span></label>
            <input type="text" id="kodeAset" v-model="formData.kodeAset" class="form-input" placeholder="AST-XXX" required />
          </div>

          <div class="form-group">
            <label for="kategori">Kategori <span class="required">*</span></label>
            <select id="kategori" v-model="formData.kategori" class="form-select" required>
              <option value="">Pilih kategori</option>
              <option>Alat Berat</option>
              <option>Kendaraan</option>
              <option>Mesin</option>
              <option>Peralatan</option>
              <option>Elektronik</option>
              <option>Furniture</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div class="form-group full-width">
            <label for="namaAset">Nama Aset <span class="required">*</span></label>
            <input type="text" id="namaAset" v-model="formData.namaAset" class="form-input" placeholder="Nama lengkap aset" required />
          </div>

          <div class="form-group">
            <label for="merk">Merk/Brand</label>
            <input type="text" id="merk" v-model="formData.merk" class="form-input" placeholder="Nama merk" />
          </div>

          <div class="form-group">
            <label for="model">Model/Tipe</label>
            <input type="text" id="model" v-model="formData.model" class="form-input" placeholder="Model atau tipe" />
          </div>

          <div class="form-group">
            <label for="tahunPembuatan">Tahun Pembuatan</label>
            <input type="number" id="tahunPembuatan" v-model="formData.tahunPembuatan" class="form-input" placeholder="2024" min="1900" max="2100" />
          </div>

          <div class="form-group">
            <label for="tanggalPerolehan">Tanggal Perolehan <span class="required">*</span></label>
            <input type="date" id="tanggalPerolehan" v-model="formData.tanggalPerolehan" class="form-input" required />
          </div>

          <div class="form-group">
            <label for="nilai">Nilai Perolehan (Rp) <span class="required">*</span></label>
            <input type="number" id="nilai" v-model="formData.nilai" class="form-input" placeholder="1000000" step="1000" required />
          </div>

          <div class="form-group">
            <label for="kondisi">Kondisi <span class="required">*</span></label>
            <select id="kondisi" v-model="formData.kondisi" class="form-select" required>
              <option value="">Pilih kondisi</option>
              <option>Baru</option>
              <option>Baik</option>
              <option>Cukup Baik</option>
              <option>Perlu Perbaikan</option>
              <option>Rusak</option>
            </select>
          </div>

          <div class="form-group">
            <label for="status">Status <span class="required">*</span></label>
            <select id="status" v-model="formData.status" class="form-select" required>
              <option value="">Pilih status</option>
              <option>Aktif</option>
              <option>Perbaikan</option>
              <option>Rusak</option>
              <option>Tidak Digunakan</option>
            </select>
          </div>

          <div class="form-group">
            <label for="lokasi">Lokasi <span class="required">*</span></label>
            <input type="text" id="lokasi" v-model="formData.lokasi" class="form-input" placeholder="Site A / Gudang B / Kantor" required />
          </div>

          <div class="form-group">
            <label for="penanggungJawab">Penanggung Jawab</label>
            <input type="text" id="penanggungJawab" v-model="formData.penanggungJawab" class="form-input" placeholder="Nama penanggung jawab" />
          </div>

          <div class="form-group">
            <label for="nomorSeri">Nomor Seri/Serial Number</label>
            <input type="text" id="nomorSeri" v-model="formData.nomorSeri" class="form-input" placeholder="S/N: XXXXX" />
          </div>

          <div class="form-group">
            <label for="nomorPlat">Nomor Plat (jika kendaraan)</label>
            <input type="text" id="nomorPlat" v-model="formData.nomorPlat" class="form-input" placeholder="B 1234 ABC" />
          </div>

          <div class="form-group full-width">
            <label for="spesifikasi">Spesifikasi/Deskripsi</label>
            <textarea id="spesifikasi" v-model="formData.spesifikasi" class="form-textarea" rows="3" placeholder="Spesifikasi teknis atau deskripsi aset"></textarea>
          </div>

          <div class="form-group full-width">
            <label for="catatan">Catatan Tambahan</label>
            <textarea id="catatan" v-model="formData.catatan" class="form-textarea" rows="2" placeholder="Catatan atau informasi tambahan"></textarea>
          </div>

          <div class="form-group full-width">
            <label for="dokumen">Upload Dokumen (Faktur, BPKB, Manual, Foto)</label>
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
          <router-link to="/aset-inventori" class="btn-cancel">Batal</router-link>
          <button type="submit" class="btn-submit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Simpan Aset
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)

const formData = ref({
  kodeAset: '',
  kategori: '',
  namaAset: '',
  merk: '',
  model: '',
  tahunPembuatan: '',
  tanggalPerolehan: '',
  nilai: '',
  kondisi: '',
  status: '',
  lokasi: '',
  penanggungJawab: '',
  nomorSeri: '',
  nomorPlat: '',
  spesifikasi: '',
  catatan: ''
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
  alert('Aset berhasil ditambahkan!')
  router.push('/aset-inventori')
}
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

.form-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-header {
  padding: 24px;
  border-bottom: 1px solid #F3F4F6;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
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
