import React from 'react';

export const CementPrice: React.FC = () => {
  return (
    <div className="w-full h-full overflow-auto bg-[#f8fafc] rounded-2xl flex justify-center">
      <a
        href="https://index.ccement.com/all.html"
        target="_blank"
        rel="noreferrer"
        className="block"
        title="打开水泥价格指数网站"
      >
        <img
          src="/images/cement-price.jpg"
          alt="水泥价格走势截图"
          className="block w-auto h-auto max-w-[80vw] rounded-xl shadow-sm cursor-pointer"
        />
      </a>
    </div>
  );
};
