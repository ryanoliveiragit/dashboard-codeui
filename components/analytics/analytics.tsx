import { RenderLineChart } from "@/shared/graphcs/charts/line";
import React from "react";
import { FaCircle } from "react-icons/fa";

import { DatePickerWithRange } from "../data-range/data-range";
import { VerticalBar } from "@/shared/graphcs/charts/verticalBar";
import { BarChartGraphc } from "@/shared/graphcs/charts/bar";
import { PieGraphc } from "@/shared/graphcs/charts/pie";


export const AnalyticsContent = () => {
  return (
    <section className="grid grid-cols-3 grid-rows-2 gap-4 overflow-x-auto">
      <div className="border rounded-md  bg-accent border-accent lg:col-span-3 md:col-span-3 fscreen:col-span-2 md:cols-span-3">
        <header className="p-4 flex-1">
          <ul className="flex w-full flex-1 justify-between items-center">
            <div className="flex flex-row gap-8">
              <li className="text-md font-semibold">Total de visualizações</li>
              <li className="text-md font-normal text-muted-foreground">
                Visitas
              </li>
              <li className="text-md font-normal text-muted-foreground">
                Rejeição
              </li>
              <div className="flex gap-5 items-center">
                <div className="border-l border-muted-foreground h-5"></div>
                <span className="flex gap-2 items-center">
                  <FaCircle fill="#baedbd" size={10} /> 2023
                </span>
                <span className="flex gap-2 items-center">
                  <FaCircle fill="#95a4fc" size={10} /> 2024
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <DatePickerWithRange />
            </div>
          </ul>
        </header>
        <RenderLineChart />
      </div>
      <div className="rounded-md bg-accent p-4 md:col-span-2 fscreen:col-span-1 lg:col-span-2 xl:col-span-2">
        <header>
          <ul className="flex justify-between items-center">
            <li className="text-md font-semibold">Tráfego por site</li>
            <div className="flex gap-2">
              <DatePickerWithRange />
            </div>
          </ul>
        </header>
        <VerticalBar />
      </div>
     
      <div className="rounded-md bg-accent p-4 lg:col-span-1 fscreen:col-span-1 md:col-span-1 xl:col-span-1">
        <header>
          <ul className="flex justify-between items-center">
            <li className="text-md font-semibold">Tráfego por localização</li>
            <div className="flex gap-2">
              <DatePickerWithRange />
            </div>
          </ul>
        </header>
        <div className="rounded-md bg-accent p-4">
        <PieGraphc />
      </div>
      </div>

      <div className="border rounded-md bg-accent  border-accent lg:col-span-3 md:col-span-3  fscreen:col-span-2 md:cols-span-3">
        <header className="p-4 flex-1">
          <ul className="flex w-full flex-1 justify-between items-center">
            <div className="flex flex-row gap-8">
              <li className="text-md font-semibold">Tipos de sistema</li>
              <div className="flex gap-5 items-center">
                <div className="border-l border-muted-foreground h-5"></div>
                <span className="flex gap-2 items-center">
                  <FaCircle fill="#baedbd" size={10} /> 2023
                </span>
                <span className="flex gap-2 items-center">
                  <FaCircle fill="#95a4fc" size={10} /> 2024
                </span>
              </div>
            </div>

            <div className="flex gap-2 h-full">
              <DatePickerWithRange />
            </div>
          </ul>
        </header>
        <BarChartGraphc />
      </div>


    </section>
  );
};
