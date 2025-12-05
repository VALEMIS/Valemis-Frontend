<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Land Compliance - Kepatuhan Lahan</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Land Compliance</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- Summary Cards -->
        <div class="row mb-4">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
              <div class="inner">
                <h3>187</h3>
                <p>Lahan Compliant</p>
              </div>
              <div class="icon">
                <i class="bi bi-check-circle"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>45</h3>
                <p>Perlu Review</p>
              </div>
              <div class="icon">
                <i class="bi bi-exclamation-triangle"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>12</h3>
                <p>Non-Compliant</p>
              </div>
              <div class="icon">
                <i class="bi bi-x-circle"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3>98%</h3>
                <p>Compliance Rate</p>
              </div>
              <div class="icon">
                <i class="bi bi-graph-up"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'kesesuaian' }"
                  @click="activeTab = 'kesesuaian'"
                  href="#"
                >
                  <i class="bi bi-file-check"></i> Kesesuaian Dokumen
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'regulasi' }"
                  @click="activeTab = 'regulasi'"
                  href="#"
                >
                  <i class="bi bi-book"></i> Validasi Regulasi
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'izin' }"
                  @click="activeTab = 'izin'"
                  href="#"
                >
                  <i class="bi bi-award"></i> Status Izin
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'tracking' }"
                  @click="activeTab = 'tracking'"
                  href="#"
                >
                  <i class="bi bi-clock-history"></i> Compliance Tracking
                </a>
              </li>
            </ul>
          </div>

          <div class="card-body">
            <!-- Kesesuaian Dokumen Tab -->
            <div v-show="activeTab === 'kesesuaian'">
              <div class="d-flex justify-content-between mb-3">
                <h5>Kesesuaian Lahan Berdasarkan Dokumen</h5>
                <button class="btn btn-primary">
                  <i class="bi bi-plus-circle"></i> Tambah Validasi
                </button>
              </div>

              <div class="mb-3">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Cari berdasarkan kode lahan, lokasi, atau status...">
                  <button class="btn btn-outline-secondary">
                    <i class="bi bi-search"></i>
                  </button>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode Lahan</th>
                      <th>Lokasi</th>
                      <th>Luas (Ha)</th>
                      <th>Dokumen</th>
                      <th>Status Kesesuaian</th>
                      <th>Catatan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in kesesuaianDokumen" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td><strong>{{ item.kodeLahan }}</strong></td>
                      <td>{{ item.lokasi }}</td>
                      <td>{{ item.luas }}</td>
                      <td>
                        <span class="badge bg-secondary">{{ item.totalDokumen }} dok</span>
                      </td>
                      <td>
                        <span class="badge" :class="getComplianceClass(item.statusKesesuaian)">
                          {{ item.statusKesesuaian }}
                        </span>
                      </td>
                      <td>
                        <small class="text-muted">{{ item.catatan }}</small>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-info me-1" @click="viewDetail(item.id)">
                          <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-warning">
                          <i class="bi bi-pencil"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Validasi Regulasi Tab -->
            <div v-show="activeTab === 'regulasi'">
              <div class="d-flex justify-content-between mb-3">
                <h5>Validasi Terhadap Regulasi</h5>
                <button class="btn btn-primary">
                  <i class="bi bi-file-earmark-plus"></i> Tambah Regulasi
                </button>
              </div>

              <div class="row">
                <div class="col-md-8">
                  <div class="accordion" id="accordionRegulasi">
                    <div class="accordion-item" v-for="regulasi in dataRegulasi" :key="regulasi.id">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="'#collapse' + regulasi.id"
                        >
                          <strong>{{ regulasi.namaRegulasi }}</strong>
                          <span class="badge bg-info ms-2">{{ regulasi.jumlahLahan }} lahan</span>
                        </button>
                      </h2>
                      <div :id="'collapse' + regulasi.id" class="accordion-collapse collapse">
                        <div class="accordion-body">
                          <p class="mb-2"><strong>Nomor Regulasi:</strong> {{ regulasi.nomorRegulasi }}</p>
                          <p class="mb-2"><strong>Tahun:</strong> {{ regulasi.tahun }}</p>
                          <p class="mb-2"><strong>Deskripsi:</strong> {{ regulasi.deskripsi }}</p>
                          <hr>
                          <h6>Lahan yang Tervalidasi:</h6>
                          <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between" v-for="lahan in regulasi.lahanTerkait" :key="lahan.kode">
                              <span>{{ lahan.kode }} - {{ lahan.lokasi }}</span>
                              <span class="badge" :class="getComplianceClass(lahan.status)">
                                {{ lahan.status }}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="card bg-light">
                    <div class="card-body">
                      <h6>Ringkasan Regulasi</h6>
                      <hr>
                      <div class="mb-3">
                        <p class="mb-1"><strong>Total Regulasi Aktif</strong></p>
                        <h3 class="text-primary">{{ dataRegulasi.length }}</h3>
                      </div>
                      <div class="mb-3">
                        <p class="mb-1"><strong>Compliance Rate</strong></p>
                        <div class="progress mb-1">
                          <div class="progress-bar bg-success" style="width: 85%">85%</div>
                        </div>
                        <small class="text-muted">187 dari 220 lahan compliant</small>
                      </div>
                      <button class="btn btn-sm btn-primary w-100">
                        <i class="bi bi-file-earmark-pdf"></i> Export Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Status Izin Tab -->
            <div v-show="activeTab === 'izin'">
              <div class="d-flex justify-content-between mb-3">
                <h5>Status Perizinan Lahan</h5>
                <button class="btn btn-primary">
                  <i class="bi bi-plus-circle"></i> Tambah Izin
                </button>
              </div>

              <div class="row">
                <div class="col-md-4" v-for="izin in statusIzin" :key="izin.id">
                  <div class="card mb-3">
                    <div class="card-header" :class="getIzinHeaderClass(izin.status)">
                      <strong>{{ izin.jenisIzin }}</strong>
                    </div>
                    <div class="card-body">
                      <p class="mb-1"><strong>Nomor:</strong> {{ izin.nomorIzin }}</p>
                      <p class="mb-1"><strong>Instansi:</strong> {{ izin.instansiPenerbit }}</p>
                      <p class="mb-1"><strong>Tanggal Terbit:</strong> {{ izin.tanggalTerbit }}</p>
                      <p class="mb-1"><strong>Masa Berlaku:</strong> {{ izin.masaBerlaku }}</p>
                      <p class="mb-2">
                        <strong>Status:</strong>
                        <span class="badge" :class="getIzinStatusClass(izin.status)">
                          {{ izin.status }}
                        </span>
                      </p>
                      <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-info flex-fill">
                          <i class="bi bi-eye"></i> Detail
                        </button>
                        <button class="btn btn-sm btn-success flex-fill">
                          <i class="bi bi-download"></i> Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Compliance Tracking Tab -->
            <div v-show="activeTab === 'tracking'">
              <h5 class="mb-3">Compliance Tracking Timeline</h5>

              <div class="row">
                <div class="col-md-8">
                  <div class="card">
                    <div class="card-body">
                      <div class="timeline">
                        <div class="timeline-item" v-for="track in trackingData" :key="track.id">
                          <span class="time">
                            <i class="bi bi-clock"></i> {{ track.tanggal }}
                          </span>
                          <h3 class="timeline-header">
                            <span class="badge" :class="getComplianceClass(track.status)">
                              {{ track.status }}
                            </span>
                            {{ track.judul }}
                          </h3>
                          <div class="timeline-body">
                            <p>{{ track.deskripsi }}</p>
                            <small class="text-muted">Oleh: {{ track.petugas }}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="card">
                    <div class="card-header bg-light">
                      <h6 class="mb-0">Filter Tracking</h6>
                    </div>
                    <div class="card-body">
                      <div class="mb-3">
                        <label class="form-label">Periode</label>
                        <select class="form-select form-select-sm">
                          <option>7 Hari Terakhir</option>
                          <option>30 Hari Terakhir</option>
                          <option>3 Bulan Terakhir</option>
                          <option>Semua</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Status</label>
                        <select class="form-select form-select-sm">
                          <option>Semua Status</option>
                          <option>Compliant</option>
                          <option>Review</option>
                          <option>Non-Compliant</option>
                        </select>
                      </div>
                      <button class="btn btn-primary btn-sm w-100">
                        <i class="bi bi-funnel"></i> Apply Filter
                      </button>
                    </div>
                  </div>

                  <div class="card mt-3">
                    <div class="card-header bg-light">
                      <h6 class="mb-0">Quick Stats</h6>
                    </div>
                    <div class="card-body">
                      <div class="d-flex justify-content-between mb-2">
                        <span>Total Aktivitas</span>
                        <strong>{{ trackingData.length }}</strong>
                      </div>
                      <div class="d-flex justify-content-between mb-2">
                        <span>Bulan Ini</span>
                        <strong>15</strong>
                      </div>
                      <div class="d-flex justify-content-between">
                        <span>Minggu Ini</span>
                        <strong>5</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('kesesuaian')

const kesesuaianDokumen = ref([
  {
    id: 1,
    kodeLahan: 'LND-001',
    lokasi: 'Desa Sorowako',
    luas: 2.5,
    totalDokumen: 5,
    statusKesesuaian: 'Compliant',
    catatan: 'Semua dokumen lengkap dan sesuai'
  },
  {
    id: 2,
    kodeLahan: 'LND-002',
    lokasi: 'Desa Matano',
    luas: 3.8,
    totalDokumen: 4,
    statusKesesuaian: 'Review',
    catatan: 'Perlu update sertifikat tanah'
  },
  {
    id: 3,
    kodeLahan: 'LND-003',
    lokasi: 'Desa Wotu',
    luas: 1.2,
    totalDokumen: 3,
    statusKesesuaian: 'Non-Compliant',
    catatan: 'Dokumen IMB belum lengkap'
  }
])

const dataRegulasi = ref([
  {
    id: 1,
    namaRegulasi: 'UU No. 5 Tahun 1960 tentang Peraturan Dasar Pokok-Pokok Agraria',
    nomorRegulasi: 'UU No. 5/1960',
    tahun: 1960,
    deskripsi: 'Mengatur tentang hak-hak atas tanah dan penggunaannya',
    jumlahLahan: 150,
    lahanTerkait: [
      { kode: 'LND-001', lokasi: 'Sorowako', status: 'Compliant' },
      { kode: 'LND-002', lokasi: 'Matano', status: 'Review' }
    ]
  },
  {
    id: 2,
    namaRegulasi: 'Peraturan Menteri ESDM No. 7 Tahun 2020',
    nomorRegulasi: 'Permen ESDM No. 7/2020',
    tahun: 2020,
    deskripsi: 'Mengatur tentang tata cara perizinan pertambangan',
    jumlahLahan: 87,
    lahanTerkait: [
      { kode: 'LND-001', lokasi: 'Sorowako', status: 'Compliant' },
      { kode: 'LND-003', lokasi: 'Wotu', status: 'Compliant' }
    ]
  }
])

const statusIzin = ref([
  {
    id: 1,
    jenisIzin: 'Izin Usaha Pertambangan (IUP)',
    nomorIzin: '540/IUP/2023',
    instansiPenerbit: 'Kementerian ESDM',
    tanggalTerbit: '15 Jan 2023',
    masaBerlaku: '15 Jan 2033',
    status: 'Aktif'
  },
  {
    id: 2,
    jenisIzin: 'Izin Lingkungan',
    nomorIzin: '123/IL/2023',
    instansiPenerbit: 'KLHK',
    tanggalTerbit: '20 Feb 2023',
    masaBerlaku: '20 Feb 2028',
    status: 'Aktif'
  },
  {
    id: 3,
    jenisIzin: 'Izin Pinjam Pakai Kawasan Hutan',
    nomorIzin: '789/IPPKH/2024',
    instansiPenerbit: 'Kementerian LHK',
    tanggalTerbit: '10 Mar 2024',
    masaBerlaku: '10 Mar 2029',
    status: 'Proses'
  }
])

const trackingData = ref([
  {
    id: 1,
    tanggal: '2024-12-05',
    judul: 'Validasi Dokumen LND-001',
    deskripsi: 'Validasi compliance dokumen lahan LND-001 berhasil dilakukan',
    status: 'Compliant',
    petugas: 'Ahmad Sulaiman'
  },
  {
    id: 2,
    tanggal: '2024-12-03',
    judul: 'Review Dokumen LND-002',
    deskripsi: 'Dokumen LND-002 perlu dilengkapi untuk compliance',
    status: 'Review',
    petugas: 'Siti Nurhaliza'
  },
  {
    id: 3,
    tanggal: '2024-12-01',
    judul: 'Non-Compliance LND-003',
    deskripsi: 'Lahan LND-003 tidak memenuhi requirement regulasi',
    status: 'Non-Compliant',
    petugas: 'Budi Santoso'
  }
])

const getComplianceClass = (status: string) => {
  const statusMap: Record<string, string> = {
    'Compliant': 'bg-success',
    'Review': 'bg-warning',
    'Non-Compliant': 'bg-danger'
  }
  return statusMap[status] || 'bg-secondary'
}

const getIzinHeaderClass = (status: string) => {
  const statusMap: Record<string, string> = {
    'Aktif': 'bg-success text-white',
    'Proses': 'bg-warning',
    'Expired': 'bg-danger text-white'
  }
  return statusMap[status] || 'bg-secondary text-white'
}

const getIzinStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    'Aktif': 'bg-success',
    'Proses': 'bg-warning',
    'Expired': 'bg-danger'
  }
  return statusMap[status] || 'bg-secondary'
}

const viewDetail = (id: number) => {
  console.log('View detail:', id)
}
</script>

<style scoped>
.timeline {
  position: relative;
  padding-left: 20px;
  margin-bottom: 20px;
}

.timeline-item {
  border-left: 3px solid #007bff;
  padding-left: 20px;
  padding-bottom: 30px;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #007bff;
  border: 2px solid #fff;
}

.timeline-item .time {
  color: #999;
  font-size: 0.9em;
  display: block;
  margin-bottom: 5px;
}

.timeline-header {
  font-size: 1.1em;
  margin: 10px 0;
}

.timeline-body {
  color: #666;
}
</style>
