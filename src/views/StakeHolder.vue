<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Stake Holder Management</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Stake Holder</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- Dashboard Cards -->
        <div class="row mb-4">
          <div class="col-lg-3 col-6">
            <div class="small-box text-bg-primary">
              <div class="inner">
                <h3>{{ stakeholderStats.total }}</h3>
                <p>Total Stakeholder</p>
              </div>
              <div class="icon">
                <i class="bi bi-people-fill"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="small-box text-bg-success">
              <div class="inner">
                <h3>{{ stakeholderStats.highInfluence }}</h3>
                <p>High Influence</p>
              </div>
              <div class="icon">
                <i class="bi bi-graph-up-arrow"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="small-box text-bg-warning">
              <div class="inner">
                <h3>{{ stakeholderStats.highInterest }}</h3>
                <p>High Interest</p>
              </div>
              <div class="icon">
                <i class="bi bi-star-fill"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="small-box text-bg-info">
              <div class="inner">
                <h3>{{ stakeholderStats.activeInvolvement }}</h3>
                <p>Active Involvement</p>
              </div>
              <div class="icon">
                <i class="bi bi-activity"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Stakeholder Influence & Interest Mapping -->
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title">Stakeholder Influence & Interest Matrix</h5>
          </div>
          <div class="card-body">
            <div id="stakeholderMatrix" style="height: 400px;">
              <canvas ref="matrixChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Stakeholder List -->
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title">Daftar Stakeholder</h5>
            <div class="card-tools">
              <router-link to="/stake-holder/tambah" class="btn btn-sm btn-primary">
                <i class="bi bi-plus-circle"></i> Tambah Stakeholder
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <table ref="stakeholderTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>SH_ID</th>
                  <th>Nama</th>
                  <th>Tipe</th>
                  <th>Kategori</th>
                  <th>Kontak</th>
                  <th>Interest (1-5)</th>
                  <th>Influence (1-5)</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sh in stakeholders" :key="sh.id">
                  <td>{{ sh.sh_id }}</td>
                  <td>{{ sh.nama }}</td>
                  <td><span class="badge bg-primary">{{ sh.tipe }}</span></td>
                  <td><span class="badge bg-info">{{ sh.kategori }}</span></td>
                  <td>{{ sh.kontak }}</td>
                  <td>
                    <div class="rating">
                      <i v-for="n in 5" :key="n" 
                         :class="n <= sh.interest ? 'bi bi-star-fill text-warning' : 'bi bi-star text-muted'"></i>
                    </div>
                  </td>
                  <td>
                    <div class="rating">
                      <i v-for="n in 5" :key="n" 
                         :class="n <= sh.influence ? 'bi bi-star-fill text-success' : 'bi bi-star text-muted'"></i>
                    </div>
                  </td>
                  <td>
                    <router-link :to="`/stake-holder/detail/${sh.id}`" class="btn btn-sm btn-info">
                      <i class="bi bi-eye"></i>
                    </router-link>
                    <button class="btn btn-sm btn-warning" @click="editStakeholder(sh.id)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" @click="showSocialMedia(sh.id)">
                      <i class="bi bi-twitter-x"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Social Media Sentiment Analysis Modal -->
        <div v-if="showSentimentModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  <i class="bi bi-twitter-x"></i> Analisis Sentiment Media Sosial X
                </h5>
                <button type="button" class="btn-close" @click="closeSentimentModal"></button>
              </div>
              <div class="modal-body">
                <div class="row mb-3">
                  <div class="col-md-8">
                    <label class="form-label">Username / Keyword</label>
                    <div class="input-group">
                      <span class="input-group-text">@</span>
                      <input type="text" class="form-control" v-model="scrapingKeyword" placeholder="username atau keyword">
                      <button class="btn btn-primary" @click="startScraping">
                        <i class="bi bi-search"></i> Scrape Data
                      </button>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Periode</label>
                    <select class="form-select" v-model="scrapingPeriod">
                      <option value="7">7 Hari Terakhir</option>
                      <option value="30">30 Hari Terakhir</option>
                      <option value="90">90 Hari Terakhir</option>
                    </select>
                  </div>
                </div>

                <div v-if="isScrapingInProgress" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <p class="mt-2">Mengumpulkan data dari X...</p>
                </div>

                <div v-else-if="sentimentData">
                  <!-- Sentiment Summary -->
                  <div class="row mb-4">
                    <div class="col-md-4">
                      <div class="card text-bg-success">
                        <div class="card-body text-center">
                          <h3>{{ sentimentData.positive }}%</h3>
                          <p class="mb-0"><i class="bi bi-emoji-smile"></i> Positive</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card text-bg-secondary">
                        <div class="card-body text-center">
                          <h3>{{ sentimentData.neutral }}%</h3>
                          <p class="mb-0"><i class="bi bi-emoji-neutral"></i> Neutral</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card text-bg-danger">
                        <div class="card-body text-center">
                          <h3>{{ sentimentData.negative }}%</h3>
                          <p class="mb-0"><i class="bi bi-emoji-frown"></i> Negative</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Sentiment Chart -->
                  <div class="card mb-3">
                    <div class="card-header">
                      <h6 class="card-title">Trend Sentiment</h6>
                    </div>
                    <div class="card-body">
                      <canvas ref="sentimentChart" height="80"></canvas>
                    </div>
                  </div>

                  <!-- Posts List -->
                  <div class="card">
                    <div class="card-header">
                      <h6 class="card-title">Posts Terkini ({{ sentimentData.posts.length }} posts)</h6>
                    </div>
                    <div class="card-body" style="max-height: 400px; overflow-y: auto;">
                      <div v-for="post in sentimentData.posts" :key="post.id" class="mb-3 p-3 border rounded">
                        <div class="d-flex justify-content-between mb-2">
                          <strong>{{ post.username }}</strong>
                          <span :class="`badge bg-${post.sentiment === 'positive' ? 'success' : post.sentiment === 'negative' ? 'danger' : 'secondary'}`">
                            {{ post.sentiment }}
                          </span>
                        </div>
                        <p class="mb-2">{{ post.text }}</p>
                        <small class="text-muted">
                          <i class="bi bi-calendar"></i> {{ post.date }} | 
                          <i class="bi bi-heart"></i> {{ post.likes }} | 
                          <i class="bi bi-chat"></i> {{ post.replies }}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeSentimentModal">Tutup</button>
                <button type="button" class="btn btn-primary" @click="exportSentimentData">
                  <i class="bi bi-download"></i> Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const router = useRouter()

// Stats
const stakeholderStats = ref({
  total: 24,
  highInfluence: 8,
  highInterest: 12,
  activeInvolvement: 15
})

// Stakeholder Data
const stakeholders = ref([
  {
    id: 1,
    sh_id: 'SH001',
    nama: 'PT. Vale Indonesia',
    tipe: 'Perusahaan',
    kategori: 'Primary',
    alamat: 'Sorowako, Sulawesi Selatan',
    kontak: '0411-5221234',
    interest: 5,
    influence: 5
  },
  {
    id: 2,
    sh_id: 'SH002',
    nama: 'Pemerintah Kabupaten Luwu Timur',
    tipe: 'Pemerintah',
    kategori: 'Primary',
    alamat: 'Malili, Luwu Timur',
    kontak: '0461-21001',
    interest: 5,
    influence: 5
  },
  {
    id: 3,
    sh_id: 'SH003',
    nama: 'Komunitas Masyarakat Sorowako',
    tipe: 'Masyarakat',
    kategori: 'Primary',
    alamat: 'Sorowako, Luwu Timur',
    kontak: '0812-4567-8901',
    interest: 4,
    influence: 3
  },
  {
    id: 4,
    sh_id: 'SH004',
    nama: 'LSM Lingkungan Sulawesi',
    tipe: 'NGO',
    kategori: 'Secondary',
    alamat: 'Makassar, Sulawesi Selatan',
    kontak: '0411-3456789',
    interest: 4,
    influence: 3
  },
  {
    id: 5,
    sh_id: 'SH005',
    nama: 'Media Lokal Sulawesi',
    tipe: 'Media',
    kategori: 'Secondary',
    alamat: 'Makassar, Sulawesi Selatan',
    kontak: '0411-8765432',
    interest: 3,
    influence: 4
  }
])

// Social Media Sentiment
const showSentimentModal = ref(false)
const scrapingKeyword = ref('')
const scrapingPeriod = ref('7')
const isScrapingInProgress = ref(false)
const sentimentData = ref<any>(null)

const stakeholderTable = ref<HTMLTableElement>()
const matrixChart = ref<HTMLCanvasElement>()
const sentimentChart = ref<HTMLCanvasElement>()

let chartInstance: Chart | null = null
let sentimentChartInstance: Chart | null = null

onMounted(() => {
  // Initialize DataTable
  if ((window as any).$) {
    nextTick(() => {
      if (stakeholderTable.value) {
        (window as any).$(stakeholderTable.value).DataTable({
          language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/id.json'
          }
        })
      }
    })
  }

  // Initialize Stakeholder Matrix Chart
  if (matrixChart.value) {
    const ctx = matrixChart.value.getContext('2d')
    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Stakeholders',
            data: stakeholders.value.map(sh => ({
              x: sh.influence,
              y: sh.interest,
              label: sh.nama
            })),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Influence (1-5)'
              },
              min: 0,
              max: 6
            },
            y: {
              title: {
                display: true,
                text: 'Interest (1-5)'
              },
              min: 0,
              max: 6
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  return context.raw.label
                }
              }
            }
          }
        }
      })
    }
  }
})

const editStakeholder = (id: number) => {
  router.push(`/stake-holder/edit/${id}`)
}

const showSocialMedia = (id: number) => {
  const stakeholder = stakeholders.value.find(sh => sh.id === id)
  if (stakeholder) {
    scrapingKeyword.value = stakeholder.nama
  }
  showSentimentModal.value = true
  sentimentData.value = null
}

const closeSentimentModal = () => {
  showSentimentModal.value = false
  scrapingKeyword.value = ''
  sentimentData.value = null
}

const startScraping = async () => {
  isScrapingInProgress.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Dummy sentiment data
  sentimentData.value = {
    positive: 65,
    neutral: 20,
    negative: 15,
    posts: [
      {
        id: 1,
        username: '@user123',
        text: 'PT Vale Indonesia berkontribusi positif untuk pembangunan daerah!',
        sentiment: 'positive',
        date: '2024-11-30',
        likes: 45,
        replies: 12
      },
      {
        id: 2,
        username: '@localcitizen',
        text: 'Program CSR Vale sangat membantu masyarakat lokal',
        sentiment: 'positive',
        date: '2024-11-29',
        likes: 32,
        replies: 8
      },
      {
        id: 3,
        username: '@envwatch',
        text: 'Perlu lebih banyak transparansi dalam pengelolaan lingkungan',
        sentiment: 'neutral',
        date: '2024-11-28',
        likes: 18,
        replies: 24
      },
      {
        id: 4,
        username: '@activist99',
        text: 'Masih ada kekhawatiran tentang dampak lingkungan jangka panjang',
        sentiment: 'negative',
        date: '2024-11-27',
        likes: 56,
        replies: 34
      },
      {
        id: 5,
        username: '@newsupdate',
        text: 'Vale terus berkomitmen untuk pembangunan berkelanjutan',
        sentiment: 'positive',
        date: '2024-11-26',
        likes: 28,
        replies: 6
      }
    ]
  }
  
  isScrapingInProgress.value = false
  
  // Draw sentiment trend chart
  nextTick(() => {
    if (sentimentChart.value) {
      const ctx = sentimentChart.value.getContext('2d')
      if (ctx) {
        if (sentimentChartInstance) {
          sentimentChartInstance.destroy()
        }
        
        sentimentChartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [
              {
                label: 'Positive',
                data: [60, 62, 65, 63, 68, 70, 65],
                borderColor: 'rgb(40, 167, 69)',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.4
              },
              {
                label: 'Neutral',
                data: [25, 23, 20, 22, 18, 15, 20],
                borderColor: 'rgb(108, 117, 125)',
                backgroundColor: 'rgba(108, 117, 125, 0.1)',
                tension: 0.4
              },
              {
                label: 'Negative',
                data: [15, 15, 15, 15, 14, 15, 15],
                borderColor: 'rgb(220, 53, 69)',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                tension: 0.4
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: function(value) {
                    return value + '%'
                  }
                }
              }
            }
          }
        })
      }
    }
  })
}

const exportSentimentData = () => {
  alert('Export sentiment data to CSV/Excel')
}
</script>

<style scoped>
.rating i {
  font-size: 0.9rem;
}

.modal.show {
  display: block;
}

.small-box .icon {
  font-size: 4rem;
  opacity: 0.3;
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>
