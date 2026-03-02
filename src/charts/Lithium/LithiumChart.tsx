import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import lithiumData from './data/lithium_data.json';

interface LithiumDataPoint {
  date: string;
  totalInventory: number;
  inventory: {
    upstream: number;
    downstream: number;
    other: number;
  };
  destocking: number | null;
  totalProduction: number | null;
  production: {
    lithiumSpodumene: number | null;
    lithiumLepidolite: number | null;
    saltLake: number | null;
    recycling: number | null;
  };
}

type TabType = 'inventory' | 'structure' | 'production' | 'destocking' | 'totalProduction';

const tabs = [
  { id: 'inventory' as TabType, label: '总库存趋势' },
  { id: 'structure' as TabType, label: '库存结构' },
  { id: 'production' as TabType, label: '周度产能' },
  { id: 'destocking' as TabType, label: '去库量对比' },
  { id: 'totalProduction' as TabType, label: '产能总量' },
];

export const LithiumChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('inventory');
  const data = lithiumData as LithiumDataPoint[];

  // Calculate growth rates
  const calculateGrowthRate = (current: number | null, previous: number | null): number | null => {
    if (!current || !previous || previous === 0) return null;
    return parseFloat(((current - previous) / previous * 100).toFixed(2));
  };

  // Chart 1: Total Inventory Trend
  const inventoryOption = useMemo(() => {
    const dates = data.map(d => d.date);
    const totalInventory = data.map(d => d.totalInventory);

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: (params: any) => {
          let result = params[0].name + '<br/>';
          params.forEach((item: any) => {
            result += item.marker + item.seriesName + ': ' + item.value.toLocaleString() + '吨<br/>';
          });
          const idx = params[0].dataIndex;
          if (idx > 0) {
            const change = totalInventory[idx] - totalInventory[idx - 1];
            result += '<span style="color:#22C55E">周度变化: ' + change.toLocaleString() + '吨</span>';
          }
          return result;
        }
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { fontSize: 12, color: '#86868b' },
        axisLine: { lineStyle: { color: '#ddd' } }
      },
      yAxis: {
        type: 'value',
        name: '库存量(吨)',
        axisLabel: {
          fontSize: 12,
          color: '#86868b',
          formatter: '{value}'
        },
        axisLine: { lineStyle: { color: '#ddd' } },
        splitLine: { lineStyle: { color: '#f0f0f0' } }
      },
      series: [{
        name: '总库存',
        type: 'line',
        data: totalInventory,
        smooth: true,
        lineStyle: { width: 3, color: '#22C55E' },
        itemStyle: {
          color: '#22C55E',
          borderWidth: 3,
          borderColor: '#fff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
              { offset: 1, color: 'rgba(34, 197, 94, 0.05)' }
            ]
          }
        }
      }]
    };
  }, [data]);

  // Chart 2: Inventory Structure (stacked bar + growth rate lines)
  const structureOption = useMemo(() => {
    const dates = data.map(d => d.date);
    const upstream = data.map(d => d.inventory.upstream);
    const downstream = data.map(d => d.inventory.downstream);
    const other = data.map(d => d.inventory.other);

    const upstreamGrowth = data.map((d, i) => calculateGrowthRate(d.inventory.upstream, data[i - 1]?.inventory.upstream));
    const downstreamGrowth = data.map((d, i) => calculateGrowthRate(d.inventory.downstream, data[i - 1]?.inventory.downstream));
    const otherGrowth = data.map((d, i) => calculateGrowthRate(d.inventory.other, data[i - 1]?.inventory.other));

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          let result = '<div style="font-weight:bold;margin-bottom:8px;">' + params[0].name + '</div>';
          params.forEach((item: any) => {
            if (item.seriesName.includes('增长率')) {
              if (item.value !== null) {
                const color = item.value >= 0 ? '#FF3B30' : '#22C55E';
                result += item.marker + item.seriesName + ': <span style="color:' + color + '">' + item.value + '%</span><br/>';
              }
            } else {
              result += item.marker + item.seriesName + ': ' + item.value.toLocaleString() + '吨<br/>';
            }
          });
          return result;
        }
      },
      legend: {
        data: ['上游冶炼厂', '下游企业', '其他库存', '上游增长率', '下游增长率', '其他增长率'],
        top: 10,
        textStyle: { fontSize: 12, color: '#1d1d1f' }
      },
      grid: { left: '5%', right: '8%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { fontSize: 12, color: '#86868b' }
      },
      yAxis: [
        {
          type: 'value',
          name: '库存量(吨)',
          position: 'left',
          axisLabel: {
            fontSize: 12,
            color: '#86868b',
            formatter: '{value}'
          },
          axisLine: { lineStyle: { color: '#22C55E' } },
          splitLine: { lineStyle: { color: '#f0f0f0' } }
        },
        {
          type: 'value',
          name: '环比增长率(%)',
          position: 'right',
          axisLabel: {
            fontSize: 12,
            color: '#86868b',
            formatter: '{value}%'
          },
          axisLine: { lineStyle: { color: '#FF9500' } },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '上游冶炼厂',
          type: 'bar',
          yAxisIndex: 0,
          stack: '总量',
          data: upstream,
          itemStyle: { color: '#22C55E' },
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}',
            fontSize: 10
          }
        },
        {
          name: '下游企业',
          type: 'bar',
          yAxisIndex: 0,
          stack: '总量',
          data: downstream,
          itemStyle: { color: '#86EFAC' },
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}',
            fontSize: 10
          }
        },
        {
          name: '其他库存',
          type: 'bar',
          yAxisIndex: 0,
          stack: '总量',
          data: other,
          itemStyle: { color: '#BBF7D0' },
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}',
            fontSize: 10
          }
        },
        {
          name: '上游增长率',
          type: 'line',
          yAxisIndex: 1,
          data: upstreamGrowth,
          smooth: true,
          lineStyle: { width: 2, color: '#FF3B30' },
          itemStyle: { color: '#FF3B30', borderWidth: 2, borderColor: '#fff' },
          symbol: 'circle',
          symbolSize: 6
        },
        {
          name: '下游增长率',
          type: 'line',
          yAxisIndex: 1,
          data: downstreamGrowth,
          smooth: true,
          lineStyle: { width: 2, color: '#FF9500' },
          itemStyle: { color: '#FF9500', borderWidth: 2, borderColor: '#fff' },
          symbol: 'diamond',
          symbolSize: 6
        },
        {
          name: '其他增长率',
          type: 'line',
          yAxisIndex: 1,
          data: otherGrowth,
          smooth: true,
          lineStyle: { width: 2, color: '#0071e3' },
          itemStyle: { color: '#0071e3', borderWidth: 2, borderColor: '#fff' },
          symbol: 'triangle',
          symbolSize: 6
        }
      ]
    };
  }, [data]);

  // Chart 3: Weekly Production (grouped bar + growth rate lines)
  const productionOption = useMemo(() => {
    const productionData = data.filter(d => d.totalProduction !== null);
    const dates = productionData.map(d => d.date);
    const lithiumSpodumene = productionData.map(d => d.production.lithiumSpodumene);
    const lithiumLepidolite = productionData.map(d => d.production.lithiumLepidolite);
    const saltLake = productionData.map(d => d.production.saltLake);
    const recycling = productionData.map(d => d.production.recycling);

    const spodumeneGrowth = productionData.map((d, i) => calculateGrowthRate(d.production.lithiumSpodumene, productionData[i - 1]?.production.lithiumSpodumene));
    const lepidoliteGrowth = productionData.map((d, i) => calculateGrowthRate(d.production.lithiumLepidolite, productionData[i - 1]?.production.lithiumLepidolite));
    const saltLakeGrowth = productionData.map((d, i) => calculateGrowthRate(d.production.saltLake, productionData[i - 1]?.production.saltLake));
    const recyclingGrowth = productionData.map((d, i) => calculateGrowthRate(d.production.recycling, productionData[i - 1]?.production.recycling));

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: (params: any) => {
          let result = '<div style="font-weight:bold;margin-bottom:8px;">' + params[0].name + '</div>';
          params.forEach((item: any) => {
            if (item.seriesName.includes('增长率')) {
              if (item.value !== null) {
                const color = item.value >= 0 ? '#22C55E' : '#FF3B30';
                result += item.marker + item.seriesName + ': <span style="color:' + color + '">' + item.value + '%</span><br/>';
              }
            } else {
              result += item.marker + item.seriesName + ': ' + item.value.toLocaleString() + '吨<br/>';
            }
          });
          return result;
        }
      },
      legend: {
        data: ['锂辉石', '锂云母', '盐湖', '回收', '锂辉石增长率', '锂云母增长率', '盐湖增长率', '回收增长率'],
        top: 10,
        textStyle: { fontSize: 11, color: '#1d1d1f' }
      },
      grid: { left: '5%', right: '8%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { fontSize: 12, color: '#86868b' }
      },
      yAxis: [
        {
          type: 'value',
          name: '产能(吨/周)',
          position: 'left',
          axisLabel: {
            fontSize: 12,
            color: '#86868b',
            formatter: '{value}'
          },
          axisLine: { lineStyle: { color: '#22C55E' } },
          splitLine: { lineStyle: { color: '#f0f0f0' } }
        },
        {
          type: 'value',
          name: '环比增长率(%)',
          position: 'right',
          axisLabel: {
            fontSize: 12,
            color: '#86868b',
            formatter: '{value}%'
          },
          axisLine: { lineStyle: { color: '#FF9500' } },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '锂辉石',
          type: 'bar',
          yAxisIndex: 0,
          data: lithiumSpodumene,
          itemStyle: { color: '#22C55E' },
          barGap: '5%',
          barWidth: '15%'
        },
        {
          name: '锂云母',
          type: 'bar',
          yAxisIndex: 0,
          data: lithiumLepidolite,
          itemStyle: { color: '#86EFAC' },
          barWidth: '15%'
        },
        {
          name: '盐湖',
          type: 'bar',
          yAxisIndex: 0,
          data: saltLake,
          itemStyle: { color: '#BBF7D0' },
          barWidth: '15%'
        },
        {
          name: '回收',
          type: 'bar',
          yAxisIndex: 0,
          data: recycling,
          itemStyle: { color: '#86EFAC' },
          barWidth: '15%'
        },
        {
          name: '锂辉石增长率',
          type: 'line',
          yAxisIndex: 1,
          data: spodumeneGrowth,
          smooth: true,
          lineStyle: { width: 2, color: '#FF3B30' },
          itemStyle: { color: '#FF3B30', borderWidth: 2, borderColor: '#fff' },
          symbol: 'circle',
          symbolSize: 6
        },
        {
          name: '锂云母增长率',
          type: 'line',
          yAxisIndex: 1,
          data: lepidoliteGrowth,
          smooth: true,
          lineStyle: { width: 2, color: '#FF9500' },
          itemStyle: { color: '#FF9500', borderWidth: 2, borderColor: '#fff' },
          symbol: 'diamond',
          symbolSize: 6
        },
        {
          name: '盐湖增长率',
          type: 'line',
          yAxisIndex: 1,
          data: saltLakeGrowth,
          smooth: true,
          lineStyle: { width: 2, color: '#0071e3' },
          itemStyle: { color: '#0071e3', borderWidth: 2, borderColor: '#fff' },
          symbol: 'triangle',
          symbolSize: 6
        },
        {
          name: '回收增长率',
          type: 'line',
          yAxisIndex: 1,
          data: recyclingGrowth,
          smooth: true,
          lineStyle: { width: 2, color: '#5856D6' },
          itemStyle: { color: '#5856D6', borderWidth: 2, borderColor: '#fff' },
          symbol: 'rect',
          symbolSize: 6
        }
      ]
    };
  }, [data]);

  // Chart 4: Destocking Comparison
  const destockingOption = useMemo(() => {
    const destockingData = data.filter((d, i) => i > 0); // Skip first week
    const dates = destockingData.map(d => d.date);
    const destocking = destockingData.map(d => d.destocking);

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: (params: any) => {
          return params[0].name + '<br/>' +
            params[0].marker + '去库量: ' + params[0].value.toLocaleString() + '吨';
        }
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { fontSize: 12, color: '#86868b' }
      },
      yAxis: {
        type: 'value',
        name: '去库量(吨)',
        axisLabel: { fontSize: 12, color: '#86868b' },
        splitLine: { lineStyle: { color: '#f0f0f0' } }
      },
      series: [{
        name: '周度去库量',
        type: 'bar',
        data: destocking,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#22C55E' },
              { offset: 1, color: '#86EFAC' }
            ]
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}吨',
          fontSize: 11,
          fontWeight: 'bold',
          color: '#22C55E'
        },
        barWidth: '50%'
      }]
    };
  }, [data]);

  // Chart 5: Total Production
  const totalProductionOption = useMemo(() => {
    const productionData = data.filter(d => d.totalProduction !== null);
    const dates = productionData.map(d => d.date);
    const totalProduction = productionData.map(d => d.totalProduction);

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: (params: any) => {
          let result = params[0].name + '<br/>' +
            params[0].marker + '总产能: ' + params[0].value.toLocaleString() + '吨';

          const dateIndex = productionData.findIndex(d => d.date === params[0].name);
          if (dateIndex > 0) {
            const current = totalProduction[dateIndex];
            const previous = totalProduction[dateIndex - 1];
            const change = current - previous;
            const changeRate = ((change / previous) * 100).toFixed(2);
            const color = change >= 0 ? '#22C55E' : '#FF3B30';
            const symbol = change >= 0 ? '↑' : '↓';
            result += '<br/><span style="color:' + color + '">环比: ' + symbol + ' ' + Math.abs(change) + '吨 (' + changeRate + '%)</span>';
          }

          return result;
        }
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { fontSize: 12, color: '#86868b' }
      },
      yAxis: {
        type: 'value',
        name: '产能(吨/周)',
        axisLabel: { fontSize: 12, color: '#86868b' },
        splitLine: { lineStyle: { color: '#f0f0f0' } }
      },
      series: [{
        name: '周度产能总量',
        type: 'bar',
        data: totalProduction,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#22C55E' },
              { offset: 1, color: '#86EFAC' }
            ]
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}吨',
          fontSize: 11,
          fontWeight: 'bold',
          color: '#22C55E'
        },
        barWidth: '40%'
      }]
    };
  }, [data]);

  const getOption = () => {
    switch (activeTab) {
      case 'inventory': return inventoryOption;
      case 'structure': return structureOption;
      case 'production': return productionOption;
      case 'destocking': return destockingOption;
      case 'totalProduction': return totalProductionOption;
      default: return inventoryOption;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#22C55E] text-white shadow-md'
                : 'bg-white text-[#86868b] hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="flex-1 min-h-0">
        <ReactECharts
          key={activeTab}
          option={getOption()}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </div>
  );
};
