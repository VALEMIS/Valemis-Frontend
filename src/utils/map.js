import wellknown from "wellknown";

export function wktToLayer(wkt) {
  const wktClean = wkt.replace(/^SRID=\d+;/, "");

  const geojson = wellknown.parse(wktClean);

  const layer = L.geoJSON(geojson);
  return layer;
}

export function wktToGeojson(wkt) {
  const wktClean = wkt.replace(/^SRID=\d+;/, "");

  const geojson = wellknown.parse(wktClean);
  return geojson;
}
