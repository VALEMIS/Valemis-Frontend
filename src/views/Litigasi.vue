<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Claim</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Claim</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <div class="card mb-4">
          <div class="card-body">
            <div>
              <a href="#" class="btn btn-primary">
                <i class="bi bi-plus"></i> Tambah Responden
              </a>
            </div>
            <table ref="dataTable1" class="display table table-striped table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID Claim</th>
                  <th>ID Parcel</th>
                  <th>Tanggal Mulai</th>
                  <th>Jenis Claim</th>
                  <th>Uraian</th>
                  <th>Status</th>
                  <th>Kanal</th>
                  <th>Sumber</th>
                  <th>Dokumen Klaim</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>CLM001</td>
                  <td>PARC001</td>
                  <td>2025-10-20</td>
                  <td>Tanah Sengketa</td>
                  <td>Klaim kepemilikan lahan oleh warga lokal</td>
                  <td>Proses Verifikasi</td>
                  <td>Online</td>
                  <td>Data Masyarakat</td>
                  <td>
                    <a href="#" target="_blank" class="btn btn-outline-secondary btn-sm">
                      <i class="bi bi-file-earmark-text"></i> Lihat
                    </a>
                  </td>
                  <td class="text-center">
                    <a href="#" class="btn btn-primary btn-sm" title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </a>
                    <button class="btn btn-danger" title="Hapus">
                      <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-success" title="Lihat Lokasi" @click="openMap(-3.4567,120.7890)">
                      <i class="bi bi-geo-alt-fill"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>CLM002</td>
                  <td>PARC002</td>
                  <td>2025-10-21</td>
                  <td>Batas Lahan</td>
                  <td>Perbedaan batas kepemilikan antar dua warga</td>
                  <td>Selesai</td>
                  <td>Offline</td>
                  <td>Survey Lapangan</td>
                  <td>
                    <a href="#" target="_blank" class="btn btn-outline-secondary btn-sm">
                      <i class="bi bi-file-earmark-text"></i> Lihat
                    </a>
                  </td>
                  <td class="text-center">
                    <a href="#" class="btn btn-primary btn-sm" title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </a>
                    <button class="btn btn-danger" title="Hapus">
                      <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-success" title="Lihat Lokasi" @click="openMap(-3.4589,120.7812)">
                      <i class="bi bi-geo-alt-fill"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>CLM003</td>
                  <td>PARC003</td>
                  <td>2025-10-22</td>
                  <td>Penggunaan Lahan</td>
                  <td>Klaim pemanfaatan lahan untuk usaha tani</td>
                  <td>Pending</td>
                  <td>Online</td>
                  <td>Pemerintah Desa</td>
                  <td>
                    <a href="#" target="_blank" class="btn btn-outline-secondary btn-sm">
                      <i class="bi bi-file-earmark-text"></i> Lihat
                    </a>
                  </td>
                  <td class="text-center">
                    <a href="#" class="btn btn-primary btn-sm" title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </a>
                    <button class="btn btn-danger" title="Hapus">
                      <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-success" title="Lihat Lokasi" @click="openMap(-3.4621,120.7754)">
                      <i class="bi bi-geo-alt-fill"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-3">
              <a href="#" class="btn btn-success">
                <i class="bi bi-geo"></i> Tambah Parcel
              </a>
            </div>
            <table ref="dataTable2" class="display table table-striped table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID Parcel</th>
                  <th>Nama Parcel</th>
                  <th>Desa</th>
                  <th>Kecamatan</th>
                  <th>Kabupaten</th>
                  <th>Provinsi</th>
                  <th>Status Penguasaan</th>
                  <th>Nomor Sertifikat</th>
                  <th>Pemegang Hak</th>
                  <th>Area (Ha)</th>
                  <th>Sumber Data</th>
                  <th>Polygon claim Id</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>PARC001</td>
                  <td>Parcel A</td>
                  <td>Desa Lemoa</td>
                  <td>Kec. Bungoro</td>
                  <td>Kab. Pangkep</td>
                  <td>Sulawesi Selatan</td>
                  <td>Hak Milik</td>
                  <td>123/LM/2020</td>
                  <td>H. Sulaiman</td>
                  <td>1.25</td>
                  <td>Survey Lapangan</td>
                  <td>1</td>
                  <td class="text-center">
                    <a href="#" class="btn btn-primary btn-sm" title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </a>
                    <button class="btn btn-danger btn-sm" title="Hapus">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PARC002</td>
                  <td>Parcel B</td>
                  <td>Desa Batu Putih</td>
                  <td>Kec. Balocci</td>
                  <td>Kab. Pangkep</td>
                  <td>Sulawesi Selatan</td>
                  <td>Girik</td>
                  <td>-</td>
                  <td>Ibu Rahmawati</td>
                  <td>0.98</td>
                  <td>Data Masyarakat</td>
                  <td>2</td>
                  <td class="text-center">
                    <button class="btn btn-primary btn-sm" title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" title="Hapus">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>PARC003</td>
                  <td>Parcel C</td>
                  <td>Desa Tanah Merah</td>
                  <td>Kec. Minasatene</td>
                  <td>Kab. Pangkep</td>
                  <td>Sulawesi Selatan</td>
                  <td>Sewa</td>
                  <td>451/TM/2021</td>
                  <td>Bapak Andi</td>
                  <td>2.10</td>
                  <td>Pemerintah Desa</td>
                  <td>3</td>
                  <td class="text-center">
                    <button class="btn btn-primary btn-sm" title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" title="Hapus">
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
import { onMounted, ref } from 'vue'

const dataTable1 = ref<HTMLTableElement | null>(null)
const dataTable2 = ref<HTMLTableElement | null>(null)

const openMap = (lat: number, lng: number) => {
  const url = `https://www.google.com/maps?q=${lat},${lng}`
  window.open(url, '_blank')
}

onMounted(() => {
  const dataTableConfig = {
    pageLength: 10,
    language: {
      search: 'Cari:',
      lengthMenu: 'Tampilkan _MENU_ data',
      info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
      paginate: {
        first: 'Awal',
        last: 'Akhir',
        next: '›',
        previous: '‹'
      }
    }
  }

  if (dataTable1.value && (window as any).$) {
    (window as any).$(dataTable1.value).DataTable(dataTableConfig)
  }
  
  if (dataTable2.value && (window as any).$) {
    (window as any).$(dataTable2.value).DataTable(dataTableConfig)
  }
})
</script>

<style scoped>
</style>
