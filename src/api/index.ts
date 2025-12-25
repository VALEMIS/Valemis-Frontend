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

export default {
  asset: assetApi,
  land: landApi,
  acquisition: acquisitionApi,
  compliance: complianceApi,
  litigation: litigationApi,
  stakeholder: stakeholderApi,
}
