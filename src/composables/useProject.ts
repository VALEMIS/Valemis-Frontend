/**
 * useProject Composable
 * Manages project selection and context throughout the application
 */

import { ref, computed } from 'vue'
import axios from 'axios'

interface Project {
    id: number
    nama_project: string
    lokasi?: string
    status?: string
    tanggal_mulai?: string
    tanggal_selesai?: string
    deskripsi?: string
    [key: string]: any
}

// Global state for current project
const currentProject = ref<Project | null>(null)
const projects = ref<Project[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export function useProject() {
    // Fetch all projects from API
    const fetchProjects = async () => {
        loading.value = true
        error.value = null
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/spatial/Project/?format=json')
            projects.value = response.data.results || response.data || []

            // Auto-select first project if none selected
            if (!currentProject.value && projects.value.length > 0) {
                currentProject.value = projects.value[0] || null
            }

            return projects.value
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch projects'
            console.error('Error fetching projects:', err)
            return []
        } finally {
            loading.value = false
        }
    }

    // Fetch single project by ID
    const fetchProject = async (projectId: number | string) => {
        loading.value = true
        error.value = null
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/spatial/Project/${projectId}`)
            const project = response.data
            currentProject.value = project
            return project
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch project'
            console.error('Error fetching project:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    // Set current project
    const setCurrentProject = (project: Project | null) => {
        currentProject.value = project

        // Store in localStorage for persistence
        if (project) {
            localStorage.setItem('currentProjectId', project.id.toString())
        } else {
            localStorage.removeItem('currentProjectId')
        }
    }

    // Get current project ID
    const currentProjectId = computed(() => currentProject.value?.id || null)

    // Generate project-based route
    const getProjectRoute = (path: string) => {
        if (!currentProjectId.value) {
            console.warn('No project selected, cannot generate project route')
            return '/project'
        }
        return `/project/${currentProjectId.value}${path}`
    }

    // Check if a route is project-based
    const isProjectRoute = (path: string) => {
        return path.includes('/asset-inventory') ||
            path.includes('/land-acquisition') ||
            path.includes('/land-inventory')
    }

    // Initialize from localStorage
    const initializeFromStorage = async () => {
        const storedProjectId = localStorage.getItem('currentProjectId')
        if (storedProjectId) {
            await fetchProject(storedProjectId)
        }
    }

    return {
        // State
        currentProject,
        currentProjectId,
        projects,
        loading,
        error,

        // Methods
        fetchProjects,
        fetchProject,
        setCurrentProject,
        getProjectRoute,
        isProjectRoute,
        initializeFromStorage
    }
}
