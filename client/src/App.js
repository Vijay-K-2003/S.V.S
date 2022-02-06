import React, { useRef, useEffect, useState } from "react";
// import Map from "./components/Map.js";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1Ijoia2V3YWxkZWxoaXdhbGEiLCJhIjoiY2t6OGgxcXVqMHZmdjJ2czh1OWljYjNscCJ9.Xssyc6T_KwRT3Gjbb_X9Qw';



function App() {
  const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);

useEffect(() => {
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lng, lat],
  zoom: zoom
  });
  });
  
  return (
    <div>
    <div ref={mapContainer} className="map-container" />
    </div>
    );

  }
export default App;
  