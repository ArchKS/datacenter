import React from 'react';

export const PigPrice: React.FC = () => {
  return (
    <div className="w-full h-[550px] overflow-auto bg-[#f8fafc] rounded-2xl flex justify-center">
      <a
        href="https://zhujia.zhuwang.com.cn/"
        target="_blank"
        rel="noreferrer"
        className="block"
        title="打开猪价网站"
      >
        <img
          src="/images/pig-price.jpg"
          alt="生猪价格走势截图"
          className="block w-auto h-auto max-w-[80vw] rounded-xl shadow-sm cursor-pointer"
        />
      </a>
    </div>
  );
};
