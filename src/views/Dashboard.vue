<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Dashboard</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box">
              <div class="inner">
                <h3>53<sup style="font-size: 20px">Ha</sup></h3>
                <p>Jumlah Luas Lahan</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box">
              <div class="inner">
                <h3>53<sup style="font-size: 20px">Percil</sup></h3>
                <p>Jumlah Lahan Di Bebaskan</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box">
              <div class="inner">
                <h3><sup style="font-size: 20px">Rp.</sup>13.000.000.000</h3>
                <p>Total Biaya</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box">
              <div class="inner">
                <h3>78<sup style="font-size: 20px">%</sup></h3>
                <p>Grafik Total</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="card card">
              <div class="card-header">
                <h3 class="card-title">Luas Lahan</h3>
                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div class="card-body" style="display: block">
                <div class="chart">
                  <canvas
                    ref="barChart1"
                    style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card card">
              <div class="card-header">
                <h3 class="card-title">Lahan Di Bebaskan</h3>
                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div class="card-body" style="display: block">
                <div class="chart">
                  <canvas
                    ref="barChart2"
                    style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card card">
              <div class="card-header">
                <h3 class="card-title">Total Biaya</h3>
                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div class="card-body" style="display: block">
                <div class="chart">
                  <canvas
                    ref="barChart3"
                    style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card card">
              <div class="card-header">
                <h3 class="card-title">Grand Total</h3>
                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div class="card-body" style="display: block">
                <div class="chart">
                  <canvas
                    ref="barChart4"
                    style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const barChart1 = ref<HTMLCanvasElement | null>(null)
const barChart2 = ref<HTMLCanvasElement | null>(null)
const barChart3 = ref<HTMLCanvasElement | null>(null)
const barChart4 = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const areaChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Plan',
        backgroundColor: 'rgba(60,141,188,0.9)',
        borderColor: 'rgba(60,141,188,0.8)',
        pointRadius: false,
        pointColor: '#3b8bba',
        pointStrokeColor: 'rgba(60,141,188,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data: [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label: 'Realisasi',
        backgroundColor: 'rgba(210, 214, 222, 1)',
        borderColor: 'rgba(210, 214, 222, 1)',
        pointRadius: false,
        pointColor: 'rgba(210, 214, 222, 1)',
        pointStrokeColor: '#c1c7d1',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }

  const barChartData = JSON.parse(JSON.stringify(areaChartData))
  const temp0 = areaChartData.datasets[0]
  const temp1 = areaChartData.datasets[1]
  barChartData.datasets[0] = temp1
  barChartData.datasets[1] = temp0

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    datasetFill: false
  }

  if (barChart1.value) {
    new Chart(barChart1.value, {
      type: 'bar',
      data: barChartData,
      options: barChartOptions
    })
  }

  if (barChart2.value) {
    new Chart(barChart2.value, {
      type: 'bar',
      data: barChartData,
      options: barChartOptions
    })
  }

  if (barChart3.value) {
    new Chart(barChart3.value, {
      type: 'bar',
      data: barChartData,
      options: barChartOptions
    })
  }

  if (barChart4.value) {
    new Chart(barChart4.value, {
      type: 'bar',
      data: barChartData,
      options: barChartOptions
    })
  }
})
</script>

<style scoped>
</style>
