<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">LARAP - Land Acquisition and Resettlement Action Plan</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">LARAP</li>
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
            <div class="small-box bg-info">
              <div class="inner">
                <h3>150</h3>
                <p>Total Lahan Target</p>
              </div>
              <div class="icon">
                <i class="bi bi-geo-alt"></i>
              </div>
              <a href="#" class="small-box-footer">
                More info <i class="bi bi-arrow-right-circle"></i>
              </a>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
              <div class="inner">
                <h3>45</h3>
                <p>Sedang Negosiasi</p>
              </div>
              <div class="icon">
                <i class="bi bi-chat-dots"></i>
              </div>
              <a href="#" class="small-box-footer">
                More info <i class="bi bi-arrow-right-circle"></i>
              </a>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>25</h3>
                <p>Pending Approval</p>
              </div>
              <div class="icon">
                <i class="bi bi-clock-history"></i>
              </div>
              <a href="#" class="small-box-footer">
                More info <i class="bi bi-arrow-right-circle"></i>
              </a>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>80</h3>
                <p>Belum Dimulai</p>
              </div>
              <div class="icon">
                <i class="bi bi-exclamation-triangle"></i>
              </div>
              <a href="#" class="small-box-footer">
                More info <i class="bi bi-arrow-right-circle"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'database' }"
                  @click="activeTab = 'database'"
                  href="#"
                >
                  <i class="bi bi-database"></i> Database Lahan
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'negosiasi' }"
                  @click="activeTab = 'negosiasi'"
                  href="#"
                >
                  <i class="bi bi-file-earmark-text"></i> Dokumen Negosiasi
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'status' }"
                  @click="activeTab = 'status'"
                  href="#"
                >
                  <i class="bi bi-graph-up"></i> Status Tracking
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'resettlement' }"
                  @click="activeTab = 'resettlement'"
                  href="#"
                >
                  <i class="bi bi-house"></i> Rencana Pemukiman
                </a>
              </li>
            </ul>
          </div>

          <div class="card-body">
            <!-- Database Lahan Tab -->
            <div v-show="activeTab === 'database'">
              <div class="d-flex justify-content-between mb-3">
                <h5>Database Lahan yang Akan Diakuisisi</h5>
                <button class="btn btn-primary" @click="showAddModal = true">
                  <i class="bi bi-plus-circle"></i> Tambah Lahan
                </button>
              </div>

              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode Lahan</th>
                      <th>Lokasi</th>
                      <th>Luas (Ha)</th>
                      <th>Pemilik</th>
                      <th>Status Akuisisi</th>
                      <th>Target Selesai</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(lahan, index) in databaseLahan" :key="lahan.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ lahan.kode }}</td>
                      <td>{{ lahan.lokasi }}</td>
                      <td>{{ lahan.luas }}</td>
                      <td>{{ lahan.pemilik }}</td>
                      <td>
                        <span class="badge" :class="getStatusClass(lahan.status)">
                          {{ lahan.status }}
                        </span>
                      </td>
                      <td>{{ lahan.targetSelesai }}</td>
                      <td>
                        <button class="btn btn-sm btn-info me-1">
                          <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-warning me-1">
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

            <!-- Dokumen Negosiasi Tab -->
            <div v-show="activeTab === 'negosiasi'">
              <div class="d-flex justify-content-between mb-3">
                <h5>Dokumen Negosiasi Persil</h5>
                <button class="btn btn-primary">
                  <i class="bi bi-file-earmark-plus"></i> Upload Dokumen
                </button>
              </div>

              <div class="row">
                <div class="col-md-4" v-for="doc in dokumenNegosiasi" :key="doc.id">
                  <div class="card mb-3">
                    <div class="card-body">
                      <h6 class="card-title">{{ doc.judulDokumen }}</h6>
                      <p class="card-text">
                        <small class="text-muted">Lahan: {{ doc.kodeLahan }}</small><br>
                        <small class="text-muted">Tanggal: {{ doc.tanggal }}</small><br>
                        <span class="badge bg-info">{{ doc.jenisDokumen }}</span>
                      </p>
                      <div class="d-flex justify-content-between">
                        <button class="btn btn-sm btn-primary">
                          <i class="bi bi-download"></i> Download
                        </button>
                        <button class="btn btn-sm btn-success">
                          <i class="bi bi-eye"></i> View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Status Tracking Tab -->
            <div v-show="activeTab === 'status'">
              <h5 class="mb-3">Status Negosiasi & Progress</h5>
              
              <div class="row">
                <div class="col-md-8">
                  <div class="card">
                    <div class="card-header">
                      <h6>Timeline Progress</h6>
                    </div>
                    <div class="card-body">
                      <div class="timeline" v-for="item in statusTimeline" :key="item.id">
                        <div class="timeline-item">
                          <span class="time">
                            <i class="bi bi-clock"></i> {{ item.tanggal }}
                          </span>
                          <h3 class="timeline-header">{{ item.judul }}</h3>
                          <div class="timeline-body">{{ item.deskripsi }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="card">
                    <div class="card-header">
                      <h6>Statistik Status</h6>
                    </div>
                    <div class="card-body">
                      <div class="mb-3">
                        <label>Belum Dimulai</label>
                        <div class="progress">
                          <div class="progress-bar bg-danger" style="width: 53%">53%</div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label>Negosiasi</label>
                        <div class="progress">
                          <div class="progress-bar bg-warning" style="width: 30%">30%</div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label>Pending Approval</label>
                        <div class="progress">
                          <div class="progress-bar bg-info" style="width: 17%">17%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Rencana Pemukiman Tab -->
            <div v-show="activeTab === 'resettlement'">
              <div class="d-flex justify-content-between mb-3">
                <h5>Rencana Pemukiman Kembali</h5>
                <button class="btn btn-primary">
                  <i class="bi bi-plus-circle"></i> Tambah Rencana
                </button>
              </div>

              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Program</th>
                      <th>Jumlah KK</th>
                      <th>Lokasi Pemukiman</th>
                      <th>Anggaran</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(program, index) in programResettlement" :key="program.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ program.nama }}</td>
                      <td>{{ program.jumlahKK }}</td>
                      <td>{{ program.lokasi }}</td>
                      <td>{{ formatCurrency(program.anggaran) }}</td>
                      <td>
                        <span class="badge" :class="getStatusClass(program.status)">
                          {{ program.status }}
                        </span>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-info">
                          <i class="bi bi-eye"></i>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('database')
const showAddModal = ref(false)

// Sample Data
const databaseLahan = ref([
  {
    id: 1,
    kode: 'LRN-001',
    lokasi: 'Desa Sorowako',
    luas: 2.5,
    pemilik: 'Ahmad Sulaiman',
    status: 'Negosiasi',
    targetSelesai: '2025-03-15'
  },
  {
    id: 2,
    kode: 'LRN-002',
    lokasi: 'Desa Matano',
    luas: 3.2,
    pemilik: 'Siti Nurhaliza',
    status: 'Belum Dimulai',
    targetSelesai: '2025-04-20'
  },
  {
    id: 3,
    kode: 'LRN-003',
    lokasi: 'Desa Wotu',
    luas: 1.8,
    pemilik: 'Budi Santoso',
    status: 'Pending Approval',
    targetSelesai: '2025-02-28'
  }
])

const dokumenNegosiasi = ref([
  {
    id: 1,
    judulDokumen: 'Surat Persetujuan Awal',
    kodeLahan: 'LRN-001',
    tanggal: '2024-12-01',
    jenisDokumen: 'Persetujuan'
  },
  {
    id: 2,
    judulDokumen: 'Berita Acara Negosiasi',
    kodeLahan: 'LRN-001',
    tanggal: '2024-12-03',
    jenisDokumen: 'BA Negosiasi'
  },
  {
    id: 3,
    judulDokumen: 'Dokumen Penawaran Harga',
    kodeLahan: 'LRN-003',
    tanggal: '2024-11-28',
    jenisDokumen: 'Penawaran'
  }
])

const statusTimeline = ref([
  {
    id: 1,
    tanggal: '2024-12-03',
    judul: 'Negosiasi Lahan LRN-001',
    deskripsi: 'Negosiasi tahap 2 dengan pemilik lahan berhasil dilakukan'
  },
  {
    id: 2,
    tanggal: '2024-12-01',
    judul: 'Survey Lahan LRN-004',
    deskripsi: 'Tim melakukan survey awal untuk persiapan akuisisi'
  },
  {
    id: 3,
    tanggal: '2024-11-28',
    judul: 'Dokumen LRN-003 Pending',
    deskripsi: 'Menunggu persetujuan dari tim legal'
  }
])

const programResettlement = ref([
  {
    id: 1,
    nama: 'Program Relokasi Desa Sorowako',
    jumlahKK: 45,
    lokasi: 'Kompleks Pemukiman Baru A',
    anggaran: 5000000000,
    status: 'Negosiasi'
  },
  {
    id: 2,
    nama: 'Program Relokasi Desa Matano',
    jumlahKK: 30,
    lokasi: 'Kompleks Pemukiman Baru B',
    anggaran: 3500000000,
    status: 'Belum Dimulai'
  }
])

const getStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    'Negosiasi': 'bg-success',
    'Belum Dimulai': 'bg-danger',
    'Pending Approval': 'bg-warning',
    'Selesai': 'bg-info'
  }
  return statusMap[status] || 'bg-secondary'
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value)
}
</script>

<style scoped>
.timeline {
  position: relative;
  padding-left: 20px;
  margin-bottom: 20px;
}

.timeline-item {
  border-left: 2px solid #007bff;
  padding-left: 20px;
  padding-bottom: 20px;
}

.timeline-item .time {
  color: #999;
  font-size: 0.9em;
}

.timeline-header {
  font-size: 1.1em;
  margin: 10px 0;
}

.timeline-body {
  color: #666;
}
</style>
