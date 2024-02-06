import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Fev",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Abr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Mai",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Julh",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Ago",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Set",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Out",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Dez",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export const RenderLineChart = () => (
  <div>
    <section>
      <ResponsiveContainer width={"100%"} height={250} className="mt-10">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />

          <Line type="natural" dataKey="pv" stroke="#95a4fc" strokeWidth={3} />
          <Line type="natural" dataKey="uv" stroke="#baedbd" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  </div>
);
