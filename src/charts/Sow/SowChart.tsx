import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

interface SowRecord {
  quarter: string;
  value_wan_tou: number;
  qoq?: string;
  yoy?: string;
  source_url?: string;
}

interface SowDataset {
  dataset: string;
  unit: string;
  period: string;
  updated_at?: string;
  records: SowRecord[];
}

export const SowChart: React.FC = () => {
  const [dataset, setDataset] = useState<SowDataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/moa_nengfanmuzhu_2024Q1_2025Q4.json');
        if (!response.ok) {
          throw new Error('数据文件未找到');
        }
        const jsonData = await response.json();
        setDataset(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full text-lg text-gray-600">加载中...</div>;
  }

  if (error || !dataset) {
    return (
      <div className="text-red-500 text-center p-5">
        <p>无法加载能繁母猪数据</p>
        <p className="text-sm mt-2">请确保数据文件存在：/data/moa_nengfanmuzhu_2024Q1_2025Q4.json</p>
        <p className="text-xs text-gray-400 mt-1">错误信息: {error}</p>
      </div>
    );
  }

  const labels = dataset.records.map(item => item.quarter);
  const values = dataset.records.map(item => item.value_wan_tou);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const yMin = minValue - 20;
  const yMax = maxValue + 20;
  const maxIndex = values.indexOf(maxValue);
  const minIndex = values.indexOf(minValue);

  const option: EChartsOption = {
    title: {
      text: '全国能繁母猪存栏量（季度）',
      subtext: `数据来源：农业农村部 · 区间：${dataset.period}`,
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 500,
        color: '#1d1d1f',
      },
      subtextStyle: {
        color: '#86868b',
        fontSize: 12,
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const idx = params[0].dataIndex;
        const row = dataset.records[idx];
        return [
          `${row.quarter}`,
          `存栏量：<b>${row.value_wan_tou}</b> 万头`,
          `环比：${row.qoq || '--'}`,
          `同比：${row.yoy || '--'}`,
        ].join('<br/>');
      },
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      borderColor: '#e5e5e5',
      textStyle: {
        color: '#1d1d1f',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 80,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: {
        color: '#86868b',
      },
      axisLine: {
        lineStyle: { color: '#e5e5e5' },
      },
    },
    yAxis: {
      type: 'value',
      name: '万头',
      scale: true,
      min: yMin,
      max: yMax,
      axisLabel: {
        color: '#86868b',
      },
      axisLine: {
        lineStyle: { color: '#e5e5e5' },
      },
      splitLine: {
        lineStyle: { color: '#f5f5f7' },
      },
    },
    series: [
      {
        name: '能繁母猪存栏量',
        type: 'line',
        data: values,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#7c3aed',
        },
        itemStyle: {
          color: '#7c3aed',
          borderColor: '#fff',
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(124, 58, 237, 0.28)' },
              { offset: 1, color: 'rgba(124, 58, 237, 0.05)' },
            ],
          },
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: 44,
          data: [
            {
              name: '最高点',
              coord: [labels[maxIndex], maxValue],
              value: maxValue,
              itemStyle: {
                color: 'rgba(124, 58, 237, 0.15)',
                borderColor: '#7c3aed',
                borderWidth: 2,
              },
              label: {
                color: '#1d1d1f',
                fontSize: 12,
                fontWeight: 500,
              },
            },
            {
              name: '最低点',
              coord: [labels[minIndex], minValue],
              value: minValue,
              itemStyle: {
                color: 'rgba(124, 58, 237, 0.15)',
                borderColor: '#7c3aed',
                borderWidth: 2,
              },
              label: {
                color: '#1d1d1f',
                fontSize: 12,
                fontWeight: 500,
              },
            },
          ],
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '420px', width: '100%' }} />;
};
