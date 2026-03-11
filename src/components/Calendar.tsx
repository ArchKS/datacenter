import React from 'react';
import { holdingsFocus } from '../data/holdingsFocus';

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

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-[95vw] h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[#1d1d1f]">持仓关注重点</h2>
            <p className="text-sm text-[#86868b] mt-1">内容来自配置文件，可按持仓自由增删；点击图标后展示各公司年度关键跟踪节点与研究重点。</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="关闭"
          >
            <CloseIcon className="text-[#86868b]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-[#f5f7fb]">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {holdingsFocus.map((holding) => (
              <section
                key={`${holding.company}-${holding.ticker}`}
                className="rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-6 md:p-7"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold text-[#1d1d1f]">{holding.company}</h3>
                  <span className="inline-flex items-center rounded-full bg-[#2563eb]/10 text-[#2563eb] px-3 py-1 text-sm font-medium">
                    {holding.ticker}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#f1f5f9] text-[#475569] px-3 py-1 text-sm font-medium">
                    {holding.market}
                  </span>
                </div>

                <div className="space-y-4">
                  {holding.items.map((item, index) => (
                    <article
                      key={`${holding.company}-${item.title}`}
                      className="rounded-2xl border border-[#e5e7eb] bg-[#fbfdff] p-4 md:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-[15px] md:text-base font-semibold text-[#111827] leading-6">
                            {item.title}
                          </h4>
                          <p className="mt-2 text-sm md:text-[15px] leading-7 text-[#4b5563]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
