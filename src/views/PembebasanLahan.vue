<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Pembebasan Lahan</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Pembebasan Lahan</li>
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
                <i class="bi bi-plus"></i> Tambah Pembebasan Lahan
              </a>
            </div>
            <table ref="dataTable" class="display table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama Pembebasan Lahan</th>
                  <th scope="col">Status</th>
                  <th scope="col">Jml. Terdampak</th>
                  <th scope="col">Jml. Bebas</th>
                  <th scope="col">Biaya Pembebasan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Pembebasan Lahan Desa Sukamaju</td>
                  <td>Proses</td>
                  <td>10</td>
                  <td>10</td>
                  <td>Rp 750.000.000</td>
                  <td>
                    <a class="btn btn-sm btn-info" href="#">Detail</a>
                    <button class="btn btn-sm btn-warning">Ubah</button>
                    <button class="btn btn-sm btn-danger">Hapus</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Pembebasan Lahan Desa Mekar</td>
                  <td>Selesai</td>
                  <td>5</td>
                  <td>5</td>
                  <td>Rp 420.000.000</td>
                  <td>
                    <a class="btn btn-sm btn-info" href="#">Detail</a>
                    <button class="btn btn-sm btn-warning">Ubah</button>
                    <button class="btn btn-sm btn-danger">Hapus</button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Pembebasan Lahan Desa Mandiri</td>
                  <td>Belum Mulai</td>
                  <td>8</td>
                  <td>8</td>
                  <td>Rp 600.000.000</td>
                  <td>
                    <a class="btn btn-sm btn-info" href="#">Detail</a>
                    <button class="btn btn-sm btn-warning">Ubah</button>
                    <button class="btn btn-sm btn-danger">Hapus</button>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Pembebasan Lahan Desa Sejahtera</td>
                  <td>Proses</td>
                  <td>12</td>
                  <td>12</td>
                  <td>Rp 900.000.000</td>
                  <td>
                    <a class="btn btn-sm btn-info" href="#">Detail</a>
                    <button class="btn btn-sm btn-warning">Ubah</button>
                    <button class="btn btn-sm btn-danger">Hapus</button>
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
