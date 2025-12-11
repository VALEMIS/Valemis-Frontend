<template>
  <div class="modern-page">
    <!-- Header with Back Button -->
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
          <h1>Detail Claim Litigasi</h1>
          <p>Informasi lengkap claim dan timeline penanganan</p>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Claim
        </button>
      </div>
    </div>

    <!-- Info Cards -->
    <div class="stats-grid">
      <div class="stat-card gradient-primary">
        <div class="stat-label">Claim ID</div>
        <div class="stat-value">{{ claimData.id }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Status</div>
        <div class="stat-value dark">
          <span :class="['badge', `badge-${getStatusColor(claimData.status)}`]">
            {{ claimData.status }}
          </span>
        </div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Jenis Claim</div>
        <div class="stat-value-small dark">{{ claimData.jenis }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Tanggal Pengajuan</div>
        <div class="stat-value-small dark">{{ claimData.tanggal }}</div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Claim Information -->
      <div class="info-card">
        <div class="card-header">
          <h3 class="card-title">Informasi Penggugat</h3>
        </div>
        <div class="card-body">
          <div class="info-grid">
            <div class="info-item">
              <label>Nama Lengkap</label>
              <div class="info-value">
                <div class="user-avatar">{{ claimData.penggugat.charAt(0) }}</div>
                <span>{{ claimData.penggugat }}</span>
              </div>
            </div>
            <div class="info-item">
              <label>NIK</label>
              <div class="info-value">{{ claimData.nik }}</div>
            </div>
            <div class="info-item">
              <label>Nomor Telepon</label>
              <div class="info-value">{{ claimData.telepon }}</div>
            </div>
            <div class="info-item">
              <label>Email</label>
              <div class="info-value">{{ claimData.email }}</div>
            </div>
          </div>

          <div class="description-section">
            <label>Deskripsi Claim</label>
            <p class="description-text">{{ claimData.deskripsi }}</p>
          </div>

          <div class="documents-section">
            <label>Dokumen Pendukung</label>
            <div class="document-list">
              <div v-for="doc in claimData.documents" :key="doc.id" class="document-item">
                <div class="document-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div class="document-info">
                  <span class="document-name">{{ doc.name }}</span>
                  <span class="document-size">{{ doc.size }}</span>
                </div>
                <button class="btn-download">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map Section -->
      <div class="map-card">
        <div class="card-header">
          <h3 class="card-title">Lokasi Sengketa</h3>
          <button class="btn-map">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Full Screen
          </button>
        </div>
        <div id="map" ref="mapContainer" class="map-container"></div>
        <div class="map-info">
          <div class="coordinate-info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>{{ claimData.coordinates }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline Section -->
    <div class="timeline-card">
      <div class="card-header">
        <h3 class="card-title">Timeline Penanganan</h3>
        <div class="timeline-filter">
          <button class="filter-btn active">Semua</button>
          <button class="filter-btn">Verifikasi</button>
          <button class="filter-btn">Investigasi</button>
        </div>
      </div>
      <div class="card-body">
        <div class="timeline">
          <div v-for="(event, index) in timeline" :key="index" class="timeline-item">
            <div class="timeline-marker" :class="event.type"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h4 class="timeline-title">{{ event.title }}</h4>
                <span class="timeline-date">{{ event.date }}</span>
              </div>
              <p class="timeline-description">{{ event.description }}</p>
              <div v-if="event.assignee" class="timeline-assignee">
                <div class="assignee-avatar">{{ event.assignee.charAt(0) }}</div>
                <span>{{ event.assignee }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement | null>(null)

const claimData = ref({
  id: 'CLM-001',
  penggugat: 'Ahmad Yani',
  nik: '3201012345670002',
  telepon: '081234567891',
  email: 'ahmad.yani@email.com',
  tanggal: '10 Januari 2024',
  status: 'Dalam Proses',
  jenis: 'Sengketa Batas Lahan',
  deskripsi: 'Terdapat sengketa batas lahan antara penggugat dengan pihak perusahaan. Penggugat mengklaim bahwa batas lahan yang ditetapkan tidak sesuai dengan dokumen kepemilikan yang dimiliki. Luas lahan yang disengketakan sekitar 2.5 hektar di wilayah Desa Sukamaju.',
  coordinates: '-6.2088, 106.8456',
  documents: [
    { id: 1, name: 'Surat Kepemilikan Lahan.pdf', size: '2.4 MB' },
    { id: 2, name: 'Peta Lahan.pdf', size: '1.8 MB' },
    { id: 3, name: 'Foto Lokasi.jpg', size: '3.2 MB' },
  ]
})

const timeline = ref([
  {
    title: 'Claim Diajukan',
    date: '10 Jan 2024, 09:30',
    description: 'Claim litigasi telah diajukan oleh Ahmad Yani. Dokumen pendukung telah dilampirkan.',
    assignee: 'Ahmad Yani',
    type: 'success'
  },
  {
    title: 'Verifikasi Dokumen',
    date: '12 Jan 2024, 14:00',
    description: 'Tim legal melakukan verifikasi terhadap dokumen yang dilampirkan. Semua dokumen lengkap dan valid.',
    assignee: 'Budi Santoso',
    type: 'info'
  },
  {
    title: 'Survei Lapangan',
    date: '15 Jan 2024, 10:00',
    description: 'Tim survei melakukan peninjauan lokasi sengketa. Pengukuran ulang batas lahan dilakukan.',
    assignee: 'Siti Nurhaliza',
    type: 'warning'
  },
  {
    title: 'Mediasi Dijadwalkan',
    date: '20 Jan 2024, 13:00',
    description: 'Pertemuan mediasi antara kedua belah pihak akan dilaksanakan pada 25 Januari 2024.',
    assignee: 'Budi Santoso',
    type: 'info'
  },
])

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Selesai': return 'success'
    case 'Dalam Proses': return 'warning'
    case 'Verifikasi': return 'info'
    case 'Ditolak': return 'danger'
    default: return 'secondary'
  }
}

onMounted(() => {
  if (mapContainer.value) {
    const map = L.map(mapContainer.value).setView([-6.2088, 106.8456], 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    // Add marker for dispute location
    L.marker([-6.2088, 106.8456]).addTo(map)
      .bindPopup('<b>Lokasi Sengketa</b><br>CLM-001')
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: #4F46E5;
  color: #4F46E5;
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

.stat-value-small {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
}

.badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}

.badge-success { background: #D1FAE5; color: #065F46; }
.badge-warning { background: #FEF3C7; color: #92400E; }
.badge-info { background: #DBEAFE; color: #1E40AF; }
.badge-danger { background: #FEE2E2; color: #991B1B; }

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.info-card, .map-card, .timeline-card {
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

.card-body {
  padding: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.info-item label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.info-value {
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.description-section {
  margin-bottom: 24px;
}

.description-section label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.description-text {
  font-size: 14px;
  line-height: 1.7;
  color: #374151;
  margin: 0;
}

.documents-section label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.document-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  transition: all 0.2s;
}

.document-item:hover {
  background: #F3F4F6;
  border-color: #4F46E5;
}

.document-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #EEF2FF;
  color: #4F46E5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.document-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.document-name {
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
}

.document-size {
  font-size: 12px;
  color: #9CA3AF;
}

.btn-download {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: #4F46E5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-download:hover {
  background: #4338CA;
  transform: translateY(-2px);
}

.btn-map {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-map:hover {
  background: #4F46E5;
  color: white;
  border-color: transparent;
}

.map-container {
  height: 400px;
  width: 100%;
}

.map-info {
  padding: 16px 24px;
  background: #F9FAFB;
  border-top: 1px solid #F3F4F6;
}

.coordinate-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6B7280;
  font-family: 'Courier New', monospace;
}

.timeline-card {
  grid-column: 1 / -1;
}

.timeline-filter {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 6px 12px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover, .filter-btn.active {
  background: #4F46E5;
  color: white;
  border-color: transparent;
}

.timeline {
  position: relative;
  padding-left: 40px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #E5E7EB;
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -28px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  border: 3px solid #E5E7EB;
}

.timeline-marker.success { border-color: #10B981; }
.timeline-marker.info { border-color: #3B82F6; }
.timeline-marker.warning { border-color: #F59E0B; }

.timeline-content {
  padding: 16px;
  background: #F9FAFB;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.timeline-title {
  font-size: 15px;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
}

.timeline-date {
  font-size: 12px;
  color: #9CA3AF;
}

.timeline-description {
  font-size: 14px;
  line-height: 1.6;
  color: #6B7280;
  margin: 0 0 12px 0;
}

.timeline-assignee {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
}

.assignee-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 11px;
}
</style>
