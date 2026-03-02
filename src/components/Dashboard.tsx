import React, { ReactNode } from 'react';

interface DashboardProps {
  children: ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1440px] mx-auto px-6 pb-20">
      {children}
    </div>
  );
};
