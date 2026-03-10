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
    <aside className="hidden xl:block fixed right-6 top-28 w-56 z-20">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm border border-[#e5e5e5] p-4">
        <div className="text-sm font-semibold text-[#1d1d1f] mb-3">页面目录</div>
        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-[#3a3a3c] hover:text-[#0071e3] transition-colors"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};
