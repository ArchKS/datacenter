import React from 'react';
import { CloseIcon } from './Header';

interface HoldvisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HoldvisModal: React.FC<HoldvisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-[96vw] h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[#1d1d1f]">HoldVis</h2>
            <p className="text-sm text-[#86868b] mt-1">投资组合可视化</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="关闭">
            <CloseIcon className="text-[#86868b]" />
          </button>
        </div>
        <iframe title="HoldVis" src="/holdvis/portfolio_visualization.html" className="w-full flex-1 bg-[#f5f7fb]" />
      </div>
    </div>
  );
};
