<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Census Survey - LARAP</h2>
        <p class="text-muted">Land Acquisition and Resettlement Action Plan Survey</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Memuat pertanyaan survei...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Survey Form -->
    <form v-if="!loading && questions.length > 0" @submit.prevent="submitSurvey">
      <!-- Section A: Identification -->
      <div class="card mb-4">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">A. Identifikasi</h5>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Kode Enumerator <span class="text-danger">*</span></label>
              <select class="form-select" v-model="formData.q1_kode_enumerator" required>
                <option value="">Pilih Enumerator</option>
                <option v-for="opt in getQuestionOptions(1)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">ID Unik (ID Entitas Terdampak) <span class="text-danger">*</span></label>
              <select class="form-select" v-model="formData.q2_id_unik" required>
                <option value="">Pilih ID Unik</option>
                <option v-for="opt in getQuestionOptions(2)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Hubungan Responden dengan KK</label>
              <select class="form-select" v-model="formData.q3_hubungan_responden">
                <option value="">Pilih Hubungan</option>
                <option v-for="opt in getQuestionOptions(3)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Identifikasi Dampak</label>
              <select class="form-select" v-model="formData.q4_identifikasi_dampak">
                <option value="">Pilih Dampak</option>
                <option v-for="opt in getQuestionOptions(4)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Agama</label>
              <select class="form-select" v-model="formData.q5_agama">
                <option value="">Pilih Agama</option>
                <option v-for="opt in getQuestionOptions(5)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Asal Etnis</label>
              <select class="form-select" v-model="formData.q6_asal_etnis">
                <option value="">Pilih Etnis</option>
                <option v-for="opt in getQuestionOptions(6)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Bahasa</label>
              <select class="form-select" v-model="formData.q7_bahasa">
                <option value="">Pilih Bahasa</option>
                <option v-for="opt in getQuestionOptions(7)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Tempat Asal KK</label>
              <select class="form-select" v-model="formData.q8_tempat_asal">
                <option value="">Pilih Tempat Asal</option>
                <option v-for="opt in getQuestionOptions(8)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Section B: Demography -->
      <div class="card mb-4">
        <div class="card-header bg-info text-white">
          <h5 class="mb-0">B. Demografi</h5>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Hubungan dengan KK</label>
              <select class="form-select" v-model="formData.q9_hubungan_kk">
                <option value="">Pilih Hubungan</option>
                <option v-for="opt in getQuestionOptions(9)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Jenis Kelamin</label>
              <select class="form-select" v-model="formData.q10_jenis_kelamin">
                <option value="">Pilih Jenis Kelamin</option>
                <option v-for="opt in getQuestionOptions(10)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Status Perkawinan</label>
              <select class="form-select" v-model="formData.q11_status_perkawinan">
                <option value="">Pilih Status</option>
                <option v-for="opt in getQuestionOptions(11)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Bisa Membaca/Menulis</label>
              <select class="form-select" v-model="formData.q12_bisa_membaca_menulis">
                <option value="">Pilih</option>
                <option v-for="opt in getQuestionOptions(12)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Sedang Sekolah</label>
              <select class="form-select" v-model="formData.q13_sedang_sekolah">
                <option value="">Pilih</option>
                <option v-for="opt in getQuestionOptions(13)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Lokasi Sekolah</label>
              <select class="form-select" v-model="formData.q14_lokasi_sekolah">
                <option value="">Pilih Lokasi</option>
                <option v-for="opt in getQuestionOptions(14)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Pendidikan Terakhir</label>
              <select class="form-select" v-model="formData.q15_pendidikan_terakhir">
                <option value="">Pilih Pendidikan</option>
                <option v-for="opt in getQuestionOptions(15)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="form-label">Alasan Berhenti Sekolah</label>
              <select class="form-select" v-model="formData.q16_alasan_berhenti">
                <option value="">Pilih Alasan</option>
                <option v-for="opt in getQuestionOptions(16)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Section C: Health -->
      <div class="card mb-4">
        <div class="card-header bg-warning text-dark">
          <h5 class="mb-0">C. Kesehatan</h5>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Disabilitas</label>
              <select class="form-select" v-model="formData.q17_disabilitas">
                <option value="">Pilih</option>
                <option v-for="opt in getQuestionOptions(17)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Kondisi Kesehatan Kronis</label>
              <select class="form-select" v-model="formData.q18_kondisi_kesehatan">
                <option value="">Pilih</option>
                <option v-for="opt in getQuestionOptions(18)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Section D: Employment -->
      <div class="card mb-4">
        <div class="card-header bg-success text-white">
          <h5 class="mb-0">D. Pekerjaan</h5>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Bekerja dalam 12 Bulan Terakhir</label>
              <select class="form-select" v-model="formData.q19_bekerja_12_bulan">
                <option value="">Pilih</option>
                <option v-for="opt in getQuestionOptions(19)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Pekerjaan Utama</label>
              <select class="form-select" v-model="formData.q20_pekerjaan_utama">
                <option value="">Pilih Pekerjaan</option>
                <option v-for="opt in getQuestionOptions(20)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Jenis Pekerjaan</label>
              <select class="form-select" v-model="formData.q21_jenis_pekerjaan">
                <option value="">Pilih Jenis</option>
                <option v-for="opt in getQuestionOptions(21)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Lokasi Pekerjaan</label>
              <select class="form-select" v-model="formData.q22_lokasi_pekerjaan">
                <option value="">Pilih Lokasi</option>
                <option v-for="opt in getQuestionOptions(22)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="form-label">Keterampilan/Profesi (15+ tahun)</label>
              <textarea class="form-control" v-model="formData.q23_keterampilan" rows="2"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Sections (simplified for remaining questions) -->
      <div class="card mb-4">
        <div class="card-header bg-secondary text-white">
          <h5 class="mb-0">E. Lainnya</h5>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Dua Penyakit Paling Umum</label>
              <textarea class="form-control" v-model="formData.q24_penyakit_umum" rows="2"></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label">Tempat Pelayanan Kesehatan</label>
              <select class="form-select" v-model="formData.q25_tempat_pelayanan">
                <option value="">Pilih</option>
                <option v-for="opt in getQuestionOptions(25)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Kecukupan Pangan</label>
              <select class="form-select" v-model="formData.q26_kecukupan_pangan">
                <option value="">Pilih</option>
                <option v-for="opt in getQuestionOptions(26)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Cara Menutupi Defisit Pangan</label>
              <textarea class="form-control" v-model="formData.q27_defisit_pangan" rows="2"></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label">Penghasilan Tahunan</label>
              <input type="number" class="form-control" v-model.number="formData.q28_penghasilan_tahunan">
            </div>
            <div class="col-md-6">
              <label class="form-label">Pengeluaran Bulanan</label>
              <input type="number" class="form-control" v-model.number="formData.q31_pengeluaran_bulanan">
            </div>
            <div class="col-md-4">
              <label class="form-label">Punya Rekening Bank</label>
              <select class="form-select" v-model="formData.q32_rekening_bank">
                <option value="">Pilih</option>
                <option v-for="opt in getQuestionOptions(32)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Jenis Tabungan</label>
              <select class="form-select" v-model="formData.q33_tabungan">
                <option value="">Pilih</option>
                <option v-for="opt in getQuestionOptions(33)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Jenis Hutang</label>
              <select class="form-select" v-model="formData.q34_hutang">
                <option value="">Pilih</option>
                <option v-for="opt in getQuestionOptions(34)" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="form-label">Alasan Hutang</label>
              <textarea class="form-control" v-model="formData.q35_alasan_hutang" rows="2"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Location Information -->
      <div class="card mb-4">
        <div class="card-header bg-dark text-white">
          <h5 class="mb-0">F. Lokasi & Informasi Tambahan</h5>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Desa</label>
              <input type="text" class="form-control" v-model="formData.village">
            </div>
            <div class="col-md-4">
              <label class="form-label">Kecamatan</label>
              <input type="text" class="form-control" v-model="formData.district">
            </div>
            <div class="col-md-4">
              <label class="form-label">Koordinat</label>
              <input type="text" class="form-control" v-model="formData.coordinates" placeholder="-2.5595, 121.3415">
            </div>
            <div class="col-md-6">
              <label class="form-label">Tanggal Survei</label>
              <input type="date" class="form-control" v-model="formData.survey_date">
            </div>
            <div class="col-md-6">
              <label class="form-label">Disurvei Oleh</label>
              <input type="text" class="form-control" v-model="formData.surveyed_by">
            </div>
            <div class="col-12">
              <label class="form-label">Catatan</label>
              <textarea class="form-control" v-model="formData.notes" rows="3"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Buttons -->
      <div class="row mb-4">
        <div class="col-12">
          <button type="submit" class="btn btn-primary btn-lg" :disabled="submitting">
            <span v-if="submitting">
              <span class="spinner-border spinner-border-sm me-2"></span>
              Menyimpan...
            </span>
            <span v-else>
              <i class="bi bi-save me-2"></i>Simpan Survei
            </span>
          </button>
          <button type="button" class="btn btn-secondary btn-lg ms-2" @click="resetForm">
            <i class="bi bi-x-circle me-2"></i>Reset Form
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { censusApi, censusQuestionsApi, type CensusSurvey, type CensusQuestion } from '../api'

const questions = ref<CensusQuestion[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const submitting = ref(false)

const formData = ref<Partial<CensusSurvey>>({
  q1_kode_enumerator: '',
  q2_id_unik: '',
  survey_date: new Date().toISOString().split('T')[0],
})

// Load questions on mount
onMounted(async () => {
  try {
    const data = await censusQuestionsApi.getAll()
    questions.value = data.sort((a, b) => a.question_number - b.question_number)
  } catch (err: any) {
    error.value = err.message || 'Failed to load questions'
  } finally {
    loading.value = false
  }
})

// Get options for a specific question
function getQuestionOptions(questionNumber: number): string[] {
  const question = questions.value.find(q => q.question_number === questionNumber)
  return question?.options || []
}

// Submit survey
async function submitSurvey() {
  submitting.value = true
  error.value = null

  try {
    await censusApi.create(formData.value)
    alert('Survei berhasil disimpan!')
    resetForm()
  } catch (err: any) {
    error.value = err.message || 'Failed to submit survey'
    alert('Gagal menyimpan survei: ' + error.value)
  } finally {
    submitting.value = false
  }
}

// Reset form
function resetForm() {
  formData.value = {
    q1_kode_enumerator: '',
    q2_id_unik: '',
    survey_date: new Date().toISOString().split('T')[0],
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
  font-weight: 600;
}

.form-label {
  font-weight: 500;
  color: #495057;
}

.text-danger {
  color: #dc3545 !important;
}
</style>
