"use client";

import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const BarChart = () => {
  var options: ApexOptions = {
    subtitle: {
      text: `Tráfego por localização`,

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
      offsetX: 220,
      offsetY: 25,
      floating: false,
      style: {
        fontSize: "12px",
        fontWeight: "semi-bold",
        color: "#c1c1c1",
      },
    },
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],

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
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,

      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,

        style: {
          colors: "#fff",
        },
      },
    },
    
    tooltip: {
      theme: "dark",
    },
    
    xaxis: {

      labels: {
      
        show: true,
        style: {
          colors: "#fff",
        },
      },
      
      categories: [
        "SP",
        "RJ",
        "MG",
        "BA",
        "RS",
        "PR",
        "PE",
        "CE",
        "GO",
        "PA",
        "SC",
        "MA",
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
            colorFrom: "#fff",
            colorTo: "#E37A59",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: false,
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
  };

  return (
    <div className="border border-muted rounded-md  gap-10 w-full">
      <Chart
        options={options}
        series={options.series}
        width={'100%'}
        height={350}
        type="bar"
      />
    </div>
  );
};
