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
      <h2 class="page-title">Tambah Pemilik Lahan</h2>
    </div>

    <!-- Form Section -->
    <div class="form-card">
      <div class="card-header">
        <h3 class="card-title">Form Data Pemilik Lahan</h3>
        <span class="required-note">* Required fields</span>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit" class="modern-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="namaDepan">Nama Depan *</label>
              <input type="text" id="namaDepan" placeholder="Nama depan" required />
            </div>

            <div class="form-group">
              <label for="namaTengah">Nama Tengah</label>
              <input type="text" id="namaTengah" placeholder="Nama tengah (opsional)" />
            </div>

            <div class="form-group">
              <label for="namaBelakang">Nama Belakang *</label>
              <input type="text" id="namaBelakang" placeholder="Nama belakang" required />
            </div>

            <div class="form-group">
              <label for="nik">NIK *</label>
              <input type="text" id="nik" maxlength="16" placeholder="16 digit NIK" required />
            </div>

            <div class="form-group">
              <label for="nomorTelepon">Nomor Telepon</label>
              <input type="tel" id="nomorTelepon" placeholder="0812xxxxxxxx" />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="email@example.com" />
            </div>

            <div class="form-group full-width">
              <label for="alamat">Alamat *</label>
              <textarea id="alamat" rows="2" placeholder="Alamat lengkap" required></textarea>
            </div>

            <div class="form-group">
              <label for="desa">Desa *</label>
              <input type="text" id="desa" placeholder="Nama desa" required />
            </div>

            <div class="form-group">
              <label for="kecamatan">Kecamatan *</label>
              <input type="text" id="kecamatan" placeholder="Nama kecamatan" required />
            </div>

            <div class="form-group">
              <label for="kabupaten">Kabupaten *</label>
              <input type="text" id="kabupaten" placeholder="Nama kabupaten" required />
            </div>

            <div class="form-group">
              <label for="statusKepemilikan">Status Kepemilikan *</label>
              <select id="statusKepemilikan" required>
                <option value="">Pilih status</option>
                <option>Kepala Keluarga</option>
                <option>Pasangan</option>
                <option>Anak</option>
                <option>Ahli Waris</option>
                <option>Lainnya</option>
              </select>
            </div>

            <div class="form-group">
              <label for="hubunganKeluarga">Hubungan Keluarga</label>
              <input type="text" id="hubunganKeluarga" placeholder="Contoh: Istri, Anak, dll" />
            </div>
          </div>

          <!-- Additional Info -->
          <div class="additional-section">
            <h4 class="section-title">Informasi Tambahan</h4>
            <div class="form-grid">
              <div class="form-group">
                <label for="jenisKelamin">Jenis Kelamin</label>
                <select id="jenisKelamin">
                  <option value="">Pilih jenis kelamin</option>
                  <option>Laki-laki</option>
                  <option>Perempuan</option>
                </select>
              </div>

              <div class="form-group">
                <label for="tanggalLahir">Tanggal Lahir</label>
                <input type="date" id="tanggalLahir" />
              </div>

              <div class="form-group">
                <label for="pekerjaan">Pekerjaan</label>
                <input type="text" id="pekerjaan" placeholder="Pekerjaan saat ini" />
              </div>

              <div class="form-group">
                <label for="pendidikan">Pendidikan Terakhir</label>
                <select id="pendidikan">
                  <option value="">Pilih pendidikan</option>
                  <option>SD</option>
                  <option>SMP</option>
                  <option>SMA</option>
                  <option>D3</option>
                  <option>S1</option>
                  <option>S2</option>
                  <option>S3</option>
                </select>
              </div>

              <div class="form-group full-width">
                <label for="catatan">Catatan</label>
                <textarea id="catatan" rows="3" placeholder="Tambahkan catatan atau informasi tambahan..."></textarea>
              </div>
            </div>
          </div>

          <!-- File Upload -->
          <div class="upload-section">
            <div class="upload-header">
              <h4 class="upload-title">Dokumen Identitas</h4>
              <span class="upload-hint">KTP, KK, atau dokumen pendukung lainnya</span>
            </div>
            <div class="upload-area">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p class="upload-text">Drag & drop files here or click to browse</p>
              <p class="upload-subtext">PDF, JPG, PNG up to 5MB</p>
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
const handleSubmit = () => {
  console.log('Form submitted')
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

.required-note {
  font-size: 12px;
  color: #9CA3AF;
  font-style: italic;
}

.card-body {
  padding: 24px;
}

.modern-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  min-height: 60px;
}

.additional-section {
  padding-top: 24px;
  border-top: 1px solid #F3F4F6;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 20px 0;
}

.upload-section {
  padding-top: 24px;
  border-top: 1px solid #F3F4F6;
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
