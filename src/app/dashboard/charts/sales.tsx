'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';
import { Chart } from '@/components/core/chart';
import { weeks } from '@/components/locale/date';

export interface SalesProps {
  chartSeries: { name: string; data: number[] }[];
  sx?: SxProps;
}

export function Sales({ chartSeries, sx }: SalesProps): React.JSX.Element {
  const chartOptions = useChartOptions();

  return (
    <Card sx={sx}>
      <CardHeader title="บิลทั้งหมด"/>
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
      </CardContent>
    </Card>
  );
}

function useChartOptions(): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: '40px' } },
    stroke: { colors: ['transparent'], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories: weeks.full,
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value} ` : `${value}`),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}