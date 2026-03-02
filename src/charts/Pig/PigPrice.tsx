import React, { useRef } from 'react';

export const PigPrice: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        className="absolute top-0 left-0 w-full h-full border-none"
        style={{ zoom: 0.6, marginTop: '-200px', marginLeft: '-250px', width: 'calc(100% + 300px)', height: 'calc(100% + 800px)' }}
        src="https://zhujia.zhuwang.com.cn/"
        title="生猪价格走势"
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    </div>
  );
};
