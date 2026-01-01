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
                  <option value="Desa Sorowako">Desa Sorowako</option>
                  <option value="Desa Magani">Desa Magani</option>
                  <option value="Desa Wewangriu">Desa Wewangriu</option>
                  <option value="Desa Nikkel">Desa Nikkel</option>
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
                  <button class="btn btn-success btn-sm me-2" @click="exportToCsv" title="Download CSV">
                    <i class="bi bi-file-earmark-spreadsheet"></i> Download CSV
                  </button>
                  <button class="btn btn-primary btn-sm" @click="addAsset">
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
                  <Column header="ID Rumah Tangga">
                    <template #body="slotProps">
                      <span class="badge bg-primary">{{ slotProps.data.id_rumah_tangga || '-' }}</span>
                    </template>
                  </Column>
                  <Column header="Nama Kepala Keluarga">
                    <template #body="slotProps">
                      <strong>{{ [slotProps.data.nama_depan, slotProps.data.nama_tengah,
                      slotProps.data.nama_belakang].filter(Boolean).join(' ') || '-' }}</strong>
                    </template>
                  </Column>
                  <Column header="Desa" field="desa" />
                  <Column header="Jumlah Anggota" field="jumlah_orang_rumah_tangga">
                    <template #body="slotProps">
                      {{ slotProps.data.jumlah_orang_rumah_tangga || '-' }}
                    </template>
                  </Column>
                  <Column header="Pekerjaan Utama" field="pekerjaan_utama" />
                  <Column header="Koordinat">
                    <template #body="slotProps">
                      <small class="text-muted">{{ slotProps.data.koordinat || '-' }}</small>
                    </template>
                  </Column>
                  <Column header="Aksi">
                    <template #body="slotProps">
                      <div class="text-center">
                        <button class="btn btn-sm btn-primary me-1" @click="viewDetail(slotProps.data)" title="Detail">
                          <i class="bi bi-eye-fill"></i>
                        </button>
                        <button class="btn btn-sm btn-info me-1" @click="viewOnMap(slotProps.data)"
                          title="Lihat di Peta">
                          <i class="bi bi-geo-alt-fill"></i>
                        </button>
                        <button class="btn btn-sm btn-warning me-1" @click="editAsset(slotProps.data)" title="Edit">
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

        <!-- Summary per Desa -->
        <div class="row mt-3">
          <div class="col-md-3" v-for="village in villageSummary" :key="village.name">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ village.name }}</h5>
                <p class="mb-1"><strong>Total Asset:</strong> {{ village.totalAssets }}</p>
                <p class="mb-1"><strong>Total KK:</strong> {{ village.totalKK }}</p>
                <p class="mb-1"><strong>Luas Total:</strong> {{ village.totalArea.toLocaleString() }} m²</p>
                <button class="btn btn-sm btn-primary mt-2" @click="selectVillageFilter(village.name)">
                  <i class="bi bi-filter"></i> Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal fade" id="assetModal" tabindex="-1" aria-labelledby="assetModalLabel" aria-hidden="true"
      ref="assetModalRef">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="assetModalLabel">
              {{ isEditMode ? 'Edit Asset' : 'Tambah Asset Baru' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveAsset">
              <!-- A. Identifikasi Rumah Tangga dan PAP -->
              <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                  <h6 class="mb-0"><strong>A. Identifikasi Rumah Tangga dan PAP</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Kode Enumerator</label>
                      <input type="text" class="form-control" v-model="formData.kodeEnumerator"
                        placeholder="Kode Enumerator" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">ID Rumah Tangga</label>
                      <input type="text" class="form-control" v-model="formData.idRumahTangga"
                        placeholder="ID Rumah Tangga" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Tanggal</label>
                      <input type="date" class="form-control" v-model="formData.tanggal" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Kode Foto Survei</label>
                      <input type="text" class="form-control" v-model="formData.kodeFotoSurvei"
                        placeholder="Kode Foto Survei" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Entitas Terdampak</label>
                      <select class="form-select" v-model="formData.idUnik">
                        <option value="Tanah">Tanah</option>
                        <option value="Rumah">Rumah</option>
                        <option value="Tanaman/Pohon">Tanaman/Pohon</option>
                        <option value="Struktur/Asset">Struktur/Asset</option>
                      </select>
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Koordinat</label>
                      <div class="row g-2">
                        <div class="col-6">
                          <input type="text" class="form-control" v-model="formData.latitude" placeholder="Latitude" />
                        </div>
                        <div class="col-6">
                          <input type="text" class="form-control" v-model="formData.longitude"
                            placeholder="Longitude" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- B. Informasi Kepala Keluarga -->
              <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                  <h6 class="mb-0"><strong>B. Informasi Kepala Keluarga</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Depan</label>
                      <input type="text" class="form-control" v-model="formData.namaDepan" placeholder="Nama Depan" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Tengah</label>
                      <input type="text" class="form-control" v-model="formData.namaTengah" placeholder="Nama Tengah" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Belakang</label>
                      <input type="text" class="form-control" v-model="formData.namaBelakang"
                        placeholder="Nama Belakang" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Ayah</label>
                      <input type="text" class="form-control" v-model="formData.namaAyah" placeholder="Nama Ayah" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Kakek</label>
                      <input type="text" class="form-control" v-model="formData.namaKakek" placeholder="Nama Kakek" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Pasangan</label>
                      <input type="text" class="form-control" v-model="formData.namaPasangan"
                        placeholder="Nama Pasangan" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nomor Telepon</label>
                      <input type="text" class="form-control" v-model="formData.nomorTelepon"
                        placeholder="0812xxxxxxx" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">NIK</label>
                      <input type="text" class="form-control" v-model="formData.nik" placeholder="16 digit NIK"
                        maxlength="16" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Desa</label>
                      <select class="form-select" v-model="formData.desa">
                        <option value="Desa Sorowako">Desa Sorowako</option>
                        <option value="Desa Magani">Desa Magani</option>
                        <option value="Desa Wewangriu">Desa Wewangriu</option>
                        <option value="Desa Nikkel">Desa Nikkel</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Kecamatan</label>
                      <input type="text" class="form-control" v-model="formData.kecamatan" placeholder="Kecamatan" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Kabupaten</label>
                      <input type="text" class="form-control" v-model="formData.kabupaten" placeholder="Kabupaten" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Provinsi</label>
                      <input type="text" class="form-control" v-model="formData.provinsi" placeholder="Provinsi" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Nama Responden</label>
                      <input type="text" class="form-control" v-model="formData.namaResponden"
                        placeholder="Jika berbeda dengan Kepala Keluarga" />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Hubungan Responden dengan KK</label>
                      <select class="form-select" v-model="formData.hubunganRespondenKk">
                        <option value="Pasangan">Pasangan</option>
                        <option value="Anak">Anak</option>
                        <option value="Menantu">Menantu</option>
                        <option value="Cucu">Cucu</option>
                        <option value="Ayah/Ibu">Ayah/Ibu</option>
                        <option value="Mertua">Mertua</option>
                        <option value="Saudara">Saudara</option>
                        <option value="Ipar">Ipar</option>
                        <option value="Kerabat Lain">Kerabat Lain</option>
                        <option value="Sepupu">Sepupu</option>
                        <option value="Bukan Kerabat Lain">Bukan Kerabat Lain</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- C. Profil Dampak -->
              <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                  <h6 class="mb-0"><strong>C. Profil Dampak</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Identifikasi Dampak</label>
                      <select class="form-select" v-model="formData.identifikasiDampak">
                        <option value="Perpindahan Fisik">Perpindahan Fisik</option>
                        <option value="Perpindahan Ekonomi">Perpindahan Ekonomi</option>
                        <option value="Perpindahan Fisik dan Ekonomi">Perpindahan Fisik dan Ekonomi</option>
                        <option value="Terkena dampak tidak langsung dari proyek">Terkena dampak tidak langsung dari
                          proyek
                        </option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3" v-if="formData.identifikasiDampak === 'Lainnya'">
                      <label class="form-label">Identifikasi Dampak Lainnya</label>
                      <input type="text" class="form-control" v-model="formData.identifikasiDampakLainnya"
                        placeholder="Tentukan jenis dampak lainnya" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- D. Profil Sosial Rumah Tangga -->
              <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                  <h6 class="mb-0"><strong>D. Profil Sosial Rumah Tangga</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Agama</label>
                      <select class="form-select" v-model="formData.agama">
                        <option value="">Pilih Agama</option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                    <div class="col-md-4 mb-3" v-if="formData.agama === 'Lainnya'">
                      <label class="form-label">Agama Lainnya</label>
                      <input type="text" class="form-control" v-model="formData.agamaLainnya" placeholder="Tentukan" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Asal Etnis</label>
                      <select class="form-select" v-model="formData.asalEtnis">
                        <option value="">Pilih Asal Etnis</option>
                        <option value="Bugis">Bugis</option>
                        <option value="Makassar">Makassar</option>
                        <option value="Toraja">Toraja</option>
                        <option value="Mandar">Mandar</option>
                        <option value="Tolaki">Tolaki</option>
                        <option value="Moronene">Moronene</option>
                        <option value="Bau-Bau">Bau-Bau</option>
                        <option value="Buton">Buton</option>
                        <option value="Jawa">Jawa</option>
                        <option value="Sunda">Sunda</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3" v-if="formData.asalEtnis === 'Lainnya'">
                      <label class="form-label">Asal Etnis Lainnya</label>
                      <input type="text" class="form-control" v-model="formData.asalEtnisLainnya"
                        placeholder="Tentukan" />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Bahasa</label>
                      <select class="form-select" v-model="formData.bahasa">
                        <option value="">Pilih Bahasa</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Bugis">Bugis</option>
                        <option value="Makassar">Makassar</option>
                        <option value="Toraja">Toraja</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                    <div class="col-md-4 mb-3" v-if="formData.bahasa === 'Lainnya'">
                      <label class="form-label">Bahasa Lainnya</label>
                      <input type="text" class="form-control" v-model="formData.bahasaLainnya" placeholder="Tentukan" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Tempat Asal Kepala Rumah Tangga</label>
                      <select class="form-select" v-model="formData.tempatAsalKk">
                        <option value="">Pilih Tempat Asal</option>
                        <option value="Desa yang Sama">Desa yang Sama</option>
                        <option value="Di luar desa">Di luar desa</option>
                        <option value="Di luar kecamatan">Di luar kecamatan</option>
                        <option value="Di luar kabupaten">Di luar kabupaten</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3"
                      v-if="formData.tempatAsalKk && formData.tempatAsalKk !== 'Desa yang Sama'">
                      <label class="form-label">Tentukan Tempat Asal</label>
                      <input type="text" class="form-control" v-model="formData.tempatAsalTentukan"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- E. Household Demography -->
              <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                  <h6 class="mb-0"><strong>E. Household Demography</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">

                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <label class="form-label">Berapa banyak orang yang tinggal di rumah tangga</label>
                        <input type="number" class="form-control" v-model.number="formData.jumlahOrangRumahTangga"
                          placeholder="0" />
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">No. Anggota</label>
                        <input type="number" class="form-control" v-model.number="formData.noAnggota" placeholder="0" />
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">ID Dampak</label>
                        <input type="text" class="form-control" v-model="formData.idDampak" placeholder="ID Dampak" />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Nama Depan (Anggota)</label>
                        <input type="text" class="form-control" v-model="formData.anggotaNamaDepan"
                          placeholder="Nama Depan" />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Nama Belakang (Anggota)</label>
                        <input type="text" class="form-control" v-model="formData.anggotaNamaBelakang"
                          placeholder="Nama Belakang" />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <label class="form-label">Hubungan dengan KK</label>
                        <select class="form-select" v-model="formData.hubunganKk">
                          <option value="Pasangan">Pasangan</option>
                          <option value="Anak">Anak</option>
                          <option value="Menantu">Menantu</option>
                          <option value="Cucu">Cucu</option>
                          <option value="Ayah/Ibu">Ayah/Ibu</option>
                          <option value="Mertua">Mertua</option>
                          <option value="Saudara">Saudara</option>
                          <option value="Ipar">Ipar</option>
                          <option value="Kerabat Lain">Kerabat Lain</option>
                          <option value="Sepupu">Sepupu</option>
                          <option value="Bukan Kerabat Lain">Bukan Kerabat Lain</option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">Jenis Kelamin</label>
                        <select class="form-select" v-model="formData.jenisKelamin">
                          <option value="">Pilih</option>
                          <option value="1">Laki-laki</option>
                          <option value="2">Perempuan</option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">Usia</label>
                        <input type="number" class="form-control" v-model.number="formData.usia" placeholder="0" />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <label class="form-label">Status Perkawinan</label>
                        <select class="form-select" v-model="formData.statusPerkawinan">
                          <option value="Pasangan">Menikah</option>
                          <option value="Anak">Lajang</option>
                          <option value="Menantu">Dipisahkan</option>
                          <option value="Cucu">Bercerai</option>
                          <option value="Cucu">Janda</option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">Bisa Membaca/Menulis</label>
                        <select class="form-select" v-model="formData.bisaMembacaMenulis">
                          <option value="">Pilih</option>
                          <option value="1">Ya</option>
                          <option value="2">Tidak</option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">Sedang Sekolah</label>
                        <select class="form-select" v-model="formData.sedangSekolah">
                          <option value="">Pilih</option>
                          <option value="1">Ya</option>
                          <option value="2">Tidak</option>
                        </select>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <label class="form-label">Jika sedang sekolah, di mana</label>
                        <select class="form-select" v-model="formData.lokasiSekolah">
                          <option value="">Pilih</option>
                          <option value="Negeri">Negeri</option>
                          <option value="Komunitas">Komunitas</option>
                          <option value="Pribadi">Pribadi</option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">Tingkat Pendidikan Terakhir selesai</label>
                        <select class="form-select" v-model="formData.pendidikanTerakhir">
                          <option value="">Pilih</option>
                          <option value="Dasar">Dasar</option>
                          <option value="Menengah">Tingkat Menengah</option>
                          <option value="Sarjana">Sarjana</option>
                          <option value="Pascasarjana">Pascasarjana</option>
                          <option value="Vokasi">Vokasi</option>
                          <option value="Bukan Usia Sekolah">Bukan Usia Sekolah</option>
                          <option value="Tidak Ada">Tidak Ada</option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">Alasan Penghentian</label>
                        <select class="form-select" v-model="formData.alasanPenghentian">
                          <option value="">Pilih</option>
                          <option value="Tidak ada alasan">Tidak Ada Alasan</option>
                          <option value="Usia">Usia</option>
                          <option value="Kurangnya sumber daya ekonomi">Kurangnya sumber daya ekonomi</option>
                          <option value="Gagal">Gagal</option>
                          <option value="Bekerja">Bekerja</option>
                          <option value="Takut pada guru">Takut pada guru</option>
                          <option value="Penyakit atau cacat">Penyakit atau cacat</option>
                          <option value="Pekerjaan rumah tangga">Pekerjaan rumah tangga</option>
                          <option value="Keluarga tidak mengizinkan belajar">Keluarga tidak mengizinkan belajar</option>
                          <option value="Tidak ada lembaga pendidikan">Tidak ada lembaga pendidikan</option>
                          <option value="Tidak tertarik untuk belajar">Tidak tertarik untuk belajar</option>
                          <option value="Kehamilan">Kehamilan</option>
                          <option value="Jarak">Jarak</option>
                          <option value="Pernikahan">Pernikahan</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Alasan Penghentian Lainnya</label>
                        <input type="text" class="form-control" v-model="formData.alasanPenghentianLainnya"
                          placeholder="Tentukan" />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Disabilitas</label>
                        <select class="form-select" v-model="formData.disabilitas">
                          <option value="">Pilih</option>
                          <option value="1">Tidak</option>
                          <option value="2">Tuna Netra</option>
                          <option value="3">Mobilitas</option>
                          <option value="4">Tuna Wicara</option>
                          <option value="5">Disabilitas Mental</option>
                          <option value="6">Tuna Rungu</option>
                          <option value="7">Lainnya, tentukan</option>
                        </select>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Disabilitas Lainnya</label>
                        <input type="text" class="form-control" v-model="formData.disabilitasLainnya"
                          placeholder="Tentukan" />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Kondisi Kesehatan Kronis</label>
                        <select class="form-select" v-model="formData.kondisiKesehatanKronis">
                          <option value="">Pilih</option>
                          <option value="Diabetes">Diabetes</option>
                          <option value="Kanker">Kanker</option>
                          <option value="HIV-AIDS">HIV-AIDS</option>
                          <option value="Anemia">Anemia</option>
                          <option value="Penyakit pernapasan">Penyakit pernapasan</option>
                          <option value="Arthritis - nyeri tulang">Arthritis - nyeri tulang</option>
                          <option value="Diare">Diare</option>
                          <option value="Gastrointestinal">Gastrointestinal</option>
                          <option value="Asma">Asma</option>
                          <option value="Tuberclosis">Tuberclosis</option>
                          <option value="Tekanan Darah">Tekanan Darah</option>
                          <option value="Tidak ada">Tidak ada</option>
                          <option value="Lainnya, tentukan">Lainnya, tentukan</option>
                        </select>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 mb-3">
                        <label class="form-label">Kesehatan Lainnya</label>
                        <input type="text" class="form-control" v-model="formData.kesehatanLainnya"
                          placeholder="Tentukan" />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <!-- E. Pekerjaan Utama (41-51) -->
              <div class="card mb-3">
                <div class="card-header bg-warning text-dark">
                  <h6 class="mb-0"><strong>E. Pekerjaan Utama</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">41. Bekerja 12 Bulan</label>
                      <input type="text" class="form-control" v-model="formData.bekerja12Bulan"
                        placeholder="Ya/Tidak" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">42. Pekerjaan Utama</label>
                      <input type="text" class="form-control" v-model="formData.pekerjaanUtama"
                        placeholder="Pekerjaan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Pekerjaan Utama (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.pekerjaanUtamaLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">43. Jenis Pekerjaan</label>
                      <input type="text" class="form-control" v-model="formData.jenisPekerjaan" placeholder="Jenis" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">44. Lokasi Pekerjaan</label>
                      <input type="text" class="form-control" v-model="formData.lokasiPekerjaan" placeholder="Lokasi" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Lokasi Pekerjaan (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.lokasiPekerjaanLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">45. Jumlah Bulan Bekerja</label>
                      <input type="number" class="form-control" v-model.number="formData.jumlahBulanBekerja"
                        placeholder="0" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">46. Penghasilan per Bulan</label>
                      <input type="number" class="form-control" v-model.number="formData.penghasilanPerBulan"
                        placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>



              <!-- E. Pekerjaan Sekunder (47-50) -->
              <div class="card mb-3">
                <div class="card-header bg-warning text-dark">
                  <h6 class="mb-0"><strong>E. Pekerjaan Sekunder (Jika ada)</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">47. Pekerjaan Sekunder</label>
                      <input type="text" class="form-control" v-model="formData.pekerjaanSekunder"
                        placeholder="Pekerjaan sekunder" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Pekerjaan Sekunder (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.pekerjaanSekunderLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">48. Lokasi Sekunder</label>
                      <input type="text" class="form-control" v-model="formData.lokasiPekerjaanSekunder"
                        placeholder="Lokasi" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Lokasi Sekunder (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.lokasiPekerjaanSekunderLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">49. Jumlah Bulan Sekunder</label>
                      <input type="number" class="form-control" v-model.number="formData.jumlahBulanBekerjaSekunder"
                        placeholder="0" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">50. Penghasilan Sekunder</label>
                      <input type="number" class="form-control" v-model.number="formData.penghasilanSekunderPerBulan"
                        placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Keterampilan (51) -->
              <div class="card mb-3">
                <div class="card-header bg-info text-white">
                  <h6 class="mb-0"><strong>Keterampilan/Profesi</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">51. Keterampilan/Profesi</label>
                      <textarea class="form-control" v-model="formData.keterampilan" rows="2"
                        placeholder="Keterampilan"></textarea>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Keterampilan (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.keterampilanLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- F. Kesehatan & Pangan (55-58) -->
              <div class="card mb-3">
                <div class="card-header bg-success text-white">
                  <h6 class="mb-0"><strong>F. Kesehatan & Pangan</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-12">
                      <label class="form-label">55. Penyakit Umum</label>
                      <textarea class="form-control" v-model="formData.penyakitUmum" rows="2"
                        placeholder="Penyakit umum"></textarea>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">56. Tempat Pelayanan</label>
                      <input type="text" class="form-control" v-model="formData.tempatPelayanan"
                        placeholder="Tempat pelayanan kesehatan" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">57. Kecukupan Pangan</label>
                      <input type="text" class="form-control" v-model="formData.kecukupanPangan"
                        placeholder="Kecukupan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-12">
                      <label class="form-label">58. Defisit Pangan</label>
                      <textarea class="form-control" v-model="formData.defisitPangan" rows="2"
                        placeholder="Defisit pangan"></textarea>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-12">
                      <label class="form-label">Defisit Pangan (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.defisitPanganLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- G. Keuangan (59-66) -->
              <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                  <h6 class="mb-0"><strong>G. Keuangan</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">59. Penghasilan Tahunan</label>
                      <input type="number" class="form-control" v-model.number="formData.penghasilanTahunan"
                        placeholder="0" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">60. Pengeluaran Bulanan</label>
                      <input type="number" class="form-control" v-model.number="formData.pengeluaranBulanan"
                        placeholder="0" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">61. Rekening Bank</label>
                      <input type="text" class="form-control" v-model="formData.rekeningBank" placeholder="Ya/Tidak" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">62. Tabungan</label>
                      <input type="text" class="form-control" v-model="formData.tabungan" placeholder="Tabungan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">63. Hutang</label>
                      <input type="text" class="form-control" v-model="formData.hutang" placeholder="Hutang" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">64. Tabungan Detail</label>
                      <input type="text" class="form-control" v-model="formData.tabunganDetail"
                        placeholder="Detail tabungan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Tabungan (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.tabunganLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">65. Hutang Detail</label>
                      <input type="text" class="form-control" v-model="formData.hutangDetail"
                        placeholder="Detail hutang" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Hutang (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.hutangLainnya" placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-12">
                      <label class="form-label">66. Alasan Hutang</label>
                      <textarea class="form-control" v-model="formData.alasanHutang" rows="2"
                        placeholder="Alasan hutang"></textarea>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-12">
                      <label class="form-label">Alasan Hutang (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.alasanHutangLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- H. Dampak Pembebasan Lahan (67-70) -->
              <div class="card mb-3">
                <div class="card-header bg-danger text-white">
                  <h6 class="mb-0"><strong>H. Dampak Pembebasan Lahan</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">67. Pernah Dampak Proyek</label>
                      <select class="form-select" v-model="formData.pernahDampakProyek">
                        <option value="">Pilih</option>
                        <option value="1">Ya</option>
                        <option value="2">Tidak</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">68. Jenis Proyek</label>
                      <input type="text" class="form-control" v-model="formData.jenisProyek"
                        placeholder="Jenis proyek" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Jenis Proyek (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.jenisProyekLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">69. Luas Lahan (m²)</label>
                      <input type="number" class="form-control" v-model.number="formData.luasLahanDibebaskan"
                        placeholder="0" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">70. Pernah Pengungsi</label>
                      <select class="form-select" v-model="formData.pernahPengungsi">
                        <option value="">Pilih</option>
                        <option value="1">Ya</option>
                        <option value="2">Tidak</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- I. Bisnis/Usaha (71-78) -->
              <div class="card mb-3">
                <div class="card-header bg-info text-white">
                  <h6 class="mb-0"><strong>I. Usaha Komersial/Bisnis</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">71. Punya Bisnis</label>
                      <select class="form-select" v-model="formData.punyaBisnis">
                        <option value="">Pilih</option>
                        <option value="1">Ya</option>
                        <option value="2">Tidak</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">72. Lokasi Bisnis</label>
                      <input type="text" class="form-control" v-model="formData.lokasiBisnis" placeholder="Lokasi" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Lokasi Bisnis (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.lokasiBisnisLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">73. Kepemilikan Bisnis</label>
                      <input type="text" class="form-control" v-model="formData.kepemilikanBisnis"
                        placeholder="Kepemilikan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Kepemilikan (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.kepemilikanBisnisLainnya"
                        placeholder="Tentukan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">74. Sejak Kapan Bisnis</label>
                      <input type="text" class="form-control" v-model="formData.sejakKapanBisnis"
                        placeholder="Tahun/Bulan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">75. Jenis Bisnis</label>
                      <input type="text" class="form-control" v-model="formData.jenisBisnis" placeholder="Jenis" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Jenis Bisnis (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.jenisBisnisLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">76. Jumlah Pegawai</label>
                      <input type="number" class="form-control" v-model.number="formData.jumlahPegawai"
                        placeholder="0" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">77. Pendapatan Rata Bisnis</label>
                      <input type="number" class="form-control" v-model.number="formData.pendapatanRataBisnis"
                        placeholder="0" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-12">
                      <label class="form-label">78. Deskripsi Produk</label>
                      <textarea class="form-control" v-model="formData.deskripsiProdukLayanan" rows="2"
                        placeholder="Deskripsi"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- J. Perumahan (79-83) -->
              <div class="card mb-3">
                <div class="card-header bg-secondary text-white">
                  <h6 class="mb-0"><strong>J. Struktur Tempat Tinggal</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">79. Tipe Rumah</label>
                      <input type="text" class="form-control" v-model="formData.tipeRumah" placeholder="Tipe" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Tipe Rumah (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.tipeRumahLainnya"
                        placeholder="Tentukan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">80. Pelayanan Listrik</label>
                      <input type="text" class="form-control" v-model="formData.pelayananListrik"
                        placeholder="Pelayanan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Pelayanan Listrik (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.pelayananListrikLainnya"
                        placeholder="Tentukan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">81. Sumber Air</label>
                      <input type="text" class="form-control" v-model="formData.sumberAir" placeholder="Sumber" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Sumber Air (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.sumberAirLainnya"
                        placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">82. Sanitasi</label>
                      <input type="text" class="form-control" v-model="formData.sanitasi" placeholder="Sanitasi" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">83. Karakteristik Khusus</label>
                      <textarea class="form-control" v-model="formData.karakteristikKhusus" rows="2"
                        placeholder="Karakteristik"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sumber Informasi & Komunikasi (88-89) -->
              <div class="card mb-3">
                <div class="card-header bg-dark text-white">
                  <h6 class="mb-0"><strong>Sumber Informasi & Komunikasi</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">88. Sumber Informasi</label>
                      <input type="text" class="form-control" v-model="formData.sumberInformasi"
                        placeholder="Sumber informasi" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">89. Metode Komunikasi</label>
                      <input type="text" class="form-control" v-model="formData.metodeKomunikasi"
                        placeholder="Metode" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Metadata -->
              <div class="card mb-3">
                <div class="card-header bg-secondary text-white">
                  <h6 class="mb-0"><strong>Metadata Survei</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Disurvei oleh</label>
                      <input type="text" class="form-control" v-model="formData.surveyedBy"
                        placeholder="Nama enumerator" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Catatan</label>
                      <textarea class="form-control" v-model="formData.notes" rows="2"
                        placeholder="Catatan tambahan"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  <i class="bi bi-x-circle"></i> Batal
                </button>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  <i class="bi bi-save"></i> {{ loading ? 'Memproses...' : (isEditMode ? 'Update' : 'Simpan') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

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
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { assetApi, censusQuestionsApi } from '../api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

interface Asset {
  id: number
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
let assetMap: L.Map | null = null
let modalInstance: any = null
let detailModalInstance: any = null

// Form state
const isEditMode = ref<boolean>(false)
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

// API data
const assets = ref<Asset[]>([])
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

// Fetch assets from API
const fetchAssets = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await assetApi.getAll()
    assets.value = response.results.map((asset: any) => ({
      id: asset.id,
      created_at: asset.created_at,
      updated_at: asset.updated_at,
      // A. Identifikasi Rumah Tangga dan PAP
      kode_enumerator: asset.kode_enumerator,
      id_rumah_tangga: asset.id_rumah_tangga,
      tanggal: asset.tanggal,
      kode_foto_survei: asset.kode_foto_survei,
      id_unik: asset.id_unik,
      koordinat: asset.koordinat,
      // B. Informasi Kepala Keluarga
      nama_depan: asset.nama_depan,
      nama_tengah: asset.nama_tengah,
      nama_belakang: asset.nama_belakang,
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
    }))
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

const villageSummary = computed(() => {
  const villages = ['Desa Sorowako', 'Desa Magani', 'Desa Wewangriu', 'Desa Nikkel']
  return villages.map(village => {
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
  filteredAssets.value.forEach(asset => {
    // Parse coordinates from "lat, lng" format
    let lat = -2.565, lng = 121.345 // default coordinates
    if (asset.koordinat) {
      const parts = asset.koordinat.split(',').map(c => parseFloat(c.trim()))
      if (parts.length === 2 && parts[0] !== undefined && !isNaN(parts[0]) && parts[1] !== undefined && !isNaN(parts[1])) {
        lat = parts[0]
        lng = parts[1]
      }
    }

    const houseIcon = L.divIcon({
      className: 'custom-house-marker',
      html: `<div style="background: #dc3545; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    })

    const marker = L.marker([lat, lng], { icon: houseIcon }).addTo(assetMap!)

    const fullName = [asset.nama_depan, asset.nama_tengah, asset.nama_belakang].filter(Boolean).join(' ') || '-'

    marker.bindPopup(`
      <div style="min-width: 200px;">
        <h6><strong>${fullName}</strong></h6>
        <p class="mb-1"><small><strong>ID RT:</strong> ${asset.id_rumah_tangga || '-'}</small></p>
        <p class="mb-1"><small><strong>Desa:</strong> ${asset.desa || '-'}</small></p>
        <p class="mb-0"><small><strong>Pekerjaan:</strong> ${asset.pekerjaan_utama || '-'}</small></p>
      </div>
    `)
  })

  // Draw IUPK Valemis boundary (larger area encompassing all villages)
  const iupkBoundary: [number, number][] = [
    [-2.556, 121.338],  // Northwest corner
    [-2.556, 121.353],  // Northeast corner
    [-2.574, 121.353],  // Southeast corner
    [-2.574, 121.338],  // Southwest corner
    [-2.556, 121.338]   // Close the polygon
  ]

  L.polygon(iupkBoundary, {
    color: '#0d6efd',        // Blue border
    weight: 3,               // Thicker border for visibility
    fillColor: '#0d6efd',    // Blue fill
    fillOpacity: 0.05,       // Very low opacity to not obscure villages
    dashArray: '10, 5'       // Dashed line for distinction
  }).addTo(assetMap!).bindPopup(`
    <div style="min-width: 200px;">
      <h6><strong>Area IUPK Valemis</strong></h6>
      <p class="mb-1"><small>Izin Usaha Pertambangan Khusus</small></p>
      <p class="mb-0"><small>Mencakup 4 desa: Sorowako, Magani, Wewangriu, Nikkel</small></p>
    </div>
  `)

  // Draw village polygons
  const villagePolygons: Record<string, [number, number][]> = {
    'Desa Sorowako': [[-2.558, 121.340], [-2.559, 121.344], [-2.562, 121.345], [-2.563, 121.343], [-2.561, 121.339], [-2.559, 121.339], [-2.558, 121.340]],
    'Desa Magani': [[-2.559, 121.345], [-2.560, 121.349], [-2.563, 121.350], [-2.564, 121.347], [-2.562, 121.344], [-2.560, 121.344], [-2.559, 121.345]],
    'Desa Wewangriu': [[-2.567, 121.341], [-2.568, 121.345], [-2.571, 121.346], [-2.572, 121.343], [-2.570, 121.340], [-2.568, 121.340], [-2.567, 121.341]],
    'Desa Nikkel': [[-2.568, 121.347], [-2.569, 121.351], [-2.572, 121.352], [-2.573, 121.349], [-2.571, 121.346], [-2.569, 121.346], [-2.568, 121.347]]
  }

  Object.entries(villagePolygons).forEach(([villageName, coords]) => {
    if (selectedVillage.value === 'all' || selectedVillage.value === villageName) {
      L.polygon(coords, {
        color: '#dc3545',
        weight: 2,
        fillColor: '#dc3545',
        fillOpacity: 0.1
      }).addTo(assetMap!).bindPopup(`<strong>${villageName}</strong>`)
    }
  })
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
  formData.value = {
    id: asset.id,
    // A. Identifikasi Rumah Tangga dan PAP
    kodeEnumerator: asset.kode_enumerator || '',
    idRumahTangga: asset.id_rumah_tangga || '',
    tanggal: asset.tanggal || '',
    kodeFotoSurvei: asset.kode_foto_survei || '',
    idUnik: asset.id_unik || '',
    koordinat: asset.koordinat || '',
    latitude: asset.koordinat ? asset.koordinat.split(',')[0]?.trim() || '' : '',
    longitude: asset.koordinat ? asset.koordinat.split(',')[1]?.trim() || '' : '',
    // B. Informasi Kepala Keluarga
    namaDepan: asset.nama_depan || '',
    namaTengah: asset.nama_tengah || '',
    namaBelakang: asset.nama_belakang || '',
    namaAyah: asset.nama_ayah || '',
    namaKakek: asset.nama_kakek || '',
    namaPasangan: asset.nama_pasangan || '',
    nomorTelepon: asset.nomor_telepon || '',
    nik: asset.nik || '',
    desa: asset.desa || '',
    kecamatan: asset.kecamatan || '',
    kabupaten: asset.kabupaten || '',
    provinsi: asset.provinsi || '',
    namaResponden: asset.nama_responden || '',
    hubunganRespondenKk: asset.hubungan_responden_kk || '',
    agama: asset.agama || '',
    agamaLainnya: asset.agama_lainnya || '',
    asalEtnis: asset.asal_etnis || '',
    asalEtnisLainnya: asset.asal_etnis_lainnya || '',
    bahasa: asset.bahasa || '',
    bahasaLainnya: asset.bahasa_lainnya || '',
    tempatAsalKk: asset.tempat_asal_kk || '',
    tempatAsalTentukan: asset.tempat_asal_tentukan || '',
    jumlahOrangRumahTangga: asset.jumlah_orang_rumah_tangga || undefined,
    noAnggota: asset.no_anggota || undefined,
    idDampak: asset.id_dampak || '',
    anggotaNamaDepan: asset.anggota_nama_depan || '',
    anggotaNamaBelakang: asset.anggota_nama_belakang || '',
    hubunganKk: asset.hubungan_kk || '',
    jenisKelamin: asset.jenis_kelamin || '',
    usia: asset.usia || undefined,
    statusPerkawinan: asset.status_perkawinan || '',
    bisaMembacaMenulis: asset.bisa_membaca_menulis || '',
    sedangSekolah: asset.sedang_sekolah || '',
    lokasiSekolah: asset.lokasi_sekolah || '',
    pendidikanTerakhir: asset.pendidikan_terakhir || '',
    alasanPenghentian: asset.alasan_penghentian || '',
    alasanPenghentianLainnya: asset.alasan_penghentian_lainnya || '',
    disabilitas: asset.disabilitas || '',
    disabilitasLainnya: asset.disabilitas_lainnya || '',
    kondisiKesehatanKronis: asset.kondisi_kesehatan_kronis || '',
    kesehatanLainnya: asset.kesehatan_lainnya || '',
    bekerja12Bulan: asset.bekerja_12_bulan || '',
    pekerjaanUtama: asset.pekerjaan_utama || '',
    pekerjaanUtamaLainnya: asset.pekerjaan_utama_lainnya || '',
    jenisPekerjaan: asset.jenis_pekerjaan || '',
    lokasiPekerjaan: asset.lokasi_pekerjaan || '',
    lokasiPekerjaanLainnya: asset.lokasi_pekerjaan_lainnya || '',
    jumlahBulanBekerja: asset.jumlah_bulan_bekerja || undefined,
    penghasilanPerBulan: asset.penghasilan_per_bulan || undefined,
    pekerjaanSekunder: asset.pekerjaan_sekunder || '',
    pekerjaanSekunderLainnya: asset.pekerjaan_sekunder_lainnya || '',
    lokasiPekerjaanSekunder: asset.lokasi_pekerjaan_sekunder || '',
    lokasiPekerjaanSekunderLainnya: asset.lokasi_pekerjaan_sekunder_lainnya || '',
    jumlahBulanBekerjaSekunder: asset.jumlah_bulan_bekerja_sekunder || undefined,
    penghasilanSekunderPerBulan: asset.penghasilan_sekunder_per_bulan || undefined,
    keterampilan: asset.keterampilan || '',
    keterampilanLainnya: asset.keterampilan_lainnya || '',
    penyakitUmum: asset.penyakit_umum || '',
    tempatPelayanan: asset.tempat_pelayanan || '',
    kecukupanPangan: asset.kecukupan_pangan || '',
    defisitPangan: asset.defisit_pangan || '',
    defisitPanganLainnya: asset.defisit_pangan_lainnya || '',
    penghasilanTahunan: asset.penghasilan_tahunan || undefined,
    pengeluaranBulanan: asset.pengeluaran_bulanan || undefined,
    rekeningBank: asset.rekening_bank || '',
    tabungan: asset.tabungan || '',
    hutang: asset.hutang || '',
    tabunganDetail: asset.tabungan_detail || '',
    tabunganLainnya: asset.tabungan_lainnya || '',
    hutangDetail: asset.hutang_detail || '',
    hutangLainnya: asset.hutang_lainnya || '',
    alasanHutang: asset.alasan_hutang || '',
    alasanHutangLainnya: asset.alasan_hutang_lainnya || '',
    pernahDampakProyek: asset.pernah_dampak_proyek || '',
    jenisProyek: asset.jenis_proyek || '',
    jenisProyekLainnya: asset.jenis_proyek_lainnya || '',
    luasLahanDibebaskan: asset.luas_lahan_dibebaskan || undefined,
    pernahPengungsi: asset.pernah_pengungsi || '',
    punyaBisnis: asset.punya_bisnis || '',
    lokasiBisnis: asset.lokasi_bisnis || '',
    lokasiBisnisLainnya: asset.lokasi_bisnis_lainnya || '',
    kepemilikanBisnis: asset.kepemilikan_bisnis || '',
    kepemilikanBisnisLainnya: asset.kepemilikan_bisnis_lainnya || '',
    sejakKapanBisnis: asset.sejak_kapan_bisnis || '',
    jenisBisnis: asset.jenis_bisnis || '',
    jenisBisnisLainnya: asset.jenis_bisnis_lainnya || '',
    jumlahPegawai: asset.jumlah_pegawai || undefined,
    pendapatanRataBisnis: asset.pendapatan_rata_bisnis || undefined,
    deskripsiProdukLayanan: asset.deskripsi_produk_layanan || '',
    tipeRumah: asset.tipe_rumah || '',
    tipeRumahLainnya: asset.tipe_rumah_lainnya || '',
    pelayananListrik: asset.pelayanan_listrik || '',
    pelayananListrikLainnya: asset.pelayanan_listrik_lainnya || '',
    sumberAir: asset.sumber_air || '',
    sumberAirLainnya: asset.sumber_air_lainnya || '',
    sanitasi: asset.sanitasi || '',
    karakteristikKhusus: asset.karakteristik_khusus || '',
    sumberInformasi: asset.sumber_informasi || '',
    metodeKomunikasi: asset.metode_komunikasi || '',
    surveyedBy: asset.surveyed_by || '',
    notes: asset.notes || ''
  }
  openModal()
}

const saveAsset = async () => {
  loading.value = true

  try {
    const assetData: any = {
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
      await assetApi.update(formData.value.id, assetData)
      alert('Data berhasil diupdate!')
    } else {
      // Add new asset - call API
      await assetApi.create(assetData)
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
      await assetApi.delete(asset.id)

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

// View detail modal
const viewDetail = (asset: Asset) => {
  selectedAsset.value = asset
  nextTick(() => {
    if (detailModalRef.value) {
      const Modal = (window as any).bootstrap?.Modal
      if (Modal) {
        detailModalInstance = new Modal(detailModalRef.value)
        detailModalInstance.show()
      } else {
        detailModalRef.value.classList.add('show')
        detailModalRef.value.style.display = 'block'
        document.body.classList.add('modal-open')
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
const exportToCsv = async () => {
  try {
    await assetApi.exportCsv()
    alert('Data berhasil didownload dalam format CSV!')
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
