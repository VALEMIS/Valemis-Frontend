<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Aset Inventori</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Aset Inventori</li>
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
            <table
              ref="dataTable"
              class="display table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode</th>
                  <th>Nama KK</th>
                  <th>Alamat</th>
                  <th>Tanggal Survey</th>
                  <th>Nama Surveyor</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>AS001</td>
                  <td>H. Sulaiman</td>
                  <td>Dusun Mekar Jaya, Desa Lemoa</td>
                  <td>2025-10-20</td>
                  <td>Fadli Ahmad</td>
                  <td class="text-center">
                    <button class="btn btn-primary" title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger" title="Hapus">
                      <i class="bi bi-trash"></i>
                    </button>
                    <button
                      class="btn btn-success"
                      title="Lihat Lokasi"
                      @click="openMap(-3.4567, 120.7890)"
                    >
                      <i class="bi bi-geo-alt-fill"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>AS002</td>
                  <td>Ibu Rahmawati</td>
                  <td>Dusun Sinar Harapan, Desa Batu Putih</td>
                  <td>2025-10-21</td>
                  <td>Siti Nurhaliza</td>
                  <td class="text-center">
                    <button class="btn btn-primary" title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger" title="Hapus">
                      <i class="bi bi-trash"></i>
                    </button>
                    <button
                      class="btn btn-success"
                      title="Lihat Lokasi"
                      @click="openMap(-3.4589, 120.7812)"
                    >
                      <i class="bi bi-geo-alt-fill"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>AS003</td>
                  <td>Bapak Andi</td>
                  <td>Dusun Maju Jaya, Desa Tanah Merah</td>
                  <td>2025-10-22</td>
                  <td>Rizky Pratama</td>
                  <td class="text-center">
                    <button class="btn btn-primary" title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger" title="Hapus">
                      <i class="bi bi-trash"></i>
                    </button>
                    <button
                      class="btn btn-success"
                      title="Lihat Lokasi"
                      @click="openMap(-3.4621, 120.7754)"
                    >
                      <i class="bi bi-geo-alt-fill"></i>
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

const dataTable = ref<HTMLTableElement | null>(null)

const openMap = (lat: number, lng: number) => {
  const url = `https://www.google.com/maps?q=${lat},${lng}`
  window.open(url, '_blank')
}

onMounted(() => {
  if (dataTable.value && (window as any).$) {
    (window as any).$(dataTable.value).DataTable({
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
    })
  }
})
</script>

<style scoped>
</style>
