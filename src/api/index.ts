/**
 * API Service for Valemis Frontend
 * Connects to Django Backend at https://api.valemis.id
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.valemis.id'

interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Generic fetch wrapper
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Export to CSV function
async function exportToCsv(endpoint: string, filename: string): Promise<void> {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Export Error: ${response.status} ${response.statusText}`)
  }

  const blob = await response.blob()
  const downloadUrl = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(downloadUrl)
}

// Asset Inventory API
export const assetApi = {
  getAll: () => apiFetch<ApiResponse<Asset>>('/api/valemis/assets/'),
  getById: (id: number) => apiFetch<Asset>(`/api/valemis/assets/${id}/`),
  create: (data: Partial<Asset>) => apiFetch<Asset>('/api/valemis/assets/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Asset>) => apiFetch<Asset>(`/api/valemis/assets/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiFetch<void>(`/api/valemis/assets/${id}/`, {
    method: 'DELETE',
  }),
  exportCsv: () => exportToCsv('/api/valemis/assets/export_csv/', 'asset_inventory.csv'),
}

// Asset Inventory Detail API
export const assetDetailApi = {
  getAll: () => apiFetch<ApiResponse<AssetDetail>>('/api/valemis/asset-details/'),
  getById: (id: number) => apiFetch<AssetDetail>(`/api/valemis/asset-details/${id}/`),
  getByType: (assetType: string) => apiFetch<AssetDetail[]>(`/api/valemis/asset-details/by-type/${assetType}/`),
  create: (data: Partial<AssetDetail>) => apiFetch<AssetDetail>('/api/valemis/asset-details/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<AssetDetail>) => apiFetch<AssetDetail>(`/api/valemis/asset-details/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiFetch<void>(`/api/valemis/asset-details/${id}/`, {
    method: 'DELETE',
  }),
  exportCsv: () => exportToCsv('/api/valemis/asset-details/export_csv/', 'asset_inventory_detail.csv'),
}

// Land Inventory API
export const landApi = {
  getAll: () => apiFetch<ApiResponse<Land>>('/api/valemis/lands/'),
  getById: (id: number) => apiFetch<Land>(`/api/valemis/lands/${id}/`),
  create: (data: Partial<Land>) => apiFetch<Land>('/api/valemis/lands/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Land>) => apiFetch<Land>(`/api/valemis/lands/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiFetch<void>(`/api/valemis/lands/${id}/`, {
    method: 'DELETE',
  }),
  exportCsv: () => exportToCsv('/api/valemis/lands/export_csv/', 'land_inventory.csv'),
}

// Land Acquisition API
export const acquisitionApi = {
  getAll: () => apiFetch<ApiResponse<Acquisition>>('/api/valemis/acquisitions/'),
  getById: (id: number) => apiFetch<Acquisition>(`/api/valemis/acquisitions/${id}/`),
  create: (data: Partial<Acquisition>) => apiFetch<Acquisition>('/api/valemis/acquisitions/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Acquisition>) => apiFetch<Acquisition>(`/api/valemis/acquisitions/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiFetch<void>(`/api/valemis/acquisitions/${id}/`, {
    method: 'DELETE',
  }),
  exportCsv: () => exportToCsv('/api/valemis/acquisitions/export_csv/', 'land_acquisition.csv'),
}

// Land Compliance API
export const complianceApi = {
  getAll: () => apiFetch<ApiResponse<Compliance>>('/api/valemis/compliances/'),
  getById: (id: number) => apiFetch<Compliance>(`/api/valemis/compliances/${id}/`),
  create: (data: Partial<Compliance>) => apiFetch<Compliance>('/api/valemis/compliances/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Compliance>) => apiFetch<Compliance>(`/api/valemis/compliances/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiFetch<void>(`/api/valemis/compliances/${id}/`, {
    method: 'DELETE',
  }),
  exportCsv: () => exportToCsv('/api/valemis/compliances/export_csv/', 'land_compliance.csv'),
}

// Litigation API
export const litigationApi = {
  getAll: () => apiFetch<ApiResponse<Litigation>>('/api/valemis/litigations/'),
  getById: (id: number) => apiFetch<Litigation>(`/api/valemis/litigations/${id}/`),
  create: (data: Partial<Litigation>) => apiFetch<Litigation>('/api/valemis/litigations/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Litigation>) => apiFetch<Litigation>(`/api/valemis/litigations/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiFetch<void>(`/api/valemis/litigations/${id}/`, {
    method: 'DELETE',
  }),
  exportCsv: () => exportToCsv('/api/valemis/litigations/export_csv/', 'litigation.csv'),
}

// Stakeholder API
export const stakeholderApi = {
  getAll: () => apiFetch<ApiResponse<Stakeholder>>('/api/valemis/stakeholders/'),
  getById: (id: number) => apiFetch<Stakeholder>(`/api/valemis/stakeholders/${id}/`),
  create: (data: Partial<Stakeholder>) => apiFetch<Stakeholder>('/api/valemis/stakeholders/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Stakeholder>) => apiFetch<Stakeholder>(`/api/valemis/stakeholders/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiFetch<void>(`/api/valemis/stakeholders/${id}/`, {
    method: 'DELETE',
  }),
  exportCsv: () => exportToCsv('/api/valemis/stakeholders/export_csv/', 'stakeholders.csv'),
}

// Census Survey API
export const censusApi = {
  getAll: (params?: Record<string, string>) => {
    const queryString = params ? new URLSearchParams(params).toString() : ''
    return apiFetch<ApiResponse<CensusSurvey>>(
      `/api/valemis/census/${queryString ? `?${queryString}` : ''}`
    )
  },
  getById: (id: number) => apiFetch<CensusSurvey>(`/api/valemis/census/${id}/`),
  create: (data: Partial<CensusSurvey>) => apiFetch<CensusSurvey>('/api/valemis/census/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<CensusSurvey>) => apiFetch<CensusSurvey>(`/api/valemis/census/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiFetch<void>(`/api/valemis/census/${id}/`, {
    method: 'DELETE',
  }),
  getStatistics: () => apiFetch<any>('/api/valemis/census/statistics/'),
  getByVillage: () => apiFetch<any[]>('/api/valemis/census/by_village/'),
}

// Census Questions API
export const censusQuestionsApi = {
  getAll: async () => {
    const response = await apiFetch<ApiResponse<CensusQuestion>>('/api/valemis/questions/')
    return response.results
  },
  getByCategory: (category?: string) => {
    const queryString = category ? `?category=${category}` : ''
    return apiFetch<ApiResponse<CensusQuestion>>(`/api/valemis/questions/by_category/${queryString}`)
  },
}

// Types
export interface Asset {
  id: number
  code: string
  owner_name: string
  village: string
  land_area: string
  building_area: string
  certificate_status: string
  coordinates: string
  lat: string
  lng: string
}

export interface Land {
  id: number
  code: string
  location_name: string
  category: string
  area: string
  certificate: string
  certificate_no: string
  coordinates: string
  lat: string
  lng: string
  acquisition_year?: number
}

export interface Acquisition {
  id: number
  code: string
  project: string
  owner_name: string
  village: string
  area: string
  status: string
  jumlah_bebas: string
  biaya_pembebasan: string
  negotiation_date: string
}

export interface Compliance {
  id: number
  land_code: string
  location_name: string
  permit_type: string
  permit_number: string
  issue_date: string
  expiry_date?: string
  status: string
  notes: string
  days_remaining?: number
}

export interface Litigation {
  id: number
  case_code: string
  land_code: string
  case_type: string
  claimant: string
  description: string
  start_date: string
  status: string
  priority: string
}

export interface Stakeholder {
  id: number
  sh_id: string
  nama: string
  tipe: string
  kategori: string
  alamat: string
  kontak: string
  interest: number
  influence: number
  lat?: string
  lng?: string
}

export interface CensusSurvey {
  id: number
  q1_kode_enumerator: string
  q2_id_unik: string
  q3_hubungan_responden?: string
  q4_identifikasi_dampak?: string
  q5_agama?: string
  q6_asal_etnis?: string
  q7_bahasa?: string
  q8_tempat_asal?: string
  q9_hubungan_kk?: string
  q10_jenis_kelamin?: string
  q11_status_perkawinan?: string
  q12_bisa_membaca_menulis?: string
  q13_sedang_sekolah?: string
  q14_lokasi_sekolah?: string
  q15_pendidikan_terakhir?: string
  q16_alasan_berhenti?: string
  q17_disabilitas?: string
  q18_kondisi_kesehatan?: string
  q19_bekerja_12_bulan?: string
  q20_pekerjaan_utama?: string
  q21_jenis_pekerjaan?: string
  q22_lokasi_pekerjaan?: string
  q23_keterampilan?: string
  q24_penyakit_umum?: string
  q25_tempat_pelayanan?: string
  q26_kecukupan_pangan?: string
  q27_defisit_pangan?: string
  q28_penghasilan_tahunan?: number
  q31_pengeluaran_bulanan?: number
  q32_rekening_bank?: string
  q33_tabungan?: string
  q34_hutang?: string
  q35_alasan_hutang?: string
  q36_jenis_proyek?: string
  q37_lokasi_bisnis?: string
  q38_kepemilikan_bisnis?: string
  q39_jenis_bisnis?: string
  q40_tipe_rumah?: string
  q41_pelayanan_listrik?: string
  q42_sumber_air?: string
  q43_sanitasi?: string
  q44_karakteristik_khusus?: string
  q45_pembagian_kerja?: string
  created_at: string
  updated_at: string
  surveyed_by?: string
  survey_date?: string
  coordinates?: string
  village?: string
  district?: string
  regency?: string
  province?: string
  notes?: string
}

export interface CensusQuestion {
  id: number
  question_number: number
  question_text: string
  field_name: string
  category?: string
  options: string[]
  is_required: boolean
  validation_type?: string
}

export default {
  asset: assetApi,
  assetDetail: assetDetailApi,
  land: landApi,
  acquisition: acquisitionApi,
  compliance: complianceApi,
  litigation: litigationApi,
  stakeholder: stakeholderApi,
  census: censusApi,
  questions: censusQuestionsApi,
}

// Asset Detail interface for AssetInventoryDetail (Inventaris Aset)
export interface AssetDetail {
  id: number
  asset_inventory?: number
  rumah_tangga_no?: string
  id_aset?: string
  asset_type: 'Tanah' | 'Tanaman' | 'Pohon' | 'Bangunan' | 'Sumber Daya Alam'
  // Tanah fields
  jenis_tanah?: string
  terdaftar_di?: string
  luas_m2?: number
  status_pemilik?: string
  pemilik_sebelumnya?: string
  tenurial?: string
  catatan_tanah?: string
  // Tanaman fields
  jenis_tanaman?: string
  usia_tanaman?: number
  kondisi_tanaman?: string
  sumber_air_tanaman?: string
  gambar_tanaman?: string
  // Pohon fields
  jenis_pohon?: string
  jumlah_pohon?: number
  luas_pohon?: number
  produktif?: string
  dewasa?: string
  produksi_per_tahun?: string
  kondisi_pohon?: string
  gambar1_pohon?: string
  gambar2_pohon?: string
  gambar3_pohon?: string
  // Bangunan fields
  jenis_bangunan?: string
  luas_bangunan?: number
  permanen_sementara?: string
  primer_sekunder?: string
  bahan_utama?: string
  sanitarian?: string
  pasokan_listrik?: string
  persediaan_air?: string
  gambar1_bangunan?: string
  gambar2_bangunan?: string
  gambar3_bangunan?: string
  gambar4_bangunan?: string
  // Sumber Daya Alam fields
  jenis_sumber_daya_alam?: string
  produktivitas_per_tahun?: string
  luas_sda?: number
  created_at: string
  updated_at: string
}
