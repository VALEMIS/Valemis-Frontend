<template>
    <div class="appraisal-section">
        <div class="section-header">
            <div class="header-text">
                <h4 class="section-title">Dokumen Appraisal</h4>
                <p class="section-subtitle">Surat Keputusan Tanaman</p>
            </div>
        </div>

        <div class="documents-grid">
            <div v-for="doc in documents" :key="doc.id" class="document-card"
                :class="{ 'active': selectedDoc?.id === doc.id }" @click="selectDocument(doc)">
                <div class="doc-icon">
                    <i class="bi bi-file-earmark-pdf-fill"></i>
                </div>
                <div class="doc-info">
                    <h5 class="doc-title">{{ doc.title }}</h5>
                    <p class="doc-meta">{{ doc.region }}</p>
                </div>
                <div class="doc-action">
                    <i class="bi bi-chevron-right"></i>
                </div>
            </div>
        </div>

        <!-- PDF Preview Modal -->
        <div v-if="selectedDoc" class="pdf-preview-modal" @click.self="closePreview">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title-section">
                        <i class="bi bi-file-earmark-pdf-fill"></i>
                        <div>
                            <h5 class="modal-title">{{ selectedDoc.title }}</h5>
                            <p class="modal-subtitle">{{ selectedDoc.region }}</p>
                        </div>
                    </div>
                    <button class="close-btn" @click="closePreview">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <iframe :src="selectedDoc.path" class="pdf-viewer" frameborder="0"></iframe>
                </div>
                <div class="modal-footer">
                    <a :href="selectedDoc.path" download class="download-btn">
                        <i class="bi bi-download"></i>
                        Download PDF
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface AppraisalDocument {
    id: number
    title: string
    region: string
    path: string
}

const documents = ref<AppraisalDocument[]>([
    {
        id: 1,
        title: 'SK Tanaman Kab Morowali',
        region: 'Kabupaten Morowali - Tahun 2021',
        path: '/assets/SK Tanaman Kab Morowali Th 2021.pdf'
    },
    {
        id: 2,
        title: 'SK Tanam Tumbuh Luwu Timur',
        region: 'Luwu Timur, Sulawesi Selatan',
        path: '/assets/SK Tanam Tumbuh Luwu Timur Sulsel.pdf'
    }
])

const selectedDoc = ref<AppraisalDocument | null>(null)

const selectDocument = (doc: AppraisalDocument) => {
    selectedDoc.value = doc
}

const closePreview = () => {
    selectedDoc.value = null
}
</script>

<style scoped>
.appraisal-section {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 2px solid #e5e7eb;
    margin-top: 2rem;
}

.section-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f3f4f6;
}

.header-text {
    flex: 1;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.25rem 0;
}

.section-subtitle {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
}

.documents-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.document-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f9fafb;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.document-card:hover {
    background: #f3f4f6;
    border-color: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}

.document-card.active {
    background: #fef2f2;
    border-color: #dc2626;
}

.doc-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    flex-shrink: 0;
}

.doc-info {
    flex: 1;
    min-width: 0;
}

.doc-title {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.doc-meta {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.doc-action {
    color: #9ca3af;
    font-size: 1.25rem;
    transition: all 0.3s ease;
}

.document-card:hover .doc-action {
    color: #dc2626;
    transform: translateX(4px);
}

/* PDF Preview Modal */
.pdf-preview-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 2rem;
    backdrop-filter: blur(4px);
}

.modal-content {
    background: white;
    border-radius: 16px;
    width: 100%;
    max-width: 1200px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 2px solid #e5e7eb;
}

.modal-title-section {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.modal-title-section>i {
    font-size: 2rem;
    color: #dc2626;
}

.modal-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.25rem 0;
}

.modal-subtitle {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
}

.close-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: #f3f4f6;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #6b7280;
    font-size: 1.25rem;
}

.close-btn:hover {
    background: #dc2626;
    color: white;
}

.modal-body {
    flex: 1;
    overflow: hidden;
    padding: 1.5rem;
    background: #f9fafb;
}

.pdf-viewer {
    width: 100%;
    height: 100%;
    min-height: 500px;
    border-radius: 8px;
    background: white;
}

.modal-footer {
    padding: 1.5rem;
    border-top: 2px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
}

.download-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
    color: white;
    border-radius: 10px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.download-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
    color: white;
}

@media (max-width: 768px) {
    .documents-grid {
        grid-template-columns: 1fr;
    }

    .pdf-preview-modal {
        padding: 1rem;
    }

    .modal-content {
        max-height: 95vh;
    }

    .pdf-viewer {
        min-height: 400px;
    }
}
</style>
