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
                    <small class="text-white">Total asset untuk {{ selectedVillage === 'all' ? 'semua desa' : selectedVillage }}</small>
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
                  <button class="btn btn-primary btn-sm" @click="addAsset">
                    <i class="bi bi-plus-circle"></i> Tambah Asset
                  </button>
                </div>
              </div>
              <div class="card-body table-responsive">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode Asset</th>
                      <th>Nama Pemilik</th>
                      <th>Desa</th>
                      <th>Luas Tanah (m²)</th>
                      <th>Luas Bangunan (m²)</th>
                      <th>Status Sertifikat</th>
                      <th>Koordinat</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(asset, index) in filteredAssets" :key="asset.id">
                      <td>{{ index + 1 }}</td>
                      <td><span class="badge bg-primary">{{ asset.code }}</span></td>
                      <td><strong>{{ asset.owner_name }}</strong></td>
                      <td>{{ asset.village }}</td>
                      <td class="text-end">{{ asset.land_area.toLocaleString() }}</td>
                      <td class="text-end">{{ asset.building_area.toLocaleString() }}</td>
                      <td>
                        <span class="badge" :class="getCertificateClass(asset.certificate_status)">
                          {{ asset.certificate_status }}
                        </span>
                      </td>
                      <td><small class="text-muted">{{ asset.coordinates }}</small></td>
                      <td class="text-center">
                        <button class="btn btn-sm btn-primary me-1" @click="viewDetail(asset)" title="Detail">
                          <i class="bi bi-eye-fill"></i>
                        </button>
                        <button class="btn btn-sm btn-info me-1" @click="viewOnMap(asset)" title="Lihat di Peta">
                          <i class="bi bi-geo-alt-fill"></i>
                        </button>
                        <button class="btn btn-sm btn-warning me-1" @click="editAsset(asset)" title="Edit">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" @click="deleteAsset(asset)" title="Hapus">
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
    <div class="modal fade" id="assetModal" tabindex="-1" aria-labelledby="assetModalLabel" aria-hidden="true" ref="assetModalRef">
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
              <!-- Basic Asset Information -->
              <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                  <h6 class="mb-0"><strong>Informasi Dasar Asset</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Kode Asset</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.code" 
                        placeholder="Contoh: AST-SRW-001"
                        :disabled="isEditMode"
                        required 
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Nama Pemilik</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.ownerName" 
                        placeholder="Nama lengkap pemilik"
                        required 
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Desa</strong> <span class="text-danger">*</span></label>
                      <select class="form-select" v-model="formData.village" required>
                        <option value="">Pilih Desa</option>
                        <option value="Desa Sorowako">Desa Sorowako</option>
                        <option value="Desa Magani">Desa Magani</option>
                        <option value="Desa Wewangriu">Desa Wewangriu</option>
                        <option value="Desa Nikkel">Desa Nikkel</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Status Sertifikat</strong> <span class="text-danger">*</span></label>
                      <select class="form-select" v-model="formData.certificateStatus" required>
                        <option value="">Pilih Status</option>
                        <option value="SHM">SHM (Sertifikat Hak Milik)</option>
                        <option value="SHGB">SHGB (Sertifikat Hak Guna Bangunan)</option>
                        <option value="Girik">Girik</option>
                        <option value="Belum Sertifikat">Belum Sertifikat</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Luas Tanah (m²)</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="number" 
                        class="form-control" 
                        v-model.number="formData.landArea" 
                        placeholder="Contoh: 500"
                        min="1"
                        required 
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Luas Bangunan (m²)</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="number" 
                        class="form-control" 
                        v-model.number="formData.buildingArea" 
                        placeholder="Contoh: 120"
                        min="1"
                        required 
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Latitude</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.lat" 
                        placeholder="Contoh: -2.5595"
                        required 
                      />
                      <small class="text-muted">Format: -2.5595</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Longitude</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.lng" 
                        placeholder="Contoh: 121.3415"
                        required 
                      />
                      <small class="text-muted">Format: 121.3415</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Identitas Kepala Keluarga -->
              <div class="card mb-3">
                <div class="card-header bg-light">
                  <h6 class="mb-0"><strong>Form Identitas Kepala Keluarga</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Depan</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaDepan" 
                        placeholder="Nama Depan"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Tengah</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaTengah" 
                        placeholder="Nama Tengah"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Belakang</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaBelakang" 
                        placeholder="Nama Belakang"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Ayah</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaAyah" 
                        placeholder="Nama Ayah"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Kakek</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaKakek" 
                        placeholder="Nama Kakek"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Pasangan</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaPasangan" 
                        placeholder="Nama Pasangan"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nomor Telepon</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.nomorTelepon" 
                        placeholder="0812xxxxxxx"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">NIK</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.nik" 
                        placeholder="16 digit NIK"
                        maxlength="16"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Kecamatan</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.kecamatan" 
                        placeholder="Kecamatan"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Kabupaten</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.kabupaten" 
                        placeholder="Kabupaten"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Provinsi</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.provinsi" 
                        placeholder="Provinsi"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Responden</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaResponden" 
                        placeholder="Jika berbeda dengan Kepala Keluarga"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Hubungan Responden dengan Kepala Keluarga</label>
                      <select class="form-select" v-model="formData.hubunganResponden">
                        <option value="">Pilih hubungan</option>
                        <option value="Kepala Keluarga">Kepala Keluarga</option>
                        <option value="Istri/Suami">Istri/Suami</option>
                        <option value="Anak">Anak</option>
                        <option value="Orang Tua">Orang Tua</option>
                        <option value="Saudara">Saudara</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- A. Identifikasi Rumah Tangga dan PAP -->
              <div class="card mb-3">
                <div class="card-header bg-light">
                  <h6 class="mb-0"><strong>A. Identifikasi Rumah Tangga dan PAP</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3 mb-3">
                      <label class="form-label">1. Kode Enumerator</label>
                      <input type="text" class="form-control" v-model="formData.kodeEnumerator" placeholder="Kode Enumerator" />
                    </div>
                    <div class="col-md-3 mb-3">
                      <label class="form-label">2. ID Rumah Tangga</label>
                      <input type="text" class="form-control" v-model="formData.idRumahTangga" placeholder="ID Rumah Tangga" />
                    </div>
                    <div class="col-md-3 mb-3">
                      <label class="form-label">3. Tanggal (DD/MM/YYYY)</label>
                      <input type="date" class="form-control" v-model="formData.tanggalSurvei" />
                    </div>
                    <div class="col-md-3 mb-3">
                      <label class="form-label">4. Kode Foto Survei</label>
                      <input type="text" class="form-control" v-model="formData.kodeFotoSurvei" placeholder="Kode Foto Survei" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">5. ID Unik (ID Entitas Terdampak)</label>
                      <input type="text" class="form-control" v-model="formData.idUnik" placeholder="ID Unik" />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">29. Jumlah Orang dalam Rumah Tangga</label>
                      <input type="number" class="form-control" v-model.number="formData.jumlahOrangRumahTangga" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- B. Data Sensus - Profil Sosial -->
              <div class="card mb-3">
                <div class="card-header bg-info text-white">
                  <h6 class="mb-0"><strong>B. Profil Sosial & Identifikasi</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-3">
                      <label class="form-label">Identifikasi Dampak</label>
                      <select class="form-select" v-model="formData.identifikasiDampak">
                        <option value="">Pilih</option><option v-for="opt in getOptions(4)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Agama</label>
                      <select class="form-select" v-model="formData.agama" @change="formData.agamaLainnya = ''">
                        <option value="">Pilih</option><option v-for="opt in getOptions(5)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Agama (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.agamaLainnya" :disabled="formData.agama !== '97. lainnya'" placeholder="Tentukan" />
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Asal Etnis</label>
                      <select class="form-select" v-model="formData.asalEtnis">
                        <option value="">Pilih</option><option v-for="opt in getOptions(6)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Asal Etnis (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.asalEtnisLainnya" placeholder="Tentukan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Bahasa</label>
                      <select class="form-select" v-model="formData.bahasa">
                        <option value="">Pilih</option><option v-for="opt in getOptions(7)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Bahasa (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.bahasaLainnya" placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Tempat Asal KK</label>
                      <select class="form-select" v-model="formData.tempatAsalKkTentukan">
                        <option value="">Pilih</option>
                        <option value="1">Desa yang Sama</option>
                        <option value="2">Di luar desa</option>
                        <option value="3">Di luar kecamatan</option>
                        <option value="4">Di luar kabupaten</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Tempat Asal (Tentukan)</label>
                      <input type="text" class="form-control" v-model="formData.tempatAsalKkTentukan" placeholder="Tentukan lokasi" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- C. Demografi -->
              <div class="card mb-3">
                <div class="card-header bg-secondary text-white">
                  <h6 class="mb-0"><strong>C. Demografi</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-3">
                      <label class="form-label">Jenis Kelamin</label>
                      <select class="form-select" v-model="formData.jenisKelamin">
                        <option value="">Pilih</option><option v-for="opt in getOptions(10)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Usia</label>
                      <input type="number" class="form-control" v-model.number="formData.usia" placeholder="0" />
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Status Perkawinan</label>
                      <select class="form-select" v-model="formData.statusPerkawinan">
                        <option value="">Pilih</option><option v-for="opt in getOptions(11)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Pendidikan Terakhir</label>
                      <select class="form-select" v-model="formData.pendidikanTerakhir">
                        <option value="">Pilih</option><option v-for="opt in getOptions(15)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Bekerja 12 Bulan</label>
                      <select class="form-select" v-model="formData.bekerja12Bulan">
                        <option value="">Pilih</option><option v-for="opt in getOptions(19)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Disabilitas</label>
                      <select class="form-select" v-model="formData.disabilitas">
                        <option value="">Pilih</option><option v-for="opt in getOptions(17)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- D. Pekerjaan Utama -->
              <div class="card mb-3">
                <div class="card-header bg-warning text-dark">
                  <h6 class="mb-0"><strong>D. Pekerjaan Utama</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Pekerjaan Utama</label>
                      <select class="form-select" v-model="formData.pekerjaanUtama">
                        <option value="">Pilih</option><option v-for="opt in getOptions(20)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Pekerjaan (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.pekerjaanUtamaLainnya" placeholder="Tentukan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Jenis Pekerjaan</label>
                      <select class="form-select" v-model="formData.jenisPekerjaan">
                        <option value="">Pilih</option><option v-for="opt in getOptions(21)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Lokasi Pekerjaan</label>
                      <select class="form-select" v-model="formData.lokasiPekerjaanLainnya">
                        <option value="">Pilih</option><option v-for="opt in getOptions(44)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Lokasi (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.lokasiPekerjaanLainnya" placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Jumlah Bulan Bekerja (per tahun)</label>
                      <input type="number" class="form-control" v-model.number="formData.jumlahBulanBekerja" placeholder="0" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Penghasilan per Bulan</label>
                      <input type="number" class="form-control" v-model.number="formData.penghasilanPerBulan" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- E. Pekerjaan Sekunder -->
              <div class="card mb-3">
                <div class="card-header bg-warning text-dark">
                  <h6 class="mb-0"><strong>E. Pekerjaan Sekunder (Jika ada)</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Pekerjaan Sekunder</label>
                      <input type="text" class="form-control" v-model="formData.pekerjaanSekunder" placeholder="Pekerjaan sekunder" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Pekerjaan (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.pekerjaanSekunderLainnya" placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Lokasi Pekerjaan Sekunder</label>
                      <input type="text" class="form-control" v-model="formData.lokasiPekerjaanSekunder" placeholder="Lokasi" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Lokasi (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.lokasiPekerjaanSekunderLainnya" placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Jumlah Bulan Bekerja</label>
                      <input type="number" class="form-control" v-model.number="formData.jumlahBulanBekerjaSekunder" placeholder="0" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Penghasilan Sekunder per Bulan</label>
                      <input type="number" class="form-control" v-model.number="formData.penghasilanSekunderPerBulan" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- F. Kesehatan & Pangan -->
              <div class="card mb-3">
                <div class="card-header bg-success text-white">
                  <h6 class="mb-0"><strong>F. Kesehatan & Pangan</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Kecukupan Pangan</label>
                      <select class="form-select" v-model="formData.kecukupanPangan">
                        <option value="">Pilih</option><option v-for="opt in getOptions(57)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Cara Menutupi Defisit (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.defisitPanganLainnya" placeholder="Tentukan" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- G. Keuangan -->
              <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                  <h6 class="mb-0"><strong>G. Keuangan</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Penghasilan Tahunan</label>
                      <input type="number" class="form-control" v-model.number="formData.penghasilanTahunan" placeholder="0" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Pengeluaran Bulanan</label>
                      <input type="number" class="form-control" v-model.number="formData.pengeluaranBulanan" placeholder="0" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Rekening Bank</label>
                      <select class="form-select" v-model="formData.rekeningBank">
                        <option value="">Pilih</option><option v-for="opt in getOptions(32)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Tabungan (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.tabunganLainnya" placeholder="Tentukan jenis tabungan" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Hutang (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.hutangLainnya" placeholder="Tentukan jenis hutang" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- H. Dampak Pembebasan Lahan -->
              <div class="card mb-3">
                <div class="card-header bg-danger text-white">
                  <h6 class="mb-0"><strong>H. Dampak Pembebasan Lahan</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-3">
                      <label class="form-label">Pernah Dampak Proyek Lain?</label>
                      <select class="form-select" v-model="formData.pernahDampakProyek">
                        <option value="">Pilih</option>
                        <option value="1">Ya</option>
                        <option value="2">Tidak</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Jenis Proyek (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.jenisProyekLain" placeholder="Tentukan" />
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Luas Lahan Dibebaskan (m²)</label>
                      <input type="number" class="form-control" v-model.number="formData.luasLahanDibebaskan" placeholder="0" />
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Pernah Pengungsi?</label>
                      <select class="form-select" v-model="formData.pernahPengungsi">
                        <option value="">Pilih</option>
                        <option value="1">Ya</option>
                        <option value="2">Tidak</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- I. Bisnis/Usaha -->
              <div class="card mb-3">
                <div class="card-header bg-info text-white">
                  <h6 class="mb-0"><strong>I. Usaha Komersial/Bisnis</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-3">
                      <label class="form-label">Punya Bisnis?</label>
                      <select class="form-select" v-model="formData.punyaBisnis">
                        <option value="">Pilih</option>
                        <option value="1">Ya</option>
                        <option value="2">Tidak</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Sejak Kapan Bisnis Aktif?</label>
                      <input type="text" class="form-control" v-model="formData.sejakKapanBisnis" placeholder="Tahun/Bulan" />
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Jumlah Pegawai</label>
                      <input type="number" class="form-control" v-model.number="formData.jumlahPegawai" placeholder="0" />
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Pendapatan Rata-rata (per bulan)</label>
                      <input type="number" class="form-control" v-model.number="formData.pendapatanRataBisnis" placeholder="0" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Deskripsi Produk dan Layanan</label>
                      <textarea class="form-control" v-model="formData.deskripsiProdukLayanan" rows="2" placeholder="Deskripsi produk/jasa"></textarea>
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Lokasi Bisnis (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.lokasiBisnisLainnya" placeholder="Tentukan" />
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Kepemilikan (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.kepemilikanBisnisLainnya" placeholder="Tentukan" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- J. Perumahan -->
              <div class="card mb-3">
                <div class="card-header bg-secondary text-white">
                  <h6 class="mb-0"><strong>J. Struktur Tempat Tinggal</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Tipe Rumah</label>
                      <select class="form-select" v-model="formData.tipeRumah">
                        <option value="">Pilih</option><option v-for="opt in getOptions(40)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Tipe Rumah (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.tipeRumahLainnya" placeholder="Tentukan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Sumber Air</label>
                      <select class="form-select" v-model="formData.sumberAir">
                        <option value="">Pilih</option><option v-for="opt in getOptions(42)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Sumber Air (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.sumberAirLainnya" placeholder="Tentukan" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Pelayanan Listrik</label>
                      <select class="form-select" v-model="formData.pelayananListrik">
                        <option value="">Pilih</option><option v-for="opt in getOptions(41)" :key="opt" :value="opt">{{ opt }}</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Pelayanan Listrik (Lainnya)</label>
                      <input type="text" class="form-control" v-model="formData.pelayananListrikLainnya" placeholder="Tentukan" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-12">
                      <label class="form-label">Karakteristik Kepala Rumah Tangga</label>
                      <textarea class="form-control" v-model="formData.karakteristikKrt" rows="2" placeholder="Karakteristik khusus KRT"></textarea>
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
    <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true" ref="detailModalRef">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="detailModalLabel">Detail Asset: {{ selectedAsset?.code }}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="selectedAsset">
            <!-- Informasi Dasar -->
            <h6 class="fw-bold mb-3">Informasi Dasar</h6>
            <table class="table table-sm table-bordered mb-4">
              <tr><td>Kode</td><td>{{ selectedAsset.code }}</td></tr>
              <tr><td>Nama Pemilik</td><td>{{ selectedAsset.owner_name }}</td></tr>
              <tr><td>Desa</td><td>{{ selectedAsset.village }}</td></tr>
              <tr><td>Kecamatan</td><td>{{ selectedAsset.kecamatan || '-' }}</td></tr>
              <tr><td>Luas Tanah</td><td>{{ selectedAsset.land_area.toLocaleString() }} m²</td></tr>
              <tr><td>Luas Bangunan</td><td>{{ selectedAsset.building_area.toLocaleString() }} m²</td></tr>
              <tr><td>Status Sertifikat</td><td>{{ selectedAsset.certificate_status }}</td></tr>
              <tr><td>Koordinat</td><td>{{ selectedAsset.lat }}, {{ selectedAsset.lng }}</td></tr>
            </table>

            <!-- A. Identifikasi Rumah Tangga -->
            <h6 class="fw-bold mb-3">A. Identifikasi Rumah Tangga</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Kode Enumerator</td><td>{{ selectedAsset.kode_enumerator || '-' }}</td></tr>
                  <tr><td>ID Rumah Tangga</td><td>{{ selectedAsset.id_rumah_tangga || '-' }}</td></tr>
                  <tr><td>Tanggal Survei</td><td>{{ selectedAsset.tanggal_survei || '-' }}</td></tr>
                  <tr><td>Kode Foto Survei</td><td>{{ selectedAsset.kode_foto_survei || '-' }}</td></tr>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>ID Unik</td><td>{{ selectedAsset.id_unik || '-' }}</td></tr>
                  <tr><td>Jumlah Orang dalam RT</td><td>{{ selectedAsset.jumlah_orang_rumah_tangga || '-' }}</td></tr>
                </table>
              </div>
            </div>

            <!-- B. Identitas KK -->
            <h6 class="fw-bold mb-3">B. Identitas Kepala Keluarga</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Nama Lengkap</td><td>{{ [selectedAsset.nama_depan, selectedAsset.nama_tengah, selectedAsset.nama_belakang].filter(Boolean).join(' ') || '-' }}</td></tr>
                  <tr><td>Nama Ayah</td><td>{{ selectedAsset.nama_ayah || '-' }}</td></tr>
                  <tr><td>Nama Kakek</td><td>{{ selectedAsset.nama_kakek || '-' }}</td></tr>
                  <tr><td>Nama Pasangan</td><td>{{ selectedAsset.nama_pasangan || '-' }}</td></tr>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>NIK</td><td>{{ selectedAsset.nik || '-' }}</td></tr>
                  <tr><td>Nomor Telepon</td><td>{{ selectedAsset.nomor_telepon || '-' }}</td></tr>
                  <tr><td>Nama Responden</td><td>{{ selectedAsset.nama_responden || '-' }}</td></tr>
                  <tr><td>Hubungan Responden</td><td>{{ selectedAsset.hubungan_responden || '-' }}</td></tr>
                </table>
              </div>
            </div>

            <!-- C. Profil Sosial -->
            <h6 class="fw-bold mb-3">C. Profil Sosial</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Identifikasi Dampak</td><td>{{ selectedAsset.identifikasi_dampak || '-' }}</td></tr>
                  <tr><td>Agama</td><td>{{ selectedAsset.agama || '-' }}</td></tr>
                  <tr><td v-if="selectedAsset.agama === '97. lainnya'">Agama (Lainnya)</td><td v-if="selectedAsset.agama === '97. lainnya'">{{ selectedAsset.agama_lainnya || '-' }}</td></tr>
                  <tr><td>Asal Etnis</td><td>{{ selectedAsset.asal_etnis || '-' }}</td></tr>
                  <tr><td v-if="selectedAsset.asal_etnis_lainnya">Asal Etnis (Lainnya)</td><td v-if="selectedAsset.asal_etnis_lainnya">{{ selectedAsset.asal_etnis_lainnya }}</td></tr>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Bahasa</td><td>{{ selectedAsset.bahasa || '-' }}</td></tr>
                  <tr><td v-if="selectedAsset.bahasa_lainnya">Bahasa (Lainnya)</td><td v-if="selectedAsset.bahasa_lainnya">{{ selectedAsset.bahasa_lainnya }}</td></tr>
                  <tr><td>Tempat Asal KK</td><td>{{ selectedAsset.tempat_asal_kk_tentukan || '-' }}</td></tr>
                </table>
              </div>
            </div>

            <!-- D. Demografi -->
            <h6 class="fw-bold mb-3">D. Demografi</h6>
            <table class="table table-sm table-bordered mb-4">
              <tr><td>Jenis Kelamin</td><td>{{ selectedAsset.jenis_kelamin || '-' }}</td></tr>
              <tr><td>Usia</td><td>{{ selectedAsset.usia || '-' }}</td></tr>
              <tr><td>Status Perkawinan</td><td>{{ selectedAsset.status_perkawinan || '-' }}</td></tr>
              <tr><td>Pendidikan Terakhir</td><td>{{ selectedAsset.pendidikan_terakhir || '-' }}</td></tr>
              <tr><td>Bekerja 12 Bulan</td><td>{{ selectedAsset.bekerja_12_bulan || '-' }}</td></tr>
              <tr><td>Disabilitas</td><td>{{ selectedAsset.disabilitas || '-' }}</td></tr>
            </table>

            <!-- E. Pekerjaan Utama -->
            <h6 class="fw-bold mb-3">E. Pekerjaan Utama</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Pekerjaan Utama</td><td>{{ selectedAsset.pekerjaan_utama || '-' }}</td></tr>
                  <tr><td v-if="selectedAsset.pekerjaan_utama_lainnya">Pekerjaan (Lainnya)</td><td v-if="selectedAsset.pekerjaan_utama_lainnya">{{ selectedAsset.pekerjaan_utama_lainnya }}</td></tr>
                  <tr><td>Jenis Pekerjaan</td><td>{{ selectedAsset.jenis_pekerjaan || '-' }}</td></tr>
                  <tr><td>Lokasi (Lainnya)</td><td>{{ selectedAsset.lokasi_pekerjaan_lainnya || '-' }}</td></tr>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Jumlah Bulan Bekerja</td><td>{{ selectedAsset.jumlah_bulan_bekerja || '-' }} bulan/tahun</td></tr>
                  <tr><td>Penghasilan per Bulan</td><td>{{ selectedAsset.penghasilan_per_bulan ? formatRupiah(selectedAsset.penghasilan_per_bulan) : '-' }}</td></tr>
                </table>
              </div>
            </div>

            <!-- F. Pekerjaan Sekunder -->
            <h6 class="fw-bold mb-3">F. Pekerjaan Sekunder</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Pekerjaan Sekunder</td><td>{{ selectedAsset.pekerjaan_sekunder || '-' }}</td></tr>
                  <tr><td v-if="selectedAsset.pekerjaan_sekunder_lainnya">Pekerjaan (Lainnya)</td><td v-if="selectedAsset.pekerjaan_sekunder_lainnya">{{ selectedAsset.pekerjaan_sekunder_lainnya }}</td></tr>
                  <tr><td>Lokasi Sekunder</td><td>{{ selectedAsset.lokasi_pekerjaan_sekunder || '-' }}</td></tr>
                  <tr><td v-if="selectedAsset.lokasi_pekerjaan_sekunder_lainnya">Lokasi (Lainnya)</td><td v-if="selectedAsset.lokasi_pekerjaan_sekunder_lainnya">{{ selectedAsset.lokasi_pekerjaan_sekunder_lainnya }}</td></tr>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Jumlah Bulan Bekerja</td><td>{{ selectedAsset.jumlah_bulan_bekerja_sekunder || '-' }} bulan/tahun</td></tr>
                  <tr><td>Penghasilan Sekunder</td><td>{{ selectedAsset.penghasilan_sekunder_per_bulan ? formatRupiah(selectedAsset.penghasilan_sekunder_per_bulan) : '-' }}</td></tr>
                </table>
              </div>
            </div>

            <!-- G. Keuangan -->
            <h6 class="fw-bold mb-3">G. Keuangan</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Penghasilan Tahunan</td><td>{{ selectedAsset.penghasilan_tahunan ? formatRupiah(selectedAsset.penghasilan_tahunan) : '-' }}</td></tr>
                  <tr><td>Pengeluaran Bulanan</td><td>{{ selectedAsset.pengeluaran_bulanan ? formatRupiah(selectedAsset.pengeluaran_bulanan) : '-' }}</td></tr>
                  <tr><td>Rekening Bank</td><td>{{ selectedAsset.rekening_bank || '-' }}</td></tr>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td v-if="selectedAsset.tabungan_lainnya">Tabungan (Lainnya)</td><td v-if="selectedAsset.tabungan_lainnya">{{ selectedAsset.tabungan_lainnya }}</td></tr>
                  <tr><td v-if="selectedAsset.hutang_lainnya">Hutang (Lainnya)</td><td v-if="selectedAsset.hutang_lainnya">{{ selectedAsset.hutang_lainnya }}</td></tr>
                </table>
              </div>
            </div>

            <!-- H. Dampak Pembebasan Lahan -->
            <h6 class="fw-bold mb-3">H. Dampak Pembebasan Lahan</h6>
            <table class="table table-sm table-bordered mb-4">
              <tr><td>Pernah Dampak Proyek Lain</td><td>{{ selectedAsset.pernah_dampak_proyek === '1' ? 'Ya' : selectedAsset.pernah_dampak_proyek === '2' ? 'Tidak' : '-' }}</td></tr>
              <tr><td v-if="selectedAsset.jenis_proyek_lain">Jenis Proyek (Lainnya)</td><td v-if="selectedAsset.jenis_proyek_lain">{{ selectedAsset.jenis_proyek_lain }}</td></tr>
              <tr><td v-if="selectedAsset.luas_lahan_dibebaskan">Luas Lahan Dibebaskan</td><td v-if="selectedAsset.luas_lahan_dibebaskan">{{ selectedAsset.luas_lahan_dibebaskan }} m²</td></tr>
              <tr><td>Pernah Pengungsi</td><td>{{ selectedAsset.pernah_pengungsi === '1' ? 'Ya' : selectedAsset.pernah_pengungsi === '2' ? 'Tidak' : '-' }}</td></tr>
            </table>

            <!-- I. Bisnis/Usaha -->
            <h6 class="fw-bold mb-3">I. Usaha Komersial/Bisnis</h6>
            <div class="row mb-4" v-if="selectedAsset.punya_bisnis === '1'">
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Sejak Kapan</td><td>{{ selectedAsset.sejak_kapan_bisnis || '-' }}</td></tr>
                  <tr><td>Jumlah Pegawai</td><td>{{ selectedAsset.jumlah_pegawai || '-' }}</td></tr>
                  <tr><td>Pendapatan Rata-rata</td><td>{{ selectedAsset.pendapatan_rata_bisnis ? formatRupiah(selectedAsset.pendapatan_rata_bisnis) : '-' }}</td></tr>
                  <tr><td v-if="selectedAsset.lokasi_bisnis_lainnya">Lokasi (Lainnya)</td><td v-if="selectedAsset.lokasi_bisnis_lainnya">{{ selectedAsset.lokasi_bisnis_lainnya }}</td></tr>
                  <tr><td v-if="selectedAsset.kepemilikan_bisnis_lainnya">Kepemilikan (Lainnya)</td><td v-if="selectedAsset.kepemilikan_bisnis_lainnya">{{ selectedAsset.kepemilikan_bisnis_lainnya }}</td></tr>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td v-if="selectedAsset.deskripsi_produk_layanan">Deskripsi Produk/Jasa</td><td v-if="selectedAsset.deskripsi_produk_layanan">{{ selectedAsset.deskripsi_produk_layanan }}</td></tr>
                </table>
              </div>
            </div>

            <!-- J. Perumahan -->
            <h6 class="fw-bold mb-3">J. Struktur Tempat Tinggal</h6>
            <div class="row mb-4">
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Tipe Rumah</td><td>{{ selectedAsset.tipe_rumah || '-' }}</td></tr>
                  <tr><td v-if="selectedAsset.tipe_rumah_lainnya">Tipe Rumah (Lainnya)</td><td v-if="selectedAsset.tipe_rumah_lainnya">{{ selectedAsset.tipe_rumah_lainnya }}</td></tr>
                  <tr><td>Sumber Air</td><td>{{ selectedAsset.sumber_air || '-' }}</td></tr>
                  <tr><td v-if="selectedAsset.sumber_air_lainnya">Sumber Air (Lainnya)</td><td v-if="selectedAsset.sumber_air_lainnya">{{ selectedAsset.sumber_air_lainnya }}</td></tr>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-sm table-bordered">
                  <tr><td>Pelayanan Listrik</td><td>{{ selectedAsset.pelayanan_listrik || '-' }}</td></tr>
                  <tr><td v-if="selectedAsset.pelayanan_listrik_lainnya">Listrik (Lainnya)</td><td v-if="selectedAsset.pelayanan_listrik_lainnya">{{ selectedAsset.pelayanan_listrik_lainnya }}</td></tr>
                  <tr><td v-if="selectedAsset.karakteristik_krt">Karakteristik KRT</td><td v-if="selectedAsset.karakteristik_krt">{{ selectedAsset.karakteristik_krt }}</td></tr>
                </table>
              </div>
            </div>

            <!-- K. Kesehatan & Pangan -->
            <h6 class="fw-bold mb-3">K. Kesehatan & Pangan</h6>
            <table class="table table-sm table-bordered mb-4">
              <tr><td>Kecukupan Pangan</td><td>{{ selectedAsset.kecukupan_pangan || '-' }}</td></tr>
              <tr><td v-if="selectedAsset.defisit_pangan_lainnya">Defisit Pangan (Lainnya)</td><td v-if="selectedAsset.defisit_pangan_lainnya">{{ selectedAsset.defisit_pangan_lainnya }}</td></tr>
            </table>
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

interface Asset {
  id: number
  code: string
  owner_name: string
  village: string
  land_area: number
  building_area: number
  certificate_status: string
  coordinates: string
  lat: number
  lng: number
  // Census fields - existing
  nama_depan?: string
  nama_tengah?: string
  nama_belakang?: string
  nama_ayah?: string
  nama_kakek?: string
  nama_pasangan?: string
  nomor_telepon?: string
  nik?: string
  kecamatan?: string
  kabupaten?: string
  provinsi?: string
  nama_responden?: string
  hubungan_responden?: string
  kode_enumerator?: string
  tanggal_survei?: string
  kode_foto_survei?: string
  id_unik?: string
  identifikasi_dampak?: string
  agama?: string
  asal_etnis?: string
  bahasa?: string
  jenis_kelamin?: string
  status_perkawinan?: string
  pendidikan_terakhir?: string
  bekerja_12_bulan?: string
  pekerjaan_utama?: string
  jenis_pekerjaan?: string
  disabilitas?: string
  penghasilan_tahunan?: number
  pengeluaran_bulanan?: number
  tipe_rumah?: string
  sumber_air?: string
  pelayanan_listrik?: string
  rekening_bank?: string
  // New fields from Excel
  id_rumah_tangga?: string
  agama_lainnya?: string
  asal_etnis_lainnya?: string
  bahasa_lainnya?: string
  tempat_asal_kk_tentukan?: string
  jumlah_orang_rumah_tangga?: number
  usia?: number
  pekerjaan_utama_lainnya?: string
  lokasi_pekerjaan_lainnya?: string
  jumlah_bulan_bekerja?: number
  penghasilan_per_bulan?: number
  pekerjaan_sekunder?: string
  pekerjaan_sekunder_lainnya?: string
  lokasi_pekerjaan_sekunder?: string
  lokasi_pekerjaan_sekunder_lainnya?: string
  jumlah_bulan_bekerja_sekunder?: number
  penghasilan_sekunder_per_bulan?: number
  keterampilan_lainnya?: string
  defisit_pangan_lainnya?: string
  tabungan_lainnya?: string
  hutang_lainnya?: string
  pernah_dampak_proyek?: string
  jenis_proyek_lain?: string
  luas_lahan_dibebaskan?: number
  pernah_pengungsi?: string
  punya_bisnis?: string
  lokasi_bisnis_lainnya?: string
  kepemilikan_bisnis_lainnya?: string
  sejak_kapan_bisnis?: string
  jenis_bisnis_lainnya?: string
  jumlah_pegawai?: number
  pendapatan_rata_bisnis?: number
  deskripsi_produk_layanan?: string
  tipe_rumah_lainnya?: string
  pelayanan_listrik_lainnya?: string
  sumber_air_lainnya?: string
  karakteristik_krt?: string
  kecukupan_pangan?: string
}

interface FormData {
  id?: number
  code: string
  ownerName: string
  village: string
  landArea: number
  buildingArea: number
  certificateStatus: string
  lat: string
  lng: string
  // Form Identitas Kepala Keluarga
  namaDepan: string
  namaTengah: string
  namaBelakang: string
  namaAyah: string
  namaKakek: string
  namaPasangan: string
  nomorTelepon: string
  nik: string
  kecamatan: string
  kabupaten: string
  provinsi: string
  namaResponden: string
  hubunganResponden: string
  // Identifikasi Rumah Tangga dan PAP
  kodeEnumerator: string
  idRumahTangga: string
  tanggalSurvei: string
  kodeFotoSurvei: string
  idUnik: string
  // Census Survey Fields
  identifikasiDampak?: string
  agama?: string
  agamaLainnya?: string
  asalEtnis?: string
  asalEtnisLainnya?: string
  bahasa?: string
  bahasaLainnya?: string
  tempatAsalKkTentukan?: string
  jumlahOrangRumahTangga?: number
  jenisKelamin?: string
  usia?: number
  statusPerkawinan?: string
  pendidikanTerakhir?: string
  bekerja12Bulan?: string
  pekerjaanUtama?: string
  pekerjaanUtamaLainnya?: string
  jenisPekerjaan?: string
  lokasiPekerjaanLainnya?: string
  jumlahBulanBekerja?: number
  penghasilanPerBulan?: number
  pekerjaanSekunder?: string
  pekerjaanSekunderLainnya?: string
  lokasiPekerjaanSekunder?: string
  lokasiPekerjaanSekunderLainnya?: string
  jumlahBulanBekerjaSekunder?: number
  penghasilanSekunderPerBulan?: number
  keterampilanLainnya?: string
  disabilitas?: string
  defisitPanganLainnya?: string
  penghasilanTahunan?: number
  pengeluaranBulanan?: number
  tabunganLainnya?: string
  hutangLainnya?: string
  pernahDampakProyek?: string
  jenisProyekLain?: string
  luasLahanDibebaskan?: number
  pernahPengungsi?: string
  punyaBisnis?: string
  lokasiBisnisLainnya?: string
  kepemilikanBisnisLainnya?: string
  sejakKapanBisnis?: string
  jenisBisnisLainnya?: string
  jumlahPegawai?: number
  pendapatanRataBisnis?: number
  deskripsiProdukLayanan?: string
  tipeRumah?: string
  tipeRumahLainnya?: string
  sumberAir?: string
  sumberAirLainnya?: string
  pelayananListrik?: string
  pelayananListrikLainnya?: string
  rekeningBank?: string
  karakteristikKrt?: string
  kecukupanPangan?: string
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
  code: '',
  ownerName: '',
  village: '',
  landArea: 0,
  buildingArea: 0,
  certificateStatus: '',
  lat: '',
  lng: '',
  // Form Identitas Kepala Keluarga
  namaDepan: '',
  namaTengah: '',
  namaBelakang: '',
  namaAyah: '',
  namaKakek: '',
  namaPasangan: '',
  nomorTelepon: '',
  nik: '',
  kecamatan: '',
  kabupaten: '',
  provinsi: '',
  namaResponden: '',
  hubunganResponden: '',
  // Identifikasi Rumah Tangga dan PAP
  kodeEnumerator: '',
  idRumahTangga: '',
  tanggalSurvei: '',
  kodeFotoSurvei: '',
  idUnik: '',
  // Census Survey Fields - new with all Excel questions
  identifikasiDampak: '',
  agama: '',
  agamaLainnya: '',
  asalEtnis: '',
  asalEtnisLainnya: '',
  bahasa: '',
  bahasaLainnya: '',
  tempatAsalKkTentukan: '',
  jumlahOrangRumahTangga: undefined,
  jenisKelamin: '',
  usia: undefined,
  statusPerkawinan: '',
  pendidikanTerakhir: '',
  bekerja12Bulan: '',
  pekerjaanUtama: '',
  pekerjaanUtamaLainnya: '',
  jenisPekerjaan: '',
  lokasiPekerjaanLainnya: '',
  jumlahBulanBekerja: undefined,
  penghasilanPerBulan: undefined,
  pekerjaanSekunder: '',
  pekerjaanSekunderLainnya: '',
  lokasiPekerjaanSekunder: '',
  lokasiPekerjaanSekunderLainnya: '',
  jumlahBulanBekerjaSekunder: undefined,
  penghasilanSekunderPerBulan: undefined,
  keterampilanLainnya: '',
  disabilitas: '',
  defisitPanganLainnya: '',
  penghasilanTahunan: undefined,
  pengeluaranBulanan: undefined,
  tabunganLainnya: '',
  hutangLainnya: '',
  pernahDampakProyek: '',
  jenisProyekLain: '',
  luasLahanDibebaskan: undefined,
  pernahPengungsi: '',
  punyaBisnis: '',
  lokasiBisnisLainnya: '',
  kepemilikanBisnisLainnya: '',
  sejakKapanBisnis: '',
  jenisBisnisLainnya: '',
  jumlahPegawai: undefined,
  pendapatanRataBisnis: undefined,
  deskripsiProdukLayanan: '',
  tipeRumah: '',
  tipeRumahLainnya: '',
  sumberAir: '',
  sumberAirLainnya: '',
  pelayananListrik: '',
  pelayananListrikLainnya: '',
  rekeningBank: '',
  karakteristikKrt: '',
  kecukupanPangan: ''
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
      code: asset.code,
      owner_name: asset.owner_name,
      village: asset.village,
      land_area: parseFloat(asset.land_area),
      building_area: parseFloat(asset.building_area),
      certificate_status: asset.certificate_status,
      coordinates: asset.coordinates,
      lat: parseFloat(asset.lat),
      lng: parseFloat(asset.lng),
      // Census fields - include all from API response including new fields
      nama_depan: asset.nama_depan,
      nama_tengah: asset.nama_tengah,
      nama_belakang: asset.nama_belakang,
      nama_ayah: asset.nama_ayah,
      nama_kakek: asset.nama_kakek,
      nama_pasangan: asset.nama_pasangan,
      nomor_telepon: asset.nomor_telepon,
      nik: asset.nik,
      kecamatan: asset.kecamatan,
      kabupaten: asset.kabupaten,
      provinsi: asset.provinsi,
      nama_responden: asset.nama_responden,
      hubungan_responden: asset.hubungan_responden,
      kode_enumerator: asset.kode_enumerator,
      id_rumah_tangga: asset.id_rumah_tangga,
      tanggal_survei: asset.tanggal_survei,
      kode_foto_survei: asset.kode_foto_survei,
      id_unik: asset.id_unik,
      identifikasi_dampak: asset.identifikasi_dampak,
      agama: asset.agama,
      agama_lainnya: asset.agama_lainnya,
      asal_etnis: asset.asal_etnis,
      asal_etnis_lainnya: asset.asal_etnis_lainnya,
      bahasa: asset.bahasa,
      bahasa_lainnya: asset.bahasa_lainnya,
      tempat_asal_kk_tentukan: asset.tempat_asal_kk_tentukan,
      jumlah_orang_rumah_tangga: asset.jumlah_orang_rumah_tangga,
      jenis_kelamin: asset.jenis_kelamin,
      usia: asset.usia,
      status_perkawinan: asset.status_perkawinan,
      pendidikan_terakhir: asset.pendidikan_terakhir,
      bekerja_12_bulan: asset.bekerja_12_bulan,
      pekerjaan_utama: asset.pekerjaan_utama,
      pekerjaan_utama_lainnya: asset.pekerjaan_utama_lainnya,
      jenis_pekerjaan: asset.jenis_pekerjaan,
      lokasi_pekerjaan_lainnya: asset.lokasi_pekerjaan_lainnya,
      jumlah_bulan_bekerja: asset.jumlah_bulan_bekerja,
      penghasilan_per_bulan: asset.penghasilan_per_bulan,
      pekerjaan_sekunder: asset.pekerjaan_sekunder,
      pekerjaan_sekunder_lainnya: asset.pekerjaan_sekunder_lainnya,
      lokasi_pekerjaan_sekunder: asset.lokasi_pekerjaan_sekunder,
      lokasi_pekerjaan_sekunder_lainnya: asset.lokasi_pekerjaan_sekunder_lainnya,
      jumlah_bulan_bekerja_sekunder: asset.jumlah_bulan_bekerja_sekunder,
      penghasilan_sekunder_per_bulan: asset.penghasilan_sekunder_per_bulan,
      keterampilan_lainnya: asset.keterampilan_lainnya,
      disabilitas: asset.disabilitas,
      defisit_pangan_lainnya: asset.defisit_pangan_lainnya,
      penghasilan_tahunan: asset.penghasilan_tahunan,
      pengeluaran_bulanan: asset.pengeluaran_bulanan,
      tabungan_lainnya: asset.tabungan_lainnya,
      hutang_lainnya: asset.hutang_lainnya,
      pernah_dampak_proyek: asset.pernah_dampak_proyek,
      jenis_proyek_lain: asset.jenis_proyek_lain,
      luas_lahan_dibebaskan: asset.luas_lahan_dibebaskan,
      pernah_pengungsi: asset.pernah_pengungsi,
      punya_bisnis: asset.punya_bisnis,
      lokasi_bisnis_lainnya: asset.lokasi_bisnis_lainnya,
      kepemilikan_bisnis_lainnya: asset.kepemilikan_bisnis_lainnya,
      sejak_kapan_bisnis: asset.sejak_kapan_bisnis,
      jenis_bisnis_lainnya: asset.jenis_bisnis_lainnya,
      jumlah_pegawai: asset.jumlah_pegawai,
      pendapatan_rata_bisnis: asset.pendapatan_rata_bisnis,
      deskripsi_produk_layanan: asset.deskripsi_produk_layanan,
      tipe_rumah: asset.tipe_rumah,
      tipe_rumah_lainnya: asset.tipe_rumah_lainnya,
      sumber_air: asset.sumber_air,
      sumber_air_lainnya: asset.sumber_air_lainnya,
      pelayanan_listrik: asset.pelayanan_listrik,
      pelayanan_listrik_lainnya: asset.pelayanan_listrik_lainnya,
      rekening_bank: asset.rekening_bank,
      karakteristik_krt: asset.karakteristik_krt,
      kecukupan_pangan: asset.kecukupan_pangan,
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
  return assets.value.filter(asset => asset.village === selectedVillage.value)
})

const villageSummary = computed(() => {
  const villages = ['Desa Sorowako', 'Desa Magani', 'Desa Wewangriu', 'Desa Nikkel']
  return villages.map(village => {
    const villageAssets = assets.value.filter(a => a.village === village)
    return {
      name: village,
      totalAssets: villageAssets.length,
      totalKK: villageAssets.length,
      totalArea: villageAssets.reduce((sum, a) => sum + a.land_area, 0)
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

  const centerCoords = filteredAssets.value.length > 0 && filteredAssets.value[0]
    ? [filteredAssets.value[0].lat, filteredAssets.value[0].lng] as [number, number]
    : [-2.5650, 121.3450] as [number, number]

  assetMap = L.map('asset-map').setView(centerCoords, 14)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(assetMap)

  // Add markers
  filteredAssets.value.forEach(asset => {
    const houseIcon = L.divIcon({
      className: 'custom-house-marker',
      html: `<div style="background: #dc3545; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    })

    const marker = L.marker([asset.lat, asset.lng], { icon: houseIcon }).addTo(assetMap!)
    
    marker.bindPopup(`
      <div style="min-width: 200px;">
        <h6><strong>${asset.owner_name}</strong></h6>
        <p class="mb-1"><small><strong>Kode:</strong> ${asset.code}</small></p>
        <p class="mb-1"><small><strong>Desa:</strong> ${asset.village}</small></p>
        <p class="mb-1"><small><strong>Luas Tanah:</strong> ${asset.land_area} m²</small></p>
        <p class="mb-1"><small><strong>Luas Bangunan:</strong> ${asset.building_area} m²</small></p>
        <p class="mb-0"><small><strong>Sertifikat:</strong> ${asset.certificate_status}</small></p>
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

const getCertificateClass = (status: string) => {
  return status === 'SHM' ? 'bg-success' : 'bg-warning'
}

const viewOnMap = (asset: Asset) => {
  showMap.value = true
  nextTick(() => {
    initAssetMap()
    if (assetMap) {
      assetMap.setView([asset.lat, asset.lng], 17)
    }
  })
}

const addAsset = () => {
  isEditMode.value = false
  formData.value = {
    id: undefined,
    code: '',
    ownerName: '',
    village: '',
    landArea: 0,
    buildingArea: 0,
    certificateStatus: '',
    lat: '',
    lng: '',
    // Form Identitas Kepala Keluarga
    namaDepan: '',
    namaTengah: '',
    namaBelakang: '',
    namaAyah: '',
    namaKakek: '',
    namaPasangan: '',
    nomorTelepon: '',
    nik: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    namaResponden: '',
    hubunganResponden: '',
    // Identifikasi Rumah Tangga dan PAP
    kodeEnumerator: '',
    idRumahTangga: '',
    tanggalSurvei: '',
    kodeFotoSurvei: '',
    idUnik: '',
    // Census Survey Fields - all new fields with empty values
    identifikasiDampak: '',
    agama: '',
    agamaLainnya: '',
    asalEtnis: '',
    asalEtnisLainnya: '',
    bahasa: '',
    bahasaLainnya: '',
    tempatAsalKkTentukan: '',
    jumlahOrangRumahTangga: undefined,
    jenisKelamin: '',
    usia: undefined,
    statusPerkawinan: '',
    pendidikanTerakhir: '',
    bekerja12Bulan: '',
    pekerjaanUtama: '',
    pekerjaanUtamaLainnya: '',
    jenisPekerjaan: '',
    lokasiPekerjaanLainnya: '',
    jumlahBulanBekerja: undefined,
    penghasilanPerBulan: undefined,
    pekerjaanSekunder: '',
    pekerjaanSekunderLainnya: '',
    lokasiPekerjaanSekunder: '',
    lokasiPekerjaanSekunderLainnya: '',
    jumlahBulanBekerjaSekunder: undefined,
    penghasilanSekunderPerBulan: undefined,
    keterampilanLainnya: '',
    disabilitas: '',
    defisitPanganLainnya: '',
    penghasilanTahunan: undefined,
    pengeluaranBulanan: undefined,
    tabunganLainnya: '',
    hutangLainnya: '',
    pernahDampakProyek: '',
    jenisProyekLain: '',
    luasLahanDibebaskan: undefined,
    pernahPengungsi: '',
    punyaBisnis: '',
    lokasiBisnisLainnya: '',
    kepemilikanBisnisLainnya: '',
    sejakKapanBisnis: '',
    jenisBisnisLainnya: '',
    jumlahPegawai: undefined,
    pendapatanRataBisnis: undefined,
    deskripsiProdukLayanan: '',
    tipeRumah: '',
    tipeRumahLainnya: '',
    sumberAir: '',
    sumberAirLainnya: '',
    pelayananListrik: '',
    pelayananListrikLainnya: '',
    rekeningBank: '',
    karakteristikKrt: '',
    kecukupanPangan: ''
  }
  openModal()
}

const editAsset = (asset: Asset) => {
  isEditMode.value = true
  formData.value = {
    id: asset.id,
    code: asset.code,
    ownerName: asset.owner_name,
    village: asset.village,
    landArea: asset.land_area,
    buildingArea: asset.building_area,
    certificateStatus: asset.certificate_status,
    lat: asset.lat.toString(),
    lng: asset.lng.toString(),
    // Form Identitas Kepala Keluarga
    namaDepan: asset.nama_depan || '',
    namaTengah: asset.nama_tengah || '',
    namaBelakang: asset.nama_belakang || '',
    namaAyah: asset.nama_ayah || '',
    namaKakek: asset.nama_kakek || '',
    namaPasangan: asset.nama_pasangan || '',
    nomorTelepon: asset.nomor_telepon || '',
    nik: asset.nik || '',
    kecamatan: asset.kecamatan || '',
    kabupaten: asset.kabupaten || '',
    provinsi: asset.provinsi || '',
    namaResponden: asset.nama_responden || '',
    hubunganResponden: asset.hubungan_responden || '',
    // Identifikasi Rumah Tangga dan PAP
    kodeEnumerator: asset.kode_enumerator || '',
    idRumahTangga: asset.id_rumah_tangga || '',
    tanggalSurvei: asset.tanggal_survei || '',
    kodeFotoSurvei: asset.kode_foto_survei || '',
    idUnik: asset.id_unik || '',
    // Census Survey Fields - all new fields
    identifikasiDampak: asset.identifikasi_dampak || '',
    agama: asset.agama || '',
    agamaLainnya: asset.agama_lainnya || '',
    asalEtnis: asset.asal_etnis || '',
    asalEtnisLainnya: asset.asal_etnis_lainnya || '',
    bahasa: asset.bahasa || '',
    bahasaLainnya: asset.bahasa_lainnya || '',
    tempatAsalKkTentukan: asset.tempat_asal_kk_tentukan || '',
    jumlahOrangRumahTangga: asset.jumlah_orang_rumah_tangga || undefined,
    jenisKelamin: asset.jenis_kelamin || '',
    usia: asset.usia || undefined,
    statusPerkawinan: asset.status_perkawinan || '',
    pendidikanTerakhir: asset.pendidikan_terakhir || '',
    bekerja12Bulan: asset.bekerja_12_bulan || '',
    pekerjaanUtama: asset.pekerjaan_utama || '',
    pekerjaanUtamaLainnya: asset.pekerjaan_utama_lainnya || '',
    jenisPekerjaan: asset.jenis_pekerjaan || '',
    lokasiPekerjaanLainnya: asset.lokasi_pekerjaan_lainnya || '',
    jumlahBulanBekerja: asset.jumlah_bulan_bekerja || undefined,
    penghasilanPerBulan: asset.penghasilan_per_bulan || undefined,
    pekerjaanSekunder: asset.pekerjaan_sekunder || '',
    pekerjaanSekunderLainnya: asset.pekerjaan_sekunder_lainnya || '',
    lokasiPekerjaanSekunder: asset.lokasi_pekerjaan_sekunder || '',
    lokasiPekerjaanSekunderLainnya: asset.lokasi_pekerjaan_sekunder_lainnya || '',
    jumlahBulanBekerjaSekunder: asset.jumlah_bulan_bekerja_sekunder || undefined,
    penghasilanSekunderPerBulan: asset.penghasilan_sekunder_per_bulan || undefined,
    keterampilanLainnya: asset.keterampilan_lainnya || '',
    disabilitas: asset.disabilitas || '',
    defisitPanganLainnya: asset.defisit_pangan_lainnya || '',
    penghasilanTahunan: asset.penghasilan_tahunan || undefined,
    pengeluaranBulanan: asset.pengeluaran_bulanan || undefined,
    tabunganLainnya: asset.tabungan_lainnya || '',
    hutangLainnya: asset.hutang_lainnya || '',
    pernahDampakProyek: asset.pernah_dampak_proyek || '',
    jenisProyekLain: asset.jenis_proyek_lain || '',
    luasLahanDibebaskan: asset.luas_lahan_dibebaskan || undefined,
    pernahPengungsi: asset.pernah_pengungsi || '',
    punyaBisnis: asset.punya_bisnis || '',
    lokasiBisnisLainnya: asset.lokasi_bisnis_lainnya || '',
    kepemilikanBisnisLainnya: asset.kepemilikan_bisnis_lainnya || '',
    sejakKapanBisnis: asset.sejak_kapan_bisnis || '',
    jenisBisnisLainnya: asset.jenis_bisnis_lainnya || '',
    jumlahPegawai: asset.jumlah_pegawai || undefined,
    pendapatanRataBisnis: asset.pendapatan_rata_bisnis || undefined,
    deskripsiProdukLayanan: asset.deskripsi_produk_layanan || '',
    tipeRumah: asset.tipe_rumah || '',
    tipeRumahLainnya: asset.tipe_rumah_lainnya || '',
    sumberAir: asset.sumber_air || '',
    sumberAirLainnya: asset.sumber_air_lainnya || '',
    pelayananListrik: asset.pelayanan_listrik || '',
    pelayananListrikLainnya: asset.pelayanan_listrik_lainnya || '',
    rekeningBank: asset.rekening_bank || '',
    karakteristikKrt: asset.karakteristik_krt || '',
    kecukupanPangan: asset.kecukupan_pangan || ''
  }
  openModal()
}

const saveAsset = async () => {
  const lat = parseFloat(formData.value.lat)
  const lng = parseFloat(formData.value.lng)

  if (isNaN(lat) || isNaN(lng)) {
    alert('Koordinat tidak valid! Pastikan format latitude dan longitude benar.')
    return
  }

  const coordinates = `${lat}, ${lng}`
  loading.value = true

  try {
    const assetData = {
      code: formData.value.code,
      owner_name: formData.value.ownerName,
      village: formData.value.village,
      land_area: String(formData.value.landArea),
      building_area: String(formData.value.buildingArea),
      certificate_status: formData.value.certificateStatus,
      lat: formData.value.lat,
      lng: formData.value.lng,
      coordinates,
      // Census fields - use snake_case to match backend
      nama_depan: formData.value.namaDepan || undefined,
      nama_tengah: formData.value.namaTengah || undefined,
      nama_belakang: formData.value.namaBelakang || undefined,
      nama_ayah: formData.value.namaAyah || undefined,
      nama_kakek: formData.value.namaKakek || undefined,
      nama_pasangan: formData.value.namaPasangan || undefined,
      nomor_telepon: formData.value.nomorTelepon || undefined,
      nik: formData.value.nik || undefined,
      kecamatan: formData.value.kecamatan || undefined,
      kabupaten: formData.value.kabupaten || undefined,
      provinsi: formData.value.provinsi || undefined,
      nama_responden: formData.value.namaResponden || undefined,
      hubungan_responden: formData.value.hubunganResponden || undefined,
      kode_enumerator: formData.value.kodeEnumerator || undefined,
      id_rumah_tangga: formData.value.idRumahTangga || undefined,
      tanggal_survei: formData.value.tanggalSurvei || undefined,
      kode_foto_survei: formData.value.kodeFotoSurvei || undefined,
      id_unik: formData.value.idUnik || undefined,
      identifikasi_dampak: formData.value.identifikasiDampak || undefined,
      agama: formData.value.agama || undefined,
      agama_lainnya: formData.value.agamaLainnya || undefined,
      asal_etnis: formData.value.asalEtnis || undefined,
      asal_etnis_lainnya: formData.value.asalEtnisLainnya || undefined,
      bahasa: formData.value.bahasa || undefined,
      bahasa_lainnya: formData.value.bahasaLainnya || undefined,
      tempat_asal_kk_tentukan: formData.value.tempatAsalKkTentukan || undefined,
      jumlah_orang_rumah_tangga: formData.value.jumlahOrangRumahTangga || undefined,
      jenis_kelamin: formData.value.jenisKelamin || undefined,
      usia: formData.value.usia || undefined,
      status_perkawinan: formData.value.statusPerkawinan || undefined,
      pendidikan_terakhir: formData.value.pendidikanTerakhir || undefined,
      bekerja_12_bulan: formData.value.bekerja12Bulan || undefined,
      pekerjaan_utama: formData.value.pekerjaanUtama || undefined,
      pekerjaan_utama_lainnya: formData.value.pekerjaanUtamaLainnya || undefined,
      jenis_pekerjaan: formData.value.jenisPekerjaan || undefined,
      lokasi_pekerjaan_lainnya: formData.value.lokasiPekerjaanLainnya || undefined,
      jumlah_bulan_bekerja: formData.value.jumlahBulanBekerja || undefined,
      penghasilan_per_bulan: formData.value.penghasilanPerBulan || undefined,
      pekerjaan_sekunder: formData.value.pekerjaanSekunder || undefined,
      pekerjaan_sekunder_lainnya: formData.value.pekerjaanSekunderLainnya || undefined,
      lokasi_pekerjaan_sekunder: formData.value.lokasiPekerjaanSekunder || undefined,
      lokasi_pekerjaan_sekunder_lainnya: formData.value.lokasiPekerjaanSekunderLainnya || undefined,
      jumlah_bulan_bekerja_sekunder: formData.value.jumlahBulanBekerjaSekunder || undefined,
      penghasilan_sekunder_per_bulan: formData.value.penghasilanSekunderPerBulan || undefined,
      keterampilan_lainnya: formData.value.keterampilanLainnya || undefined,
      disabilitas: formData.value.disabilitas || undefined,
      defisit_pangan_lainnya: formData.value.defisitPanganLainnya || undefined,
      penghasilan_tahunan: formData.value.penghasilanTahunan || undefined,
      pengeluaran_bulanan: formData.value.pengeluaranBulanan || undefined,
      tabungan_lainnya: formData.value.tabunganLainnya || undefined,
      hutang_lainnya: formData.value.hutangLainnya || undefined,
      pernah_dampak_proyek: formData.value.pernahDampakProyek || undefined,
      jenis_proyek_lain: formData.value.jenisProyekLain || undefined,
      luas_lahan_dibebaskan: formData.value.luasLahanDibebaskan || undefined,
      pernah_pengungsi: formData.value.pernahPengungsi || undefined,
      punya_bisnis: formData.value.punyaBisnis || undefined,
      lokasi_bisnis_lainnya: formData.value.lokasiBisnisLainnya || undefined,
      kepemilikan_bisnis_lainnya: formData.value.kepemilikanBisnisLainnya || undefined,
      sejak_kapan_bisnis: formData.value.sejakKapanBisnis || undefined,
      jenis_bisnis_lainnya: formData.value.jenisBisnisLainnya || undefined,
      jumlah_pegawai: formData.value.jumlahPegawai || undefined,
      pendapatan_rata_bisnis: formData.value.pendapatanRataBisnis || undefined,
      deskripsi_produk_layanan: formData.value.deskripsiProdukLayanan || undefined,
      tipe_rumah: formData.value.tipeRumah || undefined,
      tipe_rumah_lainnya: formData.value.tipeRumahLainnya || undefined,
      sumber_air: formData.value.sumberAir || undefined,
      sumber_air_lainnya: formData.value.sumberAirLainnya || undefined,
      pelayanan_listrik: formData.value.pelayananListrik || undefined,
      pelayanan_listrik_lainnya: formData.value.pelayananListrikLainnya || undefined,
      rekening_bank: formData.value.rekeningBank || undefined,
      karakteristik_krt: formData.value.karakteristikKrt || undefined,
      kecukupan_pangan: formData.value.kecukupanPangan || undefined,
    }

    if (isEditMode.value && formData.value.id) {
      // Edit existing asset - call API
      await assetApi.update(formData.value.id, assetData)
      alert(`Asset ${formData.value.code} berhasil diupdate!`)
    } else {
      // Add new asset - call API
      await assetApi.create(assetData)
      alert(`Asset ${formData.value.code} berhasil ditambahkan!`)
    }

    // Refresh data from API
    await fetchAssets()
    closeModal()
    if (showMap.value) {
      initAssetMap()
    }
  } catch (err) {
    alert(`Gagal menyimpan asset: ${err instanceof Error ? err.message : 'Unknown error'}`)
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
  if (confirm(`Hapus asset ${asset.code} - ${asset.owner_name}?\n\nData akan dihapus secara permanen.`)) {
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
;(window as any).closeAssetDetail = closeDetail

const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
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

// Get dropdown options by question number
const getOptions = (qNum: number): string[] => {
  const q = questions.find(q => q.question_number === qNum)
  return q?.options || []
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
