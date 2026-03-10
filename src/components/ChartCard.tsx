import React, { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  updatedAt?: string;
  updateSchedule?: string;
  id?: string;
  fullWidth?: boolean;
  minHeight?: string;
  children: ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, updatedAt, updateSchedule, id, fullWidth = false, minHeight, children }) => {
  return (
    <section
      id={id}
      className={`glass-card section-anchor-offset rounded-[2rem] overflow-hidden relative transition-all duration-300 hover:-translate-y-0.5 ${
        fullWidth ? 'col-span-full' : ''
      }`}
    >
      <div className="px-7 pt-7 pb-4 md:px-8 md:pt-8 md:pb-5 flex items-center justify-between gap-4 border-b border-white/60">
        <div className="min-w-0">
          <h2 className="text-[22px] md:text-[24px] font-semibold tracking-[-0.02em] text-[#111827]">{title}</h2>
        </div>
        {(updateSchedule || updatedAt) ? (
          <span className="text-xs md:text-sm text-[#8b95a7] whitespace-nowrap">
            {updateSchedule ? `${updateSchedule}更新` : ''}
            {updateSchedule && updatedAt ? '  ·  ' : ''}
            {updatedAt ? `最近更新：${updatedAt}` : ''}
          </span>
        ) : null}
      </div>
      <div className="p-6 md:p-8 relative overflow-hidden" style={minHeight ? { minHeight } : undefined}>
        {children}
      </div>
    </section>
  );
};
