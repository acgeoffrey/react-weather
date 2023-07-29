import { XAxis, LabelList, AreaChart, Area } from "recharts";
import styles from "../styles/Forecast.module.css";

function ForecastChart({ data, dataKey }) {
  // console.log(data, dataKey);
  return (
    <div className={styles.areaChartContainer}>
      <AreaChart
        width={900}
        height={150}
        data={data}
        margin={{ top: 20, right: 30, left: 20 }}
      >
        <defs>
          <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e23e57" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#e23e57" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          axisLine={false}
          // tickLine={false}
          fontSize="1.3rem"
        />

        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#e23e57"
          strokeWidth={3}
          activeDot={false}
          dot={true}
          fill="url(#colorArea)"
        >
          <LabelList
            dataKey={dataKey}
            offset={10}
            position="top"
            fontSize="1.3rem"
            fontWeight="500"
            fill="black"
          />
        </Area>
      </AreaChart>
    </div>
  );
}

export default ForecastChart;
