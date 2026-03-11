export interface FocusItem {
  title: string;
  description: string;
}

export interface HoldingFocus {
  company: string;
  ticker: string;
  market: string;
  items: FocusItem[];
}

export const holdingsFocus: HoldingFocus[] = [
  {
    company: '再鼎医药',
    ticker: 'ZLAB / 9688.HK',
    market: '美股 / 港股',
    items: [
      {
        title: 'ASCO（通常 5月摘要、6月开会）',
        description:
          '这是再鼎最值得盯的年度肿瘤大节点之一。如果有重要肿瘤管线数据更新，ASCO 往往是市场先交易的地方。',
      },
      {
        title: 'ESMO（通常 9-10月）',
        description:
          '如果公司今年肿瘤资产有更成熟读数，ESMO 可能是下半年关键催化剂。',
      },
      {
        title: 'AACR（通常 4月）',
        description:
          '偏早期/转化数据，如果再鼎今年想强化研发平台叙事，这也是要看的窗口。',
      },
      {
        title: 'JPM / 年度战略更新（通常年初已发生，明年也会继续）',
        description:
          'JPM 更像“讲故事和定框架”的节点，不一定给硬数据，但会影响全年市场预期底稿。',
      },
    ],
  },
  {
    company: '传奇生物',
    ticker: 'LEGN',
    market: '美股',
    items: [
      {
        title: 'ASCO（通常 5月摘要、6月开会）',
        description:
          '如果 CARVYKTI 或更早线治疗相关数据在 ASCO 更新，市场通常会优先交易疗效深度、缓解持续性和适应症拓展预期。',
      },
      {
        title: 'EHA / 欧洲血液学会（通常 6月）',
        description:
          '血液瘤领域对传奇生物很关键。若有 CAR-T 新数据、亚组分析或安全性更新，EHA 往往是重要观察窗口。',
      },
      {
        title: 'CARTITUDE-5 数据（下半年重点）',
        description:
          '如果下半年 CARTITUDE-5 有关键数据读出或更成熟更新，这会是传奇生物全年最重要的临床催化剂之一。市场会重点看更早线治疗中的疗效深度、安全性与未来标签拓展空间。',
      },
    ],
  },
];
