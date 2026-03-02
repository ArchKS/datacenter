import React, { useRef } from 'react';

export const CementPrice: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        className="absolute top-0 left-0 w-full h-full border-none"
        style={{ zoom: 0.6, marginTop: '-225px', marginLeft: '-138px', width: 'calc(100% + 300px)', height: 'calc(100% + 250px)' }}
        src="https://index.ccement.com/"
        title="水泥价格指数走势"
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    </div>
  );
};
