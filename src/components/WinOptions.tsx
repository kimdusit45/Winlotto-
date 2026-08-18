import React from 'react';
import { WinOptions as WinOptionsType } from '../types';
import { Calculator, RotateCcw, SlidersHorizontal, ShieldAlert } from 'lucide-react';

interface WinOptionsProps {
  options: WinOptionsType;
  inputLength: number;
  availableDigits: string[];
  onChange: (options: WinOptionsType) => void;
  onCalculate: () => void;
  onResetAll: () => void;
}

export const WinOptions: React.FC<WinOptionsProps> = ({
  options,
  inputLength,
  availableDigits,
  onChange,
  onCalculate,
  onResetAll,
}) => {
  const toggleExcludeDigit = (digit: string) => {
    const isExcluded = options.excludedDigits.includes(digit);
    const newExcluded = isExcluded
      ? options.excludedDigits.filter((d) => d !== digit)
      : [...options.excludedDigits, digit];
    onChange({
      ...options,
      excludedDigits: newExcluded,
    });
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 relative">
      {/* 1. Compact Toggle Buttons Row (Matching Style of Image 2) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
            <span>ตัวเลือกการคำนวณเพิ่มเติม:</span>
          </span>
          <span className="text-[11px] text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            กำลังเลือก: วิน {options.digitCount} ตัว
          </span>
        </div>

        {/* 3 Short Compact Toggle Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {/* Button 1: กลับทุกประตู */}
          <button
            type="button"
            onClick={() => onChange({ ...options, permuteAll: !options.permuteAll })}
            className={`py-2.5 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              options.permuteAll
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-indigo-300'
                : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            {options.permuteAll && (
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs flex-shrink-0" />
            )}
            <span className="truncate">กลับทุกประตู</span>
          </button>

          {/* Button 2: รวมเบิ้ล/หาม */}
          <button
            type="button"
            onClick={() => onChange({ ...options, includeDoubles: !options.includeDoubles })}
            className={`py-2.5 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              options.includeDoubles
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-indigo-300'
                : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            {options.includeDoubles && (
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs flex-shrink-0" />
            )}
            <span className="truncate">รวมเบิ้ล/หาม</span>
          </button>

          {/* Button 3: เลขตอง */}
          <button
            type="button"
            onClick={() => onChange({ ...options, includeTriples: !options.includeTriples })}
            className={`py-2.5 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              options.includeTriples
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-indigo-300'
                : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            {options.includeTriples && (
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs flex-shrink-0" />
            )}
            <span className="truncate">เลขตอง</span>
          </button>
        </div>

        {/* Exclude Digits Option */}
        {availableDigits.length > 0 && (
          <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-600 flex items-center gap-1 font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>ตัดเลขดับ (คลิกเพื่อตัดออก):</span>
            </span>
            {availableDigits.map((d) => {
              const isExcluded = options.excludedDigits.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleExcludeDigit(d)}
                  className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                    isExcluded
                      ? 'bg-rose-100 text-rose-700 border border-rose-300 line-through'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                  title={isExcluded ? `ยกเลิกการตัดเลข ${d}` : `ตัดเลข ${d} ออก`}
                >
                  {d}
                </button>
              );
            })}
            {options.excludedDigits.length > 0 && (
              <button
                type="button"
                onClick={() => onChange({ ...options, excludedDigits: [] })}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium underline ml-1 cursor-pointer"
              >
                ล้างเลขดับ
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. Action Section: Calculate & Reset */}
      <div className="pt-1 flex gap-3 h-14 sm:h-16">
        {/* Calculate Button */}
        <button
          type="button"
          onClick={onCalculate}
          disabled={inputLength === 0}
          className="flex-1 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-600 text-white font-bold tracking-wide rounded-2xl shadow-md shadow-indigo-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <Calculator className="w-5 h-5 stroke-[2.5]" />
          <span>คำนวณผลลัพธ์วินเลข</span>
        </button>

        {/* Reset All Button */}
        <button
          type="button"
          onClick={onResetAll}
          title="รีเซ็ตค่าใหม่ทั้งหมด"
          className="w-20 sm:w-24 flex items-center justify-center border border-slate-200 bg-slate-50 rounded-2xl hover:bg-rose-50 hover:border-rose-200 group transition-all active:scale-[0.98] cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 text-slate-400 group-hover:text-rose-600 transition-colors" />
        </button>
      </div>
    </div>
  );
};
