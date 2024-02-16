"use client";

import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const AreaChart = () => {
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

    colors: ["#E37A59", "#FFF"],
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
        show: true,

        style: {
          colors: "#fff",
        },
      },
    },

    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
      show: false,
    },

    fill: {
      colors: ["#E37A59", "#FFF"],
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
    series: [
      {
        name: "2023",
        data: [31, 40, 28, 51, 42, 79, 70, 20, 40 ,10, 40, 50 ],
      },
      {
        name: "2024",
        data: [21, 40, 27, 54, 41, 69, 50, 15, 40 ,12, 45, 30 ],
      },
    ],
  };

  return (
    <div className="border border-muted rounded-md  gap-10 w-full">
      <Chart
        options={options}
        series={options.series}
        width={"100%"}
        height={350}
        type="area"
      />
    </div>
  );
};
