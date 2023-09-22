import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

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
const RADIAN = Math.PI / 180;

const renderColorfulLegendText = (value: string, entry: any) => {
  return <span className="leading-6">{value}</span>;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={COLORS[index]}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="opacity-80"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function ProjectChart({ data }: { data: any }) {
  const result = Array.from(Object.keys(data), (key, index) => ({
    name: capitalize(key),
    value: data[key],
    fill: COLORS[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
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
          data={result}
          cx={180}
          cy={150}
          innerRadius={60}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          labelLine={true}
          label={renderCustomizedLabel}
        ></Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
