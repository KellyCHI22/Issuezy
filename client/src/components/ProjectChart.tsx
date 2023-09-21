import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#dbc9fa",
  "#b18af4",
  "#925bf0",
  "#732dec",
  "#5a13d2",
  "#460fa4",
  "#320b75",
  "#1e0646",
];

const data = [
  { name: "Group A", value: 400, fill: COLORS[0] },
  { name: "Group B", value: 300, fill: COLORS[1] },
  { name: "Group C", value: 300, fill: COLORS[2] },
  { name: "Group D", value: 200, fill: COLORS[3] },
];

const renderColorfulLegendText = (value: string, entry: any) => {
  return <span>{value}</span>;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="opacity-80"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export function ProjectChart() {
  return (
    <ResponsiveContainer width="100%" height={300} className="">
      <PieChart>
        <Legend
          height={36}
          width={150}
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconSize={10}
          formatter={renderColorfulLegendText}
        />
        <Pie
          data={data}
          cx={180}
          cy={150}
          innerRadius={60}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
        ></Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
