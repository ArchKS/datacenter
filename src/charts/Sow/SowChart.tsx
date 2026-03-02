import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

interface SowData {
  date: string;
  value: number;
  source: string;
}

export const SowChart: React.FC = () => {
  const [data, setData] = useState<SowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/sow_data.json');
        if (!response.ok) {
          throw new Error('数据文件未找到');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-lg text-gray-600">
        加载中...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-5">
        <p>无法加载能繁母猪数据</p>
        <p className="text-sm mt-2">请确保数据文件存在：/data/sow_data.json</p>
        <p className="text-xs text-gray-400 mt-1">错误信息: {error}</p>
      </div>
    );
  }

  const dates = data.map(item => item.date);
  const values = data.map(item => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const yMin = minValue - 50;
  const yMax = maxValue + 50;

  // 找出最大值和最小值的索引
  const maxIndex = values.indexOf(maxValue);
  const minIndex = values.indexOf(minValue);

  const option: EChartsOption = {
    title: {
      text: '全国能繁母猪存栏量',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 500,
        color: '#1d1d1f',
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const param = params[0];
        return `${param.name}<br/>存栏量: <b>${param.value}</b> 万头`;
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e5e5',
      textStyle: {
        color: '#1d1d1f',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: {
        rotate: 45,
        interval: 0,
        color: '#86868b',
      },
      axisLine: {
        lineStyle: {
          color: '#e5e5e5',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: '万头',
      scale: true,
      min: yMin,
      max: yMax,
      axisLabel: {
        formatter: '{value}',
        color: '#86868b',
      },
      axisLine: {
        lineStyle: {
          color: '#e5e5e5',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#f5f5f7',
        },
      },
    },
    series: [
      {
        name: '能繁母猪存栏量',
        type: 'line',
        data: values,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2.5,
          color: '#0071e3',
        },
        itemStyle: {
          color: '#0071e3',
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
              { offset: 0, color: 'rgba(0, 113, 227, 0.3)' },
              { offset: 1, color: 'rgba(0, 113, 227, 0.05)' },
            ],
          },
        },
        // 标注最大值和最小值
        markPoint: {
          symbol: 'circle',
          symbolSize: 40,
          data: [
            {
              name: '最大值',
              coord: [dates[maxIndex], maxValue],
              value: maxValue,
              itemStyle: {
                color: 'rgba(0, 113, 227, 0.15)',
                borderColor: '#0071e3',
                borderWidth: 2,
              },
              label: {
                color: '#1d1d1f',
                fontSize: 12,
                fontWeight: 500,
              },
            },
            {
              name: '最小值',
              coord: [dates[minIndex], minValue],
              value: minValue,
              itemStyle: {
                color: 'rgba(0, 113, 227, 0.15)',
                borderColor: '#0071e3',
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

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};
