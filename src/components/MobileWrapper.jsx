import React from 'react';

const MobileWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="relative w-full max-w-[375px] h-[812px] bg-slate-50 rounded-[3rem] shadow-2xl border-8 border-slate-900 overflow-hidden relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-2xl z-50"></div>
        
        {/* Status Bar Time (Mock) */}
        <div className="absolute top-2 left-6 text-white text-xs font-bold z-50">9:41</div>
        
        {/* Status Bar Icons (Mock) */}
        <div className="absolute top-2 right-6 flex gap-1 z-50">
          <div className="w-4 h-3 bg-white rounded-sm"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>

        {/* Content Container - Ensure absolute positioning works relative to this */}
        <div className="w-full h-full overflow-hidden relative bg-slate-50">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-900/20 rounded-full z-50"></div>
      </div>
    </div>
  );
};

export default MobileWrapper;
