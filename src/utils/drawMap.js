/* ==========================================
   LeafletMultiPolygonWKT
   Author: you
   Purpose:
   - Collect Polygon from Leaflet-Geoman
   - Build MultiPolygon
   - Export as WKT
========================================== */

class LeafletMultiPolygonWKT {
  constructor(map) {
    if (!map) throw new Error("Map instance required");
    this.map = map;
    this.polygons = [];
    this._bindEvents();
  }

  /* ===========================
     EVENT BINDING
  ============================ */
  _bindEvents() {
    this.map.on("pm:create", (e) => {
      const gj = e.layer.toGeoJSON();

      if (gj.geometry.type !== "Polygon") {
        this.map.removeLayer(e.layer);
        return;
      }

      e.layer._mpwkt_id = crypto.randomUUID();
      gj.properties._mpwkt_id = e.layer._mpwkt_id;

      this.polygons.push(gj);
    });

    this.map.on("pm:remove", (e) => {
      const id = e.layer._mpwkt_id;
      if (!id) return;

      this.polygons = this.polygons.filter(
        (p) => p.properties._mpwkt_id !== id
      );
    });

    this.map.on("pm:edit", (e) => {
      e.layer.eachLayer?.((layer) => this._update(layer)) ||
        this._update(e.layer);
    });
  }

  _update(layer) {
    const gj = layer.toGeoJSON();
    const id = layer._mpwkt_id;
    if (!id) return;

    const idx = this.polygons.findIndex((p) => p.properties._mpwkt_id === id);

    if (idx !== -1) {
      gj.properties._mpwkt_id = id;
      this.polygons[idx] = gj;
    }
  }

  /* ===========================
     BUILD MULTIPOLYGON
  ============================ */
  toMultiPolygonGeoJSON() {
    if (this.polygons.length === 0) return null;

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiPolygon",
        coordinates: this.polygons.map((p) => p.geometry.coordinates),
      },
    };
  }

  /* ===========================
     GEOJSON → WKT
  ============================ */
  toWKT() {
    const mp = this.toMultiPolygonGeoJSON();
    if (!mp) return null;

    const ringToWKT = (ring) =>
      "(" + ring.map((p) => `${p[0]} ${p[1]}`).join(", ") + ")";

    const polyToWKT = (poly) => "(" + poly.map(ringToWKT).join(", ") + ")";

    const wktPolys = mp.geometry.coordinates.map(polyToWKT).join(", ");

    return `MULTIPOLYGON(${wktPolys})`;
  }

  /* ===========================
     UTIL
  ============================ */
  clear() {
    this.polygons = [];
  }

  count() {
    return this.polygons.length;
  }
}

// export global
window.LeafletMultiPolygonWKT = LeafletMultiPolygonWKT;
// export { LeafletMultiPolygonWKT };
