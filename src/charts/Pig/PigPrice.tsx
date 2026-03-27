import React from 'react';
import ReactECharts from 'echarts-for-react';
import monthlyData from '../../../data/muyuan_hog_monthly_2022_2026_03.json';

type DataRow = {
  month: string;
  猪价: number;
  牧原成本: number;
  价差: number;
};

const data = monthlyData as DataRow[];

export const PigPrice: React.FC = () => {
  const months = data.map((item) => item.month);
  const hogPrice = data.map((item) => Number(item.猪价.toFixed(2)));
  const muyuanCost = data.map((item) => Number(item.牧原成本.toFixed(2)));

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.92)',
      borderWidth: 0,
      textStyle: { color: '#fff' },
      formatter: (params: any[]) => {
        const [a, b] = params;
        const spread = (Number(a.value) - Number(b.value)).toFixed(2);
        return [
          `<div style="font-weight:600;margin-bottom:6px;">${a.axisValue}</div>`,
          `${a.marker}${a.seriesName}：${a.value} 元/公斤`,
          `${b.marker}${b.seriesName}：${b.value} 元/公斤`,
          `价差：${spread} 元/公斤`,
        ].join('<br/>');
      },
    },
    legend: {
      top: 10,
      textStyle: { color: '#334155' },
      itemWidth: 18,
      itemHeight: 10,
    },
    grid: {
      left: 60,
      right: 24,
      top: 60,
      bottom: 70,
    },
    xAxis: {
      type: 'category',
      data: months,
      boundaryGap: false,
      axisLabel: {
        color: '#64748b',
        rotate: 45,
        formatter: (value: string, index: number) => (index % 3 === 0 ? value : ''),
      },
      axisLine: { lineStyle: { color: '#cbd5e1' } },
    },
    yAxis: {
      type: 'value',
      name: '元/公斤',
      nameTextStyle: { color: '#64748b' },
      axisLabel: { color: '#64748b' },
      splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        type: 'slider',
        height: 18,
        bottom: 20,
        start: 0,
        end: 100,
        borderColor: 'transparent',
      },
    ],
    series: [
      {
        name: '全国猪价（月均）',
        type: 'line',
        data: hogPrice,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#ef4444' },
        itemStyle: { color: '#ef4444' },
        areaStyle: {
          color: 'rgba(239, 68, 68, 0.08)',
        },
        markLine: {
          symbol: 'none',
          label: { show: false },
          lineStyle: { color: '#94a3b8', type: 'dashed' },
          data: [{ yAxis: 牧原成本Average(muyuanCost) }],
        },
      },
      {
        name: '牧原成本',
        type: 'line',
        data: muyuanCost,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { width: 3, color: '#2563eb' },
        itemStyle: { color: '#2563eb' },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '550px', width: '100%' }} notMerge lazyUpdate />;
};

function 牧原成本Average(values: number[]) {
  return Number((values.reduce((sum, item) => sum + item, 0) / values.length).toFixed(2));
}
