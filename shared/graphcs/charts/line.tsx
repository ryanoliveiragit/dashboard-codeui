import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";


const data = [
  {
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const AreaGraph = () => {
  return (
    <div>
      <h1>Customer Satisfaction</h1>
      <ResponsiveContainer width="100%" height="41%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <Tooltip />
          <defs>
            <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 157, 255, 0.32)" />
              <stop offset="100%" stopColor="rgba(0, 149, 255, 0)" />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#8884d8"
            fill="url(#gradientFill)"
          />
          <defs>
            <linearGradient id="gradientFillTwo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 224, 150, 0.33)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke="#82ca9d"
            fill="url(#gradientFillTwo)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <hr />
    </div>
  );
};