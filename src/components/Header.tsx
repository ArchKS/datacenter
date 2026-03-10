import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  recentUpdates?: string[];
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

export const Header: React.FC<HeaderProps> = ({ title, recentUpdates = [], onCalendarClick }) => {
  return (
    <header className="relative px-6 pt-10 pb-10 md:pt-14 md:pb-14">
      <div className="max-w-[1600px] mx-auto">
        <div className="glass-card rounded-[2rem] px-8 py-8 md:px-10 md:py-10 flex items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center rounded-full bg-[#2563eb]/10 text-[#2563eb] px-3 py-1 text-sm font-medium mb-4">
              DataCenter Dashboard
            </div>
            <h1 className="apple-hero-title">{title}</h1>
            <p className="mt-4 text-[15px] md:text-[17px] text-[#6b7280] max-w-3xl leading-7">
              聚合展示生猪、水泥、能繁母猪、传奇生物与锂矿等核心跟踪数据，面向研究与日常监控场景。
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
              <span className="font-medium text-[#475569]">最近更新：</span>
              {recentUpdates.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 border border-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onCalendarClick}
            className="shrink-0 h-12 w-12 rounded-2xl bg-white text-[#2563eb] border border-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
            aria-label="打开日历"
            title="查看数据日历"
          >
            <CalendarIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
