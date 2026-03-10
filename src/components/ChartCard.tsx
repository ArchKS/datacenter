import React, { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  id?: string;
  fullWidth?: boolean;
  minHeight?: string;
  children: ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, id, fullWidth = false, minHeight, children }) => {
  return (
    <div
      id={id}
      className={`bg-white rounded-3xl overflow-hidden relative transition-all duration-500 hover:shadow-2xl ${
        fullWidth ? 'col-span-full' : ''
      }`}
      style={{
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="px-8 pt-8 pb-4">
        <h2 className="text-2xl font-semibold text-[#1d1d1f]">{title}</h2>
      </div>
      <div className="p-8 relative overflow-hidden" style={minHeight ? { minHeight } : undefined}>
        {children}
      </div>
    </div>
  );
};
