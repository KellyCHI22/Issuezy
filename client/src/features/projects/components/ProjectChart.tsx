import { useMediaQuery } from "react-responsive";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const COLORS = [
  "#d0b9f9",
  "#b18af4",
  "#925bf0",
  "#732dec",
  "#5a13d2",
  "#f9a8d4",
  "#f472b6",
  "#ec4899",
  "#db2777",
  "#be185d",
  "#93c5fd",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
];

const RADIAN = Math.PI / 180;

const renderColorfulLegendText = (value: string) => {
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

export function ProjectChart({ title, data }: { title: string; data: any }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const result = Array.from(Object.keys(data), (key, index) => ({
    name: capitalize(key),
    value: data[key],
    fill: COLORS[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={title === "category" ? 400 : 330}>
      <PieChart>
        <Legend
          height={title === "category" ? 100 : 45}
          width={isMobile ? 280 : 150}
          iconType="circle"
          layout={isMobile ? "horizontal" : "vertical"}
          verticalAlign={isMobile ? "bottom" : "middle"}
          align={isMobile ? "center" : "right"}
          iconSize={10}
          formatter={renderColorfulLegendText}
        />
        <Pie
          data={result}
          cx={isMobile ? 135 : 180}
          cy={isMobile ? 140 : 160}
          innerRadius={isMobile ? 45 : 60}
          outerRadius={isMobile ? 90 : 120}
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
