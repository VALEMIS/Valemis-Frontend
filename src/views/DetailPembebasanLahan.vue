<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Detail Pembebasan Lahan</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/pembebasan-lahan">Pembebasan Lahan</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title">Informasi Lahan</h5>
            <div class="card-tools">
              <router-link to="/pembebasan-lahan" class="btn btn-sm btn-secondary">
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
                      <th width="40%">Parcel ID</th>
                      <td>PRC-001</td>
                    </tr>
                    <tr>
                      <th>Luas Lahan</th>
                      <td>500 m²</td>
                    </tr>
                    <tr>
                      <th>Nama Kepala Keluarga</th>
                      <td>Budi Santoso</td>
                    </tr>
                    <tr>
                      <th>Alamat</th>
                      <td>Jl. Merdeka No. 123</td>
                    </tr>
                    <tr>
                      <th>Desa</th>
                      <td>Desa Makmur</td>
                    </tr>
                    <tr>
                      <th>Kecamatan</th>
                      <td>Kec. Sejahtera</td>
                    </tr>
                    <tr>
                      <th>Kabupaten</th>
                      <td>Kab. Contoh</td>
                    </tr>
                    <tr>
                      <th>Status Pembebasan</th>
                      <td><span class="badge bg-warning">Dalam Proses</span></td>
                    </tr>
                    <tr>
                      <th>Tanggal Pembebasan</th>
                      <td>15 Januari 2024</td>
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
                <h6>Catatan:</h6>
                <p>Proses pembebasan lahan sedang dalam tahap negosiasi dengan pemilik lahan.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Daftar Pemilik Lahan</h5>
            <div class="card-tools">
              <router-link to="/pembebasan-lahan/tambah-pemilik" class="btn btn-sm btn-primary">
                <i class="bi bi-plus-circle"></i> Tambah Pemilik
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <table id="pemilikTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Pemilik</th>
                  <th>NIK</th>
                  <th>Nomor Telepon</th>
                  <th>Status Kepemilikan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Budi Santoso</td>
                  <td>3201012345670001</td>
                  <td>081234567890</td>
                  <td>Kepala Keluarga</td>
                  <td>
                    <button class="btn btn-sm btn-info">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
  // Initialize DataTable
  if ((window as any).$) {
    (window as any).$('#pemilikTable').DataTable({
      language: {
        search: "Cari:",
        lengthMenu: "Tampilkan _MENU_ data per halaman",
        info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
        infoEmpty: "Menampilkan 0 sampai 0 dari 0 data",
        infoFiltered: "(difilter dari _MAX_ total data)",
        paginate: {
          first: "Pertama",
          last: "Terakhir",
          next: "Selanjutnya",
          previous: "Sebelumnya"
        },
        zeroRecords: "Tidak ada data yang cocok",
        emptyTable: "Tidak ada data tersedia"
      }
    })
  }

  // Initialize map
  const map = L.map('map').setView([-2.5489, 118.0149], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Add polygon for parcel
  const parcelCoords: L.LatLngExpression[] = [
    [-2.5489, 118.0149],
    [-2.5490, 118.0160],
    [-2.5480, 118.0165],
    [-2.5475, 118.0155]
  ]
  
  L.polygon(parcelCoords, { color: 'blue', fillColor: '#3388ff', fillOpacity: 0.5 }).addTo(map)
})
</script>

<style scoped>
</style>
