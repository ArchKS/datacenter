import React from 'react';

interface TocItem {
  id: string;
  title: string;
}

interface SectionTocProps {
  items: TocItem[];
}

export const SectionToc: React.FC<SectionTocProps> = ({ items }) => {
  return (
    <aside className="hidden xl:block xl:col-span-1 order-last self-start sticky top-6 h-fit">
      <div className="glass-card rounded-[1.5rem] p-3 min-h-[80vh]">
        <div className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#94a3b8] mb-3 px-2">目录</div>
        <nav className="flex flex-col gap-1.5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-[#334155] hover:text-[#2563eb] hover:bg-[#2563eb]/6 transition-colors rounded-xl px-2 py-2 leading-5"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};
