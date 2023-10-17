import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Pie(props) {
  const { data } = props;

  const seriesData = data.map((item) => ({
    id: item.id,
    value: parseFloat(item.TimeSpent), // Convert the time spent to a float if it's a string
    label: item.PageName,
  }));

  return (
    <PieChart
      series={[
        {
          data: seriesData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}
