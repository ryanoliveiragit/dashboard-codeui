import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";

const data = [
  {
    name: 'Windowns',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Linux',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mac',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'IOS',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Android',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

export const BarChartGraphc = () => {
  return (
    <div>

        <ResponsiveContainer width={"100%"} height={250} className="mt-10">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#baedbd"  className='hidden'/>
            <Bar yAxisId="left" dataKey="pv" fill="#baedbd" />
            <Bar yAxisId="right" dataKey="uv" fill="#95a4fc" />
          </BarChart>
        </ResponsiveContainer>
    
    </div>
  );
}
