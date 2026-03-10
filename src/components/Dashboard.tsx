import React, { ReactNode } from 'react';

interface DashboardProps {
  children: ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <main className="grid grid-cols-1 xl:grid-cols-6 gap-8 max-w-[1600px] mx-auto px-6 pb-24 items-start">
      {children}
    </main>
  );
};
