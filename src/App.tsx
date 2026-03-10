import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ChartCard } from './components/ChartCard';
import { Calendar } from './components/Calendar';
import { SectionToc } from './components/SectionToc';
import { PigPrice } from './charts/Pig/PigPrice';
import { CementPrice } from './charts/Cement/CementPrice';
import { SowChart } from './charts/Sow/SowChart';
import { LegendChart } from './charts/Legend/LegendChart';
import { LithiumChart } from './charts/Lithium/LithiumChart';
import './styles/global.css';

function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const tocItems = [
    { id: 'pig-price', title: '生猪价格走势' },
    { id: 'cement-price', title: '水泥价格指数CEMPI' },
    { id: 'legend-chart', title: '传奇生物累计治疗人数' },
    { id: 'sow-chart', title: '能繁母猪存栏量' },
    { id: 'lithium-chart', title: '锂矿库存分析' },
  ];

  return (
    <>
      <Header
        title="数据仪表板"
        subtitle="猪价 · 水泥 · 能繁母猪 · 传奇生物 · 豆粕 · 锂矿"
        onCalendarClick={() => setIsCalendarOpen(true)}
      />
      <SectionToc items={tocItems} />
      <Dashboard>
        <ChartCard id="cement-price" title="水泥价格指数CEMPI" fullWidth>
          <CementPrice />
        </ChartCard>
        <ChartCard id="legend-chart" title="传奇生物累计治疗人数" fullWidth minHeight="500px">
          <LegendChart />
        </ChartCard>
        <ChartCard id="sow-chart" title="能繁母猪存栏量" fullWidth minHeight="500px">
          <SowChart />
        </ChartCard>
        <ChartCard id="lithium-chart" title="锂矿库存分析" fullWidth minHeight="500px">
          <LithiumChart />
        </ChartCard>
        <ChartCard id="pig-price" title="生猪价格走势" fullWidth>
          <PigPrice />
        </ChartCard>
      </Dashboard>
      <Calendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </>
  );
}

export default App;
