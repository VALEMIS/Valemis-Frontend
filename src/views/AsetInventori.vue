<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Asset Inventory</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/"><i class="bi bi-house-fill"></i></router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Asset Inventory</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- Filter Desa -->
        <div class="row mb-3">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <label class="form-label"><strong>Filter per Desa</strong></label>
                <select v-model="selectedVillage" class="form-select" @change="filterByVillage">
                  <option value="all">Semua Desa</option>
                  <option v-for="village in uniqueVillages" :key="village" :value="village">
                    {{ village }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card bg-info">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0 text-white">{{ filteredAssets.length }} Asset</h5>
                    <small class="text-white">Total asset untuk {{ selectedVillage === 'all' ? 'semua desa' :
                      selectedVillage }}</small>
                  </div>
                  <div>
                    <button class="btn btn-light btn-sm" @click="toggleView">
                      <i class="bi" :class="showMap ? 'bi-table' : 'bi-map'"></i>
                      {{ showMap ? 'Tampilkan Tabel' : 'Tampilkan Peta' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map View -->
        <div v-if="showMap" class="row mb-3">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-map"></i> Peta Asset per Desa</h3>
              </div>
              <div class="card-body">
                <div id="asset-map" ref="assetMapContainer" style="height: 500px; border-radius: 8px;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Table View -->
        <div v-else class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-table"></i> Daftar Asset Inventory</h3>
                <div class="card-tools">
                  <button class="btn btn-success btn-sm me-2" @click="exportToExcel" title="Download Excel">
                    <i class="bi bi-file-earmark-spreadsheet"></i> Download Excel
                  </button>
                  <button class="btn btn-primary btn-sm" @click="addAsset" data-bs-toggle="modal"
                    data-bs-target="#censusModal">
                    <i class="bi bi-plus-circle"></i> Tambah Asset
                  </button>
                </div>
              </div>
              <div class="card-body">
                <DataTable :value="filteredAssets" stripedRows showGridlines>
                  <Column header="No">
                    <template #body="slotProps">
                      {{ slotProps.index + 1 }}
                    </template>
                  </Column>
                  <Column header="ID Asset">
                    <template #body="slotProps">
                      <strong style="font-size: 0.875rem;">{{ slotProps.data.id_rumah_tangga || '-' }}</strong>
                    </template>
                  </Column>
                  <Column header="Tanggal">
                    <template #body="slotProps">
                      <small>{{ slotProps.data.tanggal || '-' }}</small>
                    </template>
                  </Column>
                  <Column header="Koordinat">
                    <template #body="slotProps">
                      <small>{{ slotProps.data.koordinat || '-' }}</small>
                    </template>
                  </Column>
                  <Column header="Nama">
                    <template #body="slotProps">
                      <strong>{{ [slotProps.data.nama_depan, slotProps.data.nama_tengah,
                      slotProps.data.nama_belakang].filter(Boolean).join(' ') || '-' }}</strong>
                    </template>
                  </Column>
                  <Column header="Desa">
                    <template #body="slotProps">
                      {{ slotProps.data.desa || '-' }}
                    </template>
                  </Column>
                  <Column header="Aksi">
                    <template #body="slotProps">
                      <div class="d-flex gap-1 justify-content-center">
                        <button class="btn btn-sm btn-primary" @click="viewDetail(slotProps.data)" title="Detail">
                          <i class="bi bi-eye-fill"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" @click="editAsset(slotProps.data)" title="Edit">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" @click="deleteAsset(slotProps.data)" title="Hapus">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

    <!-- Census Form Modal Component -->
    <CensusFormModal :is-edit-mode="isEditMode" :is-read-only="isReadOnly" :record-id="selectedAssetId"
      @save="handleSaveAsset" />

    <!-- Detail Modal -->
    <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true"
      ref="detailModalRef">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="detailModalLabel">Detail Sensus: {{ selectedAsset?.id_rumah_tangga || '-' }}
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="selectedAsset">
            <!-- Informasi Dasar -->
            <h6 class="fw-bold mb-3">Informasi Dasar</h6>
            <DataTable :value="[
              { key: 'ID Rumah Tangga', value: selectedAsset.id_rumah_tangga || '-' },
              { key: 'Kode Enumerator', value: selectedAsset.kode_enumerator || '-' },
              { key: 'Nama Kepala Keluarga', value: [selectedAsset.nama_depan, selectedAsset.nama_tengah, selectedAsset.nama_belakang].filter(Boolean).join(' ') || '-' },
              { key: 'Desa', value: selectedAsset.desa || '-' },
              { key: 'Kecamatan', value: selectedAsset.kecamatan || '-' },
              { key: 'Kabupaten', value: selectedAsset.kabupaten || '-' },
              { key: 'Provinsi', value: selectedAsset.provinsi || '-' },
              { key: 'Koordinat', value: selectedAsset.koordinat || '-' }
            ]" class="mb-4" showGridlines>
              <Column header="Field" field="key" />
              <Column header="Value" field="value" />
            </DataTable>

            <!-- A. Identifikasi Rumah Tangga -->
            <h6 class="fw-bold mb-3">A. Identifikasi Rumah Tangga</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Kode Enumerator', value: selectedAsset.kode_enumerator || '-' },
                  { key: 'ID Rumah Tangga', value: selectedAsset.id_rumah_tangga || '-' },
                  { key: 'Tanggal', value: selectedAsset.tanggal || '-' },
                  { key: 'Kode Foto Survei', value: selectedAsset.kode_foto_survei || '-' }
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'ID Unik', value: selectedAsset.id_unik || '-' },
                  { key: 'Jumlah Orang dalam RT', value: selectedAsset.jumlah_orang_rumah_tangga || '-' }
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
            </div>

            <!-- B. Identitas KK -->
            <h6 class="fw-bold mb-3">B. Identitas Kepala Keluarga</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Nama Lengkap', value: [selectedAsset.nama_depan, selectedAsset.nama_tengah, selectedAsset.nama_belakang].filter(Boolean).join(' ') || '-' },
                  { key: 'Nama Ayah', value: selectedAsset.nama_ayah || '-' },
                  { key: 'Nama Kakek', value: selectedAsset.nama_kakek || '-' },
                  { key: 'Nama Pasangan', value: selectedAsset.nama_pasangan || '-' }
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'NIK', value: selectedAsset.nik || '-' },
                  { key: 'Nomor Telepon', value: selectedAsset.nomor_telepon || '-' },
                  { key: 'Nama Responden', value: selectedAsset.nama_responden || '-' },
                  { key: 'Hubungan Responden', value: selectedAsset.hubungan_responden_kk || '-' }
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
            </div>

            <!-- C. Profil Sosial -->
            <h6 class="fw-bold mb-3">C. Profil Sosial</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Agama', value: selectedAsset.agama || '-' },
                  ...(selectedAsset.agama === '97. lainnya' ? [{ key: 'Agama (Lainnya)', value: selectedAsset.agama_lainnya || '-' }] : []),
                  { key: 'Asal Etnis', value: selectedAsset.asal_etnis || '-' },
                  ...(selectedAsset.asal_etnis_lainnya ? [{ key: 'Asal Etnis (Lainnya)', value: selectedAsset.asal_etnis_lainnya }] : [])
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Bahasa', value: selectedAsset.bahasa || '-' },
                  ...(selectedAsset.bahasa_lainnya ? [{ key: 'Bahasa (Lainnya)', value: selectedAsset.bahasa_lainnya }] : []),
                  { key: 'Tempat Asal KK', value: selectedAsset.tempat_asal_kk || '-' }
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
            </div>

            <!-- D. Demografi -->
            <h6 class="fw-bold mb-3">D. Demografi</h6>
            <DataTable :value="[
              { key: 'Jenis Kelamin', value: selectedAsset.jenis_kelamin || '-' },
              { key: 'Usia', value: selectedAsset.usia || '-' },
              { key: 'Status Perkawinan', value: selectedAsset.status_perkawinan || '-' },
              { key: 'Pendidikan Terakhir', value: selectedAsset.pendidikan_terakhir || '-' },
              { key: 'Bekerja 12 Bulan', value: selectedAsset.bekerja_12_bulan || '-' },
              { key: 'Disabilitas', value: selectedAsset.disabilitas || '-' }
            ]" class="mb-4" showGridlines>
              <Column header="Field" field="key" />
              <Column header="Value" field="value" />
            </DataTable>

            <!-- E. Pekerjaan Utama -->
            <h6 class="fw-bold mb-3">E. Pekerjaan Utama</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Pekerjaan Utama', value: selectedAsset.pekerjaan_utama || '-' },
                  ...(selectedAsset.pekerjaan_utama_lainnya ? [{ key: 'Pekerjaan (Lainnya)', value: selectedAsset.pekerjaan_utama_lainnya }] : []),
                  { key: 'Jenis Pekerjaan', value: selectedAsset.jenis_pekerjaan || '-' },
                  { key: 'Lokasi (Lainnya)', value: selectedAsset.lokasi_pekerjaan_lainnya || '-' }
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Jumlah Bulan Bekerja', value: (selectedAsset.jumlah_bulan_bekerja || '-') + ' bulan/tahun' },
                  { key: 'Penghasilan per Bulan', value: selectedAsset.penghasilan_per_bulan ? formatRupiah(selectedAsset.penghasilan_per_bulan) : '-' }
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
            </div>

            <!-- F. Pekerjaan Sekunder -->
            <h6 class="fw-bold mb-3">F. Pekerjaan Sekunder</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Pekerjaan Sekunder', value: selectedAsset.pekerjaan_sekunder || '-' },
                  ...(selectedAsset.pekerjaan_sekunder_lainnya ? [{ key: 'Pekerjaan (Lainnya)', value: selectedAsset.pekerjaan_sekunder_lainnya }] : []),
                  { key: 'Lokasi Sekunder', value: selectedAsset.lokasi_pekerjaan_sekunder || '-' },
                  ...(selectedAsset.lokasi_pekerjaan_sekunder_lainnya ? [{ key: 'Lokasi (Lainnya)', value: selectedAsset.lokasi_pekerjaan_sekunder_lainnya }] : [])
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Jumlah Bulan Bekerja', value: (selectedAsset.jumlah_bulan_bekerja_sekunder || '-') + ' bulan/tahun' },
                  { key: 'Penghasilan Sekunder', value: selectedAsset.penghasilan_sekunder_per_bulan ? formatRupiah(selectedAsset.penghasilan_sekunder_per_bulan) : '-' }
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
            </div>

            <!-- G. Keuangan -->
            <h6 class="fw-bold mb-3">G. Keuangan</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Penghasilan Tahunan', value: selectedAsset.penghasilan_tahunan ? formatRupiah(selectedAsset.penghasilan_tahunan) : '-' },
                  { key: 'Pengeluaran Bulanan', value: selectedAsset.pengeluaran_bulanan ? formatRupiah(selectedAsset.pengeluaran_bulanan) : '-' },
                  { key: 'Rekening Bank', value: selectedAsset.rekening_bank || '-' }
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
              <div class="col-md-6">
                <DataTable :value="[
                  ...(selectedAsset.tabungan_lainnya ? [{ key: 'Tabungan (Lainnya)', value: selectedAsset.tabungan_lainnya }] : []),
                  ...(selectedAsset.hutang_lainnya ? [{ key: 'Hutang (Lainnya)', value: selectedAsset.hutang_lainnya }] : [])
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
            </div>

            <!-- H. Dampak Pembebasan Lahan -->
            <h6 class="fw-bold mb-3">H. Dampak Pembebasan Lahan</h6>
            <DataTable :value="[
              { key: 'Pernah Dampak Proyek Lain', value: selectedAsset.pernah_dampak_proyek === '1' ? 'Ya' : selectedAsset.pernah_dampak_proyek === '2' ? 'Tidak' : '-' },
              ...(selectedAsset.jenis_proyek_lainnya ? [{ key: 'Jenis Proyek (Lainnya)', value: selectedAsset.jenis_proyek_lainnya }] : []),
              ...(selectedAsset.luas_lahan_dibebaskan ? [{ key: 'Luas Lahan Dibebaskan', value: selectedAsset.luas_lahan_dibebaskan + ' m²' }] : []),
              { key: 'Pernah Pengungsi', value: selectedAsset.pernah_pengungsi === '1' ? 'Ya' : selectedAsset.pernah_pengungsi === '2' ? 'Tidak' : '-' }
            ]" class="mb-4" showGridlines>
              <Column header="Field" field="key" />
              <Column header="Value" field="value" />
            </DataTable>

            <!-- I. Bisnis/Usaha -->
            <h6 class="fw-bold mb-3">I. Usaha Komersial/Bisnis</h6>
            <div class="row mb-4" v-if="selectedAsset.punya_bisnis === '1'">
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Sejak Kapan', value: selectedAsset.sejak_kapan_bisnis || '-' },
                  { key: 'Jumlah Pegawai', value: selectedAsset.jumlah_pegawai || '-' },
                  { key: 'Pendapatan Rata-rata', value: selectedAsset.pendapatan_rata_bisnis ? formatRupiah(selectedAsset.pendapatan_rata_bisnis) : '-' },
                  ...(selectedAsset.lokasi_bisnis_lainnya ? [{ key: 'Lokasi (Lainnya)', value: selectedAsset.lokasi_bisnis_lainnya }] : []),
                  ...(selectedAsset.kepemilikan_bisnis_lainnya ? [{ key: 'Kepemilikan (Lainnya)', value: selectedAsset.kepemilikan_bisnis_lainnya }] : [])
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
              <div class="col-md-6">
                <DataTable :value="[
                  ...(selectedAsset.deskripsi_produk_layanan ? [{ key: 'Deskripsi Produk/Jasa', value: selectedAsset.deskripsi_produk_layanan }] : [])
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
            </div>

            <!-- J. Perumahan -->
            <h6 class="fw-bold mb-3">J. Struktur Tempat Tinggal</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Tipe Rumah', value: selectedAsset.tipe_rumah || '-' },
                  ...(selectedAsset.tipe_rumah_lainnya ? [{ key: 'Tipe Rumah (Lainnya)', value: selectedAsset.tipe_rumah_lainnya }] : []),
                  { key: 'Sumber Air', value: selectedAsset.sumber_air || '-' },
                  ...(selectedAsset.sumber_air_lainnya ? [{ key: 'Sumber Air (Lainnya)', value: selectedAsset.sumber_air_lainnya }] : [])
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
              <div class="col-md-6">
                <DataTable :value="[
                  { key: 'Pelayanan Listrik', value: selectedAsset.pelayanan_listrik || '-' },
                  ...(selectedAsset.pelayanan_listrik_lainnya ? [{ key: 'Listrik (Lainnya)', value: selectedAsset.pelayanan_listrik_lainnya }] : []),
                  ...(selectedAsset.karakteristik_khusus ? [{ key: 'Karakteristik Khusus', value: selectedAsset.karakteristik_khusus }] : [])
                ]" showGridlines>
                  <Column header="Field" field="key" />
                  <Column header="Value" field="value" />
                </DataTable>
              </div>
            </div>

            <!-- K. Kesehatan & Pangan -->
            <h6 class="fw-bold mb-3">K. Kesehatan & Pangan</h6>
            <DataTable :value="[
              { key: 'Kecukupan Pangan', value: selectedAsset.kecukupan_pangan || '-' },
              ...(selectedAsset.defisit_pangan_lainnya ? [{ key: 'Defisit Pangan (Lainnya)', value: selectedAsset.defisit_pangan_lainnya }] : [])
            ]" class="mb-4" showGridlines>
              <Column header="Field" field="key" />
              <Column header="Value" field="value" />
            </DataTable>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { censusKepalaKeluargaApi, censusQuestionsApi, type CensusKepalaKeluarga } from '../api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import CensusFormModal from '../components/CensusFormModal.vue'
import * as XLSX from 'xlsx'
const gsUrl = import.meta.env.VITE_APP_API_GS_URL
interface Asset {
  id: number
  id_asset?: string  // Auto-generated asset ID from API
  created_at?: string
  updated_at?: string
  // A. Identifikasi Rumah Tangga dan PAP (1-6)
  kode_enumerator?: string
  id_rumah_tangga?: string
  tanggal?: string
  kode_foto_survei?: string
  id_unik?: string
  koordinat?: string
  latitude?: string
  longitude?: string
  // B. Informasi Kepala Keluarga (7-20)
  nama_depan?: string
  nama_tengah?: string
  nama_belakang?: string
  nama_lengkap?: string  // Full name from API
  nama_ayah?: string
  nama_kakek?: string
  nama_pasangan?: string
  nomor_telepon?: string
  nik?: string
  desa?: string
  kecamatan?: string
  kabupaten?: string
  provinsi?: string
  nama_responden?: string
  hubungan_responden_kk?: string
  agama?: string
  agama_lainnya?: string
  asal_etnis?: string
  asal_etnis_lainnya?: string
  bahasa?: string
  bahasa_lainnya?: string
  tempat_asal_kk?: string
  tempat_asal_tentukan?: string
  jumlah_orang_rumah_tangga?: number
  no_anggota?: number
  id_dampak?: string
  anggota_nama_depan?: string
  anggota_nama_belakang?: string
  hubungan_kk?: string
  jenis_kelamin?: string
  usia?: number
  status_perkawinan?: string
  bisa_membaca_menulis?: string
  sedang_sekolah?: string
  lokasi_sekolah?: string
  pendidikan_terakhir?: string
  alasan_penghentian?: string
  alasan_penghentian_lainnya?: string
  disabilitas?: string
  disabilitas_lainnya?: string
  kondisi_kesehatan_kronis?: string
  kesehatan_lainnya?: string
  // C. Profil Dampak
  identifikasi_dampak?: string
  identifikasi_dampak_lainnya?: string
  // D. Pekerjaan (41-56)
  bekerja_12_bulan?: string
  pekerjaan_utama?: string
  pekerjaan_utama_lainnya?: string
  jenis_pekerjaan?: string
  lokasi_pekerjaan?: string
  lokasi_pekerjaan_lainnya?: string
  jumlah_bulan_bekerja?: number
  penghasilan_per_bulan?: number
  pekerjaan_sekunder?: string
  pekerjaan_sekunder_lainnya?: string
  lokasi_pekerjaan_sekunder?: string
  lokasi_pekerjaan_sekunder_lainnya?: string
  jumlah_bulan_bekerja_sekunder?: number
  penghasilan_sekunder_per_bulan?: number
  keterampilan?: string
  keterampilan_lainnya?: string
  // F. Kesehatan & Pangan (55-58)
  penyakit_umum?: string
  tempat_pelayanan?: string
  kecukupan_pangan?: string
  defisit_pangan?: string
  defisit_pangan_lainnya?: string
  // G. Keuangan (59-66)
  penghasilan_tahunan?: number
  pengeluaran_bulanan?: number
  rekening_bank?: string
  tabungan?: string
  hutang?: string
  tabungan_detail?: string
  tabungan_lainnya?: string
  hutang_detail?: string
  hutang_lainnya?: string
  alasan_hutang?: string
  alasan_hutang_lainnya?: string
  // H. Dampak Pembebasan Lahan (67-70)
  pernah_dampak_proyek?: string
  jenis_proyek?: string
  jenis_proyek_lainnya?: string
  luas_lahan_dibebaskan?: number
  pernah_pengungsi?: string
  // I. Bisnis (71-78)
  punya_bisnis?: string
  lokasi_bisnis?: string
  lokasi_bisnis_lainnya?: string
  kepemilikan_bisnis?: string
  kepemilikan_bisnis_lainnya?: string
  sejak_kapan_bisnis?: string
  jenis_bisnis?: string
  jenis_bisnis_lainnya?: string
  jumlah_pegawai?: number
  pendapatan_rata_bisnis?: number
  deskripsi_produk_layanan?: string
  // J. Perumahan (79-83)
  tipe_rumah?: string
  tipe_rumah_lainnya?: string
  pelayanan_listrik?: string
  pelayanan_listrik_lainnya?: string
  sumber_air?: string
  sumber_air_lainnya?: string
  sanitasi?: string
  karakteristik_khusus?: string
  // Sumber Informasi & Komunikasi (88-89)
  sumber_informasi?: string
  metode_komunikasi?: string
  // Metadata
  surveyed_by?: string
  notes?: string
}

interface FormData {
  id?: number
  // A. Identifikasi Rumah Tangga dan PAP (1-6)
  kodeEnumerator?: string
  idRumahTangga?: string
  tanggal?: string
  kodeFotoSurvei?: string
  idUnik?: string
  koordinat?: string
  latitude?: string
  longitude?: string
  // B. Informasi Kepala Keluarga (7-20)
  namaDepan?: string
  namaTengah?: string
  namaBelakang?: string
  namaAyah?: string
  namaKakek?: string
  namaPasangan?: string
  nomorTelepon?: string
  nik?: string
  desa?: string
  kecamatan?: string
  kabupaten?: string
  provinsi?: string
  namaResponden?: string
  hubunganRespondenKk?: string
  agama?: string
  agamaLainnya?: string
  asalEtnis?: string
  asalEtnisLainnya?: string
  bahasa?: string
  bahasaLainnya?: string
  tempatAsalKk?: string
  tempatAsalTentukan?: string
  jumlahOrangRumahTangga?: number
  noAnggota?: number
  idDampak?: string
  anggotaNamaDepan?: string
  anggotaNamaBelakang?: string
  hubunganKk?: string
  jenisKelamin?: string
  usia?: number
  statusPerkawinan?: string
  bisaMembacaMenulis?: string
  sedangSekolah?: string
  lokasiSekolah?: string
  pendidikanTerakhir?: string
  alasanPenghentian?: string
  alasanPenghentianLainnya?: string
  disabilitas?: string
  disabilitasLainnya?: string
  kondisiKesehatanKronis?: string
  kesehatanLainnya?: string
  // C. Profil Dampak
  identifikasiDampak?: string
  identifikasiDampakLainnya?: string
  // D. Pekerjaan (41-56)
  bekerja12Bulan?: string
  pekerjaanUtama?: string
  pekerjaanUtamaLainnya?: string
  jenisPekerjaan?: string
  lokasiPekerjaan?: string
  lokasiPekerjaanLainnya?: string
  jumlahBulanBekerja?: number
  penghasilanPerBulan?: number
  pekerjaanSekunder?: string
  pekerjaanSekunderLainnya?: string
  lokasiPekerjaanSekunder?: string
  lokasiPekerjaanSekunderLainnya?: string
  jumlahBulanBekerjaSekunder?: number
  penghasilanSekunderPerBulan?: number
  keterampilan?: string
  keterampilanLainnya?: string
  // F. Kesehatan & Pangan (55-58)
  penyakitUmum?: string
  tempatPelayanan?: string
  kecukupanPangan?: string
  defisitPangan?: string
  defisitPanganLainnya?: string
  // G. Keuangan (59-66)
  penghasilanTahunan?: number
  pengeluaranBulanan?: number
  rekeningBank?: string
  tabungan?: string
  hutang?: string
  tabunganDetail?: string
  tabunganLainnya?: string
  hutangDetail?: string
  hutangLainnya?: string
  alasanHutang?: string
  alasanHutangLainnya?: string
  // H. Dampak Pembebasan Lahan (67-70)
  pernahDampakProyek?: string
  jenisProyek?: string
  jenisProyekLainnya?: string
  luasLahanDibebaskan?: number
  pernahPengungsi?: string
  // I. Bisnis (71-78)
  punyaBisnis?: string
  lokasiBisnis?: string
  lokasiBisnisLainnya?: string
  kepemilikanBisnis?: string
  kepemilikanBisnisLainnya?: string
  sejakKapanBisnis?: string
  jenisBisnis?: string
  jenisBisnisLainnya?: string
  jumlahPegawai?: number
  pendapatanRataBisnis?: number
  deskripsiProdukLayanan?: string
  // J. Perumahan (79-83)
  tipeRumah?: string
  tipeRumahLainnya?: string
  pelayananListrik?: string
  pelayananListrikLainnya?: string
  sumberAir?: string
  sumberAirLainnya?: string
  sanitasi?: string
  karakteristikKhusus?: string
  // Sumber Informasi & Komunikasi (88-89)
  sumberInformasi?: string
  metodeKomunikasi?: string
  // Metadata
  surveyedBy?: string
  notes?: string
}


const selectedVillage = ref<string>('all')
const showMap = ref<boolean>(true)  // Default to show map first
const assetMapContainer = ref<HTMLElement | null>(null)
const assetModalRef = ref<HTMLElement | null>(null)
const detailModalRef = ref<HTMLElement | null>(null)
const selectedAsset = ref<Asset | null>(null)
const selectedAssetId = ref<number | null>(null)
let assetMap: L.Map | null = null
let modalInstance: any = null
let detailModalInstance: any = null

// Form state
const isEditMode = ref<boolean>(false)
const isReadOnly = ref<boolean>(false)
const formData = ref<FormData>({
  id: undefined,
  // A. Identifikasi Rumah Tangga dan PAP (1-6)
  kodeEnumerator: '',
  idRumahTangga: '',
  tanggal: '',
  kodeFotoSurvei: '',
  idUnik: '',
  koordinat: '',
  latitude: '',
  longitude: '',
  // B. Informasi Kepala Keluarga (7-20)
  namaDepan: '',
  namaTengah: '',
  namaBelakang: '',
  namaAyah: '',
  namaKakek: '',
  namaPasangan: '',
  nomorTelepon: '',
  nik: '',
  desa: '',
  kecamatan: '',
  kabupaten: '',
  provinsi: '',
  namaResponden: '',
  hubunganRespondenKk: '',
  agama: '',
  agamaLainnya: '',
  asalEtnis: '',
  asalEtnisLainnya: '',
  bahasa: '',
  bahasaLainnya: '',
  tempatAsalKk: '',
  tempatAsalTentukan: '',
  jumlahOrangRumahTangga: undefined,
  noAnggota: undefined,
  idDampak: '',
  anggotaNamaDepan: '',
  anggotaNamaBelakang: '',
  hubunganKk: '',
  jenisKelamin: '',
  usia: undefined,
  statusPerkawinan: '',
  bisaMembacaMenulis: '',
  sedangSekolah: '',
  lokasiSekolah: '',
  pendidikanTerakhir: '',
  alasanPenghentian: '',
  alasanPenghentianLainnya: '',
  disabilitas: '',
  disabilitasLainnya: '',
  kondisiKesehatanKronis: '',
  kesehatanLainnya: '',
  // C. Profil Dampak
  identifikasiDampak: '',
  identifikasiDampakLainnya: '',
  // D. Pekerjaan (41-56)
  bekerja12Bulan: '',
  pekerjaanUtama: '',
  pekerjaanUtamaLainnya: '',
  jenisPekerjaan: '',
  lokasiPekerjaan: '',
  lokasiPekerjaanLainnya: '',
  jumlahBulanBekerja: undefined,
  penghasilanPerBulan: undefined,
  pekerjaanSekunder: '',
  pekerjaanSekunderLainnya: '',
  lokasiPekerjaanSekunder: '',
  lokasiPekerjaanSekunderLainnya: '',
  jumlahBulanBekerjaSekunder: undefined,
  penghasilanSekunderPerBulan: undefined,
  keterampilan: '',
  keterampilanLainnya: '',
  // F. Kesehatan & Pangan (55-58)
  penyakitUmum: '',
  tempatPelayanan: '',
  kecukupanPangan: '',
  defisitPangan: '',
  defisitPanganLainnya: '',
  // G. Keuangan (59-66)
  penghasilanTahunan: undefined,
  pengeluaranBulanan: undefined,
  rekeningBank: '',
  tabungan: '',
  hutang: '',
  tabunganDetail: '',
  tabunganLainnya: '',
  hutangDetail: '',
  hutangLainnya: '',
  alasanHutang: '',
  alasanHutangLainnya: '',
  // H. Dampak Pembebasan Lahan (67-70)
  pernahDampakProyek: '',
  jenisProyek: '',
  jenisProyekLainnya: '',
  luasLahanDibebaskan: undefined,
  pernahPengungsi: '',
  // I. Bisnis (71-78)
  punyaBisnis: '',
  lokasiBisnis: '',
  lokasiBisnisLainnya: '',
  kepemilikanBisnis: '',
  kepemilikanBisnisLainnya: '',
  sejakKapanBisnis: '',
  jenisBisnis: '',
  jenisBisnisLainnya: '',
  jumlahPegawai: undefined,
  pendapatanRataBisnis: undefined,
  deskripsiProdukLayanan: '',
  // J. Perumahan (79-83)
  tipeRumah: '',
  tipeRumahLainnya: '',
  pelayananListrik: '',
  pelayananListrikLainnya: '',
  sumberAir: '',
  sumberAirLainnya: '',
  sanitasi: '',
  karakteristikKhusus: '',
  // Sumber Informasi & Komunikasi (88-89)
  sumberInformasi: '',
  metodeKomunikasi: '',
  // Metadata
  surveyedBy: '',
  notes: ''
})

// Census questions for dropdowns
const questions: any[] = []

// Get project ID from route
const route = useRoute()
const projectId = computed(() => route.params.id_project as string | undefined)

// API data
const assets = ref<Asset[]>([])
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

// Fetch assets from API
const fetchAssets = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await censusKepalaKeluargaApi.getAll({ id_project: projectId.value || '' })
    assets.value = response.results.map((asset: any) => {
      // Handle nama_lengkap from API - split it for display compatibility
      const namaLengkap = asset.nama_lengkap || ''
      const namaParts = namaLengkap.split(' ')

      return {
        id: asset.id,
        id_asset: asset.id_asset,  // Auto-generated asset ID
        created_at: asset.created_at,
        updated_at: asset.updated_at,
        // A. Identifikasi Rumah Tangga dan PAP
        kode_enumerator: asset.kode_enumerator,
        id_rumah_tangga: asset.id_rumah_tangga || asset.id_asset, // Fallback to id_asset if id_rumah_tangga is null
        tanggal: asset.tanggal || asset.created_at?.split('T')[0], // Fallback to created date
        kode_foto_survei: asset.kode_foto_survei,
        id_unik: asset.id_unik,
        koordinat: asset.koordinat,
        // B. Informasi Kepala Keluarga
        // Map nama_lengkap to individual name fields for compatibility
        nama_depan: asset.nama_depan || namaParts[0] || '',
        nama_tengah: asset.nama_tengah || (namaParts.length > 2 ? namaParts.slice(1, -1).join(' ') : ''),
        nama_belakang: asset.nama_belakang || (namaParts.length > 1 ? namaParts[namaParts.length - 1] : ''),
        nama_lengkap: namaLengkap, // Keep original for reference
        nama_ayah: asset.nama_ayah,
        nama_kakek: asset.nama_kakek,
        nama_pasangan: asset.nama_pasangan,
        nomor_telepon: asset.nomor_telepon,
        nik: asset.nik,
        desa: asset.desa,
        kecamatan: asset.kecamatan,
        kabupaten: asset.kabupaten,
        provinsi: asset.provinsi,
        nama_responden: asset.nama_responden,
        hubungan_responden_kk: asset.hubungan_responden_kk,
        agama: asset.agama,
        agama_lainnya: asset.agama_lainnya,
        asal_etnis: asset.asal_etnis,
        asal_etnis_lainnya: asset.asal_etnis_lainnya,
        bahasa: asset.bahasa,
        bahasa_lainnya: asset.bahasa_lainnya,
        tempat_asal_kk: asset.tempat_asal_kk,
        tempat_asal_tentukan: asset.tempat_asal_tentukan,
        jumlah_orang_rumah_tangga: asset.jumlah_orang_rumah_tangga,
        no_anggota: asset.no_anggota,
        id_dampak: asset.id_dampak,
        anggota_nama_depan: asset.anggota_nama_depan,
        anggota_nama_belakang: asset.anggota_nama_belakang,
        hubungan_kk: asset.hubungan_kk,
        jenis_kelamin: asset.jenis_kelamin,
        usia: asset.usia,
        status_perkawinan: asset.status_perkawinan,
        bisa_membaca_menulis: asset.bisa_membaca_menulis,
        sedang_sekolah: asset.sedang_sekolah,
        lokasi_sekolah: asset.lokasi_sekolah,
        pendidikan_terakhir: asset.pendidikan_terakhir,
        alasan_penghentian: asset.alasan_penghentian,
        alasan_penghentian_lainnya: asset.alasan_penghentian_lainnya,
        disabilitas: asset.disabilitas,
        disabilitas_lainnya: asset.disabilitas_lainnya,
        kondisi_kesehatan_kronis: asset.kondisi_kesehatan_kronis,
        kesehatan_lainnya: asset.kesehatan_lainnya,
        bekerja_12_bulan: asset.bekerja_12_bulan,
        pekerjaan_utama: asset.pekerjaan_utama,
        pekerjaan_utama_lainnya: asset.pekerjaan_utama_lainnya,
        jenis_pekerjaan: asset.jenis_pekerjaan,
        lokasi_pekerjaan: asset.lokasi_pekerjaan,
        lokasi_pekerjaan_lainnya: asset.lokasi_pekerjaan_lainnya,
        jumlah_bulan_bekerja: asset.jumlah_bulan_bekerja,
        penghasilan_per_bulan: asset.penghasilan_per_bulan,
        pekerjaan_sekunder: asset.pekerjaan_sekunder,
        pekerjaan_sekunder_lainnya: asset.pekerjaan_sekunder_lainnya,
        lokasi_pekerjaan_sekunder: asset.lokasi_pekerjaan_sekunder,
        lokasi_pekerjaan_sekunder_lainnya: asset.lokasi_pekerjaan_sekunder_lainnya,
        jumlah_bulan_bekerja_sekunder: asset.jumlah_bulan_bekerja_sekunder,
        penghasilan_sekunder_per_bulan: asset.penghasilan_sekunder_per_bulan,
        keterampilan: asset.keterampilan,
        keterampilan_lainnya: asset.keterampilan_lainnya,
        penyakit_umum: asset.penyakit_umum,
        tempat_pelayanan: asset.tempat_pelayanan,
        kecukupan_pangan: asset.kecukupan_pangan,
        defisit_pangan: asset.defisit_pangan,
        defisit_pangan_lainnya: asset.defisit_pangan_lainnya,
        penghasilan_tahunan: asset.penghasilan_tahunan,
        pengeluaran_bulanan: asset.pengeluaran_bulanan,
        rekening_bank: asset.rekening_bank,
        tabungan: asset.tabungan,
        hutang: asset.hutang,
        tabungan_detail: asset.tabungan_detail,
        tabungan_lainnya: asset.tabungan_lainnya,
        hutang_detail: asset.hutang_detail,
        hutang_lainnya: asset.hutang_lainnya,
        alasan_hutang: asset.alasan_hutang,
        alasan_hutang_lainnya: asset.alasan_hutang_lainnya,
        pernah_dampak_proyek: asset.pernah_dampak_proyek,
        jenis_proyek: asset.jenis_proyek,
        jenis_proyek_lainnya: asset.jenis_proyek_lainnya,
        luas_lahan_dibebaskan: asset.luas_lahan_dibebaskan,
        pernah_pengungsi: asset.pernah_pengungsi,
        punya_bisnis: asset.punya_bisnis,
        lokasi_bisnis: asset.lokasi_bisnis,
        lokasi_bisnis_lainnya: asset.lokasi_bisnis_lainnya,
        kepemilikan_bisnis: asset.kepemilikan_bisnis,
        kepemilikan_bisnis_lainnya: asset.kepemilikan_bisnis_lainnya,
        sejak_kapan_bisnis: asset.sejak_kapan_bisnis,
        jenis_bisnis: asset.jenis_bisnis,
        jenis_bisnis_lainnya: asset.jenis_bisnis_lainnya,
        jumlah_pegawai: asset.jumlah_pegawai,
        pendapatan_rata_bisnis: asset.pendapatan_rata_bisnis,
        deskripsi_produk_layanan: asset.deskripsi_produk_layanan,
        tipe_rumah: asset.tipe_rumah,
        tipe_rumah_lainnya: asset.tipe_rumah_lainnya,
        pelayanan_listrik: asset.pelayanan_listrik,
        pelayanan_listrik_lainnya: asset.pelayanan_listrik_lainnya,
        sumber_air: asset.sumber_air,
        sumber_air_lainnya: asset.sumber_air_lainnya,
        sanitasi: asset.sanitasi,
        karakteristik_khusus: asset.karakteristik_khusus,
        sumber_informasi: asset.sumber_informasi,
        metode_komunikasi: asset.metode_komunikasi,
        surveyed_by: asset.surveyed_by,
        notes: asset.notes,
      }
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch assets'
    console.error('Error fetching assets:', err)
  } finally {
    loading.value = false
  }
}

const filteredAssets = computed(() => {
  if (selectedVillage.value === 'all') {
    return assets.value
  }
  return assets.value.filter(asset => asset.desa === selectedVillage.value)
})

// Get unique villages from data
const uniqueVillages = computed(() => {
  const villages = assets.value
    .map(asset => asset.desa)
    .filter((desa): desa is string => !!desa) // Filter out null/undefined and type guard
  return [...new Set(villages)].sort() // Remove duplicates and sort
})

const villageSummary = computed(() => {
  return uniqueVillages.value.map(village => {
    const villageAssets = assets.value.filter(a => a.desa === village)
    return {
      name: village,
      totalAssets: villageAssets.length,
      totalKK: villageAssets.length,
      totalArea: 0 // land_area field no longer exists
    }
  })
})

onUnmounted(() => {
  if (assetMap) {
    assetMap.remove()
    assetMap = null
  }
})

const filterByVillage = () => {
  if (showMap.value && assetMap) {
    initAssetMap()
  }
}

const selectVillageFilter = (villageName: string) => {
  selectedVillage.value = villageName
  filterByVillage()
}

const toggleView = () => {
  showMap.value = !showMap.value
}

const initAssetMap = () => {
  if (assetMap) {
    assetMap.remove()
  }

  if (!assetMapContainer.value) return

  // Parse center coordinates from first asset's koordinat field
  let centerCoords: [number, number] = [-2.5650, 121.3450]
  if (filteredAssets.value.length > 0 && filteredAssets.value[0]?.koordinat) {
    const parts = filteredAssets.value[0].koordinat.split(',').map(c => parseFloat(c.trim()))
    if (parts.length === 2 && parts[0] !== undefined && !isNaN(parts[0]) && parts[1] !== undefined && !isNaN(parts[1])) {
      centerCoords = [parts[0], parts[1]]
    }
  }

  assetMap = L.map('asset-map').setView(centerCoords, 14)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(assetMap)

  // Add markers
  //   filteredAssets.value.forEach(asset => {
  //     // Parse coordinates from "lat, lng" format
  //     let lat = -2.565, lng = 121.345 // default coordinates
  //     if (asset.koordinat) {
  //       const parts = asset.koordinat.split(',').map(c => parseFloat(c.trim()))
  //       if (parts.length === 2 && parts[0] !== undefined && !isNaN(parts[0]) && parts[1] !== undefined && !isNaN(parts[1])) {
  //         lat = parts[0]
  //         lng = parts[1]
  //       }
  //     }

  //     const houseIcon = L.divIcon({
  //       className: 'custom-house-marker',
  //       html: `<div style="background: #dc3545; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  //       iconSize: [16, 16],
  //       iconAnchor: [8, 8]
  //     })

  //     const marker = L.marker([lat, lng], { icon: houseIcon }).addTo(assetMap!)

  //     const fullName = [asset.nama_depan, asset.nama_tengah, asset.nama_belakang].filter(Boolean).join(' ') || '-'

  //     marker.bindPopup(`
  //       <div style="min-width: 200px;">
  //         <h6><strong>${fullName}</strong></h6>
  //         <p class="mb-1"><small><strong>ID RT:</strong> ${asset.id_rumah_tangga || '-'}</small></p>
  //         <p class="mb-1"><small><strong>Desa:</strong> ${asset.desa || '-'}</small></p>
  //         <p class="mb-0"><small><strong>Pekerjaan:</strong> ${asset.pekerjaan_utama || '-'}</small></p>
  //       </div>
  //     `)
  //   }
  // )

  //   // Draw IUPK Valemis boundary (larger area encompassing all villages)
  //   const iupkBoundary: [number, number][] = [
  //     [-2.556, 121.338],  // Northwest corner
  //     [-2.556, 121.353],  // Northeast corner
  //     [-2.574, 121.353],  // Southeast corner
  //     [-2.574, 121.338],  // Southwest corner
  //     [-2.556, 121.338]   // Close the polygon
  //   ]

  //   L.polygon(iupkBoundary, {
  //     color: '#0d6efd',        // Blue border
  //     weight: 3,               // Thicker border for visibility
  //     fillColor: '#0d6efd',    // Blue fill
  //     fillOpacity: 0.05,       // Very low opacity to not obscure villages
  //     dashArray: '10, 5'       // Dashed line for distinction
  //   }).addTo(assetMap!).bindPopup(`
  //     <div style="min-width: 200px;">
  //       <h6><strong>Area IUPK Valemis</strong></h6>
  //       <p class="mb-1"><small>Izin Usaha Pertambangan Khusus</small></p>
  //       <p class="mb-0"><small>Mencakup 4 desa: Sorowako, Magani, Wewangriu, Nikkel</small></p>
  //     </div>
  //   `)

  //   // Draw village polygons
  //   const villagePolygons: Record<string, [number, number][]> = {
  //     'Desa Sorowako': [[-2.558, 121.340], [-2.559, 121.344], [-2.562, 121.345], [-2.563, 121.343], [-2.561, 121.339], [-2.559, 121.339], [-2.558, 121.340]],
  //     'Desa Magani': [[-2.559, 121.345], [-2.560, 121.349], [-2.563, 121.350], [-2.564, 121.347], [-2.562, 121.344], [-2.560, 121.344], [-2.559, 121.345]],
  //     'Desa Wewangriu': [[-2.567, 121.341], [-2.568, 121.345], [-2.571, 121.346], [-2.572, 121.343], [-2.570, 121.340], [-2.568, 121.340], [-2.567, 121.341]],
  //     'Desa Nikkel': [[-2.568, 121.347], [-2.569, 121.351], [-2.572, 121.352], [-2.573, 121.349], [-2.571, 121.346], [-2.569, 121.346], [-2.568, 121.347]]
  //   }

  //   Object.entries(villagePolygons).forEach(([villageName, coords]) => {
  //     if (selectedVillage.value === 'all' || selectedVillage.value === villageName) {
  //       L.polygon(coords, {
  //         color: '#dc3545',
  //         weight: 2,
  //         fillColor: '#dc3545',
  //         fillOpacity: 0.1
  //       }).addTo(assetMap!).bindPopup(`<strong>${villageName}</strong>`)
  //     }
  //   })
  // const wmsLayer = L.tileLayer.wms(
  //   gsUrl+"/raster_valemis/wms",
  //   {
  //     layers: "raster_valemis:orthophoto_mbb1",
  //     format: "image/png",
  //     transparent: true,
  //     version: "1.1.0"
  //   }
  // );

  // wmsLayer.addTo(assetMap);
  const wmsLayerBatas = L.tileLayer.wms(
    gsUrl + "/vector_valemis/wms",
    {
      layers: "	vector_valemis:theme_ea895991",
      format: "image/png",
      transparent: true,
      styles: "Style Batas Desa",
      version: "1.1.0"
    }
  );

  wmsLayerBatas.addTo(assetMap);

  const wmsLayerIUPK = L.tileLayer.wms(
    gsUrl + "/vector_valemis/wms",
    {
      layers: "	vector_valemis:theme_eab3f65a",
      format: "image/png",
      transparent: true,
      version: "1.1.0",
      styles: "sld_iupk_3",
      crs: L.CRS.EPSG4326,
    }
  );

  wmsLayerIUPK.addTo(assetMap);
  const wmsLayerAsset = L.tileLayer.wms(
    gsUrl + "/vector_valemis/wms",
    {
      layers: "	vector_valemis:census_kepala_keluarga",
      format: "image/png",
      transparent: true,
      version: "1.1.0",
      styles: "sld_asset_point",
      crs: L.CRS.EPSG4326,
    }
  );

  wmsLayerAsset.addTo(assetMap);

  // var acquisitionLegend = L.control({ position: 'bottomright' });

  // acquisitionLegend.onAdd = function () {
  //   const div = L.DomUtil.create('div', 'legend');

  //   div.innerHTML = `
  //   <div class="card p-2">
  //     <h6>Asset</h6>
  //     <img
  //       src="${gsUrl}/vector_valemis/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=vector_valemis:census_kepala_keluarga&STYLE=sld_asset_point" alt="Legend"
  //     />
  //     <h6>IUPK</h6>
  //     <img
  //       src="${gsUrl}/vector_valemis/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=vector_valemis:theme_eab3f65a&STYLE=sld_iupk_3" alt="Legend"
  //     />
  //   </div>
  //   `;

  //   return div;
  // };

  // acquisitionLegend.addTo(assetMap);
}

const viewOnMap = (asset: Asset) => {
  showMap.value = true
  nextTick(() => {
    initAssetMap()
    if (assetMap && asset.koordinat) {
      // Parse coordinates from "lat, lng" format
      const parts = asset.koordinat.split(',').map(c => parseFloat(c.trim()))
      if (parts.length === 2 && parts[0] !== undefined && !isNaN(parts[0]) && parts[1] !== undefined && !isNaN(parts[1])) {
        assetMap.setView([parts[0], parts[1]], 17)
      }
    }
  })
}

const addAsset = () => {
  isEditMode.value = false
  isReadOnly.value = false
  selectedAssetId.value = null
  // Reset to same structure as initial formData
  formData.value = {
    id: undefined,
    // A. Identifikasi Rumah Tangga dan PAP (1-6)
    kodeEnumerator: '',
    idRumahTangga: '',
    tanggal: '',
    kodeFotoSurvei: '',
    idUnik: '',
    koordinat: '',
    latitude: '',
    longitude: '',
    // B. Informasi Kepala Keluarga (7-20)
    namaDepan: '',
    namaTengah: '',
    namaBelakang: '',
    namaAyah: '',
    namaKakek: '',
    namaPasangan: '',
    nomorTelepon: '',
    nik: '',
    desa: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    namaResponden: '',
    hubunganRespondenKk: '',
    agama: '',
    agamaLainnya: '',
    asalEtnis: '',
    asalEtnisLainnya: '',
    bahasa: '',
    bahasaLainnya: '',
    tempatAsalKk: '',
    tempatAsalTentukan: '',
    jumlahOrangRumahTangga: undefined,
    noAnggota: undefined,
    idDampak: '',
    anggotaNamaDepan: '',
    anggotaNamaBelakang: '',
    hubunganKk: '',
    jenisKelamin: '',
    usia: undefined,
    statusPerkawinan: '',
    bisaMembacaMenulis: '',
    sedangSekolah: '',
    lokasiSekolah: '',
    pendidikanTerakhir: '',
    alasanPenghentian: '',
    alasanPenghentianLainnya: '',
    disabilitas: '',
    disabilitasLainnya: '',
    kondisiKesehatanKronis: '',
    kesehatanLainnya: '',
    // C. Profil Dampak
    identifikasiDampak: '',
    identifikasiDampakLainnya: '',
    // D. Pekerjaan (41-56)
    bekerja12Bulan: '',
    pekerjaanUtama: '',
    pekerjaanUtamaLainnya: '',
    jenisPekerjaan: '',
    lokasiPekerjaan: '',
    lokasiPekerjaanLainnya: '',
    jumlahBulanBekerja: undefined,
    penghasilanPerBulan: undefined,
    pekerjaanSekunder: '',
    pekerjaanSekunderLainnya: '',
    lokasiPekerjaanSekunder: '',
    lokasiPekerjaanSekunderLainnya: '',
    jumlahBulanBekerjaSekunder: undefined,
    penghasilanSekunderPerBulan: undefined,
    keterampilan: '',
    keterampilanLainnya: '',
    // F. Kesehatan & Pangan (55-58)
    penyakitUmum: '',
    tempatPelayanan: '',
    kecukupanPangan: '',
    defisitPangan: '',
    defisitPanganLainnya: '',
    // G. Keuangan (59-66)
    penghasilanTahunan: undefined,
    pengeluaranBulanan: undefined,
    rekeningBank: '',
    tabungan: '',
    hutang: '',
    tabunganDetail: '',
    tabunganLainnya: '',
    hutangDetail: '',
    hutangLainnya: '',
    alasanHutang: '',
    alasanHutangLainnya: '',
    // H. Dampak Pembebasan Lahan (67-70)
    pernahDampakProyek: '',
    jenisProyek: '',
    jenisProyekLainnya: '',
    luasLahanDibebaskan: undefined,
    pernahPengungsi: '',
    // I. Bisnis (71-78)
    punyaBisnis: '',
    lokasiBisnis: '',
    lokasiBisnisLainnya: '',
    kepemilikanBisnis: '',
    kepemilikanBisnisLainnya: '',
    sejakKapanBisnis: '',
    jenisBisnis: '',
    jenisBisnisLainnya: '',
    jumlahPegawai: undefined,
    pendapatanRataBisnis: undefined,
    deskripsiProdukLayanan: '',
    // J. Perumahan (79-83)
    tipeRumah: '',
    tipeRumahLainnya: '',
    pelayananListrik: '',
    pelayananListrikLainnya: '',
    sumberAir: '',
    sumberAirLainnya: '',
    sanitasi: '',
    karakteristikKhusus: '',
    // Sumber Informasi & Komunikasi (88-89)
    sumberInformasi: '',
    metodeKomunikasi: '',
    // Metadata
    surveyedBy: '',
    notes: ''
  }
  openModal()
}

const editAsset = (asset: Asset) => {
  isEditMode.value = true
  isReadOnly.value = false
  selectedAssetId.value = asset.id // Pass only ID, modal will fetch data

  nextTick(() => {
    const modalElement = document.getElementById('censusModal')
    if (modalElement) {
      const Modal = (window as any).bootstrap?.Modal
      if (Modal) {
        const modal = new Modal(modalElement)
        modal.show()
      }
    }
  })
}

// Handle save from CensusFormModal component
const handleSaveAsset = async (data: Partial<CensusKepalaKeluarga>) => {
  loading.value = true
  try {
    if (isEditMode.value && selectedAssetId.value) {
      // Edit mode - use PUT/PATCH to update existing record
      await censusKepalaKeluargaApi.update(selectedAssetId.value, data)
      alert('Data berhasil diupdate!')
    } else {
      // Add mode - use POST to create new record
      await censusKepalaKeluargaApi.create(data)
      alert('Data berhasil ditambahkan!')
    }

    // Close modal
    const modalEl = document.getElementById('censusModal')
    if (modalEl) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalEl)
      modal?.hide()
    }

    // Reset selectedAssetId
    selectedAssetId.value = null

    // Refresh data
    await fetchAssets()
  } catch (error) {
    console.error('Error saving:', error)
    alert('Gagal menyimpan data: ' + (error instanceof Error ? error.message : 'Unknown error'))
  } finally {
    loading.value = false
  }
}

const saveAsset = async () => {
  loading.value = true

  try {
    const assetData: any = {
      // Project association
      id_project: projectId.value,
      // A. Identifikasi Rumah Tangga dan PAP (1-6)
      kode_enumerator: formData.value.kodeEnumerator || undefined,
      id_rumah_tangga: formData.value.idRumahTangga || undefined,
      tanggal: formData.value.tanggal || undefined,
      kode_foto_survei: formData.value.kodeFotoSurvei || undefined,
      id_unik: formData.value.idUnik || undefined,
      koordinat: (formData.value.latitude && formData.value.longitude)
        ? `${formData.value.latitude}, ${formData.value.longitude}`
        : formData.value.koordinat || undefined,
      // B. Informasi Kepala Keluarga (7-20)
      nama_depan: formData.value.namaDepan || undefined,
      nama_tengah: formData.value.namaTengah || undefined,
      nama_belakang: formData.value.namaBelakang || undefined,
      nama_ayah: formData.value.namaAyah || undefined,
      nama_kakek: formData.value.namaKakek || undefined,
      nama_pasangan: formData.value.namaPasangan || undefined,
      nomor_telepon: formData.value.nomorTelepon || undefined,
      nik: formData.value.nik || undefined,
      desa: formData.value.desa || undefined,
      kecamatan: formData.value.kecamatan || undefined,
      kabupaten: formData.value.kabupaten || undefined,
      provinsi: formData.value.provinsi || undefined,
      nama_responden: formData.value.namaResponden || undefined,
      hubungan_responden_kk: formData.value.hubunganRespondenKk || undefined,
      agama: formData.value.agama || undefined,
      agama_lainnya: formData.value.agamaLainnya || undefined,
      asal_etnis: formData.value.asalEtnis || undefined,
      asal_etnis_lainnya: formData.value.asalEtnisLainnya || undefined,
      bahasa: formData.value.bahasa || undefined,
      bahasa_lainnya: formData.value.bahasaLainnya || undefined,
      tempat_asal_kk: formData.value.tempatAsalKk || undefined,
      tempat_asal_tentukan: formData.value.tempatAsalTentukan || undefined,
      jumlah_orang_rumah_tangga: formData.value.jumlahOrangRumahTangga || undefined,
      no_anggota: formData.value.noAnggota || undefined,
      id_dampak: formData.value.idDampak || undefined,
      anggota_nama_depan: formData.value.anggotaNamaDepan || undefined,
      anggota_nama_belakang: formData.value.anggotaNamaBelakang || undefined,
      hubungan_kk: formData.value.hubunganKk || undefined,
      jenis_kelamin: formData.value.jenisKelamin || undefined,
      usia: formData.value.usia || undefined,
      status_perkawinan: formData.value.statusPerkawinan || undefined,
      bisa_membaca_menulis: formData.value.bisaMembacaMenulis || undefined,
      sedang_sekolah: formData.value.sedangSekolah || undefined,
      lokasi_sekolah: formData.value.lokasiSekolah || undefined,
      pendidikan_terakhir: formData.value.pendidikanTerakhir || undefined,
      alasan_penghentian: formData.value.alasanPenghentian || undefined,
      alasan_penghentian_lainnya: formData.value.alasanPenghentianLainnya || undefined,
      disabilitas: formData.value.disabilitas || undefined,
      disabilitas_lainnya: formData.value.disabilitasLainnya || undefined,
      kondisi_kesehatan_kronis: formData.value.kondisiKesehatanKronis || undefined,
      kesehatan_lainnya: formData.value.kesehatanLainnya || undefined,
      // D. Pekerjaan (41-56)
      bekerja_12_bulan: formData.value.bekerja12Bulan || undefined,
      pekerjaan_utama: formData.value.pekerjaanUtama || undefined,
      pekerjaan_utama_lainnya: formData.value.pekerjaanUtamaLainnya || undefined,
      jenis_pekerjaan: formData.value.jenisPekerjaan || undefined,
      lokasi_pekerjaan: formData.value.lokasiPekerjaan || undefined,
      lokasi_pekerjaan_lainnya: formData.value.lokasiPekerjaanLainnya || undefined,
      jumlah_bulan_bekerja: formData.value.jumlahBulanBekerja || undefined,
      penghasilan_per_bulan: formData.value.penghasilanPerBulan || undefined,
      pekerjaan_sekunder: formData.value.pekerjaanSekunder || undefined,
      pekerjaan_sekunder_lainnya: formData.value.pekerjaanSekunderLainnya || undefined,
      lokasi_pekerjaan_sekunder: formData.value.lokasiPekerjaanSekunder || undefined,
      lokasi_pekerjaan_sekunder_lainnya: formData.value.lokasiPekerjaanSekunderLainnya || undefined,
      jumlah_bulan_bekerja_sekunder: formData.value.jumlahBulanBekerjaSekunder || undefined,
      penghasilan_sekunder_per_bulan: formData.value.penghasilanSekunderPerBulan || undefined,
      keterampilan: formData.value.keterampilan || undefined,
      keterampilan_lainnya: formData.value.keterampilanLainnya || undefined,
      // F. Kesehatan & Pangan (55-58)
      penyakit_umum: formData.value.penyakitUmum || undefined,
      tempat_pelayanan: formData.value.tempatPelayanan || undefined,
      kecukupan_pangan: formData.value.kecukupanPangan || undefined,
      defisit_pangan: formData.value.defisitPangan || undefined,
      defisit_pangan_lainnya: formData.value.defisitPanganLainnya || undefined,
      // G. Keuangan (59-66)
      penghasilan_tahunan: formData.value.penghasilanTahunan || undefined,
      pengeluaran_bulanan: formData.value.pengeluaranBulanan || undefined,
      rekening_bank: formData.value.rekeningBank || undefined,
      tabungan: formData.value.tabungan || undefined,
      hutang: formData.value.hutang || undefined,
      tabungan_detail: formData.value.tabunganDetail || undefined,
      tabungan_lainnya: formData.value.tabunganLainnya || undefined,
      hutang_detail: formData.value.hutangDetail || undefined,
      hutang_lainnya: formData.value.hutangLainnya || undefined,
      alasan_hutang: formData.value.alasanHutang || undefined,
      alasan_hutang_lainnya: formData.value.alasanHutangLainnya || undefined,
      // H. Dampak Pembebasan Lahan (67-70)
      pernah_dampak_proyek: formData.value.pernahDampakProyek || undefined,
      jenis_proyek: formData.value.jenisProyek || undefined,
      jenis_proyek_lainnya: formData.value.jenisProyekLainnya || undefined,
      luas_lahan_dibebaskan: formData.value.luasLahanDibebaskan || undefined,
      pernah_pengungsi: formData.value.pernahPengungsi || undefined,
      // I. Bisnis (71-78)
      punya_bisnis: formData.value.punyaBisnis || undefined,
      lokasi_bisnis: formData.value.lokasiBisnis || undefined,
      lokasi_bisnis_lainnya: formData.value.lokasiBisnisLainnya || undefined,
      kepemilikan_bisnis: formData.value.kepemilikanBisnis || undefined,
      kepemilikan_bisnis_lainnya: formData.value.kepemilikanBisnisLainnya || undefined,
      sejak_kapan_bisnis: formData.value.sejakKapanBisnis || undefined,
      jenis_bisnis: formData.value.jenisBisnis || undefined,
      jenis_bisnis_lainnya: formData.value.jenisBisnisLainnya || undefined,
      jumlah_pegawai: formData.value.jumlahPegawai || undefined,
      pendapatan_rata_bisnis: formData.value.pendapatanRataBisnis || undefined,
      deskripsi_produk_layanan: formData.value.deskripsiProdukLayanan || undefined,
      // J. Perumahan (79-83)
      tipe_rumah: formData.value.tipeRumah || undefined,
      tipe_rumah_lainnya: formData.value.tipeRumahLainnya || undefined,
      pelayanan_listrik: formData.value.pelayananListrik || undefined,
      pelayanan_listrik_lainnya: formData.value.pelayananListrikLainnya || undefined,
      sumber_air: formData.value.sumberAir || undefined,
      sumber_air_lainnya: formData.value.sumberAirLainnya || undefined,
      sanitasi: formData.value.sanitasi || undefined,
      karakteristik_khusus: formData.value.karakteristikKhusus || undefined,
      // Sumber Informasi & Komunikasi (88-89)
      sumber_informasi: formData.value.sumberInformasi || undefined,
      metode_komunikasi: formData.value.metodeKomunikasi || undefined,
      // Metadata
      surveyed_by: formData.value.surveyedBy || undefined,
      notes: formData.value.notes || undefined,
    }

    if (isEditMode.value && formData.value.id) {
      // Edit existing asset - call API
      await censusKepalaKeluargaApi.update(formData.value.id, assetData)
      alert('Data berhasil diupdate!')
    } else {
      // Add new asset - call API
      await censusKepalaKeluargaApi.create(assetData)
      alert('Data berhasil ditambahkan!')
    }

    // Refresh data from API
    await fetchAssets()
    closeModal()
    if (showMap.value) {
      initAssetMap()
    }
  } catch (err) {
    alert(`Gagal menyimpan data: ${err instanceof Error ? err.message : 'Unknown error'}`)
    console.error('Error saving asset:', err)
  } finally {
    loading.value = false
  }
}

const openModal = () => {
  if (assetModalRef.value) {
    // Use Bootstrap 5 Modal API
    const Modal = (window as any).bootstrap?.Modal
    if (Modal) {
      modalInstance = new Modal(assetModalRef.value)
      modalInstance.show()
    } else {
      // Fallback if Bootstrap JS is not loaded
      assetModalRef.value.classList.add('show')
      assetModalRef.value.style.display = 'block'
      document.body.classList.add('modal-open')
    }
  }
}

const closeModal = () => {
  if (modalInstance) {
    modalInstance.hide()
  } else if (assetModalRef.value) {
    // Fallback
    assetModalRef.value.classList.remove('show')
    assetModalRef.value.style.display = 'none'
    document.body.classList.remove('modal-open')
  }
}

const deleteAsset = async (asset: Asset) => {
  if (confirm(`Hapus data sensus ${asset.id_rumah_tangga || 'N/A'} - ${[asset.nama_depan, asset.nama_tengah, asset.nama_belakang].filter(Boolean).join(' ') || 'N/A'}?\n\nData akan dihapus secara permanen.`)) {
    loading.value = true
    try {
      await censusKepalaKeluargaApi.delete(asset.id)

      // Remove from local state
      const index = assets.value.findIndex(a => a.id === asset.id)
      if (index !== -1) {
        assets.value.splice(index, 1)
      }

      alert('Asset berhasil dihapus!')
      if (showMap.value) {
        initAssetMap()
      }
    } catch (err) {
      alert(`Gagal menghapus asset: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('Error deleting asset:', err)
    } finally {
      loading.value = false
    }
  }
}

// View detail modal - use CensusFormModal in read-only mode
const viewDetail = (asset: Asset) => {
  isEditMode.value = false
  isReadOnly.value = true
  selectedAssetId.value = asset.id // Pass only ID, modal will fetch data

  nextTick(() => {
    const modalElement = document.getElementById('censusModal')
    if (modalElement) {
      const Modal = (window as any).bootstrap?.Modal
      if (Modal) {
        const modal = new Modal(modalElement)
        modal.show()
      }
    }
  })
}

const closeDetail = () => {
  if (detailModalInstance) {
    detailModalInstance.hide()
  } else if (detailModalRef.value) {
    detailModalRef.value.classList.remove('show')
    detailModalRef.value.style.display = 'none'
    document.body.classList.remove('modal-open')
  }
  selectedAsset.value = null
}

  // Export closeDetail for Bootstrap modal
  ; (window as any).closeAssetDetail = closeDetail

const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

// Export to CSV
const exportToExcel = async () => {
  try {
    // Define field mapping with headers - ALL fields from census modal
    const fieldMapping = [
      // Basic Info
      { header: 'ID', field: 'id' },
      { header: 'ID Asset', field: 'id_asset' },
      { header: 'Created At', field: 'created_at' },
      { header: 'Updated At', field: 'updated_at' },

      // A. Identifikasi Rumah Tangga dan PAP
      { header: 'Kode Enumerator', field: 'kode_enumerator' },
      { header: 'ID Rumah Tangga', field: 'id_rumah_tangga' },
      { header: 'Tanggal', field: 'tanggal' },
      { header: 'Kode Foto Survei', field: 'kode_foto_survei' },
      { header: 'Entitas Terdampak', field: 'entitas_terdampak' },
      { header: 'ID Unik', field: 'id_unik' },
      { header: 'Koordinat', field: 'koordinat' },
      { header: 'Latitude', field: 'latitude' },
      { header: 'Longitude', field: 'longitude' },

      // B. Informasi Kepala Keluarga
      { header: 'Nama Depan', field: 'nama_depan' },
      { header: 'Nama Tengah', field: 'nama_tengah' },
      { header: 'Nama Belakang', field: 'nama_belakang' },
      { header: 'Nama Lengkap', field: 'nama_lengkap' },
      { header: 'Nama Ayah', field: 'nama_ayah' },
      { header: 'Nama Kakek', field: 'nama_kakek' },
      { header: 'Nama Pasangan', field: 'nama_pasangan' },
      { header: 'Nomor Telepon', field: 'nomor_telepon' },
      { header: 'NIK', field: 'nik' },
      { header: 'Desa', field: 'desa' },
      { header: 'Kecamatan', field: 'kecamatan' },
      { header: 'Kabupaten', field: 'kabupaten' },
      { header: 'Provinsi', field: 'provinsi' },
      { header: 'Nama Responden', field: 'nama_responden' },
      { header: 'Hubungan Responden dengan KK', field: 'hubungan_responden_kk' },

      // C. Identifikasi Dampak
      { header: 'Identifikasi Dampak', field: 'identifikasi_dampak' },
      { header: 'Identifikasi Dampak Lainnya', field: 'identifikasi_dampak_lainnya' },

      // D. Profil Sosial
      { header: 'Agama', field: 'agama' },
      { header: 'Agama Lainnya', field: 'agama_lainnya' },
      { header: 'Asal Etnis', field: 'asal_etnis' },
      { header: 'Asal Etnis Lainnya', field: 'asal_etnis_lainnya' },
      { header: 'Bahasa', field: 'bahasa' },
      { header: 'Bahasa Lainnya', field: 'bahasa_lainnya' },
      { header: 'Tempat Asal KK', field: 'tempat_asal_kk' },
      { header: 'Tempat Asal Tentukan', field: 'tempat_asal_tentukan' },

      // E. Demografi Kepala Keluarga
      { header: 'Jumlah Orang Rumah Tangga', field: 'jumlah_orang_rumah_tangga' },
      { header: 'Jenis Kelamin', field: 'jenis_kelamin' },
      { header: 'Tanggal Lahir', field: 'tanggal_lahir' },
      { header: 'Usia', field: 'usia' },
      { header: 'Status Perkawinan', field: 'status_perkawinan' },
      { header: 'Bisa Membaca Menulis', field: 'bisa_membaca_menulis' },
      { header: 'Defisit Pangan', field: 'defisit_pangan' },
      { header: 'Defisit Pangan Lainnya', field: 'defisit_pangan_lainnya' },
      { header: 'Sedang Sekolah', field: 'sedang_sekolah' },
      { header: 'Sekolah Dimana', field: 'sekolah_dimana' },
      { header: 'Lokasi Sekolah', field: 'lokasi_sekolah' },
      { header: 'Pendidikan Terakhir', field: 'pendidikan_terakhir' },
      { header: 'Alasan Penghentian', field: 'alasan_penghentian' },
      { header: 'Alasan Penghentian Lainnya', field: 'alasan_penghentian_lainnya' },
      { header: 'Disabilitas', field: 'disabilitas' },
      { header: 'Disabilitas Lainnya', field: 'disabilitas_lainnya' },
      { header: 'Kondisi Kesehatan Kronis', field: 'kondisi_kesehatan_kronis' },
      { header: 'Kondisi Kesehatan Kronis Lainnya', field: 'kondisi_kesehatan_kronis_lainnya' },

      // F. Pekerjaan KK
      { header: 'Bekerja 12 Bulan', field: 'bekerja_12_bulan' },
      { header: 'Pekerjaan Utama', field: 'pekerjaan_utama' },
      { header: 'Pekerjaan Utama Lainnya', field: 'pekerjaan_utama_lainnya' },
      { header: 'Jenis Pekerjaan Utama', field: 'jenis_pekerjaan_utama' },
      { header: 'Jenis Pekerjaan', field: 'jenis_pekerjaan' },
      { header: 'Lokasi Pekerjaan Utama', field: 'lokasi_pekerjaan_utama' },
      { header: 'Lokasi Pekerjaan', field: 'lokasi_pekerjaan' },
      { header: 'Lokasi Pekerjaan Lainnya', field: 'lokasi_pekerjaan_lainnya' },
      { header: 'Lokasi Pekerjaan Utama Lainnya', field: 'lokasi_pekerjaan_utama_lainnya' },
      { header: 'Jumlah Bulan Bekerja', field: 'jumlah_bulan_bekerja' },
      { header: 'Penghasilan per Bulan', field: 'penghasilan_per_bulan' },

      // G. Pekerjaan Sekunder
      { header: 'Pekerjaan Sekunder', field: 'pekerjaan_sekunder' },
      { header: 'Pekerjaan Sekunder Lainnya', field: 'pekerjaan_sekunder_lainnya' },
      { header: 'Lokasi Pekerjaan Sekunder', field: 'lokasi_pekerjaan_sekunder' },
      { header: 'Lokasi Pekerjaan Sekunder Lainnya', field: 'lokasi_pekerjaan_sekunder_lainnya' },
      { header: 'Jumlah Bulan Bekerja Sekunder', field: 'jumlah_bulan_bekerja_sekunder' },
      { header: 'Penghasilan Sekunder per Bulan', field: 'penghasilan_sekunder_per_bulan' },

      // H. Keterampilan & Kesehatan
      { header: 'Keterampilan', field: 'keterampilan' },
      { header: 'Keterampilan Lainnya', field: 'keterampilan_lainnya' },
      { header: 'Penyakit Umum', field: 'penyakit_umum' },
      { header: 'Tempat Pelayanan', field: 'tempat_pelayanan' },
      { header: 'Kecukupan Pangan', field: 'kecukupan_pangan' },

      // I. Keuangan
      { header: 'Penghasilan Tahunan', field: 'penghasilan_tahunan' },
      { header: 'Pengeluaran Bulanan', field: 'pengeluaran_bulanan' },
      { header: 'Rekening Bank', field: 'rekening_bank' },
      { header: 'Punya Tabungan', field: 'punya_tabungan' },
      { header: 'Tabungan', field: 'tabungan' },
      { header: 'Jenis Tabungan', field: 'jenis_tabungan' },
      { header: 'Jenis Tabungan Lainnya', field: 'jenis_tabungan_lainnya' },
      { header: 'Tabungan Detail', field: 'tabungan_detail' },
      { header: 'Tabungan Lainnya', field: 'tabungan_lainnya' },
      { header: 'Punya Hutang', field: 'punya_hutang' },
      { header: 'Hutang', field: 'hutang' },
      { header: 'Jenis Hutang', field: 'jenis_hutang' },
      { header: 'Jenis Hutang Lainnya', field: 'jenis_hutang_lainnya' },
      { header: 'Hutang Detail', field: 'hutang_detail' },
      { header: 'Hutang Lainnya', field: 'hutang_lainnya' },
      { header: 'Alasan Hutang', field: 'alasan_hutang' },
      { header: 'Alasan Hutang Lainnya', field: 'alasan_hutang_lainnya' },

      // J. Dampak Pembebasan Lahan
      { header: 'Pernah Dampak Proyek', field: 'pernah_dampak_proyek' },
      { header: 'Pernah Terdampak Proyek', field: 'pernah_terdampak_proyek' },
      { header: 'Jenis Proyek', field: 'jenis_proyek' },
      { header: 'Jenis Proyek Sebelumnya', field: 'jenis_proyek_sebelumnya' },
      { header: 'Jenis Proyek Lainnya', field: 'jenis_proyek_lainnya' },
      { header: 'Luas Lahan Dibebaskan', field: 'luas_lahan_dibebaskan' },
      { header: 'Perkiraan Dampak', field: 'perkiraan_dampak' },
      { header: 'Pernah Pengungsi', field: 'pernah_pengungsi' },

      // K. Bisnis/Usaha
      { header: 'Punya Bisnis', field: 'punya_bisnis' },
      { header: 'Lokasi Bisnis', field: 'lokasi_bisnis' },
      { header: 'Lokasi Bisnis Lainnya', field: 'lokasi_bisnis_lainnya' },
      { header: 'Kepemilikan Bisnis', field: 'kepemilikan_bisnis' },
      { header: 'Kepemilikan Bisnis Lainnya', field: 'kepemilikan_bisnis_lainnya' },
      { header: 'Sejak Kapan Bisnis', field: 'sejak_kapan_bisnis' },
      { header: 'Jenis Bisnis', field: 'jenis_bisnis' },
      { header: 'Jenis Bisnis Lainnya', field: 'jenis_bisnis_lainnya' },
      { header: 'Jumlah Pegawai', field: 'jumlah_pegawai' },
      { header: 'Pendapatan Rata Bisnis', field: 'pendapatan_rata_bisnis' },
      { header: 'Pendapatan Bisnis per Bulan', field: 'pendapatan_bisnis_per_bulan' },
      { header: 'Deskripsi Produk Layanan', field: 'deskripsi_produk_layanan' },

      // L. Struktur Tempat Tinggal
      { header: 'Tipe Rumah', field: 'tipe_rumah' },
      { header: 'Tipe Rumah Lainnya', field: 'tipe_rumah_lainnya' },
      { header: 'Luas Rumah', field: 'luas_rumah' },
      { header: 'Pelayanan Listrik', field: 'pelayanan_listrik' },
      { header: 'Pelayanan Listrik Lainnya', field: 'pelayanan_listrik_lainnya' },
      { header: 'Sumber Air', field: 'sumber_air' },
      { header: 'Sumber Air Lainnya', field: 'sumber_air_lainnya' },
      { header: 'Sanitasi', field: 'sanitasi' },
      { header: 'Karakteristik Khusus', field: 'karakteristik_khusus' },

      // M. Kerentanan
      { header: 'Karakteristik Kerentanan', field: 'karakteristik_kerentanan' },

      // N. Sumber Informasi & Komunikasi
      { header: 'Sumber Informasi', field: 'sumber_informasi' },
      { header: 'Sumber Informasi Lainnya', field: 'sumber_informasi_lainnya' },
      { header: 'Metode Komunikasi', field: 'metode_komunikasi' },
      { header: 'Metode Komunikasi Lainnya', field: 'metode_komunikasi_lainnya' },

      // O. Tanah
      { header: 'NIB', field: 'nib' },
      { header: 'Letak Tanah', field: 'letak_tanah' },
      { header: 'Status Tanah', field: 'status_tanah' },
      { header: 'Surat Bukti Tanah', field: 'surat_bukti_tanah' },
      { header: 'Luas Tanah', field: 'luas_tanah' },
      { header: 'Tahun Kelola Lahan', field: 'tahun_kelola_lahan' },
      { header: 'Asal Usul Perolehan', field: 'asal_usul_perolehan' },
      { header: 'Biaya Perolehan', field: 'biaya_perolehan' },
      { header: 'Pembebanan Hak Tanah', field: 'pembebanan_hak_tanah' },
      { header: 'Fungsi Kawasan', field: 'fungsi_kawasan' },
      { header: 'Benda Lain Tanah', field: 'benda_lain_tanah' },
      { header: 'Batas Utara', field: 'batas_utara' },
      { header: 'Batas Selatan', field: 'batas_selatan' },
      { header: 'Batas Timur', field: 'batas_timur' },
      { header: 'Batas Barat', field: 'batas_barat' },

      // P. Ruang Atas/Bawah
      { header: 'HM Sarusun', field: 'hm_sarusun' },
      { header: 'Luas Ruang', field: 'luas_ruang' },

      // Q. Tanaman (40+ jenis tanaman)
      { header: 'Tanaman Merica', field: 'tanaman_merica' },
      { header: 'Tanaman Alpukat', field: 'tanaman_alpukat' },
      { header: 'Tanaman Aren', field: 'tanaman_aren' },
      { header: 'Tanaman Belimbing', field: 'tanaman_belimbing' },
      { header: 'Tanaman Belukar', field: 'tanaman_belukar' },
      { header: 'Tanaman Bonglai', field: 'tanaman_bonglai' },
      { header: 'Tanaman Buah Naga', field: 'tanaman_buah_naga' },
      { header: 'Tanaman Cabai', field: 'tanaman_cabai' },
      { header: 'Tanaman Cempedak', field: 'tanaman_cempedak' },
      { header: 'Tanaman Cengkeh', field: 'tanaman_cengkeh' },
      { header: 'Tanaman Cokelat', field: 'tanaman_cokelat' },
      { header: 'Tanaman Durian', field: 'tanaman_durian' },
      { header: 'Tanaman Jahe Merah', field: 'tanaman_jahe_merah' },
      { header: 'Tanaman Jambu', field: 'tanaman_jambu' },
      { header: 'Tanaman Jambu Air', field: 'tanaman_jambu_air' },
      { header: 'Tanaman Jambu Batu', field: 'tanaman_jambu_batu' },
      { header: 'Tanaman Jambu Biji', field: 'tanaman_jambu_biji' },
      { header: 'Tanaman Jati Putih', field: 'tanaman_jati_putih' },
      { header: 'Tanaman Jengkol', field: 'tanaman_jengkol' },
      { header: 'Tanaman Jeruk', field: 'tanaman_jeruk' },
      { header: 'Tanaman Jeruk Nipis', field: 'tanaman_jeruk_nipis' },
      { header: 'Tanaman Kapuk', field: 'tanaman_kapuk' },
      { header: 'Tanaman Kecombrang', field: 'tanaman_kecombrang' },
      { header: 'Tanaman Kelapa', field: 'tanaman_kelapa' },
      { header: 'Tanaman Kelapa Sawit', field: 'tanaman_kelapa_sawit' },
      { header: 'Tanaman Kelor', field: 'tanaman_kelor' },
      { header: 'Tanaman Kopi', field: 'tanaman_kopi' },
      { header: 'Tanaman Kunyit', field: 'tanaman_kunyit' },
      { header: 'Tanaman Kunyit Hitam', field: 'tanaman_kunyit_hitam' },
      { header: 'Tanaman Langsat', field: 'tanaman_langsat' },
      { header: 'Tanaman Lengkuas', field: 'tanaman_lengkuas' },
      { header: 'Tanaman Mangga', field: 'tanaman_mangga' },
      { header: 'Tanaman Nanas', field: 'tanaman_nanas' },
      { header: 'Tanaman Nangka', field: 'tanaman_nangka' },
      { header: 'Tanaman Nilam', field: 'tanaman_nilam' },
      { header: 'Tanaman Pepaya', field: 'tanaman_pepaya' },
      { header: 'Tanaman Pinang', field: 'tanaman_pinang' },
      { header: 'Tanaman Rambutan', field: 'tanaman_rambutan' },
      { header: 'Tanaman Serai', field: 'tanaman_serai' },
      { header: 'Tanaman Singkong', field: 'tanaman_singkong' },
      { header: 'Tanaman Sirsak', field: 'tanaman_sirsak' },
      { header: 'Tanaman Sukun', field: 'tanaman_sukun' },
      { header: 'Tanaman Talas', field: 'tanaman_talas' },
      { header: 'Tanaman Ubi', field: 'tanaman_ubi' },

      // R. Informasi Lainnya
      { header: 'Catatan Tambahan', field: 'catatan_tambahan' },
      { header: 'Kebutuhan Khusus', field: 'kebutuhan_khusus' },
      { header: 'Harapan Kompensasi', field: 'harapan_kompensasi' },

      // Anggota Keluarga
      { header: 'No Anggota', field: 'no_anggota' },
      { header: 'ID Dampak', field: 'id_dampak' },
      { header: 'Anggota Nama Depan', field: 'anggota_nama_depan' },
      { header: 'Anggota Nama Belakang', field: 'anggota_nama_belakang' },
      { header: 'Hubungan KK', field: 'hubungan_kk' },

      // Metadata
      { header: 'Surveyed By', field: 'surveyed_by' },
      { header: 'Notes', field: 'notes' }
    ]

    // Prepare data for Excel
    const excelData = filteredAssets.value.map(asset => {
      const row: any = {}
      fieldMapping.forEach(({ header, field }) => {
        const value = (asset as any)[field]
        // Handle null/undefined
        row[header] = (value === null || value === undefined || value === '') ? '-' : value
      })
      return row
    })

    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Create workbook and add the worksheet
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Asset Inventory')

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `asset-inventory-${new Date().toISOString().split('T')[0]}.xlsx`)

    alert('Data berhasil didownload dalam format Excel!')
  } catch (err) {
    alert('Gagal mendownload data: ' + (err instanceof Error ? err.message : 'Unknown error'))
    console.error('Export error:', err)
  }
}

// Load census questions for dropdowns
const loadQuestions = async () => {
  try {
    const data = await censusQuestionsApi.getAll()
    questions.push(...data)
  } catch (err) {
    console.error('Failed to load questions:', err)
  }
}

// Initialize map on mount if showMap is true
onMounted(async () => {
  // Fetch assets from API first
  await fetchAssets()
  // Load census questions
  await loadQuestions()

  // Initialize map after data is loaded
  if (showMap.value) {
    nextTick(() => {
      initAssetMap()
    })
  }
})

watch(showMap, (newVal) => {
  if (newVal) {
    nextTick(() => {
      initAssetMap()
    })
  }
})
</script>

<style scoped>
.custom-house-marker {
  background: transparent;
  border: none;
}
</style>