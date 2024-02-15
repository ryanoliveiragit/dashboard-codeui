"use client";

import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  
  subtitle: {
    text: `Total de visualizações`,

    align: 'left',
    margin: 30,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize:  '16px',
      fontWeight:  'bold',
      color:  '#fff'
    },
},
  title: {
    text: `(anual)`,
    align: 'left',
    margin: 40,
    offsetX: 175,
    offsetY: 0,
    floating: false,
    style: {
      fontSize:  '12px',
      fontWeight:  'semi-bold',
      color:  '#c1c1c1'
    },
},
  chart: {
    toolbar: {
      show: false
    },
    height: 350,
    zoom: {
      enabled: true,
    },
    foreColor: "",
  },

  colors: ["#a0cf90"],
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    labels: {
      show: false,
    },
    categories: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],

    position: "bottom",

    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
  },
  yaxis: {
    show: false,
  },

  grid: {
    yaxis: {
      lines: {
        show: false,
      },
    },
    show: false,
  },

  fill: {
    colors: ["#a0cf90"],
    type: "gradient",
    gradient: {
      gradientToColors: ["#151515"],
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.0,
      stops: [0, 90, 100],
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
};
const series = [
  {
    name: "Views",
    data: [41, 55, 29, 67, 38, 72, 45, 61, 33, 49, 27, 59],
  },
];

export const AnalyticsContent = () => {
  return (
    <div className="border border-muted rounded-md max-w-[500px]">
      <Chart
        options={options}
        series={series}
        width={500}
        height={200}
        type="area"
      />
    </div>
  );
};
