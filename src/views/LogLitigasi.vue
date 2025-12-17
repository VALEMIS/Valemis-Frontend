<template>
  <data-table
    :api="apiUrl('log')"
    title="Log"
    data="id_log"
  />
  <data-table
    :api="apiUrl('claimriwayat')"
    title="Riwayat Claim"
    data="id_claim_hist"
  />
</template>

<script>
import "../components/DataTable/DataTable.js"

export default {
  methods: {
    apiUrl(table) {
      const id = this.$route.params.id
      return `http://127.0.0.1:8000/api/valemis/${table}/${id}`
    }
  }
}
</script>
