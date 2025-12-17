<template>
  <data-table
    :api="apiUrl('claim')"
    title="Claim"
    data="id_claim"
  />

  <data-table
    :api="apiUrl('mediasi')"
    title="Mediasi"
    data="id_mediasi"
  />
  <data-table
    :api="apiUrl('pidana')"
    title="Pidanan"
    data="id_pidana"
  />
  <data-table
    :api="apiUrl('perdata')"
    title="Perdata"
    data="id_perdata"
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
