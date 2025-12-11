<template><template>

  <div>  <div>

    <div class="app-content-header">    <div class="app-content-header">

      <div class="container-fluid">      <div class="container-fluid">

        <div class="row">        <div class="row">

          <div class="col-sm-6">          <div class="col-sm-6">

            <h3 class="mb-0">Dashboard - Land Management Overview</h3>            <h3 class="mb-0">Dashboard - Land Management Overview</h3>

          </div>          </div>

          <div class="col-sm-6">          <div class="col-sm-6">

            <ol class="breadcrumb float-sm-end">            <ol class="breadcrumb float-sm-end">

              <li class="breadcrumb-item">              <li class="breadcrumb-item">

                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>

              </li>              </li>

              <li class="breadcrumb-item active" aria-current="page">Dashboard</li>              <li class="breadcrumb-item active" aria-current="page">Dashboard</li>

            </ol>            </ol>

          </div>          </div>

        </div>        </div>

      </div>      </div>

    </div>    </div>



    <div class="app-content">    <div class="app-content">

      <div class="container-fluid">      <div class="container-fluid">

        <!-- Statistics Cards -->        <!-- Statistics Cards -->

        <div class="row">        <div class="row">

          <div class="col-lg-3 col-6">          <div class="col-lg-3 col-6">

            <div class="small-box bg-info">            <div class="small-box bg-info">

              <div class="inner">              <div class="inner">

                <h3>53<sup style="font-size: 20px">Ha</sup></h3>                <h3>53<sup style="font-size: 20px">Ha</sup></h3>

                <p>Total Area Lahan Vale</p>                <p>Total Area Lahan Vale</p>

              </div>              </div>

              <div class="icon">              <div class="icon">

                <i class="bi bi-geo-alt"></i>                <i class="bi bi-geo-alt"></i>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          <div class="col-lg-3 col-6">          <div class="col-lg-3 col-6">

            <div class="small-box bg-success">            <div class="small-box bg-success">

              <div class="inner">              <div class="inner">

                <h3>15<sup style="font-size: 20px"> Desa</sup></h3>                <h3>15<sup style="font-size: 20px"> Desa</sup></h3>

                <p>Desa Terdampak Project</p>                <p>Desa Terdampak Project</p>

              </div>              </div>

              <div class="icon">              <div class="icon">

                <i class="bi bi-houses"></i>                <i class="bi bi-houses"></i>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          <div class="col-lg-3 col-6">          <div class="col-lg-3 col-6">

            <div class="small-box bg-warning">            <div class="small-box bg-warning">

              <div class="inner">              <div class="inner">

                <h3>8<sup style="font-size: 20px"> Project</sup></h3>                <h3>8<sup style="font-size: 20px"> Project</sup></h3>

                <p>Active Projects</p>                <p>Active Projects</p>

              </div>              </div>

              <div class="icon">              <div class="icon">

                <i class="bi bi-diagram-3"></i>                <i class="bi bi-diagram-3"></i>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          <div class="col-lg-3 col-6">          <div class="col-lg-3 col-6">

            <div class="small-box bg-danger">            <div class="small-box bg-danger">

              <div class="inner">              <div class="inner">

                <h3>78<sup style="font-size: 20px">%</sup></h3>                <h3>78<sup style="font-size: 20px">%</sup></h3>

                <p>Progress Akuisisi</p>                <p>Progress Akuisisi</p>

              </div>              </div>

              <div class="icon">              <div class="icon">

                <i class="bi bi-graph-up"></i>                <i class="bi bi-graph-up"></i>

              </div>              </div>

            </div>            </div>

          </div>          </div>

        </div>        </div>



        <!-- Main Map Section -->        <!-- Main Map Section -->

        <div class="row">        <div class="row">

          <div class="col-12">          <div class="col-12">

            <div class="card">            <div class="card">

              <div class="card-header">              <div class="card-header">

                <h3 class="card-title">                <h3 class="card-title">

                  <i class="bi bi-map"></i> Peta Seluruh Project Vale                  <i class="bi bi-map"></i> Peta Seluruh Project Vale

                </h3>                </h3>

                <div class="card-tools">                <div class="card-tools">

                  <div class="btn-group btn-group-sm me-2">                  <div class="btn-group btn-group-sm me-2">

                    <button                     <button 

                      type="button"                       type="button" 

                      class="btn btn-outline-primary"                      class="btn btn-outline-primary"

                      :class="{ active: mapView === 'all' }"                      :class="{ active: mapView === 'all' }"

                      @click="mapView = 'all'"                      @click="mapView = 'all'"

                    >                    >

                      <i class="bi bi-globe"></i> Semua                      <i class="bi bi-globe"></i> Semua

                    </button>                    </button>

                    <button                     <button 

                      type="button"                       type="button" 

                      class="btn btn-outline-primary"                      class="btn btn-outline-primary"

                      :class="{ active: mapView === 'projects' }"                      :class="{ active: mapView === 'projects' }"

                      @click="mapView = 'projects'"                      @click="mapView = 'projects'"

                    >                    >

                      <i class="bi bi-briefcase"></i> Projects                      <i class="bi bi-briefcase"></i> Projects

                    </button>                    </button>

                    <button                     <button 

                      type="button"                       type="button" 

                      class="btn btn-outline-primary"                      class="btn btn-outline-primary"

                      :class="{ active: mapView === 'villages' }"                      :class="{ active: mapView === 'villages' }"

                      @click="mapView = 'villages'"                      @click="mapView = 'villages'"

                    >                    >

                      <i class="bi bi-house"></i> Desa                      <i class="bi bi-house"></i> Desa

                    </button>                    </button>

                  </div>                  </div>

                  <button type="button" class="btn btn-tool" data-card-widget="collapse">                  <button type="button" class="btn btn-tool" data-card-widget="collapse">

                    <i class="fas fa-minus"></i>                    <i class="fas fa-minus"></i>

                  </button>                  </button>

                  <button type="button" class="btn btn-tool" data-card-widget="maximize">                  <button type="button" class="btn btn-tool" data-card-widget="maximize">

                    <i class="fas fa-expand"></i>                    <i class="fas fa-expand"></i>

                  </button>                  </button>

                </div>                </div>

              </div>              </div>

              <div class="card-body" style="display: block;">              <div class="card-body" style="display: block;">

                <!-- Interactive Map -->                <!-- Interactive Map -->

                <div class="interactive-map-container" style="height: 600px; position: relative;">                <div class="interactive-map-container" style="height: 600px; position: relative;">

                  <!-- Map Canvas -->                  <!-- Map Canvas (akan diisi dengan Leaflet/OpenLayers) -->

                  <div class="map-canvas" style="width: 100%; height: 100%; background: #e5e5e5; border-radius: 8px; position: relative;">                  <div ref="mapContainer" class="map-canvas" style="width: 100%; height: 100%; background: #e5e5e5; border-radius: 8px; position: relative;">

                    <!-- SVG Overlay for demonstration -->                    <!-- SVG Overlay for demonstration -->

                    <svg width="100%" height="100%" style="position: absolute; top: 0; left: 0;">                    <svg width="100%" height="100%" style="position: absolute; top: 0; left: 0;">

                      <!-- Vale's Total Land Area (Big Red Box) -->                      <!-- Vale's Total Land Area (Big Red Box) -->

                      <rect                       <rect 

                        x="10%"                         x="10%" 

                        y="10%"                         y="10%" 

                        width="80%"                         width="80%" 

                        height="80%"                         height="80%" 

                        fill="rgba(220, 53, 69, 0.1)"                         fill="rgba(220, 53, 69, 0.1)" 

                        stroke="rgba(220, 53, 69, 0.8)"                         stroke="rgba(220, 53, 69, 0.8)" 

                        stroke-width="3"                         stroke-width="3" 

                        stroke-dasharray="10,5"                        stroke-dasharray="10,5"

                      />                      />

                      <text x="50%" y="15%" text-anchor="middle" fill="#dc3545" font-weight="bold" font-size="16">                      <text x="50%" y="15%" text-anchor="middle" fill="#dc3545" font-weight="bold" font-size="16">

                        Total Lahan Vale                        Total Lahan Vale

                      </text>                      </text>



                      <!-- Village A -->                      <!-- Village A (Small Red Box) -->

                      <rect                       <rect 

                        x="15%"                         x="15%" 

                        y="20%"                         y="20%" 

                        width="15%"                         width="15%" 

                        height="15%"                         height="15%" 

                        fill="rgba(220, 53, 69, 0.2)"                         fill="rgba(220, 53, 69, 0.2)" 

                        stroke="#dc3545"                         stroke="#dc3545" 

                        stroke-width="2"                        stroke-width="2"

                        class="clickable-area"                        class="clickable-area"

                        @click="showVillageDetail('Desa A')"                        @click="showVillageDetail('Desa A')"

                      />                      />

                      <text x="22.5%" y="27%" text-anchor="middle" fill="#000" font-size="12">Desa A</text>                      <text x="22.5%" y="27%" text-anchor="middle" fill="#000" font-size="12">Desa A</text>

                      <circle cx="18%" cy="24%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa A', 'Rumah 1')" />                      <!-- House points in Desa A -->

                      <circle cx="22%" cy="26%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa A', 'Rumah 2')" />                      <circle cx="18%" cy="24%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa A', 'Rumah 1')" />

                      <circle cx="25%" cy="30%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa A', 'Rumah 3')" />                      <circle cx="22%" cy="26%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa A', 'Rumah 2')" />

                      <circle cx="25%" cy="30%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa A', 'Rumah 3')" />

                      <!-- Village B -->

                      <rect                       <!-- Village B (Small Red Box) -->

                        x="45%"                       <rect 

                        y="25%"                         x="45%" 

                        width="15%"                         y="25%" 

                        height="15%"                         width="15%" 

                        fill="rgba(220, 53, 69, 0.2)"                         height="15%" 

                        stroke="#dc3545"                         fill="rgba(220, 53, 69, 0.2)" 

                        stroke-width="2"                        stroke="#dc3545" 

                        class="clickable-area"                        stroke-width="2"

                        @click="showVillageDetail('Desa B')"                        class="clickable-area"

                      />                        @click="showVillageDetail('Desa B')"

                      <text x="52.5%" y="32%" text-anchor="middle" fill="#000" font-size="12">Desa B</text>                      />

                      <circle cx="48%" cy="29%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa B', 'Rumah 1')" />                      <text x="52.5%" y="32%" text-anchor="middle" fill="#000" font-size="12">Desa B</text>

                      <circle cx="52%" cy="31%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa B', 'Rumah 2')" />                      <!-- House points in Desa B -->

                      <circle cx="55%" cy="35%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa B', 'Rumah 3')" />                      <circle cx="48%" cy="29%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa B', 'Rumah 1')" />

                      <circle cx="52%" cy="31%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa B', 'Rumah 2')" />

                      <!-- Village C -->                      <circle cx="55%" cy="35%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa B', 'Rumah 3')" />

                      <rect 

                        x="65%"                       <!-- Village C (Small Red Box) -->

                        y="50%"                       <rect 

                        width="15%"                         x="65%" 

                        height="15%"                         y="50%" 

                        fill="rgba(220, 53, 69, 0.2)"                         width="15%" 

                        stroke="#dc3545"                         height="15%" 

                        stroke-width="2"                        fill="rgba(220, 53, 69, 0.2)" 

                        class="clickable-area"                        stroke="#dc3545" 

                        @click="showVillageDetail('Desa C')"                        stroke-width="2"

                      />                        class="clickable-area"

                      <text x="72.5%" y="57%" text-anchor="middle" fill="#000" font-size="12">Desa C</text>                        @click="showVillageDetail('Desa C')"

                      <circle cx="68%" cy="54%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa C', 'Rumah 1')" />                      />

                      <circle cx="72%" cy="56%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa C', 'Rumah 2')" />                      <text x="72.5%" y="57%" text-anchor="middle" fill="#000" font-size="12">Desa C</text>

                      <circle cx="75%" cy="60%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa C', 'Rumah 3')" />                      <!-- House points in Desa C -->

                      <circle cx="68%" cy="54%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa C', 'Rumah 1')" />

                      <!-- Village D -->                      <circle cx="72%" cy="56%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa C', 'Rumah 2')" />

                      <rect                       <circle cx="75%" cy="60%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa C', 'Rumah 3')" />

                        x="20%" 

                        y="55%"                       <!-- Village D (Small Red Box) -->

                        width="15%"                       <rect 

                        height="15%"                         x="20%" 

                        fill="rgba(220, 53, 69, 0.2)"                         y="55%" 

                        stroke="#dc3545"                         width="15%" 

                        stroke-width="2"                        height="15%" 

                        class="clickable-area"                        fill="rgba(220, 53, 69, 0.2)" 

                        @click="showVillageDetail('Desa D')"                        stroke="#dc3545" 

                      />                        stroke-width="2"

                      <text x="27.5%" y="62%" text-anchor="middle" fill="#000" font-size="12">Desa D</text>                        class="clickable-area"

                      <circle cx="23%" cy="59%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa D', 'Rumah 1')" />                        @click="showVillageDetail('Desa D')"

                      <circle cx="27%" cy="61%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa D', 'Rumah 2')" />                      />

                      <circle cx="30%" cy="65%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa D', 'Rumah 3')" />                      <text x="27.5%" y="62%" text-anchor="middle" fill="#000" font-size="12">Desa D</text>

                      <!-- House points in Desa D -->

                      <!-- Project Area 1 (Purple) -->                      <circle cx="23%" cy="59%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa D', 'Rumah 1')" />

                      <rect                       <circle cx="27%" cy="61%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa D', 'Rumah 2')" />

                        x="35%"                       <circle cx="30%" cy="65%" r="3" fill="#000" class="house-point" @click="showHouseDetail('Desa D', 'Rumah 3')" />

                        y="35%" 

                        width="20%"                       <!-- Project Area 1 (Purple Box) -->

                        height="12%"                       <rect 

                        fill="rgba(128, 0, 128, 0.25)"                         x="35%" 

                        stroke="#800080"                         y="35%" 

                        stroke-width="2"                        width="20%" 

                        class="clickable-area"                        height="12%" 

                        @click="showProjectDetail('Project Alpha')"                        fill="rgba(128, 0, 128, 0.25)" 

                      />                        stroke="#800080" 

                      <text x="45%" y="41%" text-anchor="middle" fill="#800080" font-weight="bold" font-size="13">Project Alpha</text>                        stroke-width="2"

                        class="clickable-area"

                      <!-- Project Area 2 (Purple) -->                        @click="showProjectDetail('Project Alpha')"

                      <rect                       />

                        x="40%"                       <text x="45%" y="41%" text-anchor="middle" fill="#800080" font-weight="bold" font-size="13">Project Alpha</text>

                        y="60%" 

                        width="18%"                       <!-- Project Area 2 (Purple Box) -->

                        height="15%"                       <rect 

                        fill="rgba(128, 0, 128, 0.25)"                         x="40%" 

                        stroke="#800080"                         y="60%" 

                        stroke-width="2"                        width="18%" 

                        class="clickable-area"                        height="15%" 

                        @click="showProjectDetail('Project Beta')"                        fill="rgba(128, 0, 128, 0.25)" 

                      />                        stroke="#800080" 

                      <text x="49%" y="67%" text-anchor="middle" fill="#800080" font-weight="bold" font-size="13">Project Beta</text>                        stroke-width="2"

                    </svg>                        class="clickable-area"

                  </div>                        @click="showProjectDetail('Project Beta')"

                                        />

                  <!-- Legend -->                      <text x="49%" y="67%" text-anchor="middle" fill="#800080" font-weight="bold" font-size="13">Project Beta</text>

                  <div class="map-legend">                    </svg>

                    <h6><i class="bi bi-info-circle"></i> Keterangan</h6>                  </div>

                    <div class="legend-item">                  

                      <div class="legend-color" style="border: 2px dashed #dc3545; background: rgba(220, 53, 69, 0.1);"></div>                  <!-- Legend -->

                      <span>Total Lahan Vale</span>                  <div class="map-legend">

                    </div>                    <h6><i class="bi bi-info-circle"></i> Keterangan</h6>

                    <div class="legend-item">                    <div class="legend-item">

                      <div class="legend-color" style="border: 2px solid #dc3545; background: rgba(220, 53, 69, 0.2);"></div>                      <div class="legend-color" style="border: 2px dashed #dc3545; background: rgba(220, 53, 69, 0.1);"></div>

                      <span>Desa Terdampak</span>                      <span>Total Lahan Vale</span>

                    </div>                    </div>

                    <div class="legend-item">                    <div class="legend-item">

                      <div class="legend-color" style="border: 2px solid #800080; background: rgba(128, 0, 128, 0.25);"></div>                      <div class="legend-color" style="border: 2px solid #dc3545; background: rgba(220, 53, 69, 0.2);"></div>

                      <span>Area Project</span>                      <span>Desa Terdampak</span>

                    </div>                    </div>

                    <div class="legend-item">                    <div class="legend-item">

                      <div class="legend-color" style="background: #000; border-radius: 50%; width: 12px; height: 12px;"></div>                      <div class="legend-color" style="border: 2px solid #800080; background: rgba(128, 0, 128, 0.25);"></div>

                      <span>Titik Rumah</span>                      <span>Area Project</span>

                    </div>                    </div>

                  </div>                    <div class="legend-item">

                </div>                      <div class="legend-color" style="background: #000; border-radius: 50%; width: 12px; height: 12px;"></div>

              </div>                      <span>Titik Rumah</span>

            </div>                    </div>

          </div>                  </div>

        </div>                </div>

              </div>

        <!-- Detail Panel -->            </div>

        <div v-if="selectedDetail" class="row mt-3">          </div>

          <div class="col-12">        </div>

            <div class="card">

              <div class="card-header bg-primary">        <!-- Detail Panel -->

                <h3 class="card-title text-white">        <div v-if="selectedDetail" class="row mt-3">

                  <i class="bi bi-info-circle-fill"></i> {{ selectedDetail.title }}          <div class="col-12">

                </h3>            <div class="card">

                <div class="card-tools">              <div class="card-header bg-primary">

                  <button type="button" class="btn btn-tool text-white" @click="selectedDetail = null">                <h3 class="card-title text-white">

                    <i class="fas fa-times"></i>                  <i class="bi bi-info-circle-fill"></i> {{ selectedDetail.title }}

                  </button>                </h3>

                </div>                <div class="card-tools">

              </div>                  <button type="button" class="btn btn-tool text-white" @click="selectedDetail = null">

              <div class="card-body">                    <i class="fas fa-times"></i>

                <div class="row">                  </button>

                  <div class="col-md-6">                </div>

                    <table class="table table-sm">              </div>

                      <tbody>              <div class="card-body">

                        <tr v-for="(value, key) in selectedDetail.data" :key="key">                <div class="row">

                          <td class="fw-bold" style="width: 40%;">{{ key }}</td>                  <div class="col-md-6">

                          <td>{{ value }}</td>                    <table class="table table-sm">

                        </tr>                      <tbody>

                      </tbody>                        <tr v-for="(value, key) in selectedDetail.data" :key="key">

                    </table>                          <td class="fw-bold" style="width: 40%;">{{ key }}</td>

                  </div>                          <td>{{ value }}</td>

                  <div class="col-md-6">                        </tr>

                    <div v-if="selectedDetail.type === 'village'" class="alert alert-info">                      </tbody>

                      <i class="bi bi-lightbulb"></i> <strong>Info:</strong> Desa ini merupakan bagian dari Asset Inventory dengan {{ selectedDetail.houseCount }} titik rumah yang tercatat.                    </table>

                    </div>                  </div>

                    <div v-if="selectedDetail.type === 'project'" class="alert alert-warning">                  <div class="col-md-6">

                      <i class="bi bi-exclamation-triangle"></i> <strong>Project Info:</strong> Area ini sedang dalam tahap {{ selectedDetail.status }}.                    <div v-if="selectedDetail.type === 'village'" class="alert alert-info">

                    </div>                      <i class="bi bi-lightbulb"></i> <strong>Info:</strong> Desa ini merupakan bagian dari Asset Inventory dengan {{ selectedDetail.houseCount }} titik rumah yang tercatat.

                    <div v-if="selectedDetail.type === 'house'" class="alert alert-success">                    </div>

                      <i class="bi bi-house-check"></i> <strong>Rumah:</strong> Data detail kepemilikan dan status negosiasi tersedia di Land Acquisition module.                    <div v-if="selectedDetail.type === 'project'" class="alert alert-warning">

                    </div>                      <i class="bi bi-exclamation-triangle"></i> <strong>Project Info:</strong> Area ini sedang dalam tahap {{ selectedDetail.status }}.

                  </div>                    </div>

                </div>                    <div v-if="selectedDetail.type === 'house'" class="alert alert-success">

              </div>                      <i class="bi bi-house-check"></i> <strong>Rumah:</strong> Data detail kepemilikan dan status negosiasi tersedia di Land Acquisition module.

            </div>                    </div>

          </div>                  </div>

        </div>                </div>

              </div>

        <!-- Quick Stats -->            </div>

        <div class="row mt-3">          </div>

          <div class="col-md-3">        </div>

            <div class="info-box">

              <span class="info-box-icon bg-info"><i class="bi bi-file-earmark-text"></i></span>        <!-- Quick Stats -->

              <div class="info-box-content">        <div class="row mt-3">

                <span class="info-box-text">Asset Inventory</span>          <div class="col-md-3">

                <span class="info-box-number">156 Parcels</span>            <div class="info-box">

              </div>              <span class="info-box-icon bg-info"><i class="bi bi-file-earmark-text"></i></span>

            </div>              <div class="info-box-content">

          </div>                <span class="info-box-text">Asset Inventory</span>

          <div class="col-md-3">                <span class="info-box-number">156 Parcels</span>

            <div class="info-box">              </div>

              <span class="info-box-icon bg-success"><i class="bi bi-check-circle"></i></span>            </div>

              <div class="info-box-content">          </div>

                <span class="info-box-text">Land Bebas</span>          <div class="col-md-3">

                <span class="info-box-number">78 Parcels</span>            <div class="info-box">

              </div>              <span class="info-box-icon bg-success"><i class="bi bi-check-circle"></i></span>

            </div>              <div class="info-box-content">

          </div>                <span class="info-box-text">Land Bebas</span>

          <div class="col-md-3">                <span class="info-box-number">78 Parcels</span>

            <div class="info-box">              </div>

              <span class="info-box-icon bg-warning"><i class="bi bi-clock-history"></i></span>            </div>

              <div class="info-box-content">          </div>

                <span class="info-box-text">Dalam Negosiasi</span>          <div class="col-md-3">

                <span class="info-box-number">45 Parcels</span>            <div class="info-box">

              </div>              <span class="info-box-icon bg-warning"><i class="bi bi-clock-history"></i></span>

            </div>              <div class="info-box-content">

          </div>                <span class="info-box-text">Dalam Negosiasi</span>

          <div class="col-md-3">                <span class="info-box-number">45 Parcels</span>

            <div class="info-box">              </div>

              <span class="info-box-icon bg-danger"><i class="bi bi-exclamation-triangle"></i></span>            </div>

              <div class="info-box-content">          </div>

                <span class="info-box-text">Litigasi</span>          <div class="col-md-3">

                <span class="info-box-number">12 Cases</span>            <div class="info-box">

              </div>              <span class="info-box-icon bg-danger"><i class="bi bi-exclamation-triangle"></i></span>

            </div>              <div class="info-box-content">

          </div>                <span class="info-box-text">Litigasi</span>

        </div>                <span class="info-box-number">12 Cases</span>

      </div>              </div>

    </div>            </div>

  </div>          </div>

</template>        </div>

      </div>

<script setup lang="ts">    </div>

import { ref } from 'vue'  </div>

</template>

const mapView = ref<'all' | 'projects' | 'villages'>('all')

<script setup lang="ts">

interface DetailData {import { ref } from 'vue'

  title: string

  type: 'village' | 'project' | 'house'const mapView = ref<'all' | 'projects' | 'villages'>('all')

  data: Record<string, string | number>const mapContainer = ref<HTMLDivElement | null>(null)

  houseCount?: number

  status?: stringinterface DetailData {

}  title: string

  type: 'village' | 'project' | 'house'

const selectedDetail = ref<DetailData | null>(null)  data: Record<string, string | number>

  houseCount?: number

const showVillageDetail = (villageName: string) => {  status?: string

  selectedDetail.value = {}

    title: villageName,

    type: 'village',const selectedDetail = ref<DetailData | null>(null)

    houseCount: 45,

    data: {const showVillageDetail = (villageName: string) => {

      'Nama Desa': villageName,  selectedDetail.value = {

      'Kecamatan': 'Kecamatan A',    title: villageName,

      'Jumlah KK Terdampak': '45 KK',    type: 'village',

      'Luas Area': '12.5 Ha',    houseCount: 45,

      'Status': 'Dalam Proses Akuisisi',    data: {

      'Total Rumah': '45 Unit',      'Nama Desa': villageName,

      'Sudah Dibebaskan': '28 Unit',      'Kecamatan': 'Kecamatan A',

      'Dalam Negosiasi': '12 Unit',      'Jumlah KK Terdampak': '45 KK',

      'Belum Diproses': '5 Unit'      'Luas Area': '12.5 Ha',

    }      'Status': 'Dalam Proses Akuisisi',

  }      'Total Rumah': '45 Unit',

}      'Sudah Dibebaskan': '28 Unit',

      'Dalam Negosiasi': '12 Unit',

const showProjectDetail = (projectName: string) => {      'Belum Diproses': '5 Unit'

  selectedDetail.value = {    }

    title: projectName,  }

    type: 'project',}

    status: 'Land Acquisition',

    data: {const showProjectDetail = (projectName: string) => {

      'Nama Project': projectName,  selectedDetail.value = {

      'Tahun': '2024-2025',    title: projectName,

      'Luas Total': '25 Ha',    type: 'project',

      'Progress': '78%',    status: 'Land Acquisition',

      'Budget': 'Rp 15.000.000.000',    data: {

      'Desa Terdampak': '4 Desa',      'Nama Project': projectName,

      'Total Parcels': '67 Parcels',      'Tahun': '2024-2025',

      'Status': 'On Progress'      'Luas Total': '25 Ha',

    }      'Progress': '78%',

  }      'Budget': 'Rp 15.000.000.000',

}      'Desa Terdampak': '4 Desa',

      'Total Parcels': '67 Parcels',

const showHouseDetail = (villageName: string, houseName: string) => {      'Status': 'On Progress'

  selectedDetail.value = {    }

    title: `${houseName} - ${villageName}`,  }

    type: 'house',}

    data: {

      'Lokasi': villageName,const showHouseDetail = (villageName: string, houseName: string) => {

      'Nama Pemilik': 'Budi Santoso',  selectedDetail.value = {

      'NIK': '7371xxxxxxxxxx',    title: `${houseName} - ${villageName}`,

      'Luas Tanah': '500 m²',    type: 'house',

      'Luas Bangunan': '120 m²',    data: {

      'Status Sertifikat': 'SHM',      'Lokasi': villageName,

      'Nomor Sertifikat': 'SHM-123/2020',      'Nama Pemilik': 'Budi Santoso',

      'Status Negosiasi': 'Dalam Proses',      'NIK': '7371xxxxxxxxxx',

      'Penawaran Terakhir': 'Rp 450.000.000'      'Luas Tanah': '500 m²',

    }      'Luas Bangunan': '120 m²',

  }      'Status Sertifikat': 'SHM',

}      'Nomor Sertifikat': 'SHM-123/2020',

</script>      'Status Negosiasi': 'Dalam Proses',

      'Penawaran Terakhir': 'Rp 450.000.000'

<style scoped>    }

.clickable-area {  }

  cursor: pointer;}

  transition: opacity 0.2s;</script>

}

<style scoped>

.clickable-area:hover {              <div class="card-header">

  opacity: 0.7;                <h3 class="card-title">Lahan Di Bebaskan</h3>

}                <div class="card-tools">

                  <button type="button" class="btn btn-tool" data-card-widget="collapse">

.house-point {                    <i class="fas fa-minus"></i>

  cursor: pointer;                  </button>

  transition: all 0.2s;                  <button type="button" class="btn btn-tool" data-card-widget="remove">

}                    <i class="fas fa-times"></i>

                  </button>

.house-point:hover {                </div>

  r: 5;              </div>

  fill: #0066cc;              <div class="card-body" style="display: block">

}                <div class="chart">

                  <canvas

.map-legend {                    ref="barChart2"

  position: absolute;                    style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%"

  bottom: 20px;                  ></canvas>

  left: 20px;                </div>

  background: white;              </div>

  padding: 15px;            </div>

  border-radius: 8px;          </div>

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  z-index: 1000;          <div class="col-md-6">

  max-width: 250px;            <div class="card card">

}              <div class="card-header">

                <h3 class="card-title">Total Biaya</h3>

.map-legend h6 {                <div class="card-tools">

  margin-bottom: 10px;                  <button type="button" class="btn btn-tool" data-card-widget="collapse">

  font-weight: 600;                    <i class="fas fa-minus"></i>

  font-size: 14px;                  </button>

}                  <button type="button" class="btn btn-tool" data-card-widget="remove">

                    <i class="fas fa-times"></i>

.legend-item {                  </button>

  display: flex;                </div>

  align-items: center;              </div>

  margin-bottom: 8px;              <div class="card-body" style="display: block">

  font-size: 13px;                <div class="chart">

}                  <canvas

                    ref="barChart3"

.legend-item:last-child {                    style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%"

  margin-bottom: 0;                  ></canvas>

}                </div>

              </div>

.legend-color {            </div>

  width: 20px;          </div>

  height: 20px;

  margin-right: 10px;          <div class="col-md-6">

  border-radius: 3px;            <div class="card card">

  flex-shrink: 0;              <div class="card-header">

}                <h3 class="card-title">Grand Total</h3>

</style>                <div class="card-tools">

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
