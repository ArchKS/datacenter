import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  onCalendarClick?: () => void;
}

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export { CloseIcon };

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onCalendarClick }) => {
  return (
    <header className="relative pt-20 pb-16 px-6">
      <button
        onClick={onCalendarClick}
        className="absolute top-8 right-8 p-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="打开日历"
        title="查看数据日历"
      >
        <CalendarIcon className="text-[#0071e3]" />
      </button>
      <div className="text-center">
        <h1 className="apple-hero-title mb-4">{title}</h1>
        <p className="apple-subtitle">{subtitle}</p>
      </div>
    </header>
  );
};
