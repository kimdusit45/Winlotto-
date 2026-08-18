import React from 'react';
import { Dices, RotateCcw, Layers, HelpCircle, Edit3 } from 'lucide-react';
import { WinDigitCount } from '../types';

interface DigitInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onRandom: () => void;
  digitCount: WinDigitCount;
  onDigitCountChange: (count: WinDigitCount) => void;
}

export const DigitInput: React.FC<DigitInputProps> = ({
  value,
  onChange,
  onClear,
  onRandom,
  digitCount,
  onDigitCountChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 6);
    onChange(raw);
  };

  const uniqueCount = new Set(value.split('')).size;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 relative">
      {/* 1. Win Mode Selectors at the Top */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span className="text-xs sm:text-sm font-bold text-slate-800">เลือกประเภทการวิน:</span>
        </div>

        {/* Short & Concise Win Options (2 ตัว, 3 ตัว, 4 ตัว) */}
        <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
          {([2, 3, 4] as WinDigitCount[]).map((count) => {
            const isSelected = digitCount === count;
            return (
              <button
                key={count}
                type="button"
                onClick={() => onDigitCountChange(count)}
                className={`py-2 px-3 sm:px-5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-indigo-300'
                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                )}
                <span>วิน {count} ตัว</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Label & Quick Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        <label htmlFor="digit-direct-input" className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
          <Edit3 className="w-4 h-4 text-indigo-600" />
          <span>ช่องกรอกตัวเลขต้นทาง (กรอกได้สูงสุด 6 ตัว)</span>
        </label>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-500 font-medium mr-1">ตัวอย่าง:</span>
          <button
            type="button"
            onClick={() => onChange('123456')}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-indigo-50 text-indigo-700 hover:text-indigo-800 border border-slate-200 hover:border-indigo-300 font-mono font-semibold transition-colors cursor-pointer"
          >
            123456
          </button>
          <button
            type="button"
            onClick={() => onChange('012345')}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-800 border border-slate-200 hover:border-indigo-300 font-mono font-semibold transition-colors cursor-pointer"
          >
            012345
          </button>
          <button
            type="button"
            onClick={() => onChange('456789')}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-800 border border-slate-200 hover:border-indigo-300 font-mono font-semibold transition-colors cursor-pointer"
          >
            456789
          </button>
          <button
            type="button"
            onClick={onRandom}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Dices className="w-3.5 h-3.5 text-indigo-600" />
            <span>สุ่มเลข</span>
          </button>
        </div>
      </div>

      {/* 3. Direct Input Field (Proper Placeholder Size and Wording) */}
      <div className="space-y-2">
        <div className="relative rounded-2xl bg-slate-50/70 border-2 border-slate-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
          <input
            id="digit-direct-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={value}
            onChange={handleInputChange}
            placeholder="กรอกตัวเลขที่ต้องการวิน"
            className="w-full bg-transparent text-center text-2xl sm:text-3xl font-bold font-mono text-indigo-950 placeholder:text-slate-400 placeholder:text-sm sm:placeholder:text-base placeholder:font-normal placeholder:font-sans placeholder:tracking-normal py-4 sm:py-5 px-4 tracking-[0.2em] focus:outline-none"
            autoFocus
          />

          {value.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
              title="ล้างข้อมูล"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Input Stats */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div className="flex items-center gap-2">
            <span>
              จำนวนที่กรอก: <strong className="text-indigo-600 font-mono text-sm font-bold">{value.length}/6</strong> ตัว
            </span>
            {value.length > 0 && (
              <span className="text-slate-400">
                • ตัวเลขไม่ซ้ำ: <strong className="text-slate-700 font-mono font-semibold">{uniqueCount}</strong> ตัว
              </span>
            )}
          </div>
          {value.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-slate-500 hover:text-rose-600 text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              ล้างทั้งหมด
            </button>
          )}
        </div>
      </div>

      {/* 4. Helpful Guidance Note */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-600">
        <div className="w-7 h-7 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center flex-shrink-0 text-indigo-700">
          <HelpCircle className="w-4 h-4" />
        </div>
        <p className="leading-relaxed">
          สามารถพิมพ์หรือกรอกตัวเลขที่ต้องการวินด้วยตัวเองในช่องด้านบนได้ทันที (รองรับสูงสุด 6 ตัวเลข)
        </p>
      </div>
    </div>
  );
};
