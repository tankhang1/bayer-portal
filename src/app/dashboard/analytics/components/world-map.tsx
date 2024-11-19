"use client";

import React from "react";

// @react-jvectormap
import { VectorMap } from "@react-jvectormap/core";
import { worldMerc } from "@react-jvectormap/world";

// Sales by country data
const MAP_CONFIG = {
  map: worldMerc,
  zoomOnScroll: false,
  zoomButtons: false,
  markersSelectable: true,
  backgroundColor: "transparent",
  selectedMarkers: ["0"],
  markers: [
    {
      name: "Vietnam",
      latLng: [14.058324, 108.277199], // Coordinates for Vietnam
    },
  ],
  regionStyle: {
    initial: {
      fill: "#dee2e7",
      "fill-opacity": 1,
      stroke: "none",
      "stroke-width": 0,
      "stroke-opacity": 0,
    },
  },
  markerStyle: {
    initial: {
      fill: "#000",
      stroke: "#ffffff",
      "stroke-width": 5,
      "stroke-opacity": 0.5,
      r: 7,
    },
    hover: {
      fill: "#000",
      stroke: "#ffffff",
      "stroke-width": 5,
      "stroke-opacity": 0.5,
    },
    selected: {
      fill: "#000",
      stroke: "#ffffff",
      "stroke-width": 5,
      "stroke-opacity": 0.5,
    },
  },
  focusOn: {
    region: "VN", // ISO code for Vietnam
    scale: 5, // Adjust zoom level for Vietnam
    x: 0.5,
    y: 0.5,
    animate: true,
  },

  onRegionTipShow: () => false,
  onMarkerTipShow: () => false,
};

type Props = {};

export default function WorldMap({}: Props) {
  return (
    <div className="tw-mt-12 tw-h-full tw-min-h-max lg:-tw-mt-24">
      <VectorMap {...MAP_CONFIG} className="tw-col-span-1 !tw-h-72 tw-w-full" />
    </div>
  );
}
