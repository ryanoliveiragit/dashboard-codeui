import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Google",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Youtube",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Instagram",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Pinterest",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Facebook",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
  {
    name: "Twitter",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

export const VerticalBar = () => {
  return (
    <div>
      <ResponsiveContainer width={"100%"} height={300} className="mt-10">
        <ComposedChart
          layout="vertical"
          width={400}
     
          data={data}
          margin={{
            top: 20,
            right: 10,
            bottom: 0,  
            left: 20,  // Ajuste da posição do eixo Y
          }}
        >
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" scale="band" />
          <Bar dataKey="pv" fill="#baedbd" barSize={20} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
