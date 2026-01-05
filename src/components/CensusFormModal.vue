<template>
    <div class="modal fade" id="censusModal" tabindex="-1" aria-labelledby="censusModalLabel" aria-hidden="true"
        data-bs-backdrop="static" :class="{ 'read-only-modal': props.isReadOnly }">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="censusModalLabel">
                        <i class="bi bi-file-earmark-text"></i>
                        {{ props.isReadOnly ? 'Detail' : (props.isEditMode ? 'Edit' : 'Tambah') }} Data Census LARAP
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>

                <div class="modal-body p-0">
                    <div class="container-fluid">
                        <div class="row">
                            <!-- Sidebar Navigation -->
                            <div class="col-md-2 bg-light border-end p-3"
                                style="height: calc(100vh - 120px); overflow-y: auto;">
                                <div class="nav flex-column nav-pills" role="tablist">
                                    <button class="nav-link active text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-a" type="button">
                                        A. Identifikasi
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-b" type="button">
                                        B. Info KK
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-c" type="button">
                                        C. Profil Dampak
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-d" type="button">
                                        D. Profil Sosial
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-e" type="button">
                                        E. Demografi KK
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-f" type="button">
                                        F. Pekerjaan KK
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-g" type="button">
                                        G. Kesehatan RT
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-h" type="button">
                                        H. Kecukupan Pangan
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-i" type="button">
                                        I. Pendapatan & Utang
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-j" type="button">
                                        J. Dampak Lahan
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-k" type="button">
                                        K. Bisnis
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-l" type="button">
                                        L. Struktur Rumah
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-m" type="button">
                                        M. Kerentanan
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-n" type="button">
                                        N. Komunikasi
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-o" type="button">
                                        O. Tanah
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-p" type="button">
                                        P. Ruang Atas/Bawah
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-q" type="button">
                                        Q. Tanaman
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-r" type="button">
                                        R. Lainnya
                                    </button>
                                    <button class="nav-link text-start mb-1" data-bs-toggle="pill"
                                        data-bs-target="#tab-anggota" type="button">
                                        <i class="bi bi-people"></i> Anggota Keluarga
                                    </button>
                                </div>
                            </div>

                            <!-- Content Area -->
                            <div class="col-md-10 p-4" style="height: calc(100vh - 120px); overflow-y: auto;">
                                <div class="tab-content">

                                    <!-- Tab A: Identifikasi -->
                                    <div class="tab-pane fade show active" id="tab-a">
                                        <h5 class="border-bottom pb-2 mb-4">A. Identifikasi Rumah Tangga dan PAP</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Kode Enumerator</label>
                                                <input v-model="formData.kode_enumerator" class="form-control"
                                                    :disabled="props.isReadOnly" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">ID Rumah Tangga *</label>
                                                <input v-model="formData.id_rumah_tangga" class="form-control" required
                                                    :disabled="props.isReadOnly" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Tanggal</label>
                                                <input v-model="formData.tanggal" type="date" class="form-control"
                                                    :disabled="props.isReadOnly" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Kode Foto Survei</label>
                                                <input v-model="formData.kode_foto_survei" class="form-control"
                                                    :disabled="props.isReadOnly" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Entitas Terdampak</label>
                                                <select v-model="formData.entitas_terdampak" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="1">Tanah</option>
                                                    <option value="2">Rumah</option>
                                                    <option value="3">Tanaman/Pohon</option>
                                                    <option value="4">Struktur/Aset</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Koordinat Nomor GPS</label>
                                                <input v-model="formData.koordinat" class="form-control"
                                                    placeholder="-2.5, 121.4" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab B: Info Kepala Keluarga -->
                                    <div class="tab-pane fade" id="tab-b">
                                        <h5 class="border-bottom pb-2 mb-4">B. Informasi Kepala Keluarga</h5>
                                        <div class="row g-3">
                                            <div class="col-md-4">
                                                <label class="form-label">Nama Depan *</label>
                                                <input v-model="formData.nama_depan" class="form-control" required />
                                            </div>
                                            <div class="col-md-4">
                                                <label class="form-label">Nama Tengah</label>
                                                <input v-model="formData.nama_tengah" class="form-control" />
                                            </div>
                                            <div class="col-md-4">
                                                <label class="form-label">Nama Belakang</label>
                                                <input v-model="formData.nama_belakang" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Nama Ayah</label>
                                                <input v-model="formData.nama_ayah" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Nama Kakek</label>
                                                <input v-model="formData.nama_kakek" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Nama Pasangan</label>
                                                <input v-model="formData.nama_pasangan" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Nomor Telepon</label>
                                                <input v-model="formData.nomor_telepon" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">NIK</label>
                                                <input v-model="formData.nik" class="form-control" maxlength="16" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Desa *</label>
                                                <select v-model="formData.desa" class="form-select" required>
                                                    <option value="">Pilih Desa</option>
                                                    <option value="Desa Sorowako">Desa Sorowako</option>
                                                    <option value="Desa Magani">Desa Magani</option>
                                                    <option value="Desa Wewangriu">Desa Wewangriu</option>
                                                    <option value="Desa Nikkel">Desa Nikkel</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Kecamatan</label>
                                                <input v-model="formData.kecamatan" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Kabupaten</label>
                                                <input v-model="formData.kabupaten" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Provinsi</label>
                                                <input v-model="formData.provinsi" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Nama Responden (jika berbeda dengan
                                                    KK)</label>
                                                <input v-model="formData.nama_responden" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Hubungan Responden dengan KK</label>
                                                <select v-model="formData.hubungan_responden" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Pasangan">Pasangan</option>
                                                    <option value="Anak Laki-laki / Anak Perempuan">Anak Laki-laki /
                                                        Anak Perempuan</option>
                                                    <option value="Menantu Laki-laki / Menantu Perempuan">Menantu
                                                        Laki-laki / Menantu Perempuan</option>
                                                    <option value="Cucu Laki-laki / Cucu Perempuan">Cucu Laki-laki /
                                                        Cucu Perempuan</option>
                                                    <option value="Ayah / Ibu">Ayah / Ibu</option>
                                                    <option value="Mertua">Mertua</option>
                                                    <option value="Saudara Laki-laki / Saudara Perempuan">Saudara
                                                        Laki-laki / Saudara Perempuan</option>
                                                    <option value="Ipar Laki-laki / Ipar Perempuan">Ipar Laki-laki /
                                                        Ipar Perempuan</option>
                                                    <option value="Kerabat lain">Kerabat lain</option>
                                                    <option value="Sepupu">Sepupu</option>
                                                    <option value="Bukan kerabat lain">Bukan kerabat lain</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab C: Profil Dampak -->
                                    <div class="tab-pane fade" id="tab-c">
                                        <h5 class="border-bottom pb-2 mb-4">C. Profil Dampak</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Identifikasi Dampak</label>
                                                <select v-model="formData.identifikasi_dampak" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Perpindahan Fisik">Perpindahan Fisik</option>
                                                    <option value="Perpindahan Ekonomi">Perpindahan Ekonomi</option>
                                                    <option value="Perpindahan Fisik dan Ekonomi">Perpindahan Fisik dan
                                                        Ekonomi</option>
                                                    <option value="Terkena dampak tidak langsung dari proyek">Terkena
                                                        dampak tidak langsung dari proyek</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.identifikasi_dampak === 'Lainnya'" class="col-md-6">
                                                <label class="form-label">Lainnya (sebutkan)</label>
                                                <input v-model="formData.identifikasi_dampak_lainnya"
                                                    class="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab D: Profil Sosial -->
                                    <div class="tab-pane fade" id="tab-d">
                                        <h5 class="border-bottom pb-2 mb-4">D. Profil Sosial Rumah Tangga</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Agama</label>
                                                <select v-model="formData.agama" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Kristen">Kristen</option>
                                                    <option value="Buddha">Buddha</option>
                                                    <option value="Muslim">Muslim</option>
                                                    <option value="Animisme">Animisme</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.agama === 'Lainnya'" class="col-md-6">
                                                <label class="form-label">Agama Lainnya</label>
                                                <input v-model="formData.agama_lainnya" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Asal Etnis</label>
                                                <input v-model="formData.asal_etnis" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Asal Etnis Lainnya</label>
                                                <input v-model="formData.asal_etnis_lainnya" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Bahasa</label>
                                                <input v-model="formData.bahasa" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Bahasa Lainnya</label>
                                                <input v-model="formData.bahasa_lainnya" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Tempat Asal Kepala Rumah Tangga</label>
                                                <select v-model="formData.tempat_asal_kk" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Desa yang Sama">Desa yang Sama</option>
                                                    <option value="Di luar desa">Di luar desa, (tentukan)</option>
                                                    <option value="Di luar kecamatan">Di luar kecamatan, (tentukan)
                                                    </option>
                                                    <option value="Di luar kabupaten">Di luar kabupaten, (tentukan)
                                                    </option>
                                                </select>
                                            </div>
                                            <div v-if="formData.tempat_asal_kk && formData.tempat_asal_kk !== 'Desa yang Sama'"
                                                class="col-md-6">
                                                <label class="form-label">Tentukan</label>
                                                <input v-model="formData.tempat_asal_kk_tentukan"
                                                    class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Berapa banyak orang yang tinggal di rumah
                                                    tangga</label>
                                                <input v-model.number="formData.jumlah_orang_rumah_tangga" type="number"
                                                    class="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab E: Demografi KK -->
                                    <div class="tab-pane fade" id="tab-e">
                                        <h5 class="border-bottom pb-2 mb-4">E. Demografi Rumah Tangga (Kepala Keluarga)
                                        </h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Jenis Kelamin</label>
                                                <select v-model="formData.jenis_kelamin" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Laki-laki">Laki-laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Tanggal Lahir</label>
                                                <input v-model="formData.tanggal_lahir" type="date"
                                                    class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Usia</label>
                                                <input v-model.number="formData.usia" type="number"
                                                    class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Status Perkawinan</label>
                                                <select v-model="formData.status_perkawinan" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Menikah">Menikah</option>
                                                    <option value="Lajang">Lajang</option>
                                                    <option value="Dipisahkan">Dipisahkan</option>
                                                    <option value="Bercerai">Bercerai</option>
                                                    <option value="Janda">Janda</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Bisa Membaca/Menulis atau Keduanya</label>
                                                <input v-model="formData.bisa_membaca_menulis" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Defisit Pangan</label>
                                                <select v-model="formData.defisit_pangan" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Ya">Ya</option>
                                                    <option value="Tidak">Tidak</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.defisit_pangan === 'Ya'" class="col-md-6">
                                                <label class="form-label">Defisit Pangan Lainnya</label>
                                                <input v-model="formData.defisit_pangan_lainnya" class="form-control"
                                                    placeholder="Jelaskan jenis defisit pangan" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Sedang Sekolah</label>
                                                <select v-model="formData.sedang_sekolah" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Ya">Ya</option>
                                                    <option value="Tidak">Tidak</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.sedang_sekolah === 'Ya'" class="col-md-6">
                                                <label class="form-label">Jika sedang sekolah, di mana</label>
                                                <select v-model="formData.sekolah_dimana" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Negeri">Negeri</option>
                                                    <option value="Komunitas">Komunitas</option>
                                                    <option value="Pribadi">Pribadi</option>
                                                    <option value="Tidak berlaku">Tidak berlaku</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Tingkat Pendidikan Terakhir selesai</label>
                                                <select v-model="formData.pendidikan_terakhir" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Dasar">Dasar</option>
                                                    <option value="Tingkat menengah">Tingkat menengah</option>
                                                    <option value="Sarjana">Sarjana</option>
                                                    <option value="Pascasarjana">Pascasarjana</option>
                                                    <option value="Vokasi">Vokasi</option>
                                                    <option value="Bukan usia sekolah">Bukan usia sekolah</option>
                                                    <option value="Tidak ada">Tidak ada</option>
                                                    <option value="Tidak berlaku">Tidak berlaku</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Alasan penghentian</label>
                                                <select v-model="formData.alasan_penghentian" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Tidak ada alasan">Tidak ada alasan</option>
                                                    <option value="Usia">Usia</option>
                                                    <option value="Kurangnya sumber daya ekonomi">Kurangnya sumber daya
                                                        ekonomi</option>
                                                    <option value="Gagal">Gagal</option>
                                                    <option value="Bekerja">Bekerja</option>
                                                    <option value="Takut pada guru">Takut pada guru</option>
                                                    <option value="Penyakit atau cacat">Penyakit atau cacat</option>
                                                    <option value="Pekerjaan rumah tangga">Pekerjaan rumah tangga
                                                    </option>
                                                    <option value="Keluarga tidak mengizinkan belajar">Keluarga tidak
                                                        mengizinkan belajar</option>
                                                    <option value="Tidak ada lembaga pendidikan">Tidak ada lembaga
                                                        pendidikan</option>
                                                    <option value="Tidak tertarik untuk belajar">Tidak tertarik untuk
                                                        belajar</option>
                                                    <option value="Kehamilan">Kehamilan</option>
                                                    <option value="Jarak">Jarak</option>
                                                    <option value="Pernikahan">Pernikahan</option>
                                                    <option value="Lainnya, tentukan">Lainnya, tentukan</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.alasan_penghentian === 'Lainnya, tentukan'"
                                                class="col-md-6">
                                                <label class="form-label">Alasan Lainnya</label>
                                                <input v-model="formData.alasan_penghentian_lainnya"
                                                    class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Disabilitas</label>
                                                <select v-model="formData.disabilitas" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Tidak">Tidak</option>
                                                    <option value="Tuna Netra">Tuna Netra</option>
                                                    <option value="Mobilitas">Mobilitas</option>
                                                    <option value="Tuna Wicara">Tuna Wicara</option>
                                                    <option value="Disabilitas Mental">Disabilitas Mental</option>
                                                    <option value="Tuna Rungu">Tuna Rungu</option>
                                                    <option value="Lainnya, tentukan">Lainnya, tentukan</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.disabilitas === 'Lainnya, tentukan'" class="col-md-6">
                                                <label class="form-label">Disabilitas Lainnya</label>
                                                <input v-model="formData.disabilitas_lainnya" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Kondisi Kesehatan Kronis</label>
                                                <select v-model="formData.kondisi_kesehatan_kronis" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Diabetes">Diabetes</option>
                                                    <option value="Kanker">Kanker</option>
                                                    <option value="HIV-AIDS">HIV-AIDS</option>
                                                    <option value="Anemia">Anemia</option>
                                                    <option value="Penyakit pernapasan">Penyakit pernapasan</option>
                                                    <option value="Arthritis - nyeri tulang">Arthritis - nyeri tulang
                                                    </option>
                                                    <option value="Diare">Diare</option>
                                                    <option value="Gastrointestinal">Gastrointestinal</option>
                                                    <option value="Asma">Asma</option>
                                                    <option value="Tuberclosis">Tuberclosis</option>
                                                    <option value="Tekanan Darah">Tekanan Darah</option>
                                                    <option value="Tidak ada">Tidak ada</option>
                                                    <option value="Lainnya, tentukan">Lainnya, tentukan</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.kondisi_kesehatan_kronis === 'Lainnya, tentukan'"
                                                class="col-md-6">
                                                <label class="form-label">Kondisi Kesehatan Lainnya</label>
                                                <input v-model="formData.kondisi_kesehatan_kronis_lainnya"
                                                    class="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab F: Pekerjaan KK -->
                                    <div class="tab-pane fade" id="tab-f">
                                        <h5 class="border-bottom pb-2 mb-4">F. Pekerjaan, Keterampilan, dan Tanah
                                            (Kepala Keluarga)</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Apakah Anda bekerja dalam 12 bulan
                                                    terakhir</label>
                                                <select v-model="formData.bekerja_12_bulan" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Ya, hanya bekerja">Ya, hanya bekerja</option>
                                                    <option value="Ya, bekerja dan belajar">Ya, bekerja dan belajar
                                                    </option>
                                                    <option value="Tidak, belajar">Tidak, belajar</option>
                                                    <option value="Tidak, tergantung">Tidak, tergantung</option>
                                                    <option value="Tidak, pensiun">Tidak, pensiun</option>
                                                    <option value="Tidak, dinonaktifkan">Tidak, dinonaktifkan
                                                    </option>
                                                    <option value="Tidak, menganggur">Tidak, menganggur</option>
                                                </select>
                                            </div>

                                            <div v-if="formData.bekerja_12_bulan && formData.bekerja_12_bulan.startsWith('Ya')"
                                                class="col-12">
                                                <h6 class="mt-3 mb-3">Pekerjaan Utama</h6>
                                                <div class="row g-3">
                                                    <div class="col-md-6">
                                                        <label class="form-label">Pekerjaan Utama</label>
                                                        <input v-model="formData.pekerjaan_utama" class="form-control"
                                                            placeholder="Contoh: Pertanian, Nelayan, Pedagang, dll" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Jenis Pekerjaan</label>
                                                        <select v-model="formData.jenis_pekerjaan_utama"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Tidak dibayar">Tidak dibayar</option>
                                                            <option value="Pekerja harian">Pekerja harian</option>
                                                            <option value="Wiraswasta sementara">Wiraswasta
                                                                sementara</option>
                                                            <option value="Wiraswasta permanen">Wiraswasta permanen
                                                            </option>
                                                            <option value="Dipekerjakan sementara">Dipekerjakan
                                                                sementara</option>
                                                            <option value="Dipekerjakan secara permanen dengan kontrak">
                                                                Dipekerjakan secara permanen dengan kontrak</option>
                                                            <option value="Dipekerjakan tanpa kontrak">Dipekerjakan
                                                                tanpa kontrak</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Lokasi Pekerjaan Utama</label>
                                                        <select v-model="formData.lokasi_pekerjaan_utama"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Dalam jarak dekat dari desa">Dalam jarak
                                                                dekat dari desa</option>
                                                            <option value="Kota/Kota Lain di dalam kabupaten">
                                                                Kota/Kota Lain di dalam kabupaten</option>
                                                            <option value="Kota/Kota Lain di TL">Kota/Kota Lain di
                                                                TL</option>
                                                            <option value="Lainnya, tentukan">Lainnya, tentukan
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div v-if="formData.lokasi_pekerjaan_utama === 'Lainnya, tentukan'"
                                                        class="col-md-6">
                                                        <label class="form-label">Lokasi Lainnya</label>
                                                        <input v-model="formData.lokasi_pekerjaan_utama_lainnya"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Jumlah Bulan Bekerja dalam
                                                            Setahun</label>
                                                        <input v-model.number="formData.jumlah_bulan_bekerja"
                                                            type="number" class="form-control" max="12" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Rata-rata Penghasilan per Bulan
                                                            (LAK)</label>
                                                        <input v-model.number="formData.penghasilan_per_bulan"
                                                            type="number" class="form-control" />
                                                    </div>
                                                </div>

                                                <h6 class="mt-4 mb-3">Pekerjaan Sekunder (Opsional)</h6>
                                                <div class="row g-3">
                                                    <div class="col-md-6">
                                                        <label class="form-label">Pekerjaan Sekunder</label>
                                                        <input v-model="formData.pekerjaan_sekunder"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Lokasi Pekerjaan Sekunder</label>
                                                        <input v-model="formData.lokasi_pekerjaan_sekunder"
                                                            class="form-control" />
                                                    </div>
                                                    <div v-if="formData.pekerjaan_sekunder" class="col-md-6">
                                                        <label class="form-label">Jumlah Bulan Bekerja</label>
                                                        <input v-model.number="formData.jumlah_bulan_bekerja_sekunder"
                                                            type="number" class="form-control" max="12" />
                                                    </div>
                                                    <div v-if="formData.pekerjaan_sekunder" class="col-md-6">
                                                        <label class="form-label">Penghasilan per Bulan
                                                            (LAK)</label>
                                                        <input v-model.number="formData.penghasilan_sekunder_per_bulan"
                                                            type="number" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="row g-3 mt-3">
                                                    <div class="col-md-6">
                                                        <label class="form-label">Apakah Bekerja 12 Bulan
                                                            Terakhir?</label>
                                                        <select v-model="formData.bekerja_12_bulan" class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Ya">Ya</option>
                                                            <option value="Tidak">Tidak</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Pekerjaan Utama Lainnya</label>
                                                        <input v-model="formData.pekerjaan_utama_lainnya"
                                                            class="form-control"
                                                            placeholder="Jika pekerjaan utama 'Lainnya', sebutkan" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Pekerjaan Sekunder Lainnya</label>
                                                        <input v-model="formData.pekerjaan_sekunder_lainnya"
                                                            class="form-control"
                                                            placeholder="Jika pekerjaan sekunder 'Lainnya', sebutkan" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Lokasi Pekerjaan Sekunder
                                                            Lainnya</label>
                                                        <input v-model="formData.lokasi_pekerjaan_sekunder_lainnya"
                                                            class="form-control"
                                                            placeholder="Jika lokasi 'Lainnya', sebutkan" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Keterampilan dan/atau
                                                            Profesi</label>
                                                        <input v-model="formData.keterampilan" class="form-control"
                                                            placeholder="Contoh: Tukang kayu, Supir, dll" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Keterampilan Lainnya</label>
                                                        <input v-model="formData.keterampilan_lainnya"
                                                            class="form-control"
                                                            placeholder="Jika keterampilan 'Lainnya', sebutkan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab G: Kesehatan RT -->
                                    <div class="tab-pane fade" id="tab-g">
                                        <h5 class="border-bottom pb-2 mb-4">G. Kesehatan (Rumah Tangga)</h5>
                                        <div class="row g-3">
                                            <div class="col-12">
                                                <label class="form-label">Penyakit Umum Anak-anak (&lt;12)</label>
                                                <textarea v-model="formData.penyakit_umum_anak" class="form-control"
                                                    rows="2"></textarea>
                                            </div>
                                            <div class="col-12">
                                                <label class="form-label">Penyakit Umum Remaja (12-18)</label>
                                                <textarea v-model="formData.penyakit_umum_remaja" class="form-control"
                                                    rows="2"></textarea>
                                            </div>
                                            <div class="col-12">
                                                <label class="form-label">Penyakit Umum Orang Dewasa</label>
                                                <textarea v-model="formData.penyakit_umum_dewasa" class="form-control"
                                                    rows="2"></textarea>
                                            </div>
                                            <div class="col-12">
                                                <label class="form-label">Penyakit Umum Lansia (+65)</label>
                                                <textarea v-model="formData.penyakit_umum_lansia" class="form-control"
                                                    rows="2"></textarea>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Tempat Pelayanan Kesehatan yang Paling
                                                    Sering Digunakan</label>
                                                <select v-model="formData.tempat_pelayanan_kesehatan"
                                                    class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Rumah sakit pemerintah">Rumah sakit pemerintah
                                                    </option>
                                                    <option value="Pusat kesehatan">Pusat kesehatan</option>
                                                    <option value="Pengobatan Tradisional">Pengobatan Tradisional
                                                    </option>
                                                    <option value="Tabib">Tabib</option>
                                                    <option value="Rumah sakit swasta">Rumah sakit swasta</option>
                                                    <option value="Apotek">Apotek</option>
                                                    <option value="Lainnya, (tentukan)">Lainnya, (tentukan)</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.tempat_pelayanan_kesehatan === 'Lainnya, (tentukan)'"
                                                class="col-md-6">
                                                <label class="form-label">Tempat Pelayanan Lainnya</label>
                                                <input v-model="formData.tempat_pelayanan_kesehatan_lainnya"
                                                    class="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab H: Kecukupan Pangan -->
                                    <div class="tab-pane fade" id="tab-h">
                                        <h5 class="border-bottom pb-2 mb-4">H. Kecukupan Pangan (Rumah Tangga)</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Kecukupan Pangan dari Produksi Pertanian
                                                    Sendiri</label>
                                                <select v-model="formData.kecukupan_pangan" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Surplus">Surplus</option>
                                                    <option value="Lebih dari 12 bulan">Lebih dari 12 bulan</option>
                                                    <option value="9 hingga 12 bulan">9 hingga 12 bulan</option>
                                                    <option value="6 hingga 9 bulan">6 hingga 9 bulan</option>
                                                    <option value="3 hingga 6 bulan">3 hingga 6 bulan</option>
                                                    <option value="Di bawah 3 bulan">Di bawah 3 bulan</option>
                                                    <option value="Tidak ada produksi">Tidak ada produksi</option>
                                                    <option value="Tidak Berlaku">Tidak Berlaku</option>
                                                </select>
                                            </div>
                                            <div class="col-12">
                                                <label class="form-label">Jika Kekurangan Pangan, Cara Menutupi
                                                    Defisit</label>
                                                <textarea v-model="formData.defisit_pangan_cara_menutupi"
                                                    class="form-control" rows="3"
                                                    placeholder="Contoh: Layanan, Perdagangan/Bisnis, Pekerjaan asing, dll"></textarea>
                                            </div>
                                        </div>
                                    </div>


                                    <!-- Tab I: Pendapatan, Pengeluaran, Tabungan & Hutang -->
                                    <div class="tab-pane fade" id="tab-i">
                                        <h5 class="border-bottom pb-2 mb-4">I. Pendapatan, Pengeluaran dan Utang Rumah
                                            Tangga</h5>

                                        <!-- Pendapatan (3 entries) -->
                                        <h6 class="fw-bold mb-3">Sumber Pendapatan</h6>

                                        <!-- Pendapatan 1 -->
                                        <div class="card mb-3">
                                            <div class="card-header bg-light"><strong>Sumber Pendapatan 1</strong></div>
                                            <div class="card-body">
                                                <div class="row g-3">
                                                    <div class="col-md-3">
                                                        <label class="form-label">Pertanian/Non-Pertanian</label>
                                                        <select v-model="formData.pendapatan_1_pertanian"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Pertanian">Pertanian</option>
                                                            <option value="Non-Pertanian">Non-Pertanian</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label class="form-label">Sumber Pendapatan</label>
                                                        <input v-model="formData.pendapatan_1_sumber"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label class="form-label">Sumber Lainnya</label>
                                                        <input v-model="formData.pendapatan_1_sumber_lainnya"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label class="form-label">Primer/Sekunder</label>
                                                        <select v-model="formData.pendapatan_1_primer_sekunder"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Primer">Primer</option>
                                                            <option value="Sekunder">Sekunder</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <label class="form-label">Jumlah (Rp/bulan)</label>
                                                        <input v-model.number="formData.pendapatan_1_jumlah"
                                                            type="number" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Pendapatan 2 -->
                                        <div class="card mb-3">
                                            <div class="card-header bg-light"><strong>Sumber Pendapatan 2</strong></div>
                                            <div class="card-body">
                                                <div class="row g-3">
                                                    <div class="col-md-3">
                                                        <label class="form-label">Pertanian/Non-Pertanian</label>
                                                        <select v-model="formData.pendapatan_2_pertanian"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Pertanian">Pertanian</option>
                                                            <option value="Non-Pertanian">Non-Pertanian</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label class="form-label">Sumber Pendapatan</label>
                                                        <input v-model="formData.pendapatan_2_sumber"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label class="form-label">Sumber Lainnya</label>
                                                        <input v-model="formData.pendapatan_2_sumber_lainnya"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label class="form-label">Primer/Sekunder</label>
                                                        <select v-model="formData.pendapatan_2_primer_sekunder"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Primer">Primer</option>
                                                            <option value="Sekunder">Sekunder</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <label class="form-label">Jumlah (Rp/bulan)</label>
                                                        <input v-model.number="formData.pendapatan_2_jumlah"
                                                            type="number" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Pendapatan 3 -->
                                        <div class="card mb-3">
                                            <div class="card-header bg-light"><strong>Sumber Pendapatan 3</strong></div>
                                            <div class="card-body">
                                                <div class="row g-3">
                                                    <div class="col-md-3">
                                                        <label class="form-label">Pertanian/Non-Pertanian</label>
                                                        <select v-model="formData.pendapatan_3_pertanian"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Pertanian">Pertanian</option>
                                                            <option value="Non-Pertanian">Non-Pertanian</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label class="form-label">Sumber Pendapatan</label>
                                                        <input v-model="formData.pendapatan_3_sumber"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label class="form-label">Sumber Lainnya</label>
                                                        <input v-model="formData.pendapatan_3_sumber_lainnya"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label class="form-label">Primer/Sekunder</label>
                                                        <select v-model="formData.pendapatan_3_primer_sekunder"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Primer">Primer</option>
                                                            <option value="Sekunder">Sekunder</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <label class="form-label">Jumlah (Rp/bulan)</label>
                                                        <input v-model.number="formData.pendapatan_3_jumlah"
                                                            type="number" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Pengeluaran (3 entries) -->
                                        <h6 class="fw-bold mb-3 mt-4">Pengeluaran Rumah Tangga</h6>

                                        <!-- Pengeluaran 1 -->
                                        <div class="card mb-3">
                                            <div class="card-header bg-light"><strong>Pengeluaran 1</strong></div>
                                            <div class="card-body">
                                                <div class="row g-3">
                                                    <div class="col-md-4">
                                                        <label class="form-label">Item Pengeluaran</label>
                                                        <input v-model="formData.pengeluaran_1_item"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-4">
                                                        <label class="form-label">Item Lainnya</label>
                                                        <input v-model="formData.pengeluaran_1_item_lainnya"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="form-label">Frekuensi</label>
                                                        <select v-model="formData.pengeluaran_1_frekuensi"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Harian">Harian</option>
                                                            <option value="Mingguan">Mingguan</option>
                                                            <option value="Bulanan">Bulanan</option>
                                                            <option value="Tahunan">Tahunan</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="form-label">Jumlah (Rp)</label>
                                                        <input v-model.number="formData.pengeluaran_1_jumlah"
                                                            type="number" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Pengeluaran 2 -->
                                        <div class="card mb-3">
                                            <div class="card-header bg-light"><strong>Pengeluaran 2</strong></div>
                                            <div class="card-body">
                                                <div class="row g-3">
                                                    <div class="col-md-4">
                                                        <label class="form-label">Item Pengeluaran</label>
                                                        <input v-model="formData.pengeluaran_2_item"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-4">
                                                        <label class="form-label">Item Lainnya</label>
                                                        <input v-model="formData.pengeluaran_2_item_lainnya"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="form-label">Frekuensi</label>
                                                        <select v-model="formData.pengeluaran_2_frekuensi"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Harian">Harian</option>
                                                            <option value="Mingguan">Mingguan</option>
                                                            <option value="Bulanan">Bulanan</option>
                                                            <option value="Tahunan">Tahunan</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="form-label">Jumlah (Rp)</label>
                                                        <input v-model.number="formData.pengeluaran_2_jumlah"
                                                            type="number" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Pengeluaran 3 -->
                                        <div class="card mb-3">
                                            <div class="card-header bg-light"><strong>Pengeluaran 3</strong></div>
                                            <div class="card-body">
                                                <div class="row g-3">
                                                    <div class="col-md-4">
                                                        <label class="form-label">Item Pengeluaran</label>
                                                        <input v-model="formData.pengeluaran_3_item"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-4">
                                                        <label class="form-label">Item Lainnya</label>
                                                        <input v-model="formData.pengeluaran_3_item_lainnya"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="form-label">Frekuensi</label>
                                                        <select v-model="formData.pengeluaran_3_frekuensi"
                                                            class="form-select">
                                                            <option value="">Pilih</option>
                                                            <option value="Harian">Harian</option>
                                                            <option value="Mingguan">Mingguan</option>
                                                            <option value="Bulanan">Bulanan</option>
                                                            <option value="Tahunan">Tahunan</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="form-label">Jumlah (Rp)</label>
                                                        <input v-model.number="formData.pengeluaran_3_jumlah"
                                                            type="number" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Totals -->
                                        <div class="row g-3 mb-4">
                                            <div class="col-md-6">
                                                <label class="form-label fw-bold">Total Penghasilan Tahunan (Rp)</label>
                                                <input v-model.number="formData.penghasilan_tahunan_total" type="number"
                                                    class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label fw-bold">Total Pengeluaran Bulanan (Rp)</label>
                                                <input v-model.number="formData.pengeluaran_bulanan_total" type="number"
                                                    class="form-control" />
                                            </div>
                                        </div>

                                        <!-- Tabungan & Hutang -->
                                        <h6 class="fw-bold mb-3 mt-4">Tabungan & Hutang</h6>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Apakah Punya Rekening Bank?</label>
                                                <select v-model="formData.rekening_bank" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Ya">Ya</option>
                                                    <option value="Tidak">Tidak</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Apakah Punya Tabungan?</label>
                                                <select v-model="formData.punya_tabungan" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Ya">Ya</option>
                                                    <option value="Tidak">Tidak</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.punya_tabungan === 'Ya'" class="col-md-6">
                                                <label class="form-label">Jenis Tabungan</label>
                                                <input v-model="formData.jenis_tabungan" class="form-control" />
                                            </div>
                                            <div v-if="formData.punya_tabungan === 'Ya'" class="col-md-6">
                                                <label class="form-label">Jenis Tabungan Lainnya</label>
                                                <input v-model="formData.jenis_tabungan_lainnya" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Apakah Punya Hutang?</label>
                                                <select v-model="formData.punya_hutang" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Ya">Ya</option>
                                                    <option value="Tidak">Tidak</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.punya_hutang === 'Ya'" class="col-md-6">
                                                <label class="form-label">Jenis Hutang</label>
                                                <input v-model="formData.jenis_hutang" class="form-control" />
                                            </div>
                                            <div v-if="formData.punya_hutang === 'Ya'" class="col-md-6">
                                                <label class="form-label">Jenis Hutang Lainnya</label>
                                                <input v-model="formData.jenis_hutang_lainnya" class="form-control" />
                                            </div>
                                            <div v-if="formData.punya_hutang === 'Ya'" class="col-md-6">
                                                <label class="form-label">Alasan Hutang</label>
                                                <input v-model="formData.alasan_hutang" class="form-control" />
                                            </div>
                                            <div v-if="formData.punya_hutang === 'Ya'" class="col-md-6">
                                                <label class="form-label">Alasan Hutang Lainnya</label>
                                                <input v-model="formData.alasan_hutang_lainnya" class="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab J: Dampak Lahan -->
                                    <div class="tab-pane fade" id="tab-j">
                                        <h5 class="border-bottom pb-2 mb-4">J. Dampak Pembebasan Lahan</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Pernah Terkena Dampak Proyek Lain</label>
                                                <select v-model="formData.pernah_terdampak_proyek" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="1">Ya</option>
                                                    <option value="2">Tidak</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.pernah_terdampak_proyek === '1'" class="col-md-6">
                                                <label class="form-label">Jenis Proyek Sebelumnya</label>
                                                <input v-model="formData.jenis_proyek_sebelumnya"
                                                    class="form-control" />
                                            </div>
                                            <div v-if="formData.pernah_terdampak_proyek === '1'" class="col-md-6">
                                                <label class="form-label">Luas Lahan Dibebaskan (m²)</label>
                                                <input v-model.number="formData.luas_lahan_dibebaskan" type="number"
                                                    class="form-control" />
                                            </div>
                                            <div v-if="formData.pernah_terdampak_proyek === '1'" class="col-12">
                                                <label class="form-label">Perkiraan Dampak</label>
                                                <textarea v-model="formData.perkiraan_dampak" class="form-control"
                                                    rows="3"
                                                    placeholder="Jelaskan perkiraan dampak dari proyek ini"></textarea>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Pernah Menjadi Pengungsi</label>
                                                <select v-model="formData.pernah_pengungsi" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="1">Ya</option>
                                                    <option value="2">Tidak</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab K: Bisnis -->
                                    <div class="tab-pane fade" id="tab-k">
                                        <h5 class="border-bottom pb-2 mb-4">K. Usaha Komersial/Bisnis</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Apakah Memiliki Bisnis/Usaha</label>
                                                <select v-model="formData.punya_bisnis" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="1">Ya</option>
                                                    <option value="2">Tidak</option>
                                                </select>
                                            </div>

                                            <template v-if="formData.punya_bisnis === '1'">
                                                <div class="col-md-6">
                                                    <label class="form-label">Lokasi Bisnis</label>
                                                    <select v-model="formData.lokasi_bisnis" class="form-select">
                                                        <option value="">Pilih</option>
                                                        <option value="Di rumah">Di rumah</option>
                                                        <option value="Di luar rumah">Di luar rumah</option>
                                                        <option value="Lainnya">Lainnya</option>
                                                    </select>
                                                </div>
                                                <div v-if="formData.lokasi_bisnis === 'Lainnya'" class="col-md-6">
                                                    <label class="form-label">Lokasi Bisnis Lainnya</label>
                                                    <input v-model="formData.lokasi_bisnis_lainnya"
                                                        class="form-control" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Kepemilikan Bisnis</label>
                                                    <select v-model="formData.kepemilikan_bisnis" class="form-select">
                                                        <option value="">Pilih</option>
                                                        <option value="Sendiri">Sendiri</option>
                                                        <option value="Keluarga">Keluarga</option>
                                                        <option value="Kemitraan">Kemitraan</option>
                                                        <option value="Lainnya">Lainnya</option>
                                                    </select>
                                                </div>
                                                <div v-if="formData.kepemilikan_bisnis === 'Lainnya'" class="col-md-6">
                                                    <label class="form-label">Kepemilikan Lainnya</label>
                                                    <input v-model="formData.kepemilikan_bisnis_lainnya"
                                                        class="form-control" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Sejak Kapan (Tahun)</label>
                                                    <input v-model="formData.sejak_kapan_bisnis" class="form-control"
                                                        placeholder="Contoh: 2020" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Jenis Bisnis</label>
                                                    <input v-model="formData.jenis_bisnis" class="form-control" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Jenis Bisnis Lainnya</label>
                                                    <input v-model="formData.jenis_bisnis_lainnya"
                                                        class="form-control" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Jumlah Pegawai</label>
                                                    <input v-model.number="formData.jumlah_pegawai" type="number"
                                                        class="form-control" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Pendapatan Rata-rata per Bulan
                                                        (Rp)</label>
                                                    <input v-model.number="formData.pendapatan_bisnis_per_bulan"
                                                        type="number" class="form-control" />
                                                </div>
                                                <div class="col-12">
                                                    <label class="form-label">Deskripsi Produk/Layanan</label>
                                                    <textarea v-model="formData.deskripsi_produk_layanan"
                                                        class="form-control" rows="3"></textarea>
                                                </div>
                                            </template>
                                        </div>
                                    </div>


                                    <!-- Tab L: Struktur Rumah -->
                                    <div class="tab-pane fade" id="tab-l">
                                        <h5 class="border-bottom pb-2 mb-4">L. Struktur Tempat Tinggal</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Tipe Rumah</label>
                                                <select v-model="formData.tipe_rumah" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Permanen">Permanen</option>
                                                    <option value="Semi-permanen">Semi-permanen</option>
                                                    <option value="Tidak permanen">Tidak permanen</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.tipe_rumah === 'Lainnya'" class="col-md-6">
                                                <label class="form-label">Tipe Rumah Lainnya</label>
                                                <input v-model="formData.tipe_rumah_lainnya" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Luas Rumah (m²)</label>
                                                <input v-model.number="formData.luas_rumah" type="number"
                                                    class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Pelayanan Listrik</label>
                                                <select v-model="formData.pelayanan_listrik" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="PLN">PLN</option>
                                                    <option value="Genset">Genset</option>
                                                    <option value="Solar panel">Solar panel</option>
                                                    <option value="Tidak ada">Tidak ada</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.pelayanan_listrik === 'Lainnya'" class="col-md-6">
                                                <label class="form-label">Pelayanan Listrik Lainnya</label>
                                                <input v-model="formData.pelayanan_listrik_lainnya"
                                                    class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Sumber Air</label>
                                                <select v-model="formData.sumber_air" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="PDAM">PDAM</option>
                                                    <option value="Sumur">Sumur</option>
                                                    <option value="Sungai">Sungai</option>
                                                    <option value="Air hujan">Air hujan</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.sumber_air === 'Lainnya'" class="col-md-6">
                                                <label class="form-label">Sumber Air Lainnya</label>
                                                <input v-model="formData.sumber_air_lainnya" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Sanitasi</label>
                                                <select v-model="formData.sanitasi" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Septic tank">Septic tank</option>
                                                    <option value="Toilet umum">Toilet umum</option>
                                                    <option value="Tidak ada">Tidak ada</option>
                                                </select>
                                            </div>
                                            <div class="col-12">
                                                <label class="form-label">Karakteristik Khusus</label>
                                                <textarea v-model="formData.karakteristik_khusus" class="form-control"
                                                    rows="3"
                                                    placeholder="Contoh: Rumah panggung, dekat sungai, dll"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab M: Kerentanan -->
                                    <div class="tab-pane fade" id="tab-m">
                                        <h5 class="border-bottom pb-2 mb-4">M. Kerentanan</h5>
                                        <div class="row g-3">
                                            <div class="col-12">
                                                <label class="form-label">Karakteristik Kerentanan</label>
                                                <textarea v-model="formData.karakteristik_kerentanan"
                                                    class="form-control" rows="4"
                                                    placeholder="Contoh: Lansia, ibu hamil, disabilitas, anak balita, dll"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab N: Komunikasi -->
                                    <div class="tab-pane fade" id="tab-n">
                                        <h5 class="border-bottom pb-2 mb-4">N. Sumber Informasi & Komunikasi</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Sumber Informasi Utama</label>
                                                <select v-model="formData.sumber_informasi" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="TV">TV</option>
                                                    <option value="Radio">Radio</option>
                                                    <option value="Koran">Koran</option>
                                                    <option value="Internet/Media sosial">Internet/Media sosial</option>
                                                    <option value="Tokoh masyarakat">Tokoh masyarakat</option>
                                                    <option value="Pemerintah desa">Pemerintah desa</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.sumber_informasi === 'Lainnya'" class="col-md-6">
                                                <label class="form-label">Sumber Informasi Lainnya</label>
                                                <input v-model="formData.sumber_informasi_lainnya"
                                                    class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Metode Komunikasi Preferensi</label>
                                                <select v-model="formData.metode_komunikasi" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Tatap muka">Tatap muka</option>
                                                    <option value="Telepon">Telepon</option>
                                                    <option value="SMS">SMS</option>
                                                    <option value="WhatsApp">WhatsApp</option>
                                                    <option value="Email">Email</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div v-if="formData.metode_komunikasi === 'Lainnya'" class="col-md-6">
                                                <label class="form-label">Metode Komunikasi Lainnya</label>
                                                <input v-model="formData.metode_komunikasi_lainnya"
                                                    class="form-control" />
                                            </div>
                                        </div>
                                    </div>


                                    <!-- Tab O: Tanah -->
                                    <div class="tab-pane fade" id="tab-o">
                                        <h5 class="border-bottom pb-2 mb-4">O. Tanah</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">NIB (Nomor Induk Berusaha)</label>
                                                <input v-model="formData.nib" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Letak Tanah</label>
                                                <input v-model="formData.letak_tanah" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Status Tanah</label>
                                                <select v-model="formData.status_tanah" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Milik Sendiri">Milik Sendiri</option>
                                                    <option value="Sewa">Sewa</option>
                                                    <option value="Pinjam">Pinjam</option>
                                                    <option value="Warisan">Warisan</option>
                                                    <option value="Adat">Adat</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Surat Bukti Tanah</label>
                                                <select v-model="formData.surat_bukti_tanah" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Sertifikat">Sertifikat</option>
                                                    <option value="Girik">Girik</option>
                                                    <option value="Letter C">Letter C</option>
                                                    <option value="Adat">Adat</option>
                                                    <option value="Tidak Ada">Tidak Ada</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Luas Tanah (m²)</label>
                                                <input v-model.number="formData.luas_tanah" type="number"
                                                    class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Tahun Mulai Kelola Lahan</label>
                                                <input v-model.number="formData.tahun_kelola_lahan" type="number"
                                                    class="form-control" placeholder="Contoh: 2010" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Asal Usul Perolehan</label>
                                                <select v-model="formData.asal_usul_perolehan" class="form-select">
                                                    <option value="">Pilih</option>
                                                    <option value="Beli">Beli</option>
                                                    <option value="Warisan">Warisan</option>
                                                    <option value="Hibah">Hibah</option>
                                                    <option value="Tukar">Tukar</option>
                                                    <option value="Adat">Adat</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Biaya Perolehan (Rp)</label>
                                                <input v-model.number="formData.biaya_perolehan" type="number"
                                                    class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Pembebanan Hak Tanah</label>
                                                <input v-model="formData.pembebanan_hak_tanah" class="form-control"
                                                    placeholder="Contoh: Tidak ada, Gadai, dll" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Fungsi Kawasan</label>
                                                <input v-model="formData.fungsi_kawasan" class="form-control"
                                                    placeholder="Contoh: Pertanian, Pemukiman, dll" />
                                            </div>
                                            <div class="col-md-12">
                                                <label class="form-label">Benda Lain di Tanah</label>
                                                <textarea v-model="formData.benda_lain_tanah" class="form-control"
                                                    rows="2" placeholder="Contoh: Pohon, bangunan, dll"></textarea>
                                            </div>

                                            <!-- Batas-batas Tanah -->
                                            <div class="col-12">
                                                <h6 class="fw-bold mt-3 mb-2">Batas-batas Tanah</h6>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Batas Utara</label>
                                                <input v-model="formData.batas_utara" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Batas Selatan</label>
                                                <input v-model="formData.batas_selatan" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Batas Timur</label>
                                                <input v-model="formData.batas_timur" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Batas Barat</label>
                                                <input v-model="formData.batas_barat" class="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab P: Ruang Atas/Bawah -->
                                    <div class="tab-pane fade" id="tab-p">
                                        <h5 class="border-bottom pb-2 mb-4">P. Ruang Atas dan Bawah</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">HM Sarusun (Hak Milik Satuan Rumah
                                                    Susun)</label>
                                                <input v-model="formData.hm_sarusun" class="form-control"
                                                    placeholder="Contoh: Ada/Tidak Ada" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Luas Ruang (m²)</label>
                                                <input v-model.number="formData.luas_ruang" type="number"
                                                    class="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab Q: Tanaman -->
                                    <div class="tab-pane fade" id="tab-q">
                                        <h5 class="border-bottom pb-2 mb-4">Q. Jumlah Tanaman</h5>
                                        <p class="text-muted small">Masukkan jumlah untuk setiap jenis tanaman
                                            (kosongkan jika tidak ada)</p>
                                        <div class="row g-3">
                                            <div class="col-md-3">
                                                <label class="form-label">Merica</label>
                                                <input v-model.number="formData.tanaman_merica" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Alpukat</label>
                                                <input v-model.number="formData.tanaman_alpukat" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Aren</label>
                                                <input v-model.number="formData.tanaman_aren" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Belimbing</label>
                                                <input v-model.number="formData.tanaman_belimbing" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Belukar</label>
                                                <input v-model.number="formData.tanaman_belukar" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Bonglai</label>
                                                <input v-model.number="formData.tanaman_bonglai" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Buah Naga</label>
                                                <input v-model.number="formData.tanaman_buah_naga" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Cabai</label>
                                                <input v-model.number="formData.tanaman_cabai" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Cempedak</label>
                                                <input v-model.number="formData.tanaman_cempedak" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Cengkeh</label>
                                                <input v-model.number="formData.tanaman_cengkeh" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Cokelat</label>
                                                <input v-model.number="formData.tanaman_cokelat" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Durian</label>
                                                <input v-model.number="formData.tanaman_durian" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Jahe Merah</label>
                                                <input v-model.number="formData.tanaman_jahe_merah" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Jambu</label>
                                                <input v-model.number="formData.tanaman_jambu" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Jambu Air</label>
                                                <input v-model.number="formData.tanaman_jambu_air" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Jambu Batu</label>
                                                <input v-model.number="formData.tanaman_jambu_batu" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Jambu Biji</label>
                                                <input v-model.number="formData.tanaman_jambu_biji" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Jati Putih</label>
                                                <input v-model.number="formData.tanaman_jati_putih" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Jengkol</label>
                                                <input v-model.number="formData.tanaman_jengkol" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Jeruk</label>
                                                <input v-model.number="formData.tanaman_jeruk" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Jeruk Nipis</label>
                                                <input v-model.number="formData.tanaman_jeruk_nipis" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Kapuk</label>
                                                <input v-model.number="formData.tanaman_kapuk" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Kecombrang</label>
                                                <input v-model.number="formData.tanaman_kecombrang" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Kelapa</label>
                                                <input v-model.number="formData.tanaman_kelapa" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Kelapa Sawit</label>
                                                <input v-model.number="formData.tanaman_kelapa_sawit" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Kelor</label>
                                                <input v-model.number="formData.tanaman_kelor" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Kopi</label>
                                                <input v-model.number="formData.tanaman_kopi" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Kunyit</label>
                                                <input v-model.number="formData.tanaman_kunyit" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Kunyit Hitam</label>
                                                <input v-model.number="formData.tanaman_kunyit_hitam" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Langsat</label>
                                                <input v-model.number="formData.tanaman_langsat" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Lengkuas</label>
                                                <input v-model.number="formData.tanaman_lengkuas" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Mangga</label>
                                                <input v-model.number="formData.tanaman_mangga" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Nanas</label>
                                                <input v-model.number="formData.tanaman_nanas" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Nangka</label>
                                                <input v-model.number="formData.tanaman_nangka" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Nilam</label>
                                                <input v-model.number="formData.tanaman_nilam" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Pepaya</label>
                                                <input v-model.number="formData.tanaman_pepaya" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Pinang</label>
                                                <input v-model.number="formData.tanaman_pinang" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Rambutan</label>
                                                <input v-model.number="formData.tanaman_rambutan" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Serai</label>
                                                <input v-model.number="formData.tanaman_serai" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Singkong</label>
                                                <input v-model.number="formData.tanaman_singkong" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Sirsak</label>
                                                <input v-model.number="formData.tanaman_sirsak" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Sukun</label>
                                                <input v-model.number="formData.tanaman_sukun" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Talas</label>
                                                <input v-model.number="formData.tanaman_talas" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Ubi</label>
                                                <input v-model.number="formData.tanaman_ubi" type="number"
                                                    class="form-control" min="0" />
                                            </div>
                                        </div>
                                    </div>


                                    <!-- Tab R: Lainnya -->
                                    <div class="tab-pane fade" id="tab-r">
                                        <h5 class="border-bottom pb-2 mb-4">R. Informasi Lainnya</h5>
                                        <div class="row g-3">
                                            <div class="col-12">
                                                <label class="form-label">Catatan Tambahan</label>
                                                <textarea v-model="formData.catatan_tambahan" class="form-control"
                                                    rows="4"
                                                    placeholder="Catatan atau informasi tambahan yang relevan"></textarea>
                                            </div>
                                            <div class="col-12">
                                                <label class="form-label">Kebutuhan Khusus</label>
                                                <textarea v-model="formData.kebutuhan_khusus" class="form-control"
                                                    rows="3"
                                                    placeholder="Kebutuhan khusus yang perlu diperhatikan"></textarea>
                                            </div>
                                            <div class="col-12">
                                                <label class="form-label">Harapan Kompensasi</label>
                                                <textarea v-model="formData.harapan_kompensasi" class="form-control"
                                                    rows="3"
                                                    placeholder="Harapan terkait kompensasi atau relokasi"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tab Anggota Keluarga -->
                                    <div class="tab-pane fade" id="tab-anggota">
                                        <h5 class="border-bottom pb-2 mb-4">Anggota Keluarga</h5>
                                        <p class="text-muted mb-4">
                                            <i class="bi bi-info-circle"></i>
                                            Data anggota keluarga akan dikelola setelah data kepala keluarga tersimpan.
                                            Anda dapat menambah, edit, dan hapus anggota keluarga dari halaman detail.
                                        </p>

                                        <div class="alert alert-info">
                                            <strong>Informasi:</strong> Section Anggota Keluarga akan tersedia setelah
                                            data kepala keluarga disimpan.
                                            Setiap anggota keluarga memiliki data demografi, pendidikan, pekerjaan, dan
                                            kesehatan yang lengkap.
                                        </div>

                                        <!-- Placeholder for family members list -->
                                        <div class="card">
                                            <div class="card-body text-center text-muted">
                                                <i class="bi bi-people" style="font-size: 3rem;"></i>
                                                <p class="mt-3">Simpan data kepala keluarga terlebih dahulu untuk
                                                    menambah anggota keluarga</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-circle"></i> Batal
                    </button>
                    <button type="button" class="btn btn-primary" @click="saveData">
                        <i class="bi bi-save"></i> {{ isEditMode ? 'Update' : 'Simpan' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { censusKepalaKeluargaApi } from '../api'

const props = defineProps<{
    isEditMode: boolean
    isReadOnly?: boolean
    recordId: number | null
}>()

const emit = defineEmits<{
    save: [data: any]
}>()

// Local reactive formData
const formData = ref<any>({})
const loading = ref(false)

// Fetch data from API when recordId changes
watch(() => props.recordId, async (newId) => {
    if (newId) {
        loading.value = true
        try {
            const response = await censusKepalaKeluargaApi.getById(newId)
            formData.value = response
            console.log('Fetched census data:', response)
        } catch (error) {
            console.error('Error fetching census data:', error)
        } finally {
            loading.value = false
        }
    } else {
        // Reset form for new entry
        formData.value = {}
    }
}, { immediate: true })

const saveData = () => {
    emit('save', formData.value)
}
</script>

<style scoped>
.modal-fullscreen .modal-body {
    padding: 0;
}

.nav-pills .nav-link {
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
}

.nav-pills .nav-link.active {
    background-color: #0d6efd;
}

.form-label {
    font-weight: 500;
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
}

.form-control,
.form-select {
    font-size: 0.9rem;
}

/* Read-only mode styles */
.read-only-modal input,
.read-only-modal select,
.read-only-modal textarea {
    pointer-events: none;
    background-color: #e9ecef !important;
    cursor: not-allowed;
    opacity: 0.8;
}

.read-only-modal .btn-primary {
    display: none;
}
</style>
