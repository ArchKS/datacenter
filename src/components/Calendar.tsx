import React, { useMemo } from 'react';

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

interface CalendarEvent {
  date: string; // MM-DD format
  title: string;
  description: string;
  category: 'soybean' | 'pig' | 'legend' | 'lithium';
}

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

// 解析calendar.md内容生成事件
const parseCalendarEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const currentYear = new Date().getFullYear();

  // ========== 豆粕事件 ==========

  // 每月10-12日 USDA WASDE报告
  const wasdeMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  wasdeMonths.forEach(month => {
    events.push({
      date: `${month}-10`,
      title: '豆粕:WASDE报告',
      description: '全球大豆供需平衡表',
      category: 'soybean'
    });
  });

  // 3月31日 种植意向报告
  events.push({
    date: '03-31',
    title: '豆粕:种植意向报告',
    description: '美豆种植面积基调',
    category: 'soybean'
  });

  // 6月30日 种植面积报告
  events.push({
    date: '06-30',
    title: '豆粕:种植面积报告',
    description: '定调美豆产量上限',
    category: 'soybean'
  });

  // ========== 生猪（能繁母猪）事件 ==========

  // Q4数据 (1月15-18日) - 只显示第一天
  events.push({
    date: '01-15',
    title: '生猪:能繁母猪Q4',
    description: '统计局季度数据',
    category: 'pig'
  });

  // Q1数据 (4月15-18日) - 只显示第一天
  events.push({
    date: '04-15',
    title: '生猪:能繁母猪Q1',
    description: '统计局季度数据',
    category: 'pig'
  });

  // Q2数据 (7月15-18日) - 只显示第一天
  events.push({
    date: '07-15',
    title: '生猪:能繁母猪Q2',
    description: '统计局季度数据',
    category: 'pig'
  });

  // Q3数据 (10月15-18日) - 只显示第一天
  events.push({
    date: '10-15',
    title: '生猪:能繁母猪Q3',
    description: '统计局季度数据',
    category: 'pig'
  });

  // ========== 传奇生物事件 ==========

  events.push({
    date: '03-10',
    title: '传奇生物:电话会',
    description: '电话会议',
    category: 'legend'
  });

  // ========== 锂矿事件 ==========

  // 每周四 锂矿库存数据
  for (let month = 1; month <= 12; month++) {
    const date = new Date(currentYear, month - 1, 1);
    while (date.getMonth() === month - 1) {
      if (date.getDay() === 4) { // 周四
        const dateStr = `${String(month).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        events.push({
          date: dateStr,
          title: '锂矿:库存',
          description: '库存总数&去库存数',
          category: 'lithium'
        });
      }
      date.setDate(date.getDate() + 1);
    }
  }

  return events;
};

export const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose }) => {
  const currentYear = new Date().getFullYear();
  const events = useMemo(() => parseCalendarEvents(), []);

  // 生成日历数据
  const generateCalendar = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const firstDay = new Date(currentYear, month, 1);
      const lastDay = new Date(currentYear, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days = [];

      // 填充空白
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }

      // 填充日期
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(e => e.date === dateStr);
        days.push({ day, events: dayEvents });
      }

      months.push({
        name: new Date(currentYear, month).toLocaleString('zh-CN', { month: 'long' }),
        days
      });
    }
    return months;
  };

  const calendarData = useMemo(() => generateCalendar(), [currentYear, events]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'soybean': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pig': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'legend': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'lithium': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryBorderColor = (category: string) => {
    switch (category) {
      case 'soybean': return 'border-l-blue-500';
      case 'pig': return 'border-l-purple-500';
      case 'legend': return 'border-l-orange-500';
      case 'lithium': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-[95vw] h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[#1d1d1f]">{currentYear}年数据日历</h2>
            <p className="text-sm text-[#86868b] mt-1">重要报告与事件发布日期</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="关闭"
          >
            <CloseIcon className="text-[#86868b]" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex-shrink-0 px-8 py-4 bg-gray-50 border-b border-gray-200 flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-[#86868b]">豆粕</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-[#86868b]">生猪</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm text-[#86868b]">传奇生物</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-[#86868b]">锂矿</span>
          </div>
        </div>

        {/* Calendar Grid - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calendarData.map((month, monthIndex) => (
              <div key={monthIndex} className="bg-gray-50 rounded-2xl p-4">
                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-3 text-center">{month.name}</h3>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                    <div key={day} className="text-[#86868b] font-medium py-1">{day}</div>
                  ))}
                  {month.days.map((day, dayIndex) => {
                    if (day === null) {
                      return <div key={dayIndex} className="h-16"></div>;
                    }
                    const hasEvents = day.events.length > 0;
                    return (
                      <div
                        key={dayIndex}
                        className={`h-24 p-1 rounded-lg text-xs border ${
                          hasEvents ? 'bg-white border-gray-200 shadow-sm' : 'border-transparent'
                        }`}
                      >
                        <div className="font-semibold text-[#1d1d1f] mb-1">{day.day}</div>
                        {hasEvents && (
                          <div className="space-y-0.5">
                            {day.events.map((event, i) => (
                              <div
                                key={i}
                                className={`text-[10px] px-1 py-0.5 rounded border-l-2 ${getCategoryColor(event.category)} ${getCategoryBorderColor(event.category)}`}
                                title={`${event.title}: ${event.description}`}
                              >
                                {event.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
