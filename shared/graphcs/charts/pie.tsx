import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, LabelList } from "recharts";

const data = [
  { name: "SP", value: 100 },
  { name: "RJ", value: 200 },
  { name: "MG", value: 150 },
  { name: "AM", value: 150 },

];

export const PieGraphc = () => {
  const COLORS = [
    "#95a4fc",
    "#baedbd",
    "#cfcbad",
    "#edc8cd",

  ];

  return (
    <ResponsiveContainer width={"100%"} height={250} className="mt-20">
      <PieChart width={200} height={100}>
        <Pie
          dataKey="value"
          startAngle={360}
          endAngle={0}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          <LabelList
            dataKey="name"
stroke="#262626"
            fontWeight={200}
            fontSize={14}
          />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
