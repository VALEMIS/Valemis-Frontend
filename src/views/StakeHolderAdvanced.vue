<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Stakeholder Management System</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active">Stakeholder Management</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- Stakeholder Network Visualization with Quadrant Matrix -->
        <div class="card mb-4">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">
              <i class="bi bi-diagram-3"></i> Stakeholder Power-Interest Matrix & Network Visualization
            </h5>
            <small>Interactive quadrant analysis with directional relationships</small>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- Canvas -->
              <div class="col-lg-9">
                <canvas ref="networkCanvas" width="900" height="650" class="border rounded bg-white w-100" @click="handleCanvasClick" style="max-width: 100%;"></canvas>
              </div>

              <!-- Legend -->
              <div class="col-lg-3">
                <div class="ps-3">
                  <h6 class="mb-3"><i class="bi bi-info-circle"></i> Legend</h6>
                  
                  <!-- Sentiment -->
                  <div class="mb-3">
                    <small class="text-muted fw-bold d-block mb-2">Sentiment:</small>
                    <div class="d-flex align-items-center mb-2">
                      <span class="d-inline-block rounded-circle me-2" style="width: 12px; height: 12px; background-color: #28a745;"></span>
                      <small>Pro Aktif</small>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                      <span class="d-inline-block rounded-circle me-2" style="width: 12px; height: 12px; background-color: #17a2b8;"></span>
                      <small>Pro Pasif</small>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                      <span class="d-inline-block rounded-circle me-2" style="width: 12px; height: 12px; background-color: #dc3545;"></span>
                      <small>Kontra Aktif</small>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                      <span class="d-inline-block rounded-circle me-2" style="width: 12px; height: 12px; background-color: #ffc107;"></span>
                      <small>Kontra Pasif</small>
                    </div>
                  </div>

                  <hr class="my-2">

                  <!-- Arrows -->
                  <div class="mb-3">
                    <small class="text-muted fw-bold d-block mb-2">Direction:</small>
                    <div class="mb-2">
                      <small><i class="bi bi-arrow-right me-1"></i> Influences</small>
                    </div>
                    <div class="mb-2">
                      <small><i class="bi bi-arrow-left-right me-1"></i> Mutual</small>
                    </div>
                  </div>

                  <hr class="my-2">

                  <!-- Strength -->
                  <div class="mb-3">
                    <small class="text-muted fw-bold d-block mb-2">Strength:</small>
                    <div class="mb-2">
                      <small><strong>━━━</strong> Strong</small>
                      <div><small class="text-muted">(score >70)</small></div>
                    </div>
                    <div class="mb-2">
                      <small><strong>──</strong> Medium</small>
                      <div><small class="text-muted">(40-70)</small></div>
                    </div>
                    <div class="mb-2">
                      <small><strong>· · ·</strong> Weak</small>
                      <div><small class="text-muted">(score <40)</small></div>
                    </div>
                  </div>

                  <hr class="my-2">

                  <!-- Info -->
                  <div class="alert alert-info p-2 mb-0" style="font-size: 0.8rem;">
                    <i class="bi bi-lightbulb-fill"></i> Click nodes for details
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dashboard Cards - Moved Below -->
        <div class="row mb-4">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{ stats.proAktif }}</h3>
                <p>Pro - Aktif</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{ stats.proPasif }}</h3>
                <p>Pro - Pasif</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>{{ stats.kontraAktif }}</h3>
                <p>Kontra - Aktif</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>{{ stats.kontraPasif }}</h3>
                <p>Kontra - Pasif</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Tabs -->
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" role="tablist">
              <li class="nav-item">
                <a 
                  class="nav-link" 
                  :class="{ active: activeTab === 'master' }"
                  @click="activeTab = 'master'"
                  href="javascript:void(0)"
                >
                  <i class="bi bi-person-badge"></i> Master Stakeholder
                </a>
              </li>
              <li class="nav-item">
                <a 
                  class="nav-link" 
                  :class="{ active: activeTab === 'background' }"
                  @click="activeTab = 'background'"
                  href="javascript:void(0)"
                >
                  <i class="bi bi-book"></i> Latar Belakang
                </a>
              </li>
              <li class="nav-item">
                <a 
                  class="nav-link" 
                  :class="{ active: activeTab === 'isu' }"
                  @click="activeTab = 'isu'"
                  href="javascript:void(0)"
                >
                  <i class="bi bi-flag"></i> Isu/Project
                </a>
              </li>
              <li class="nav-item">
                <a 
                  class="nav-link" 
                  :class="{ active: activeTab === 'interaksi' }"
                  @click="activeTab = 'interaksi'"
                  href="javascript:void(0)"
                >
                  <i class="bi bi-chat-dots"></i> Log Interaksi
                </a>
              </li>
              <li class="nav-item">
                <a 
                  class="nav-link" 
                  :class="{ active: activeTab === 'network' }"
                  @click="activeTab = 'network'"
                  href="javascript:void(0)"
                >
                  <i class="bi bi-diagram-2"></i> Network/Relasi & Dokumen
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <!-- Tab 1: Master Stakeholder -->
            <div v-show="activeTab === 'master'">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>Daftar Stakeholder</h5>
                <button class="btn btn-primary" @click="openModalAdd('master')">
                  <i class="bi bi-plus-circle"></i> Tambah Stakeholder
                </button>
              </div>
              
              <div class="table-responsive">
                <table ref="masterTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Nama</th>
                      <th>Jenis</th>
                      <th>Peran</th>
                      <th>Pengaruh</th>
                      <th>Kepentingan</th>
                      <th>Klasifikasi</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="sh in stakeholders" :key="sh.id">
                      <td>{{ sh.stakeholder_id }}</td>
                      <td>
                        <strong>{{ sh.nama_lengkap }}</strong><br>
                        <small class="text-muted">{{ sh.nama_panggilan }}</small>
                      </td>
                      <td>{{ sh.jenis_stakeholder }}</td>
                      <td>{{ sh.peran_di_proyek }}</td>
                      <td>
                        <span class="badge" :class="getBadgeInfluence(sh.level_pengaruh)">
                          {{ sh.level_pengaruh }}/5
                        </span>
                      </td>
                      <td>
                        <span class="badge" :class="getBadgeInterest(sh.level_kepentingan)">
                          {{ sh.level_kepentingan }}/5
                        </span>
                      </td>
                      <td>
                        <span class="badge" :class="getBadgeSentimen(sh.klasifikasi_sikap)">
                          {{ sh.klasifikasi_sikap }}
                        </span>
                      </td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-info" @click="viewDetail(sh)" title="Detail">
                            <i class="bi bi-eye"></i>
                          </button>
                          <button class="btn btn-warning" @click="editStakeholder(sh)" title="Edit">
                            <i class="bi bi-pencil"></i>
                          </button>
                          <button class="btn btn-danger" @click="deleteStakeholder(sh.id)" title="Hapus">
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 2: Latar Belakang & Atribut Relasi -->
            <div v-show="activeTab === 'background'">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>Latar Belakang Stakeholder</h5>
                <button class="btn btn-primary" @click="openModalAdd('background')">
                  <i class="bi bi-plus-circle"></i> Tambah Data Background
                </button>
              </div>

              <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="table-light">
                    <tr>
                      <th>Stakeholder</th>
                      <th>Pendidikan</th>
                      <th>Pekerjaan</th>
                      <th>Organisasi</th>
                      <th>Kekerabatan</th>
                      <th>Lokasi</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="bg in backgrounds" :key="bg.id">
                      <td><strong>{{ bg.stakeholder_nama }}</strong></td>
                      <td>
                        {{ bg.jenjang_pendidikan }}<br>
                        <small class="text-muted">{{ bg.universitas }} - {{ bg.jurusan }}</small><br>
                        <small class="text-muted">{{ bg.tahun_masuk }} - {{ bg.tahun_lulus }}</small>
                      </td>
                      <td>
                        {{ bg.pekerjaan_utama }}<br>
                        <small class="text-muted">{{ bg.instansi }}</small>
                      </td>
                      <td>
                        <span v-for="(org, idx) in bg.organisasi" :key="idx" class="badge bg-secondary me-1">
                          {{ org }}
                        </span>
                      </td>
                      <td>
                        <span v-if="bg.status_kekerabatan" class="badge bg-info">
                          {{ bg.detail_kekerabatan }}
                        </span>
                        <span v-else class="text-muted">-</span>
                      </td>
                      <td>{{ bg.dusun_rt_rw }}</td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-warning" @click="editBackground(bg)">
                            <i class="bi bi-pencil"></i>
                          </button>
                          <button class="btn btn-danger" @click="deleteBackground(bg.id)">
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 3: Isu/Project per Stakeholder -->
            <div v-show="activeTab === 'isu'">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>Isu & Project Stakeholder</h5>
                <button class="btn btn-primary" @click="openModalAdd('isu')">
                  <i class="bi bi-plus-circle"></i> Tambah Data Isu
                </button>
              </div>

              <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="table-light">
                    <tr>
                      <th>Stakeholder</th>
                      <th>Project/Isu</th>
                      <th>Jenis Dampak</th>
                      <th>Besaran Dampak</th>
                      <th>Persepsi</th>
                      <th>Keberatan Utama</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="isu in issuData" :key="isu.id">
                      <td><strong>{{ isu.stakeholder_nama }}</strong></td>
                      <td>
                        {{ isu.nama_project }}<br>
                        <small class="text-muted">{{ isu.isu_spesifik }}</small>
                      </td>
                      <td>
                        <span v-for="(dampak, idx) in isu.jenis_dampak" :key="idx" class="badge bg-warning text-dark me-1">
                          {{ dampak }}
                        </span>
                      </td>
                      <td>
                        <div class="progress" style="height: 20px;">
                          <div 
                            class="progress-bar" 
                            :class="getProgressClass(isu.besaran_dampak)"
                            :style="{ width: (isu.besaran_dampak * 20) + '%' }"
                          >
                            {{ isu.besaran_dampak }}/5
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="badge" :class="getBadgePersepsi(isu.persepsi_umum)">
                          {{ isu.persepsi_umum }}
                        </span>
                      </td>
                      <td>{{ isu.topik_keberatan || '-' }}</td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-warning" @click="editIsu(isu)">
                            <i class="bi bi-pencil"></i>
                          </button>
                          <button class="btn btn-danger" @click="deleteIsu(isu.id)">
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 4: Log Interaksi & Sentimen -->
            <div v-show="activeTab === 'interaksi'">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>Log Interaksi & Sentimen</h5>
                <button class="btn btn-primary" @click="openModalAdd('interaksi')">
                  <i class="bi bi-plus-circle"></i> Tambah Log Interaksi
                </button>
              </div>

              <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="table-light">
                    <tr>
                      <th>Tanggal</th>
                      <th>Stakeholder</th>
                      <th>Jenis Interaksi</th>
                      <th>Peran</th>
                      <th>Pernyataan</th>
                      <th>Nada</th>
                      <th>Arah Sikap</th>
                      <th>Aktivitas</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="log in interactionLogs" :key="log.id">
                      <td>
                        {{ formatDate(log.tanggal) }}<br>
                        <small class="text-muted">{{ log.lokasi }}</small>
                      </td>
                      <td><strong>{{ log.stakeholder_nama }}</strong></td>
                      <td>{{ log.jenis_interaksi }}</td>
                      <td>
                        <span class="badge bg-info">{{ log.peran_dalam_pertemuan }}</span>
                      </td>
                      <td>
                        <div style="max-width: 300px;">
                          <small>{{ log.ringkasan_pernyataan }}</small><br>
                          <span class="badge bg-secondary">{{ log.kategori_pernyataan }}</span>
                        </div>
                      </td>
                      <td>
                        <span class="badge" :class="getBadgeNada(log.nada)">
                          {{ log.nada }}
                        </span>
                      </td>
                      <td>
                        <span class="badge" :class="getBadgeArahSikap(log.arah_sikap)">
                          {{ getArahSikapLabel(log.arah_sikap) }}
                        </span>
                      </td>
                      <td>
                        <span class="badge" :class="getBadgeAktivitas(log.level_aktivitas)">
                          Level {{ log.level_aktivitas }}
                        </span>
                      </td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-info" @click="viewInteraksi(log)">
                            <i class="bi bi-eye"></i>
                          </button>
                          <button class="btn btn-warning" @click="editInteraksi(log)">
                            <i class="bi bi-pencil"></i>
                          </button>
                          <button class="btn btn-danger" @click="deleteInteraksi(log.id)">
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 5: Network/Relasi & Dokumen -->
            <div v-show="activeTab === 'network'">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5><i class="bi bi-diagram-2"></i> Network & Relasi Stakeholder</h5>
                <div>
                  <button class="btn btn-success me-2" @click="openModalAdd('evidence')">
                    <i class="bi bi-file-earmark-plus"></i> Upload Dokumen
                  </button>
                  <button class="btn btn-primary" @click="openModalAdd('network')">
                    <i class="bi bi-plus-circle"></i> Tambah Relasi
                  </button>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead class="table-light">
                    <tr>
                      <th width="18%">Stakeholder A</th>
                      <th width="5%" class="text-center">Arah</th>
                      <th width="18%">Stakeholder B</th>
                      <th width="12%">Jenis Relasi</th>
                      <th width="10%">Frekuensi</th>
                      <th width="8%">Intensitas</th>
                      <th width="8%">Skor</th>
                      <th width="15%">Dokumen Pendukung</th>
                      <th width="6%">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="rel in relations" :key="rel.id">
                      <tr>
                        <td>
                          <strong>{{ rel.stakeholder_a_nama }}</strong><br>
                          <small class="text-muted">ID: {{ rel.stakeholder_a_id }}</small>
                        </td>
                        <td class="text-center">
                          <i class="bi fs-5" :class="getArrowIcon(rel.arah_pengaruh)" :title="rel.arah_pengaruh"></i>
                        </td>
                        <td>
                          <strong>{{ rel.stakeholder_b_nama }}</strong><br>
                          <small class="text-muted">ID: {{ rel.stakeholder_b_id }}</small>
                        </td>
                        <td>
                          <span class="badge bg-primary">{{ rel.jenis_relasi }}</span>
                        </td>
                        <td>
                          <small>{{ rel.frekuensi_interaksi }}</small>
                        </td>
                        <td>
                          <div class="progress" style="height: 20px;">
                            <div 
                              class="progress-bar" 
                              :class="rel.intensitas_kedekatan >= 4 ? 'bg-success' : rel.intensitas_kedekatan >= 3 ? 'bg-info' : 'bg-warning'"
                              :style="{ width: (rel.intensitas_kedekatan * 20) + '%' }"
                            >
                              {{ rel.intensitas_kedekatan }}/5
                            </div>
                          </div>
                        </td>
                        <td>
                          <span class="badge" :class="getBadgeKedekatan(rel.skor_kedekatan_total)">
                            {{ rel.skor_kedekatan_total }}
                          </span>
                        </td>
                        <td>
                          <div class="d-flex align-items-center justify-content-between">
                            <span class="badge bg-secondary">
                              <i class="bi bi-files"></i> {{ getRelationDocuments(rel).length }} dokumen
                            </span>
                            <button 
                              class="btn btn-sm btn-outline-primary" 
                              @click="toggleRelationDocuments(rel.id)"
                              v-if="getRelationDocuments(rel).length > 0"
                            >
                              <i class="bi" :class="expandedRelations.includes(rel.id) ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <div class="btn-group btn-group-sm">
                            <button class="btn btn-warning" @click="editRelation(rel)" title="Edit">
                              <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-danger" @click="deleteRelation(rel.id)" title="Hapus">
                              <i class="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <!-- Expanded row for documents -->
                      <tr v-if="expandedRelations.includes(rel.id)" class="bg-light">
                        <td colspan="9" class="p-3">
                          <h6 class="mb-2"><i class="bi bi-files"></i> Dokumen Pendukung Relasi:</h6>
                          <div class="row">
                            <div class="col-md-4" v-for="doc in getRelationDocuments(rel)" :key="doc.id">
                              <div class="card mb-2 border-primary">
                                <div class="card-body p-2">
                                  <div class="d-flex align-items-start mb-2">
                                    <i class="bi fs-4 me-2" :class="getFileIcon(doc.jenis_bukti)"></i>
                                    <div class="flex-grow-1">
                                      <h6 class="mb-1 small"><strong>{{ doc.jenis_bukti }}</strong></h6>
                                      <p class="mb-1 small text-muted">{{ doc.deskripsi_pendek }}</p>
                                      <small class="text-muted">
                                        <i class="bi bi-calendar"></i> {{ formatDate(doc.tanggal_dokumen) }}<br>
                                        <i class="bi bi-person-badge"></i> {{ doc.penanggung_jawab }}
                                      </small>
                                    </div>
                                  </div>
                                  <div class="btn-group btn-group-sm w-100">
                                    <button class="btn btn-outline-primary" @click="viewDocument(doc)" title="Lihat">
                                      <i class="bi bi-eye"></i>
                                    </button>
                                    <button class="btn btn-outline-success" @click="downloadDocument(doc)" title="Download">
                                      <i class="bi bi-download"></i>
                                    </button>
                                    <button class="btn btn-outline-danger" @click="deleteEvidence(doc.id)" title="Hapus">
                                      <i class="bi bi-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12" v-if="getRelationDocuments(rel).length === 0">
                              <p class="text-muted mb-0"><i class="bi bi-info-circle"></i> Belum ada dokumen untuk relasi ini.</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Stakeholder Detail Modal -->
        <div class="modal fade" id="detailModal" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content" v-if="selectedStakeholder">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">
                  <i class="bi bi-person-badge"></i> Detail Stakeholder
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <h6 class="text-primary">Informasi Dasar</h6>
                    <table class="table table-sm">
                      <tr>
                        <th width="40%">ID</th>
                        <td>{{ selectedStakeholder.stakeholder_id }}</td>
                      </tr>
                      <tr>
                        <th>Nama Lengkap</th>
                        <td><strong>{{ selectedStakeholder.nama_lengkap }}</strong></td>
                      </tr>
                      <tr>
                        <th>Nama Panggilan</th>
                        <td>{{ selectedStakeholder.nama_panggilan }}</td>
                      </tr>
                      <tr>
                        <th>Jenis</th>
                        <td>{{ selectedStakeholder.jenis_stakeholder }}</td>
                      </tr>
                      <tr>
                        <th>Peran</th>
                        <td>{{ selectedStakeholder.peran_di_proyek }}</td>
                      </tr>
                    </table>
                  </div>
                  <div class="col-md-6">
                    <h6 class="text-primary">Klasifikasi & Analisis</h6>
                    <table class="table table-sm">
                      <tr>
                        <th width="40%">Level Pengaruh</th>
                        <td>
                          <span class="badge" :class="getBadgeInfluence(selectedStakeholder.level_pengaruh)">
                            {{ selectedStakeholder.level_pengaruh }}/5
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Level Kepentingan</th>
                        <td>
                          <span class="badge" :class="getBadgeInterest(selectedStakeholder.level_kepentingan)">
                            {{ selectedStakeholder.level_kepentingan }}/5
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Klasifikasi Sikap</th>
                        <td>
                          <span class="badge" :class="getBadgeSentimen(selectedStakeholder.klasifikasi_sikap)">
                            {{ selectedStakeholder.klasifikasi_sikap }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Strategi Engagement</th>
                        <td><small>{{ selectedStakeholder.strategi_engagement }}</small></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <h6 class="text-primary">Kontak</h6>
                    <p class="mb-1"><i class="bi bi-telephone"></i> {{ selectedStakeholder.kontak_phone || 'N/A' }}</p>
                    <p class="mb-1"><i class="bi bi-envelope"></i> {{ selectedStakeholder.kontak_email || 'N/A' }}</p>
                    <p class="mb-0"><i class="bi bi-geo-alt"></i> {{ selectedStakeholder.alamat || 'N/A' }}</p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-warning" @click="editStakeholder(selectedStakeholder)">
                  <i class="bi bi-pencil"></i> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Forms (will be populated based on activeModal type) -->
    <div class="modal fade" :class="{ show: showModal, 'd-block': showModal }" v-if="showModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <!-- Form Master Stakeholder -->
            <div v-if="modalType === 'master'">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Nama Lengkap *</label>
                    <input type="text" class="form-control" v-model="masterForm.nama">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">NIK *</label>
                    <input type="text" class="form-control" v-model="masterForm.nik">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Role/Peran *</label>
                    <select class="form-select" v-model="masterForm.role">
                      <option value="">Pilih Role</option>
                      <option value="Pemilik Lahan">Pemilik Lahan</option>
                      <option value="Tokoh Adat">Tokoh Adat</option>
                      <option value="Tokoh Agama">Tokoh Agama</option>
                      <option value="Kepala Desa">Kepala Desa</option>
                      <option value="Ketua RT">Ketua RT</option>
                      <option value="Petani">Petani</option>
                      <option value="Pedagang">Pedagang</option>
                      <option value="LSM">Aktivis LSM</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Desa *</label>
                    <input type="text" class="form-control" v-model="masterForm.desa">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">Telepon</label>
                    <input type="text" class="form-control" v-model="masterForm.telepon">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">Level Pengaruh (1-5) *</label>
                    <input type="number" class="form-control" v-model.number="masterForm.level_pengaruh" min="1" max="5">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">Level Kepentingan (1-5) *</label>
                    <input type="number" class="form-control" v-model.number="masterForm.level_kepentingan" min="1" max="5">
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Catatan</label>
                    <textarea class="form-control" rows="3" v-model="masterForm.catatan"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Background -->
            <div v-if="modalType === 'background'">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Pilih Stakeholder *</label>
                    <select class="form-select" v-model="backgroundForm.stakeholder_id">
                      <option value="">Pilih Stakeholder</option>
                      <option v-for="sh in stakeholders" :key="sh.id" :value="sh.id">{{ sh.nama_lengkap }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Pendidikan Terakhir</label>
                    <select class="form-select" v-model="backgroundForm.jenjang_pendidikan">
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Universitas</label>
                    <input type="text" class="form-control" v-model="backgroundForm.universitas">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Jurusan</label>
                    <input type="text" class="form-control" v-model="backgroundForm.jurusan">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Pekerjaan Utama</label>
                    <input type="text" class="form-control" v-model="backgroundForm.pekerjaan_utama">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Instansi</label>
                    <input type="text" class="form-control" v-model="backgroundForm.instansi">
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="mb-3">
                    <label class="form-label">Kekerabatan dengan Stakeholder Lain</label>
                    <input type="text" class="form-control" v-model="backgroundForm.detail_kekerabatan" placeholder="Contoh: Sepupu dari Budi Santoso">
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Isu -->
            <div v-if="modalType === 'isu'">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Pilih Stakeholder *</label>
                    <select class="form-select" v-model="isuForm.stakeholder_id">
                      <option value="">Pilih Stakeholder</option>
                      <option v-for="sh in stakeholders" :key="sh.id" :value="sh.id">{{ sh.nama_lengkap }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Nama Project/Isu *</label>
                    <input type="text" class="form-control" v-model="isuForm.nama_project">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Jenis Dampak *</label>
                    <select class="form-select" v-model="isuForm.jenis_dampak">
                      <option value="Ekonomi">Ekonomi</option>
                      <option value="Sosial">Sosial</option>
                      <option value="Lingkungan">Lingkungan</option>
                      <option value="Aset Lahan">Aset Lahan</option>
                      <option value="Infrastruktur">Infrastruktur</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Persepsi Umum *</label>
                    <select class="form-select" v-model="isuForm.persepsi_awal">
                      <option value="Positif">Positif</option>
                      <option value="Netral">Netral</option>
                      <option value="Negatif">Negatif</option>
                    </select>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Topik Keberatan</label>
                    <textarea class="form-control" rows="3" v-model="isuForm.topik_keberatan"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Interaksi -->
            <div v-if="modalType === 'interaksi'">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Pilih Stakeholder *</label>
                    <select class="form-select" v-model="interaksiForm.stakeholder_id">
                      <option value="">Pilih Stakeholder</option>
                      <option v-for="sh in stakeholders" :key="sh.id" :value="sh.id">{{ sh.nama_lengkap }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Tanggal Interaksi *</label>
                    <input type="date" class="form-control" v-model="interaksiForm.tanggal_interaksi">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Jenis Interaksi *</label>
                    <select class="form-select" v-model="interaksiForm.jenis_interaksi">
                      <option value="Rapat Desa">Rapat Desa</option>
                      <option value="Kunjungan Tim">Kunjungan Tim</option>
                      <option value="Sosialisasi">Sosialisasi</option>
                      <option value="Negosiasi">Negosiasi</option>
                      <option value="Diskusi">Diskusi</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Topik Pembahasan *</label>
                    <input type="text" class="form-control" v-model="interaksiForm.topik">
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Perilaku yang Diamati</label>
                    <textarea class="form-control" rows="2" v-model="interaksiForm.perilaku_observed"></textarea>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Pernyataan Kunci</label>
                    <textarea class="form-control" rows="3" v-model="interaksiForm.pernyataan_kunci"></textarea>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Arah Sikap (-2 s/d +2) *</label>
                    <select class="form-select" v-model.number="interaksiForm.arah_sikap">
                      <option :value="-2">-2 (Sangat Kontra)</option>
                      <option :value="-1">-1 (Kontra)</option>
                      <option :value="0">0 (Netral)</option>
                      <option :value="1">+1 (Pro)</option>
                      <option :value="2">+2 (Sangat Pro)</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Level Aktivitas (1-4) *</label>
                    <select class="form-select" v-model.number="interaksiForm.level_aktivitas">
                      <option :value="1">1 (Pasif - Hanya dengar)</option>
                      <option :value="2">2 (Cukup - Sesekali bicara)</option>
                      <option :value="3">3 (Aktif - Sering bicara)</option>
                      <option :value="4">4 (Sangat Aktif - Dominan)</option>
                    </select>
                  </div>
                </div>
                <div class="col-12">
                  <div class="alert alert-info">
                    <strong>Klasifikasi Otomatis:</strong>
                    <span v-if="interaksiForm.arah_sikap > 0 && interaksiForm.level_aktivitas >= 3">
                      <span class="badge bg-success">Pro-Aktif</span>
                    </span>
                    <span v-else-if="interaksiForm.arah_sikap > 0 && interaksiForm.level_aktivitas < 3">
                      <span class="badge bg-info">Pro-Pasif</span>
                    </span>
                    <span v-else-if="interaksiForm.arah_sikap < 0 && interaksiForm.level_aktivitas >= 3">
                      <span class="badge bg-danger">Kontra-Aktif</span>
                    </span>
                    <span v-else-if="interaksiForm.arah_sikap < 0 && interaksiForm.level_aktivitas < 3">
                      <span class="badge bg-warning">Kontra-Pasif</span>
                    </span>
                    <span v-else>
                      <span class="badge bg-secondary">Netral</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Relasi -->
            <div v-if="modalType === 'relasi'">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Stakeholder A *</label>
                    <select class="form-select" v-model="relationForm.stakeholder_a_id">
                      <option value="">Pilih Stakeholder A</option>
                      <option v-for="sh in stakeholders" :key="sh.id" :value="sh.id">{{ sh.nama_lengkap }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Stakeholder B *</label>
                    <select class="form-select" v-model="relationForm.stakeholder_b_id">
                      <option value="">Pilih Stakeholder B</option>
                      <option v-for="sh in stakeholders" :key="sh.id" :value="sh.id">{{ sh.nama_lengkap }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Jenis Relasi *</label>
                    <select class="form-select" v-model="relationForm.jenis_relasi">
                      <option value="Keluarga besar">Keluarga besar</option>
                      <option value="Keluarga inti">Keluarga inti</option>
                      <option value="Tetangga">Tetangga</option>
                      <option value="Rekan kerja">Rekan kerja</option>
                      <option value="Rekan organisasi">Rekan organisasi</option>
                      <option value="Teman">Teman</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Frekuensi Kontak *</label>
                    <select class="form-select" v-model="relationForm.frekuensi_kontak">
                      <option value="Harian">Harian</option>
                      <option value="Mingguan">Mingguan</option>
                      <option value="Bulanan">Bulanan</option>
                      <option value="Jarang">Jarang</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Score Closeness (0-100) *</label>
                    <input type="number" class="form-control" v-model.number="relationForm.score_closeness" min="0" max="100">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Arah Pengaruh *</label>
                    <select class="form-select" v-model="relationForm.arah_pengaruh">
                      <option value="A → B">A → B (A mempengaruhi B)</option>
                      <option value="B → A">B → A (B mempengaruhi A)</option>
                      <option value="Bidirectional">Bidirectional (Saling mempengaruhi)</option>
                    </select>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Keterangan</label>
                    <textarea class="form-control" rows="2" v-model="relationForm.keterangan"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Batal</button>
            <button type="button" class="btn btn-primary" @click="saveForm">Simpan</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{ show: showModal }" v-if="showModal"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const activeTab = ref('master')
const showModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const networkCanvas = ref<HTMLCanvasElement | null>(null)
const selectedStakeholder = ref<any>(null)
const expandedRelations = ref<number[]>([])

// Statistics
const stats = ref({
  total: 15,
  proAktif: 5,
  proPasif: 4,
  kontraAktif: 3,
  kontraPasif: 2,
  netral: 1
})

// Form Data Models
const masterForm = ref({
  id: null as number | null,
  nama: '',
  nik: '',
  role: '',
  desa: '',
  kecamatan: '',
  kabupaten: '',
  provinsi: '',
  telepon: '',
  email: '',
  level_pengaruh: 3,
  level_kepentingan: 3,
  sentiment_kategori: 'Netral',
  catatan: ''
})

const backgroundForm = ref({
  id: null as number | null,
  stakeholder_id: null as number | null,
  jenjang_pendidikan: '',
  universitas: '',
  jurusan: '',
  tahun_masuk: '',
  tahun_lulus: '',
  pekerjaan_utama: '',
  instansi: '',
  jabatan: '',
  tahun_mulai_kerja: '',
  organisasi: [] as string[],
  status_kekerabatan: false,
  detail_kekerabatan: '',
  dusun_rt_rw: ''
})

const isuForm = ref({
  id: null as number | null,
  stakeholder_id: null as number | null,
  nama_project: '',
  jenis_dampak: '',
  besaran_dampak: 0,
  persepsi_awal: 'Netral',
  topik_keberatan: '',
  tingkat_pengaruh_dampak: 3
})

const interaksiForm = ref({
  id: null as number | null,
  stakeholder_id: null as number | null,
  tanggal_interaksi: '',
  jenis_interaksi: '',
  topik: '',
  perilaku_observed: '',
  pernyataan_kunci: '',
  arah_sikap: 0,
  level_aktivitas: 2,
  klasifikasi_sentimen: ''
})

const relationForm = ref({
  id: null as number | null,
  stakeholder_a_id: null as number | null,
  stakeholder_b_id: null as number | null,
  jenis_relasi: '',
  frekuensi_kontak: '',
  score_closeness: 50,
  arah_pengaruh: 'Bidirectional',
  keterangan: ''
})

// Sample data - Master Stakeholder
const stakeholders = ref([
  {
    id: 1,
    stakeholder_id: 'SH-001',
    nama_lengkap: 'Ahmad Sulaiman',
    nama_panggilan: 'Pak Ahmad',
    jenis_stakeholder: 'Individu',
    peran_di_proyek: 'Pemilik Lahan',
    level_pengaruh: 4,
    level_kepentingan: 5,
    klasifikasi_sikap: 'Kontra-Aktif',
    desa: 'Sukamaju',
    telepon: '081234567890'
  },
  {
    id: 2,
    stakeholder_id: 'SH-002',
    nama_lengkap: 'Budi Santoso',
    nama_panggilan: 'Pak Budi',
    jenis_stakeholder: 'Individu',
    peran_di_proyek: 'Tokoh Adat',
    level_pengaruh: 5,
    level_kepentingan: 3,
    klasifikasi_sikap: 'Pro-Aktif',
    desa: 'Makmur',
    telepon: '081234567891'
  },
  {
    id: 3,
    stakeholder_id: 'SH-003',
    nama_lengkap: 'Siti Aminah',
    nama_panggilan: 'Ibu Siti',
    jenis_stakeholder: 'Individu',
    peran_di_proyek: 'Ketua RT',
    level_pengaruh: 3,
    level_kepentingan: 4,
    klasifikasi_sikap: 'Pro-Pasif',
    desa: 'Sukamaju',
    telepon: '081234567892'
  },
  {
    id: 4,
    stakeholder_id: 'SH-004',
    nama_lengkap: 'Joko Widodo',
    nama_panggilan: 'Pak Joko',
    jenis_stakeholder: 'Individu',
    peran_di_proyek: 'Petani',
    level_pengaruh: 2,
    level_kepentingan: 5,
    klasifikasi_sikap: 'Kontra-Pasif',
    desa: 'Sejahtera',
    telepon: '081234567893'
  },
  {
    id: 5,
    stakeholder_id: 'SH-005',
    nama_lengkap: 'Dewi Lestari',
    nama_panggilan: 'Ibu Dewi',
    jenis_stakeholder: 'Individu',
    peran_di_proyek: 'Tokoh Perempuan',
    level_pengaruh: 4,
    level_kepentingan: 4,
    klasifikasi_sikap: 'Pro-Aktif',
    desa: 'Makmur',
    telepon: '081234567894'
  }
])

// Sample data - Background
const backgrounds = ref([
  {
    id: 1,
    stakeholder_id: 1,
    stakeholder_nama: 'Ahmad Sulaiman',
    jenjang_pendidikan: 'S1',
    universitas: 'Universitas Hasanuddin',
    jurusan: 'Teknik Sipil',
    tahun_masuk: 1995,
    tahun_lulus: 1999,
    pekerjaan_utama: 'Petani',
    instansi: 'Mandiri',
    organisasi: ['Kelompok Tani Sukamaju', 'Karang Taruna'],
    status_kekerabatan: true,
    detail_kekerabatan: 'Sepupu Budi Santoso',
    dusun_rt_rw: 'Dusun Mawar RT 02 RW 03'
  },
  {
    id: 2,
    stakeholder_id: 2,
    stakeholder_nama: 'Budi Santoso',
    jenjang_pendidikan: 'S1',
    universitas: 'Universitas Hasanuddin',
    jurusan: 'Hukum Adat',
    tahun_masuk: 1998,
    tahun_lulus: 2002,
    pekerjaan_utama: 'Tokoh Adat',
    instansi: 'Lembaga Adat',
    organisasi: ['Lembaga Adat Makmur', 'Forum Tokoh Masyarakat'],
    status_kekerabatan: true,
    detail_kekerabatan: 'Sepupu Ahmad Sulaiman',
    dusun_rt_rw: 'Dusun Melati RT 05 RW 02'
  },
  {
    id: 3,
    stakeholder_id: 3,
    stakeholder_nama: 'Siti Aminah',
    jenjang_pendidikan: 'SMA',
    universitas: '-',
    jurusan: '-',
    tahun_masuk: 0,
    tahun_lulus: 0,
    pekerjaan_utama: 'Ibu Rumah Tangga',
    instansi: '-',
    organisasi: ['PKK', 'Posyandu'],
    status_kekerabatan: false,
    detail_kekerabatan: '-',
    dusun_rt_rw: 'Dusun Mawar RT 02 RW 03'
  },
  {
    id: 4,
    stakeholder_id: 4,
    stakeholder_nama: 'Joko Widodo',
    jenjang_pendidikan: 'SMP',
    universitas: '-',
    jurusan: '-',
    tahun_masuk: 0,
    tahun_lulus: 0,
    pekerjaan_utama: 'Petani',
    instansi: 'Mandiri',
    organisasi: ['Kelompok Tani Sejahtera'],
    status_kekerabatan: false,
    detail_kekerabatan: '-',
    dusun_rt_rw: 'Dusun Kenanga RT 01 RW 01'
  },
  {
    id: 5,
    stakeholder_id: 5,
    stakeholder_nama: 'Dewi Lestari',
    jenjang_pendidikan: 'S2',
    universitas: 'Universitas Indonesia',
    jurusan: 'Sosiologi',
    tahun_masuk: 2005,
    tahun_lulus: 2009,
    pekerjaan_utama: 'Aktivis LSM',
    instansi: 'LSM Peduli Lingkungan',
    organisasi: ['LSM Peduli Lingkungan', 'Forum Perempuan', 'Komunitas Lingkungan'],
    status_kekerabatan: false,
    detail_kekerabatan: '-',
    dusun_rt_rw: 'Dusun Melati RT 03 RW 02'
  }
])

// Sample data - Isu
const issuData = ref([
  {
    id: 1,
    stakeholder_id: 1,
    stakeholder_nama: 'Ahmad Sulaiman',
    project_id: 'PRJ-001',
    nama_project: 'Pembangunan Jalan Tambang',
    isu_spesifik: 'Lokasi trase jalan',
    jenis_dampak: ['Ekonomi', 'Sosial', 'Aset Lahan'],
    besaran_dampak: 5,
    persepsi_umum: 'Negatif',
    topik_keberatan: 'Jalan melewati lahan pertanian produktif'
  },
  {
    id: 2,
    stakeholder_id: 2,
    stakeholder_nama: 'Budi Santoso',
    project_id: 'PRJ-001',
    nama_project: 'Pembangunan Jalan Tambang',
    isu_spesifik: 'Kompensasi dan manfaat',
    jenis_dampak: ['Ekonomi', 'Sosial'],
    besaran_dampak: 3,
    persepsi_umum: 'Positif',
    topik_keberatan: '-'
  },
  {
    id: 3,
    stakeholder_id: 3,
    stakeholder_nama: 'Siti Aminah',
    project_id: 'PRJ-001',
    nama_project: 'Pembangunan Jalan Tambang',
    isu_spesifik: 'Akses jalan desa',
    jenis_dampak: ['Infrastruktur'],
    besaran_dampak: 4,
    persepsi_umum: 'Positif',
    topik_keberatan: '-'
  },
  {
    id: 4,
    stakeholder_id: 4,
    stakeholder_nama: 'Joko Widodo',
    project_id: 'PRJ-001',
    nama_project: 'Pembangunan Jalan Tambang',
    isu_spesifik: 'Nilai ganti rugi lahan',
    jenis_dampak: ['Ekonomi', 'Aset Lahan'],
    besaran_dampak: 5,
    persepsi_umum: 'Negatif',
    topik_keberatan: 'Nilai ganti rugi terlalu rendah'
  },
  {
    id: 5,
    stakeholder_id: 5,
    stakeholder_nama: 'Dewi Lestari',
    project_id: 'PRJ-001',
    nama_project: 'Pembangunan Jalan Tambang',
    isu_spesifik: 'Dampak lingkungan',
    jenis_dampak: ['Lingkungan', 'Sosial'],
    besaran_dampak: 4,
    persepsi_umum: 'Positif',
    topik_keberatan: 'Perlu kajian lingkungan lebih detail'
  }
])

// Sample data - Interaction Logs
const interactionLogs = ref([
  {
    id: 1,
    stakeholder_id: 1,
    stakeholder_nama: 'Ahmad Sulaiman',
    tanggal: '2025-01-15',
    lokasi: 'Balai Desa',
    jenis_interaksi: 'Rapat Desa',
    peran_dalam_pertemuan: 'Menyampaikan keberatan',
    ringkasan_pernyataan: 'Jalan ini melewati lahan saya yang paling produktif. Kami menolak lokasi ini!',
    kategori_pernyataan: 'Keberatan teknis',
    nada: 'Konfrontatif',
    arah_sikap: -2,
    level_aktivitas: 4,
    klasifikasi_sentimen: 'Kontra-Aktif'
  },
  {
    id: 2,
    stakeholder_id: 1,
    stakeholder_nama: 'Ahmad Sulaiman',
    tanggal: '2025-01-22',
    lokasi: 'Rumah Ahmad',
    jenis_interaksi: 'Kunjungan Tim',
    peran_dalam_pertemuan: 'Menerima kunjungan',
    ringkasan_pernyataan: 'Saya tidak akan kompromi soal lokasi jalan ini',
    kategori_pernyataan: 'Penolakan',
    nada: 'Tegas',
    arah_sikap: -2,
    level_aktivitas: 3,
    klasifikasi_sentimen: 'Kontra-Aktif'
  },
  {
    id: 3,
    stakeholder_id: 2,
    stakeholder_nama: 'Budi Santoso',
    tanggal: '2025-01-16',
    lokasi: 'Balai Desa',
    jenis_interaksi: 'Rapat Desa',
    peran_dalam_pertemuan: 'Mediator',
    ringkasan_pernyataan: 'Proyek ini baik untuk desa, saya akan bantu koordinasi dengan masyarakat',
    kategori_pernyataan: 'Dukungan',
    nada: 'Kooperatif',
    arah_sikap: 2,
    level_aktivitas: 4,
    klasifikasi_sentimen: 'Pro-Aktif'
  },
  {
    id: 4,
    stakeholder_id: 2,
    stakeholder_nama: 'Budi Santoso',
    tanggal: '2025-01-20',
    lokasi: 'Kantor Desa',
    jenis_interaksi: 'Pertemuan Koordinasi',
    peran_dalam_pertemuan: 'Fasilitator',
    ringkasan_pernyataan: 'Saya akan mengumpulkan warga untuk sosialisasi minggu depan',
    kategori_pernyataan: 'Tindak lanjut',
    nada: 'Antusias',
    arah_sikap: 2,
    level_aktivitas: 4,
    klasifikasi_sentimen: 'Pro-Aktif'
  },
  {
    id: 5,
    stakeholder_id: 3,
    stakeholder_nama: 'Siti Aminah',
    tanggal: '2025-01-17',
    lokasi: 'Balai Desa',
    jenis_interaksi: 'Rapat Desa',
    peran_dalam_pertemuan: 'Peserta',
    ringkasan_pernyataan: 'Bagus jika ada jalan baru, tapi saya tidak mau terlalu banyak terlibat',
    kategori_pernyataan: 'Dukungan pasif',
    nada: 'Netral',
    arah_sikap: 1,
    level_aktivitas: 2,
    klasifikasi_sentimen: 'Pro-Pasif'
  },
  {
    id: 6,
    stakeholder_id: 4,
    stakeholder_nama: 'Joko Widodo',
    tanggal: '2025-01-18',
    lokasi: 'Rumah Joko',
    jenis_interaksi: 'Kunjungan Tim',
    peran_dalam_pertemuan: 'Menerima kunjungan',
    ringkasan_pernyataan: 'Nilai ganti rugi tidak cukup, tapi saya tidak mau ribut',
    kategori_pernyataan: 'Keluhan',
    nada: 'Pasif',
    arah_sikap: -1,
    level_aktivitas: 1,
    klasifikasi_sentimen: 'Kontra-Pasif'
  },
  {
    id: 7,
    stakeholder_id: 5,
    stakeholder_nama: 'Dewi Lestari',
    tanggal: '2025-01-19',
    lokasi: 'Kantor LSM',
    jenis_interaksi: 'Diskusi',
    peran_dalam_pertemuan: 'Pembicara',
    ringkasan_pernyataan: 'Kami mendukung proyek ini, asalkan ada kajian lingkungan yang proper',
    kategori_pernyataan: 'Dukungan bersyarat',
    nada: 'Profesional',
    arah_sikap: 2,
    level_aktivitas: 4,
    klasifikasi_sentimen: 'Pro-Aktif'
  }
])

// Sample data - Relations
const relations = ref([
  {
    id: 1,
    stakeholder_a_id: 1,
    stakeholder_a_nama: 'Ahmad Sulaiman',
    stakeholder_b_id: 2,
    stakeholder_b_nama: 'Budi Santoso',
    jenis_relasi: 'Keluarga besar',
    frekuensi_interaksi: 'Mingguan',
    intensitas_kedekatan: 4,
    satu_universitas: true,
    satu_jurusan: false,
    satu_organisasi: true,
    hubungan_kekerabatan: true,
    skor_kedekatan_total: 75,
    arah_pengaruh: 'A → B'
  },
  {
    id: 2,
    stakeholder_a_id: 1,
    stakeholder_a_nama: 'Ahmad Sulaiman',
    stakeholder_b_id: 3,
    stakeholder_b_nama: 'Siti Aminah',
    jenis_relasi: 'Tetangga',
    frekuensi_interaksi: 'Harian',
    intensitas_kedekatan: 3,
    satu_universitas: false,
    satu_jurusan: false,
    satu_organisasi: true,
    hubungan_kekerabatan: false,
    skor_kedekatan_total: 55,
    arah_pengaruh: 'Bidirectional'
  },
  {
    id: 3,
    stakeholder_a_id: 2,
    stakeholder_a_nama: 'Budi Santoso',
    stakeholder_b_id: 5,
    stakeholder_b_nama: 'Dewi Lestari',
    jenis_relasi: 'Rekan kerja',
    frekuensi_interaksi: 'Bulanan',
    intensitas_kedekatan: 3,
    satu_universitas: false,
    satu_jurusan: false,
    satu_organisasi: true,
    hubungan_kekerabatan: false,
    skor_kedekatan_total: 45,
    arah_pengaruh: 'B → A'
  },
  {
    id: 4,
    stakeholder_a_id: 3,
    stakeholder_a_nama: 'Siti Aminah',
    stakeholder_b_id: 4,
    stakeholder_b_nama: 'Joko Widodo',
    jenis_relasi: 'Tetangga',
    frekuensi_interaksi: 'Mingguan',
    intensitas_kedekatan: 2,
    satu_universitas: false,
    satu_jurusan: false,
    satu_organisasi: false,
    hubungan_kekerabatan: false,
    skor_kedekatan_total: 30,
    arah_pengaruh: 'A → B'
  },
  {
    id: 5,
    stakeholder_a_id: 1,
    stakeholder_a_nama: 'Ahmad Sulaiman',
    stakeholder_b_id: 4,
    stakeholder_b_nama: 'Joko Widodo',
    jenis_relasi: 'Rekan kelompok tani',
    frekuensi_interaksi: 'Mingguan',
    intensitas_kedekatan: 3,
    satu_universitas: false,
    satu_jurusan: false,
    satu_organisasi: true,
    hubungan_kekerabatan: false,
    skor_kedekatan_total: 50,
    arah_pengaruh: 'Bidirectional'
  }
])

// Sample data - Evidence (linked to relations)
const evidences = ref([
  {
    id: 1,
    relation_id: 1, // Ahmad <-> Budi
    stakeholder_id: 1,
    stakeholder_nama: 'Ahmad Sulaiman',
    jenis_bukti: 'Notulen',
    deskripsi_pendek: 'Notulen rapat desa tentang relasi keluarga',
    tanggal_dokumen: '2025-01-15',
    penanggung_jawab: 'Tim Community Relations'
  },
  {
    id: 2,
    relation_id: 1, // Ahmad <-> Budi
    stakeholder_id: 2,
    stakeholder_nama: 'Budi Santoso',
    jenis_bukti: 'Foto',
    deskripsi_pendek: 'Foto pertemuan keluarga besar',
    tanggal_dokumen: '2025-01-16',
    penanggung_jawab: 'Tim Dokumentasi'
  },
  {
    id: 3,
    relation_id: 2, // Ahmad <-> Siti
    stakeholder_id: 1,
    stakeholder_nama: 'Ahmad Sulaiman',
    jenis_bukti: 'Rekaman Audio',
    deskripsi_pendek: 'Rekaman pernyataan Ahmad tentang tetangga',
    tanggal_dokumen: '2025-01-15',
    penanggung_jawab: 'Tim Community Relations'
  },
  {
    id: 4,
    relation_id: 2, // Ahmad <-> Siti  
    stakeholder_id: 3,
    stakeholder_nama: 'Siti Aminah',
    jenis_bukti: 'Surat',
    deskripsi_pendek: 'Surat pernyataan hubungan bertetangga',
    tanggal_dokumen: '2025-01-17',
    penanggung_jawab: 'Tim Legal'
  },
  {
    id: 5,
    relation_id: 3, // Budi <-> Dewi
    stakeholder_id: 2,
    stakeholder_nama: 'Budi Santoso',
    jenis_bukti: 'Dokumen',
    deskripsi_pendek: 'Dokumen organisasi bersama',
    tanggal_dokumen: '2025-01-18',
    penanggung_jawab: 'Tim LARAP'
  },
  {
    id: 6,
    relation_id: 4, // Siti <-> Joko
    stakeholder_id: 4,
    stakeholder_nama: 'Joko Widodo',
    jenis_bukti: 'Foto',
    deskripsi_pendek: 'Foto acara RT/RW bersama',
    tanggal_dokumen: '2025-01-19',
    penanggung_jawab: 'Tim Dokumentasi'
  }
])

// Helper functions
const getBadgeInfluence = (level: number) => {
  if (level >= 4) return 'bg-danger'
  if (level >= 3) return 'bg-warning'
  return 'bg-secondary'
}

const getBadgeInterest = (level: number) => {
  if (level >= 4) return 'bg-primary'
  if (level >= 3) return 'bg-info'
  return 'bg-secondary'
}

const getBadgeSentimen = (sikap: string) => {
  if (sikap.includes('Pro-Aktif')) return 'bg-success'
  if (sikap.includes('Pro-Pasif')) return 'bg-info'
  if (sikap.includes('Kontra-Aktif')) return 'bg-danger'
  if (sikap.includes('Kontra-Pasif')) return 'bg-warning'
  return 'bg-secondary'
}

const getProgressClass = (level: number) => {
  if (level >= 4) return 'bg-danger'
  if (level >= 3) return 'bg-warning'
  return 'bg-success'
}

const getBadgePersepsi = (persepsi: string) => {
  if (persepsi === 'Positif') return 'bg-success'
  if (persepsi === 'Negatif') return 'bg-danger'
  if (persepsi === 'Netral') return 'bg-secondary'
  return 'bg-warning'
}

const getBadgeNada = (nada: string) => {
  if (nada === 'Kooperatif') return 'bg-success'
  if (nada === 'Konfrontatif') return 'bg-danger'
  if (nada === 'Kritis') return 'bg-warning'
  return 'bg-secondary'
}

const getBadgeArahSikap = (arah: number) => {
  if (arah >= 1) return 'bg-success'
  if (arah <= -1) return 'bg-danger'
  return 'bg-secondary'
}

const getArahSikapLabel = (arah: number) => {
  if (arah === 2) return 'Sangat Mendukung'
  if (arah === 1) return 'Mendukung'
  if (arah === 0) return 'Netral'
  if (arah === -1) return 'Menolak'
  if (arah === -2) return 'Sangat Menolak'
  return 'Netral'
}

const getBadgeAktivitas = (level: number) => {
  if (level === 4) return 'bg-danger'
  if (level === 3) return 'bg-warning'
  if (level === 2) return 'bg-info'
  return 'bg-secondary'
}

const getBadgeKedekatan = (skor: number) => {
  if (skor >= 70) return 'bg-success'
  if (skor >= 50) return 'bg-info'
  if (skor >= 30) return 'bg-warning'
  return 'bg-secondary'
}

const getFileIcon = (jenis: string) => {
  if (jenis.includes('Foto')) return 'bi-image'
  if (jenis.includes('Video')) return 'bi-camera-video'
  if (jenis.includes('PDF') || jenis.includes('Surat')) return 'bi-file-pdf'
  if (jenis.includes('Notulen')) return 'bi-file-text'
  return 'bi-file-earmark'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  })
}

// Helper function for arrow icons in table
const getArrowIcon = (direction: string) => {
  if (direction === 'A → B') return 'bi-arrow-right'
  if (direction === 'B → A') return 'bi-arrow-left'
  if (direction === 'Bidirectional') return 'bi-arrow-left-right'
  return 'bi-arrow-left-right'
}

// Get documents for a specific relation
const getRelationDocuments = (relation: any) => {
  return evidences.value.filter(doc => doc.relation_id === relation.id)
}

// Toggle expanded state for relation documents
const toggleRelationDocuments = (relationId: number) => {
  const index = expandedRelations.value.indexOf(relationId)
  if (index > -1) {
    expandedRelations.value.splice(index, 1)
  } else {
    expandedRelations.value.push(relationId)
  }
}

// Handle canvas click to show stakeholder details
const handleCanvasClick = (event: MouseEvent) => {
  if (!networkCanvas.value) return
  
  const canvas = networkCanvas.value
  const rect = canvas.getBoundingClientRect()
  
  // Calculate scale factor for responsive canvas
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  
  const clickX = (event.clientX - rect.left) * scaleX
  const clickY = (event.clientY - rect.top) * scaleY
  
  const padding = 50
  const width = canvas.width - padding * 2
  const height = canvas.height - padding * 2
  const nodeRadius = 30
  const textMargin = 70
  
  // Check if click is on any stakeholder node - using same formula as drawNetwork
  for (const sh of stakeholders.value) {
    const usableWidth = width - (nodeRadius * 2) - 20
    const xPos = padding + nodeRadius + 10 + (sh.level_kepentingan / 5) * usableWidth
    
    const usableHeight = height - textMargin
    const yPos = canvas.height - padding - textMargin - (sh.level_pengaruh / 5) * usableHeight
    
    const distance = Math.sqrt((clickX - xPos) ** 2 + (clickY - yPos) ** 2)
    
    if (distance <= 30) { // node radius
      selectedStakeholder.value = sh
      // Show modal using Bootstrap 5
      const modalEl = document.getElementById('detailModal')
      if (modalEl) {
        const modal = new (window as any).bootstrap.Modal(modalEl)
        modal.show()
      }
      break
    }
  }
}

// Modal functions
const openModalAdd = (type: string) => {
  modalType.value = type
  modalTitle.value = `Tambah Data ${type.charAt(0).toUpperCase() + type.slice(1)}`
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveForm = () => {
  // Save logic here
  console.log('Saving', modalType.value)
  closeModal()
}

// CRUD functions
const viewDetail = (sh: any) => {
  selectedStakeholder.value = sh
  const modalEl = document.getElementById('detailModal')
  if (modalEl) {
    const modal = new (window as any).bootstrap.Modal(modalEl)
    modal.show()
  }
}

const editStakeholder = (sh: any) => {
  console.log('Edit:', sh)
}

const deleteStakeholder = (id: number) => {
  if (confirm('Yakin ingin menghapus stakeholder ini?')) {
    console.log('Delete:', id)
  }
}

const editBackground = (bg: any) => {
  console.log('Edit background:', bg)
}

const deleteBackground = (id: number) => {
  if (confirm('Yakin ingin menghapus data background ini?')) {
    console.log('Delete background:', id)
  }
}

const editIsu = (isu: any) => {
  console.log('Edit isu:', isu)
}

const deleteIsu = (id: number) => {
  if (confirm('Yakin ingin menghapus data isu ini?')) {
    console.log('Delete isu:', id)
  }
}

const viewInteraksi = (log: any) => {
  console.log('View interaksi:', log)
}

const editInteraksi = (log: any) => {
  console.log('Edit interaksi:', log)
}

const deleteInteraksi = (id: number) => {
  if (confirm('Yakin ingin menghapus log interaksi ini?')) {
    console.log('Delete interaksi:', id)
  }
}

const editRelation = (rel: any) => {
  console.log('Edit relation:', rel)
}

const deleteRelation = (id: number) => {
  if (confirm('Yakin ingin menghapus relasi ini?')) {
    console.log('Delete relation:', id)
  }
}

const viewDocument = (doc: any) => {
  console.log('View document:', doc)
}

const downloadDocument = (doc: any) => {
  console.log('Download document:', doc)
}

const deleteEvidence = (id: number) => {
  if (confirm('Yakin ingin menghapus dokumen ini?')) {
    console.log('Delete evidence:', id)
  }
}

// Draw network visualization with quadrant matrix and directional arrows
const drawNetwork = () => {
  if (!networkCanvas.value) return
  
  const canvas = networkCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw quadrant background and grid
  const padding = 50
  const width = canvas.width - padding * 2
  const height = canvas.height - padding * 2
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  // Draw quadrant background colors
  ctx.fillStyle = 'rgba(255, 193, 7, 0.1)' // Yellow - Keep Satisfied
  ctx.fillRect(padding, padding, width / 2, height / 2)
  
  ctx.fillStyle = 'rgba(40, 167, 69, 0.1)' // Green - Manage Closely
  ctx.fillRect(centerX, padding, width / 2, height / 2)
  
  ctx.fillStyle = 'rgba(108, 117, 125, 0.1)' // Gray - Monitor
  ctx.fillRect(padding, centerY, width / 2, height / 2)
  
  ctx.fillStyle = 'rgba(23, 162, 184, 0.1)' // Cyan - Keep Informed
  ctx.fillRect(centerX, centerY, width / 2, height / 2)

  // Draw grid lines
  ctx.strokeStyle = '#ccc'
  ctx.lineWidth = 1
  ctx.setLineDash([5, 5])
  
  // Vertical center line
  ctx.beginPath()
  ctx.moveTo(centerX, padding)
  ctx.lineTo(centerX, canvas.height - padding)
  ctx.stroke()
  
  // Horizontal center line
  ctx.beginPath()
  ctx.moveTo(padding, centerY)
  ctx.lineTo(canvas.width - padding, centerY)
  ctx.stroke()
  
  ctx.setLineDash([])

  // Draw axis labels
  ctx.fillStyle = '#333'
  ctx.font = 'bold 12px Arial'
  ctx.textAlign = 'center'
  
  // X-axis label (Interest)
  ctx.fillText('Interest / Engagement →', canvas.width / 2, canvas.height - 20)
  
  // Y-axis label (Power)
  ctx.save()
  ctx.translate(20, canvas.height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('Power / Influence →', 0, 0)
  ctx.restore()

  // Draw quadrant labels
  ctx.font = 'bold 11px Arial'
  ctx.fillStyle = '#666'
  
  ctx.textAlign = 'center'
  ctx.fillText('Keep Satisfied', padding + width / 4, padding + 20)
  ctx.fillText('Manage Closely', centerX + width / 4, padding + 20)
  ctx.fillText('Monitor', padding + width / 4, centerY + 20)
  ctx.fillText('Keep Informed', centerX + width / 4, centerY + 20)

  // Define node positions based on Power-Interest matrix
  const nodeRadius = 30
  const textMargin = 70 // extra margin for text below nodes
  
  const nodes = stakeholders.value.map(sh => {
    // Map 1-5 scale to canvas coordinates with margin for text
    // Interest (X-axis): 1 = left edge, 5 = right edge
    const usableWidth = width - (nodeRadius * 2) - 20
    const xPos = padding + nodeRadius + 10 + (sh.level_kepentingan / 5) * usableWidth
    
    // Power (Y-axis): 1 = bottom, 5 = top (inverted)
    // Reserve space at bottom for text labels
    const usableHeight = height - textMargin
    const yPos = canvas.height - padding - textMargin - (sh.level_pengaruh / 5) * usableHeight
    
    return {
      x: xPos,
      y: yPos,
      ...sh
    }
  })

  // Helper function to draw arrow
  const drawArrow = (fromX: number, fromY: number, toX: number, toY: number, color: string, lineWidth: number, isDashed: boolean = false) => {
    const headlen = 12 // length of arrow head
    const angle = Math.atan2(toY - fromY, toX - fromX)
    
    // Calculate positions to draw from edge of circle (radius 25) not center
    const fromRadius = 28
    const toRadius = 28
    const startX = fromX + fromRadius * Math.cos(angle)
    const startY = fromY + fromRadius * Math.sin(angle)
    const endX = toX - toRadius * Math.cos(angle)
    const endY = toY - toRadius * Math.sin(angle)
    
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    
    if (isDashed) {
      ctx.setLineDash([5, 5])
    } else {
      ctx.setLineDash([])
    }
    ctx.stroke()
    
    // Draw arrow head
    ctx.beginPath()
    ctx.moveTo(endX, endY)
    ctx.lineTo(
      endX - headlen * Math.cos(angle - Math.PI / 6),
      endY - headlen * Math.sin(angle - Math.PI / 6)
    )
    ctx.lineTo(
      endX - headlen * Math.cos(angle + Math.PI / 6),
      endY - headlen * Math.sin(angle + Math.PI / 6)
    )
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.setLineDash([])
  }

  // Draw connections with arrows based on direction
  relations.value.forEach(rel => {
    const nodeA = nodes.find(n => n.id === rel.stakeholder_a_id)
    const nodeB = nodes.find(n => n.id === rel.stakeholder_b_id)
    
    if (nodeA && nodeB) {
      // Determine color and line style based on closeness score
      let color = '#999'
      let lineWidth = 1
      let isDashed = false
      
      if (rel.skor_kedekatan_total > 70) {
        lineWidth = 3
        color = '#2c3e50'
      } else if (rel.skor_kedekatan_total > 40) {
        lineWidth = 2
        color = '#555'
        isDashed = false
      } else {
        lineWidth = 1
        color = '#999'
        isDashed = true
      }
      
      // Draw arrow based on direction
      if (rel.arah_pengaruh === 'A → B') {
        // A influences B
        drawArrow(nodeA.x, nodeA.y, nodeB.x, nodeB.y, color, lineWidth, isDashed)
      } else if (rel.arah_pengaruh === 'B → A') {
        // B influences A
        drawArrow(nodeB.x, nodeB.y, nodeA.x, nodeA.y, color, lineWidth, isDashed)
      } else if (rel.arah_pengaruh === 'Bidirectional') {
        // Mutual influence - draw double-headed arrow with slight offset
        const offsetAngle = Math.atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x) + Math.PI / 2
        const offset = 6
        
        // Upper arrow (A to B)
        const a1x = nodeA.x + offset * Math.cos(offsetAngle)
        const a1y = nodeA.y + offset * Math.sin(offsetAngle)
        const b1x = nodeB.x + offset * Math.cos(offsetAngle)
        const b1y = nodeB.y + offset * Math.sin(offsetAngle)
        drawArrow(a1x, a1y, b1x, b1y, color, lineWidth, isDashed)
        
        // Lower arrow (B to A)
        const a2x = nodeA.x - offset * Math.cos(offsetAngle)
        const a2y = nodeA.y - offset * Math.sin(offsetAngle)
        const b2x = nodeB.x - offset * Math.cos(offsetAngle)
        const b2y = nodeB.y - offset * Math.sin(offsetAngle)
        drawArrow(b2x, b2y, a2x, a2y, color, lineWidth, isDashed)
      }
      
      // Draw closeness score in the middle of line
      const midX = (nodeA.x + nodeB.x) / 2
      const midY = (nodeA.y + nodeB.y) / 2
      ctx.fillStyle = '#fff'
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 3
      ctx.font = 'bold 11px Arial'
      ctx.textAlign = 'center'
      ctx.strokeText(rel.skor_kedekatan_total.toString(), midX, midY)
      ctx.fillText(rel.skor_kedekatan_total.toString(), midX, midY)
    }
  })

  // Draw nodes on top
  nodes.forEach(node => {
    // Determine color based on sentiment with gradient
    let color = '#6c757d' // default gray
    let gradientColor = '#5a6268'
    
    if (node.klasifikasi_sikap?.includes('Pro-Aktif')) {
      color = '#28a745' // green
      gradientColor = '#20c997'
    } else if (node.klasifikasi_sikap?.includes('Pro-Pasif')) {
      color = '#17a2b8' // cyan
      gradientColor = '#20c997'
    } else if (node.klasifikasi_sikap?.includes('Kontra-Aktif')) {
      color = '#dc3545' // red
      gradientColor = '#ff6b6b'
    } else if (node.klasifikasi_sikap?.includes('Kontra-Pasif')) {
      color = '#ffc107' // yellow
      gradientColor = '#ffdd57'
    }

    // Create radial gradient for node
    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 30)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, gradientColor)

    // Draw circle with gradient
    ctx.beginPath()
    ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI)
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 3
    ctx.stroke()

    // Add inner shadow effect
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw initials in white
    const initials = node.nama_panggilan 
      ? node.nama_panggilan.substring(0, 2).toUpperCase() 
      : node.nama_lengkap.substring(0, 2).toUpperCase()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(initials, node.x, node.y)

    // Draw name below node - more compact
    ctx.fillStyle = '#000'
    ctx.font = 'bold 10px Arial'
    ctx.textBaseline = 'top'
    const displayName = node.nama_panggilan || node.nama_lengkap || ''
    // Truncate long names
    const shortName = displayName.length > 12 ? displayName.substring(0, 10) + '...' : displayName
    ctx.fillText(shortName, node.x, node.y + 35)
    
    // Draw role below name - more compact
    ctx.font = '8px Arial'
    ctx.fillStyle = '#666'
    const displayRole = node.peran_di_proyek || ''
    const shortRole = displayRole.length > 15 ? displayRole.substring(0, 13) + '...' : displayRole
    ctx.fillText(shortRole, node.x, node.y + 48)
  })
}

onMounted(() => {
  // Initialize network visualization
  setTimeout(() => {
    drawNetwork()
  }, 100)
})
</script>

<style scoped>
.modal.show {
  display: block;
}

.modal-backdrop.show {
  opacity: 0.5;
}

.table th {
  font-size: 0.875rem;
  white-space: nowrap;
}

.table td {
  font-size: 0.875rem;
  vertical-align: middle;
}

.badge {
  font-size: 0.75rem;
}

.progress {
  min-width: 80px;
}

.card {
  box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2);
}

/* Quadrant Matrix Styles */
.quadrant-container {
  width: 100%;
  height: 500px;
  margin: 20px 0;
}

.quadrant-grid {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #f8f9fa 50%, #ffffff 50%), 
              linear-gradient(to bottom, #ffffff 50%, #f8f9fa 50%);
  border: 2px solid #dee2e6;
  border-radius: 8px;
}

.quadrant-grid::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #6c757d;
}

.quadrant-grid::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #6c757d;
}

.quadrant-label {
  position: absolute;
  font-size: 0.85rem;
  padding: 10px;
  text-align: center;
  color: #495057;
}

.quadrant-label.top-left {
  top: 10px;
  left: 10px;
  width: 45%;
}

.quadrant-label.top-right {
  top: 10px;
  right: 10px;
  width: 45%;
}

.quadrant-label.bottom-left {
  bottom: 10px;
  left: 10px;
  width: 45%;
}

.quadrant-label.bottom-right {
  bottom: 10px;
  right: 10px;
  width: 45%;
}

.axis-label {
  position: absolute;
  font-weight: bold;
  color: #495057;
  font-size: 0.9rem;
}

.axis-label.y-axis {
  left: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: left center;
}

.axis-label.x-axis {
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.stakeholder-dot {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: white;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.stakeholder-dot:hover {
  transform: translate(-50%, -50%) scale(1.3);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  z-index: 20;
}

.stakeholder-dot.sentiment-pro-aktif {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.stakeholder-dot.sentiment-pro-pasif {
  background: linear-gradient(135deg, #17a2b8 0%, #5bc0de 100%);
}

.stakeholder-dot.sentiment-kontra-aktif {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
}

.stakeholder-dot.sentiment-kontra-pasif {
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
}

.stakeholder-dot.sentiment-netral {
  background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
}

/* Network Controls */
.network-controls {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

/* Document Link Items */
.document-link-item {
  transition: all 0.2s ease;
  background: white;
}

.document-link-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
</style>

