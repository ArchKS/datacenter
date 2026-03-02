import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

interface SoybeanData {
  date: string;
  usProduction: number;
  usInventory: number;
  brazilProduction: number;
  argentinaProduction: number;
  chinaOilMillInventory: number;
}

export const SoybeanChart: React.FC = () => {
  const [data, setData] = useState<SoybeanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/soybean_data.json');
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
        <p>无法加载豆粕数据</p>
        <p className="text-sm mt-2">请确保数据文件存在：/data/soybean_data.json</p>
        <p className="text-xs text-gray-400 mt-1">错误信息: {error}</p>
      </div>
    );
  }

  const dates = data.map(item => item.date);
  const usProduction = data.map(item => item.usProduction);
  const usInventory = data.map(item => item.usInventory);
  const brazilProduction = data.map(item => item.brazilProduction);
  const argentinaProduction = data.map(item => item.argentinaProduction);
  const chinaInventory = data.map(item => item.chinaOilMillInventory / 100); // 转换为亿

  // 找出最大值和最小值
  const maxUsProd = Math.max(...usProduction);
  const minUsProd = Math.min(...usProduction);
  const maxBrazil = Math.max(...brazilProduction);

  const maxUsProdIndex = usProduction.indexOf(maxUsProd);
  const minUsProdIndex = usProduction.indexOf(minUsProd);
  const maxBrazilIndex = brazilProduction.indexOf(maxBrazil);

  const option: EChartsOption = {
    title: {
      text: '豆粕市场供需数据',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 500,
        color: '#1d1d1f',
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e5e5',
      textStyle: {
        color: '#1d1d1f',
      },
      formatter: (params: any) => {
        let result = params[0].name + '<br/>';
        params.forEach((param: any) => {
          if (param.seriesName === '美豆产量' || param.seriesName === '美豆库存') {
            result += `${param.marker}${param.seriesName}: <b>${param.value}</b> 亿蒲式耳<br/>`;
          } else if (param.seriesName === '巴西产量') {
            result += `${param.marker}${param.seriesName}: <b>${param.value}</b> 亿吨<br/>`;
          } else if (param.seriesName === '阿根廷产量') {
            result += `${param.marker}${param.seriesName}: <b>${param.value}</b> 亿吨<br/>`;
          } else if (param.seriesName === '中国油厂库存') {
            result += `${param.marker}${param.seriesName}: <b>${(param.value * 100).toFixed(0)}</b> 万吨`;
          }
        });
        return result;
      },
    },
    legend: {
      data: ['美豆产量', '美豆库存', '巴西产量', '阿根廷产量', '中国油厂库存'],
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
      axisLabel: {
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
        name: '亿蒲式耳',
        min: 0,
        max: 15,
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
        name: '亿吨',
        min: 0,
        max: 2.5,
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
        name: '美豆产量',
        type: 'line',
        data: usProduction,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
          width: 2,
          color: '#0071e3',
        },
        itemStyle: {
          color: '#0071e3',
          borderColor: '#fff',
          borderWidth: 2,
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: 35,
          data: [
            {
              name: '最大值',
              coord: [dates[maxUsProdIndex], maxUsProd],
              value: maxUsProd,
              itemStyle: {
                color: 'rgba(0, 113, 227, 0.15)',
                borderColor: '#0071e3',
                borderWidth: 2,
              },
              label: {
                color: '#1d1d1f',
                fontSize: 11,
                fontWeight: 500,
              },
            },
            {
              name: '最小值',
              coord: [dates[minUsProdIndex], minUsProd],
              value: minUsProd,
              itemStyle: {
                color: 'rgba(0, 113, 227, 0.15)',
                borderColor: '#0071e3',
                borderWidth: 2,
              },
              label: {
                color: '#1d1d1f',
                fontSize: 11,
                fontWeight: 500,
              },
            },
          ],
        },
      },
      {
        name: '美豆库存',
        type: 'line',
        data: usInventory,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
          width: 2,
          color: '#5856D6',
        },
        itemStyle: {
          color: '#5856D6',
          borderColor: '#fff',
          borderWidth: 2,
        },
      },
      {
        name: '巴西产量',
        type: 'line',
        yAxisIndex: 1,
        data: brazilProduction,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
          width: 2,
          color: '#34C759',
        },
        itemStyle: {
          color: '#34C759',
          borderColor: '#fff',
          borderWidth: 2,
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: 35,
          data: [
            {
              name: '最高',
              coord: [dates[maxBrazilIndex], maxBrazil],
              value: maxBrazil,
              itemStyle: {
                color: 'rgba(52, 199, 89, 0.15)',
                borderColor: '#34C759',
                borderWidth: 2,
              },
              label: {
                color: '#1d1d1f',
                fontSize: 11,
                fontWeight: 500,
              },
            },
          ],
        },
      },
      {
        name: '阿根廷产量',
        type: 'line',
        yAxisIndex: 1,
        data: argentinaProduction,
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
      },
      {
        name: '中国油厂库存',
        type: 'line',
        yAxisIndex: 1,
        data: chinaInventory,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
          width: 2,
          color: '#FF3B30',
        },
        itemStyle: {
          color: '#FF3B30',
          borderColor: '#fff',
          borderWidth: 2,
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};
