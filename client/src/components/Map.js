import React, { useRef, useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";

function Map(){
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  return <ReactMapGL
  mapStyle="mapbox://styles/mapbox/streets-v11"
  mapboxAccessToken='pk.eyJ1Ijoia2V3YWxkZWxoaXdhbGEiLCJhIjoiY2t6OGgxcXVqMHZmdjJ2czh1OWljYjNscCJ9.Xssyc6T_KwRT3Gjbb_X9Qw'
  {...viewport}
  >

  </ReactMapGL>;
}

export default Map;

