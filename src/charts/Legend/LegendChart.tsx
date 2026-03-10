import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts'; 

interface LegendData {
  date: string;
  treated: number;
  dailyGrowth: number | null;
}

export const LegendChart: React.FC = () => {
  const [data, setData] = useState<LegendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/legend_data.json');
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
        <p>无法加载传奇生物数据</p>
        <p className="text-sm mt-2">请确保数据文件存在：/data/legend_data.json</p>
        <p className="text-xs text-gray-400 mt-1">错误信息: {error}</p>
      </div>
    );
  }

  const dates = data.map(item => item.date);
  const treatedData = data.map(item => item.treated);
  const growthData = data.map(item => item.dailyGrowth);

  // 找出最高增长点的索引
  const maxGrowthIndex = data.findIndex(item => item.dailyGrowth === 83.3);

  const option: EChartsOption = {
    title: {
      text: '传奇生物累计治疗人数',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 500,
        color: '#1d1d1f',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e5e5',
      textStyle: {
        color: '#1d1d1f',
      },
      formatter: (params: any) => {
        let result = params[0].name + '<br/>';
        params.forEach((param: any) => {
          if (param.seriesName === '累计治疗人数') {
            result += `${param.marker}${param.seriesName}: <b>${param.value}</b> 人<br/>`;
          } else if (param.seriesName === '日均增长' && param.value !== null) {
            result += `${param.marker}${param.seriesName}: <b>${param.value}</b> 人/天`;
          }
        });
        return result;
      },
    },
    legend: {
      data: ['累计治疗人数', '日均增长'],
      top: 30,
      textStyle: {
        color: '#86868b',
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
      axisPointer: {
        type: 'shadow',
      },
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
    yAxis: [
      {
        type: 'value',
        name: '累计治疗人数 (人)',
        min: 0,
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
      {
        type: 'value',
        name: '日均增长 (人/天)',
        min: 0,
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
          show: false,
        },
      },
    ],
    series: [
      {
        name: '累计治疗人数',
        type: 'bar',
        data: treatedData,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 113, 227, 0.8)' },
            { offset: 1, color: 'rgba(0, 113, 227, 0.4)' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 113, 227, 1)' },
              { offset: 1, color: 'rgba(0, 113, 227, 0.6)' },
            ]),
          },
        },
      },
      {
        name: '日均增长',
        type: 'line',
        yAxisIndex: 1,
        data: growthData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
          width: 2,
          color: '#FF9500',
        },
        itemStyle: {
          color: '#FF9500',
          borderColor: '#fff',
          borderWidth: 2,
        },
        // 标记最高点
        markPoint: {
          symbol: 'circle',
          symbolSize: 40,
          data: [
            {
              name: '最高值',
              coord: [dates[maxGrowthIndex], 83.3],
              value: 83.3,
              itemStyle: {
                color: 'rgba(255, 149, 0, 0.15)',
                borderColor: '#FF9500',
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
