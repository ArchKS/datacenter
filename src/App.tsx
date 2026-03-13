import React, { useMemo, useState } from 'react';
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

interface CardMeta {
  id: string;
  title: string;
  updatedAt: string;
  updateSchedule?: string;
  fullWidth?: boolean;
  minHeight?: string;
}

function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const cards: CardMeta[] = [
    { id: 'cement-price', title: '水泥价格指数CEMPI', updatedAt: '2026-03-10', updateSchedule: '每周一 10:10', fullWidth: true },
    { id: 'legend-chart', title: '传奇生物累计治疗人数', updatedAt: '2026-03-10', fullWidth: true, minHeight: '500px' },
    { id: 'sow-chart', title: '能繁母猪存栏量', updatedAt: '2026-03-10', updateSchedule: '1/4/7/10月工作日 10:30', fullWidth: true, minHeight: '500px' },
    { id: 'lithium-chart', title: '锂矿库存分析', updatedAt: '2026-03-13', updateSchedule: '每周五 20:00', fullWidth: true, minHeight: '500px' },
    { id: 'pig-price', title: '生猪价格走势', updatedAt: '2026-03-10', updateSchedule: '每周一 10:00', fullWidth: true },
  ];

  const tocItems = cards.map(({ id, title }) => ({ id, title }));

  const recentUpdates = useMemo(() => {
    return [...cards]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 3)
      .map((item) => `${item.title} ${item.updatedAt}`);
  }, [cards]);

  const getCard = (id: string) => cards.find((card) => card.id === id)!;

  return (
    <>
      <Header
        title="数据仪表板"
        subtitle="猪价 · 水泥 · 能繁母猪 · 传奇生物 · 豆粕 · 锂矿"
        recentUpdates={recentUpdates}
        onCalendarClick={() => setIsCalendarOpen(true)}
      />
      <Dashboard>
        <div className="xl:col-span-5 grid grid-cols-1 gap-8">
          <ChartCard {...getCard('cement-price')}>
            <CementPrice />
          </ChartCard>
          <ChartCard {...getCard('legend-chart')}>
            <LegendChart />
          </ChartCard>
          <ChartCard {...getCard('sow-chart')}>
            <SowChart />
          </ChartCard>
          <ChartCard {...getCard('lithium-chart')}>
            <LithiumChart />
          </ChartCard>
          <ChartCard {...getCard('pig-price')}>
            <PigPrice />
          </ChartCard>
        </div>
        <SectionToc items={tocItems} />
      </Dashboard>
      <Calendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </>
  );
}

export default App;
