import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// simpan reference layer terakhir
let wmsLayers = [];

export async function addWms(map, projectId) {
  const apiUrl = import.meta.env.VITE_APP_API_SPATIAL_URL;
  const gsUrl = import.meta.env.VITE_APP_API_GS_URL;

  try {
    // Hapus semua layer sebelumnya
    if (wmsLayers.length > 0) {
      wmsLayers.forEach((layer) => map.removeLayer(layer));
      wmsLayers = [];
    }

    const res = await axios.get(`${apiUrl}/Project/${projectId}`);
    const data = res.data;
    const resGeom = await axios.get(`${gsUrl}/wfs`, {
      params: {
        service: "WFS",
        version: "1.1.0",
        request: "GetFeature",
        typeName: "vector_valemis:tbl_project",
        outputFormat: "application/json",
        featureId: `${projectId}`,
      },
    });

    const geojson = resGeom.data;

    // Hitung bounds

    // Tambahkan layer baru
    if (data.basemap) {
      const basemapLayer = L.tileLayer
        .wms(`${gsUrl}/raster_valemis/wms`, {
          layers: `raster_valemis:${data.basemap}`,
          format: "image/png",
          transparent: true,
          version: "1.1.0",
        })
        .addTo(map);
      wmsLayers.push(basemapLayer);
    }

    if (data.batas_admin) {
      const batasLayer = L.tileLayer
        .wms(`${gsUrl}/vector_valemis/wms`, {
          layers: `vector_valemis:${data.batas_admin}`,
          format: "image/png",
          transparent: true,
          version: "1.1.0",
          styles: "Style Batas Desa",
        })
        .addTo(map);
      wmsLayers.push(batasLayer);
    }

    if (data.iupk) {
      const iupkLayer = L.tileLayer
        .wms(`${gsUrl}/vector_valemis/wms`, {
          layers: `vector_valemis:${data.iupk}`,
          format: "image/png",
          transparent: true,
          version: "1.1.0",
          styles: "sld_iupk_3",
        })
        .addTo(map);
      wmsLayers.push(iupkLayer);
    }
    const features = geojson.features;
    if (features.length > 0) {
      const layer = L.geoJSON(geojson, {
        style: {
          color: "red", // outline color
          weight: 3, // ketebalan garis
          opacity: 1, // opacity garis
          fillColor: "red", // warna fill
          fillOpacity: 0, // transparan
        },
      });
      layer.addTo(map);
      const bounds = layer.getBounds(); // L.LatLngBounds
      map.fitBounds(bounds); // zoom map ke layer
    }
    return wmsLayers; // reference semua layer
  } catch (err) {
    console.error("Failed to add WMS layers:", err);
    return null;
  }
}
