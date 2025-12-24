<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Detail Claim Litigasi</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/litigasi">Litigasi</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Claim</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title">Informasi Claim</h5>
            <div class="card-tools">
              <router-link to="/litigasi" class="btn btn-sm btn-secondary">
                <i class="bi bi-arrow-left"></i> Kembali
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th width="40%">Claim ID</th>
                      <td>CLM-001</td>
                    </tr>
                    <tr>
                      <th>Nama Penggugat</th>
                      <td>Ahmad Yani</td>
                    </tr>
                    <tr>
                      <th>NIK</th>
                      <td>3201012345670002</td>
                    </tr>
                    <tr>
                      <th>Nomor Telepon</th>
                      <td>081234567891</td>
                    </tr>
                    <tr>
                      <th>Tanggal Pengajuan</th>
                      <td>10 Januari 2024</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td><span class="badge bg-warning">Dalam Proses</span></td>
                    </tr>
                    <tr>
                      <th>Jenis Claim</th>
                      <td>Sengketa Batas Lahan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <div id="map" style="height: 400px;"></div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12">
                <h6>Deskripsi Claim:</h6>
                <p>Terdapat sengketa batas lahan antara penggugat dengan pihak perusahaan. Penggugat mengklaim bahwa batas lahan yang ditetapkan tidak sesuai dengan dokumen kepemilikan yang dimiliki.</p>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12">
                <h6>Dokumen Pendukung:</h6>
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span><i class="bi bi-file-pdf text-danger"></i> Surat Kepemilikan Lahan.pdf</span>
                    <button class="btn btn-sm btn-primary">Download</button>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span><i class="bi bi-file-pdf text-danger"></i> Peta Lahan.pdf</span>
                    <button class="btn btn-sm btn-primary">Download</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Timeline Penanganan</h5>
          </div>
          <div class="card-body">
            <ul class="timeline">
              <li>
                <i class="bi bi-calendar-check bg-primary"></i>
                <div class="timeline-item">
                  <span class="time"><i class="bi bi-clock"></i> 10 Jan 2024</span>
                  <h3 class="timeline-header">Claim diajukan</h3>
                  <div class="timeline-body">
                    Penggugat mengajukan claim sengketa batas lahan
                  </div>
                </div>
              </li>
              <li>
                <i class="bi bi-file-text bg-info"></i>
                <div class="timeline-item">
                  <span class="time"><i class="bi bi-clock"></i> 15 Jan 2024</span>
                  <h3 class="timeline-header">Verifikasi dokumen</h3>
                  <div class="timeline-body">
                    Tim verifikasi memeriksa kelengkapan dokumen
                  </div>
                </div>
              </li>
              <li>
                <i class="bi bi-people bg-warning"></i>
                <div class="timeline-item">
                  <span class="time"><i class="bi bi-clock"></i> 20 Jan 2024</span>
                  <h3 class="timeline-header">Mediasi</h3>
                  <div class="timeline-body">
                    Proses mediasi antara penggugat dan pihak perusahaan
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'

onMounted(() => {
  const map = L.map('map').setView([-2.5489, 118.0149], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Add polygon for disputed land
  const disputedCoords: L.LatLngExpression[] = [
    [-2.5489, 118.0149],
    [-2.5490, 118.0160],
    [-2.5480, 118.0165],
    [-2.5475, 118.0155]
  ]
  
  L.polygon(disputedCoords, { color: 'red', fillColor: '#ff0000', fillOpacity: 0.3 }).addTo(map)
})
</script>

<style scoped>
.timeline {
  list-style: none;
  padding: 20px 0;
  position: relative;
}

.timeline:before {
  top: 0;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 3px;
  background-color: #dee2e6;
  left: 31px;
  margin-right: -1.5px;
}

.timeline > li {
  margin-bottom: 15px;
  position: relative;
}

.timeline > li:before,
.timeline > li:after {
  content: " ";
  display: table;
}

.timeline > li > .timeline-item {
  margin-left: 60px;
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  padding: 10px;
}

.timeline > li > i {
  position: absolute;
  left: 18px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  color: #fff;
}

.timeline-header {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px;
}

.time {
  color: #999;
  font-size: 12px;
}
</style>
