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
      <h2 class="page-title">Detail Stakeholder</h2>
      <button class="btn-edit">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        Edit
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card gradient-primary">
        <div class="stat-label">Stakeholder ID</div>
        <div class="stat-value">SH-001</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Interest Level</div>
        <div class="stat-value dark">5/5</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Influence Level</div>
        <div class="stat-value dark">5/5</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Category</div>
        <div class="stat-value dark">Primary</div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-grid">
      <!-- Stakeholder Information -->
      <div class="info-card">
        <div class="card-header">
          <h3 class="card-title">Informasi Stakeholder</h3>
          <div class="stakeholder-badge">
            <span class="badge badge-primary">Perusahaan</span>
            <span class="badge badge-success">Primary</span>
          </div>
        </div>
        <div class="card-body">
          <div class="stakeholder-profile">
            <div class="profile-avatar">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="profile-name">
              <h4>PT. Vale Indonesia</h4>
              <p>Primary Stakeholder</p>
            </div>
          </div>

          <div class="info-list">
            <div class="info-item">
              <div class="info-label">Kontak</div>
              <div class="info-value">0411-5221234</div>
            </div>
            <div class="info-item">
              <div class="info-label">Alamat</div>
              <div class="info-value">Sorowako, Sulawesi Selatan</div>
            </div>
            <div class="info-item">
              <div class="info-label">Interest Level</div>
              <div class="info-value">
                <div class="rating-stars">
                  <svg v-for="n in 5" :key="n" width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <span class="rating-label">5 - Very High</span>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Influence Level</div>
              <div class="info-value">
                <div class="rating-stars">
                  <svg v-for="n in 5" :key="n" width="16" height="16" viewBox="0 0 24 24" fill="#10B981" stroke="#10B981" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <span class="rating-label">5 - Very High</span>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">SRID</div>
              <div class="info-value mono">4326 (WGS84)</div>
            </div>
            <div class="info-item">
              <div class="info-label">Geometry</div>
              <div class="info-value mono">POINT(121.3509, -2.5289)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="map-card">
        <div class="card-header">
          <h3 class="card-title">Lokasi Stakeholder</h3>
        </div>
        <div class="map-container">
          <div id="stakeholderMap" class="stakeholder-map">
            <div class="map-placeholder">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p>Stakeholder Location Map</p>
              <span class="coordinates">121.3509, -2.5289</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Involvement History -->
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">Riwayat Keterlibatan</h3>
        <button class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Involvement
        </button>
      </div>

      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Role</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Impact Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Land Acquisition Phase 1</strong></td>
              <td>Primary Stakeholder</td>
              <td>2024-01-15</td>
              <td><span class="badge badge-success">Active</span></td>
              <td><span class="impact-badge high">High</span></td>
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
                </div>
              </td>
            </tr>
            <tr>
              <td><strong>Environmental Assessment</strong></td>
              <td>Consultant</td>
              <td>2024-02-20</td>
              <td><span class="badge badge-success">Active</span></td>
              <td><span class="impact-badge medium">Medium</span></td>
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
                </div>
              </td>
            </tr>
            <tr>
              <td><strong>Community Engagement 2023</strong></td>
              <td>Sponsor</td>
              <td>2023-06-10</td>
              <td><span class="badge badge-secondary">Completed</span></td>
              <td><span class="impact-badge low">Low</span></td>
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
  flex: 1;
}

.btn-edit {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #F59E0B;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit:hover {
  background: #D97706;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(245, 158, 11, 0.3);
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

.stakeholder-badge {
  display: flex;
  gap: 8px;
}

.card-body {
  padding: 24px;
}

.stakeholder-profile {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid #F3F4F6;
  margin-bottom: 24px;
}

.profile-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-name h4 {
  font-size: 20px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 4px 0;
}

.profile-name p {
  font-size: 14px;
  color: #9CA3AF;
  margin: 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-label {
  font-size: 13px;
  color: #6B7280;
}

.mono {
  font-family: 'Courier New', monospace;
  color: #6B7280;
}

.map-container {
  padding: 0;
}

.stakeholder-map {
  height: 452px;
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

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.badge-primary { background: #EEF2FF; color: #4F46E5; }
.badge-success { background: #D1FAE5; color: #065F46; }
.badge-secondary { background: #F3F4F6; color: #6B7280; }

.impact-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.impact-badge.high { background: #FEE2E2; color: #991B1B; }
.impact-badge.medium { background: #FEF3C7; color: #92400E; }
.impact-badge.low { background: #DBEAFE; color: #1E40AF; }

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
