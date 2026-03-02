import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ChartCard } from './components/ChartCard';
import { Calendar } from './components/Calendar';
import { PigPrice } from './charts/Pig/PigPrice';
import { CementPrice } from './charts/Cement/CementPrice';
import { SowChart } from './charts/Sow/SowChart';
import { LegendChart } from './charts/Legend/LegendChart';
import { SoybeanChart } from './charts/Soybean/SoybeanChart';
import { LithiumChart } from './charts/Lithium/LithiumChart';
import './styles/global.css';

function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <>
      <Header
        title="数据仪表板"
        subtitle="猪价 · 水泥 · 能繁母猪 · 传奇生物 · 豆粕 · 锂矿"
        onCalendarClick={() => setIsCalendarOpen(true)}
      />
      <Dashboard>
        <ChartCard title="生猪价格走势">
          <PigPrice />
        </ChartCard>
        <ChartCard title="水泥价格指数CEMPI">
          <CementPrice />
        </ChartCard>
        <ChartCard title="传奇生物累计治疗人数">
          <LegendChart />
        </ChartCard>
        <ChartCard title="能繁母猪存栏量">
          <SowChart />
        </ChartCard>
        <ChartCard title="豆粕市场供需数据" fullWidth>
          <SoybeanChart />
        </ChartCard>
        <ChartCard title="锂矿库存分析" fullWidth>
          <LithiumChart />
        </ChartCard>
      </Dashboard>
      <Calendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </>
  );
}

export default App;
