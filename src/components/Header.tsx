import React from 'react';
import { Sparkles, CheckCircle2, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="space-y-3 pt-2 pb-1 text-center">
      {/* Top Status Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-sm text-xs text-slate-600 font-medium">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-slate-800 font-semibold">ระบบคำนวณวินตัวเลข</span>
        <span className="text-slate-300">|</span>
        <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md text-[11px]">
          คำนวณอัตโนมัติ
        </span>
        <span className="hidden sm:inline text-emerald-600 font-medium text-[11px] flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> พร้อมใช้งานทันที
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-1.5 max-w-2xl mx-auto px-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 flex items-center justify-center gap-2.5">
          <span className="p-2 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-200">
            <Zap className="w-6 h-6 sm:w-7 sm:h-7" />
          </span>
          <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-800 bg-clip-text text-transparent">
            โปรแกรมวินตัวเลข 2 ตัว 3 ตัว 4 ตัว
          </span>
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          สลับตัวเลขทุกตำแหน่งจากชุดตัวเลข <strong className="text-indigo-600 font-mono font-semibold">6 ตัว</strong> รวดเร็ว แม่นยำ และกดคัดลอกไปใช้งานได้ทันที
        </p>
      </div>
    </header>
  );
};
