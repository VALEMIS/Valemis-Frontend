<template>
  <div class="modern-page">
    <!-- Header -->
    <div class="page-header">
      <router-link to="/stake-holder" class="btn-back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </router-link>
      <h2 class="page-title">Tambah Stakeholder</h2>
    </div>

    <!-- Form Section -->
    <div class="form-card">
      <div class="card-header">
        <h3 class="card-title">Informasi Dasar Stakeholder</h3>
        <span class="required-note">* Required fields</span>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit" class="modern-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="sh_id">SH_ID *</label>
              <input type="text" id="sh_id" placeholder="SH-XXX" required />
              <span class="field-hint">ID unik stakeholder (auto-generated jika kosong)</span>
            </div>

            <div class="form-group">
              <label for="nama">Nama Stakeholder *</label>
              <input type="text" id="nama" placeholder="Nama lengkap stakeholder" required />
            </div>

            <div class="form-group">
              <label for="tipe">Tipe *</label>
              <select id="tipe" required>
                <option value="">Pilih tipe</option>
                <option>Perusahaan</option>
                <option>Pemerintah</option>
                <option>Masyarakat</option>
                <option>NGO</option>
                <option>Media</option>
                <option>Akademisi</option>
                <option>Individu</option>
              </select>
            </div>

            <div class="form-group">
              <label for="kategori">Kategori *</label>
              <select id="kategori" required>
                <option value="">Pilih kategori</option>
                <option>Primary</option>
                <option>Secondary</option>
                <option>Tertiary</option>
              </select>
            </div>

            <div class="form-group">
              <label for="kontak">Kontak</label>
              <input type="text" id="kontak" placeholder="Phone atau Email" />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="email@example.com" />
            </div>

            <div class="form-group full-width">
              <label for="alamat">Alamat</label>
              <textarea id="alamat" rows="2" placeholder="Alamat lengkap"></textarea>
            </div>

            <div class="form-group">
              <label for="interest">Interest Level (1-5) *</label>
              <select id="interest" required>
                <option value="">Pilih level</option>
                <option value="1">1 - Very Low</option>
                <option value="2">2 - Low</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - High</option>
                <option value="5">5 - Very High</option>
              </select>
            </div>

            <div class="form-group">
              <label for="influence">Influence Level (1-5) *</label>
              <select id="influence" required>
                <option value="">Pilih level</option>
                <option value="1">1 - Very Low</option>
                <option value="2">2 - Low</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - High</option>
                <option value="5">5 - Very High</option>
              </select>
            </div>
          </div>

          <!-- Location Section -->
          <div class="location-section">
            <h4 class="section-title">Lokasi Geografis</h4>
            <div class="form-grid">
              <div class="form-group">
                <label for="latitude">Latitude</label>
                <input type="number" id="latitude" placeholder="-2.5289" step="0.0001" />
              </div>

              <div class="form-group">
                <label for="longitude">Longitude</label>
                <input type="number" id="longitude" placeholder="121.3509" step="0.0001" />
              </div>

              <div class="form-group">
                <label for="srid">SRID</label>
                <input type="text" id="srid" placeholder="4326 (WGS84)" value="4326" />
              </div>

              <div class="form-group">
                <label for="geometryType">Geometry Type</label>
                <select id="geometryType">
                  <option value="POINT">POINT</option>
                  <option value="LINESTRING">LINESTRING</option>
                  <option value="POLYGON">POLYGON</option>
                  <option value="MULTIPOINT">MULTIPOINT</option>
                </select>
              </div>
            </div>

            <!-- Map Preview -->
            <div class="map-preview">
              <div class="map-preview-header">
                <span>Preview Lokasi</span>
                <button type="button" class="btn-map">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Pick on Map
                </button>
              </div>
              <div class="map-container">
                <div id="locationMap" class="location-map">
                  <div class="map-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                    </svg>
                    <p>Click "Pick on Map" to select location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Details -->
          <div class="additional-section">
            <h4 class="section-title">Informasi Tambahan</h4>
            <div class="form-grid">
              <div class="form-group">
                <label for="sector">Sektor</label>
                <select id="sector">
                  <option value="">Pilih sektor</option>
                  <option>Pertambangan</option>
                  <option>Energi</option>
                  <option>Pemerintahan</option>
                  <option>Pendidikan</option>
                  <option>Kesehatan</option>
                  <option>Lingkungan</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div class="form-group">
                <label for="engagement_status">Engagement Status</label>
                <select id="engagement_status">
                  <option value="">Pilih status</option>
                  <option>Active</option>
                  <option>Passive</option>
                  <option>Neutral</option>
                  <option>Opposition</option>
                </select>
              </div>

              <div class="form-group full-width">
                <label for="notes">Catatan</label>
                <textarea id="notes" rows="3" placeholder="Tambahkan catatan atau informasi tambahan..."></textarea>
              </div>
            </div>
          </div>

          <!-- File Upload -->
          <div class="upload-section">
            <div class="upload-header">
              <h4 class="upload-title">Dokumen Pendukung</h4>
              <span class="upload-hint">MOU, Kontrak, atau dokumen lainnya</span>
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
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <router-link to="/stake-holder" class="btn-cancel">
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
              Simpan Stakeholder
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

.field-hint {
  font-size: 12px;
  color: #9CA3AF;
  font-style: italic;
}

.location-section, .additional-section {
  padding-top: 24px;
  border-top: 1px solid #F3F4F6;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 20px 0;
}

.map-preview {
  margin-top: 20px;
}

.map-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.map-preview-header span {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.btn-map {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  color: #4F46E5;
  border: 1px solid #4F46E5;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-map:hover {
  background: #4F46E5;
  color: white;
}

.map-container {
  padding: 0;
}

.location-map {
  height: 300px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
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
  font-size: 13px;
  margin: 0;
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
