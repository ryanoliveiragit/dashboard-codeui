"use client";

import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
import { BarChart } from "./barChart";
import { AreaChart } from "./areaChart";
import { BarTwoChart } from "./pollarChart";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  subtitle: {
    text: "Total de visualizações",

    align: "left",
    offsetX: 10,
    offsetY: 20,
    floating: false,
    style: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#fff",
    },
  },
  title: {
    text: `(mensal)`,
    align: "left",
    offsetX: 210,
    offsetY: 25,
    floating: false,
    style: {
      fontSize: "12px",
      fontWeight: "semi-bold",
      color: "#c1c1c1",
    },
  },
  chart: {
    toolbar: {
      show: false,
    },
    height: 350,
    zoom: {
      enabled: true,
    },
    foreColor: "",
  },

  colors: ["#E37A59"],
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    labels: {
      show: true,

      style: {
        colors: "#fff",
      },
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
          colorFrom: "#E37A59",
          colorTo: "#E37A59",
          stops: [0, 100],
          opacityFrom: 5,
          opacityTo: 0.1,
        },
      },
    },
  },
  yaxis: {
    show: true,
    labels: {
      style: {
        colors: "#fff",
      },
    },
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
    colors: ["#E37A59"],
    type: "gradient",
    gradient: {
      gradientToColors: ["#E37A59"],
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
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-muted rounded-md">
        <AreaChart />
      </div>
      <div className="border border-muted rounded-md">
        <BarTwoChart />
      </div>
      <div className="border border-muted rounded-md">
        <BarChart />
      </div>
      <div className="border border-muted rounded-md">
        <Chart
          options={options}
          series={series}
          width={`100%`}
          height={350}
          type="area"
        />
      </div>
    </section>
  );
};
