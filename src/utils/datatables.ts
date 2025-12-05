/**
 * DataTables Configuration Utility
 * Provides consistent DataTables configuration across the application
 */

/**
 * Default Indonesian language configuration for DataTables
 * This avoids loading external i18n files which can cause errors
 */
export const dataTablesIndonesianLanguage = {
  search: "Cari:",
  searchPlaceholder: "Ketik untuk mencari...",
  lengthMenu: "Tampilkan _MENU_ data per halaman",
  info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
  infoEmpty: "Menampilkan 0 sampai 0 dari 0 data",
  infoFiltered: "(difilter dari _MAX_ total data)",
  loadingRecords: "Memuat...",
  processing: "Memproses...",
  zeroRecords: "Tidak ada data yang cocok",
  emptyTable: "Tidak ada data tersedia dalam tabel",
  paginate: {
    first: "Pertama",
    last: "Terakhir",
    next: "Selanjutnya",
    previous: "Sebelumnya"
  },
  aria: {
    sortAscending: ": aktifkan untuk mengurutkan kolom naik",
    sortDescending: ": aktifkan untuk mengurutkan kolom turun"
  }
}

/**
 * Default DataTables configuration
 * @param options - Additional options to merge with defaults
 */
export const getDataTablesConfig = (options: any = {}) => {
  return {
    pageLength: 10,
    lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Semua"]],
    language: dataTablesIndonesianLanguage,
    responsive: true,
    autoWidth: false,
    ...options
  }
}

/**
 * Initialize DataTable with consistent configuration
 * @param element - jQuery element or HTMLElement
 * @param options - Additional DataTables options
 */
export const initDataTable = (element: any, options: any = {}) => {
  if (!(window as any).$) {
    console.error('jQuery is not loaded. DataTables requires jQuery.')
    return null
  }

  if (!(window as any).$.fn.DataTable) {
    console.error('DataTables plugin is not loaded.')
    return null
  }

  try {
    const $element = (window as any).$(element)
    
    // Check if DataTable is already initialized
    if ((window as any).$.fn.DataTable.isDataTable($element)) {
      // Destroy existing instance
      $element.DataTable().destroy()
    }

    // Initialize with merged config
    return $element.DataTable(getDataTablesConfig(options))
  } catch (error) {
    console.error('Error initializing DataTable:', error)
    return null
  }
}

/**
 * Destroy DataTable instance if exists
 * @param element - jQuery element or HTMLElement
 */
export const destroyDataTable = (element: any) => {
  if (!(window as any).$) return

  try {
    const $element = (window as any).$(element)
    if ((window as any).$.fn.DataTable.isDataTable($element)) {
      $element.DataTable().destroy()
    }
  } catch (error) {
    console.error('Error destroying DataTable:', error)
  }
}

/**
 * Reload DataTable data
 * @param element - jQuery element or HTMLElement
 */
export const reloadDataTable = (element: any) => {
  if (!(window as any).$) return

  try {
    const $element = (window as any).$(element)
    if ((window as any).$.fn.DataTable.isDataTable($element)) {
      $element.DataTable().ajax.reload()
    }
  } catch (error) {
    console.error('Error reloading DataTable:', error)
  }
}

/**
 * Get DataTable instance
 * @param element - jQuery element or HTMLElement
 */
export const getDataTableInstance = (element: any) => {
  if (!(window as any).$) return null

  try {
    const $element = (window as any).$(element)
    if ((window as any).$.fn.DataTable.isDataTable($element)) {
      return $element.DataTable()
    }
  } catch (error) {
    console.error('Error getting DataTable instance:', error)
  }

  return null
}
