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
      <h2 class="page-title">Detail Pembebasan Lahan</h2>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card gradient-primary">
        <div class="stat-label">Parcel ID</div>
        <div class="stat-value">PRC-001</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Luas Lahan</div>
        <div class="stat-value dark">500 m²</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Status</div>
        <div class="stat-value dark">Dalam Proses</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Total Pemilik</div>
        <div class="stat-value dark">3</div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-grid">
      <!-- Land Information -->
      <div class="info-card">
        <div class="card-header">
          <h3 class="card-title">Informasi Lahan</h3>
          <div class="status-badge warning">Dalam Proses</div>
        </div>
        <div class="card-body">
          <div class="info-list">
            <div class="info-item">
              <div class="info-label">Nama Kepala Keluarga</div>
              <div class="info-value">Budi Santoso</div>
            </div>
            <div class="info-item">
              <div class="info-label">Alamat</div>
              <div class="info-value">Jl. Merdeka No. 123</div>
            </div>
            <div class="info-item">
              <div class="info-label">Desa</div>
              <div class="info-value">Desa Makmur</div>
            </div>
            <div class="info-item">
              <div class="info-label">Kecamatan</div>
              <div class="info-value">Kec. Sejahtera</div>
            </div>
            <div class="info-item">
              <div class="info-label">Kabupaten</div>
              <div class="info-value">Kab. Contoh</div>
            </div>
            <div class="info-item">
              <div class="info-label">Tanggal Pembebasan</div>
              <div class="info-value">15 Januari 2024</div>
            </div>
          </div>
          
          <div class="notes-section">
            <div class="notes-header">Catatan:</div>
            <p class="notes-text">Proses pembebasan lahan sedang dalam tahap negosiasi dengan pemilik lahan. Koordinasi dengan pihak desa telah dilakukan untuk mempercepat proses administrasi.</p>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="map-card">
        <div class="card-header">
          <h3 class="card-title">Lokasi Lahan</h3>
        </div>
        <div class="map-container">
          <div id="landMap" class="land-map">
            <div class="map-placeholder">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p>Leaflet Map - Land Location</p>
              <span class="coordinates">-1.2345, 116.8765</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Land Owners Table -->
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">Daftar Pemilik Lahan</h3>
        <router-link to="/pembebasan-lahan/tambah-pemilik" class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Tambah Pemilik
        </router-link>
      </div>

      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>NIK</th>
              <th>Telepon</th>
              <th>Status Kepemilikan</th>
              <th>Hubungan</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="owner-info">
                  <div class="owner-avatar">B</div>
                  <span>Budi Santoso</span>
                </div>
              </td>
              <td class="mono">3201234567890123</td>
              <td>081234567890</td>
              <td><span class="badge badge-primary">Kepala Keluarga</span></td>
              <td>-</td>
              <td>
                <div class="action-buttons">
                  <button class="btn-icon" title="View">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="owner-info">
                  <div class="owner-avatar">S</div>
                  <span>Siti Aminah</span>
                </div>
              </td>
              <td class="mono">3201234567890456</td>
              <td>081234567891</td>
              <td><span class="badge badge-info">Pasangan</span></td>
              <td>Istri</td>
              <td>
                <div class="action-buttons">
                  <button class="btn-icon" title="View">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="owner-info">
                  <div class="owner-avatar">A</div>
                  <span>Ahmad Yani</span>
                </div>
              </td>
              <td class="mono">3201234567890789</td>
              <td>081234567892</td>
              <td><span class="badge badge-secondary">Ahli Waris</span></td>
              <td>Anak</td>
              <td>
                <div class="action-buttons">
                  <button class="btn-icon" title="View">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.stat-card.gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-card.gradient-primary .stat-label {
  color: rgba(255, 255, 255, 0.95);
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
}

.stat-value.dark {
  color: #1E293B;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.info-card, .map-card, .table-card {
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

.status-badge {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}

.status-badge.warning {
  background: #FEF3C7;
  color: #92400E;
}

.card-body {
  padding: 24px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 15px;
  font-weight: 600;
  color: #1E293B;
}

.notes-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #F3F4F6;
}

.notes-header {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 8px;
}

.notes-text {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
}

.map-container {
  padding: 0;
}

.land-map {
  height: 400px;
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
  margin: 0 0 4px 0;
}

.coordinates {
  font-size: 12px;
  font-family: 'Courier New', monospace;
  color: #6B7280;
}

.table-header {
  padding: 24px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-title {
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.table-container {
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table thead {
  background: #F9FAFB;
}

.modern-table th {
  padding: 16px 20px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #E5E7EB;
}

.modern-table tbody tr {
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
}

.modern-table tbody tr:hover {
  background: #F9FAFB;
}

.modern-table td {
  padding: 16px 20px;
  font-size: 14px;
  color: #374151;
}

.owner-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.owner-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
}

.mono {
  font-family: 'Courier New', monospace;
  color: #6B7280;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.badge-primary { background: #EEF2FF; color: #4F46E5; }
.badge-info { background: #DBEAFE; color: #1E40AF; }
.badge-secondary { background: #F3F4F6; color: #6B7280; }

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #F3F4F6;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #4F46E5;
  color: white;
  transform: translateY(-2px);
}
</style>
