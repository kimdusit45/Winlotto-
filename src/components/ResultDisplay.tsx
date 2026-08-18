import React, { useState } from 'react';
import { WinResult, CopyFormat } from '../types';
import { formatResultText } from '../utils/permutation';
import {
  Copy,
  Check,
  Download,
  List,
  LayoutGrid,
  FileText,
  Search,
  Sparkles,
  Layers,
} from 'lucide-react';

interface ResultDisplayProps {
  result: WinResult | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [copyFormat, setCopyFormat] = useState<CopyFormat>('space');
  const [copied, setCopied] = useState(false);
  const [copiedSingle, setCopiedSingle] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'grouped' | 'raw'>('grouped');
  const [searchFilter, setSearchFilter] = useState('');

  if (!result || result.allNumbers.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-10 text-center space-y-3 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
          <Layers className="w-7 h-7" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-slate-800">
          ยังไม่มีผลลัพธ์การวินตัวเลข
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          กรอกตัวเลข 6 ตัว (เช่น <strong className="text-indigo-600 font-mono">123456</strong>) แล้วกดปุ่มคำนวณเพื่อดูผลลัพธ์
        </p>
      </div>
    );
  }

  const rawFormattedText = formatResultText(result.allNumbers, copyFormat);

  // Copy full result to clipboard
  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(rawFormattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Copy single number
  const handleCopySingle = async (num: string) => {
    try {
      await navigator.clipboard.writeText(num);
      setCopiedSingle(num);
      setTimeout(() => setCopiedSingle(null), 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Download as text file
  const handleDownload = () => {
    const blob = new Blob([rawFormattedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `win-${result.options.digitCount}digits-${result.inputDigits}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered numbers
  const filteredNumbers = searchFilter.trim()
    ? result.allNumbers.filter((n) => n.includes(searchFilter.trim()))
    : result.allNumbers;

  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              ผลลัพธ์การวิน {result.options.digitCount} ตัว
            </h2>
            <span className="text-xs text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 font-bold">
              ทั้งหมด {result.totalCount} ชุด
            </span>
          </div>
          <p className="text-xs text-slate-500">
            ตัวเลขต้นทาง: <span className="text-indigo-600 font-bold font-mono text-sm">{result.inputDigits}</span>
            {result.options.excludedDigits.length > 0 && (
              <span className="text-rose-600 font-medium ml-2">
                (ตัดเลข: {result.options.excludedDigits.join(', ')})
              </span>
            )}
          </p>
        </div>

        {/* Action Buttons: Copy All & Export */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyAll}
            className={`flex-1 sm:flex-none py-2.5 px-5 rounded-xl font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-95 shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-200'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>คัดลอกลงคลิปบอร์ดแล้ว!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>คัดลอกทั้งหมด ({result.totalCount} ชุด)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            title="ดาวน์โหลดเป็นไฟล์ข้อความ (.txt)"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Control Strip: Format switcher, View mode, Quick Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
        {/* Copy Format Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-medium mr-1">รูปแบบคัดลอก:</span>
          <button
            type="button"
            onClick={() => setCopyFormat('space')}
            className={`px-2.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
              copyFormat === 'space'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-bold shadow-xs'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            เว้นวรรค
          </button>
          <button
            type="button"
            onClick={() => setCopyFormat('newline')}
            className={`px-2.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
              copyFormat === 'newline'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-bold shadow-xs'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            ขึ้นบรรทัดใหม่
          </button>
          <button
            type="button"
            onClick={() => setCopyFormat('comma')}
            className={`px-2.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
              copyFormat === 'comma'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-bold shadow-xs'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            คั่นจุลภาค (,)
          </button>
          <button
            type="button"
            onClick={() => setCopyFormat('chunk10')}
            className={`px-2.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
              copyFormat === 'chunk10'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-bold shadow-xs'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            แถวละ 10 ชุด
          </button>
        </div>

        {/* View Mode & Quick Filter */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative flex-1 sm:w-44">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาตัวเลข..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:bg-white"
            />
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grouped')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grouped'
                  ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="จัดกลุ่มตามชุดเลข"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="การ์ดตัวเลขทั้งหมด"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('raw')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'raw'
                  ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="กล่องข้อความดิบ"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Results View */}
      {viewMode === 'grouped' && (
        <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
          {result.groups.map((group, gIdx) => {
            const visibleItems = searchFilter
              ? group.items.filter((item) => item.includes(searchFilter.trim()))
              : group.items;

            if (visibleItems.length === 0) return null;

            return (
              <div
                key={gIdx}
                className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 space-y-2.5"
              >
                {/* Group Title */}
                <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    <span className="text-slate-600">
                      ชุดหลัก: <strong className="text-slate-900 font-bold text-sm font-mono">{group.baseCombo}</strong>
                    </span>
                    <span className="text-slate-400">({visibleItems.length} ชุด)</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(visibleItems.join(' '));
                      setCopiedSingle(`group-${gIdx}`);
                      setTimeout(() => setCopiedSingle(null), 1500);
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSingle === `group-${gIdx}` ? 'คัดลอกแล้ว!' : 'คัดลอกกลุ่มนี้'}
                  </button>
                </div>

                {/* Group Items */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {visibleItems.map((num) => {
                    const isCopied = copiedSingle === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleCopySingle(num)}
                        title="คลิกเพื่อคัดลอกเลขนี้"
                        className={`font-mono text-sm sm:text-base font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-sm'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 shadow-xs'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5 sm:gap-2">
            {filteredNumbers.map((num, idx) => {
              const isCopied = copiedSingle === num;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCopySingle(num)}
                  title="คลิกเพื่อคัดลอกเลขนี้"
                  className={`font-mono text-sm sm:text-base font-bold py-2 px-1 rounded-lg border transition-all text-center cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 shadow-xs'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'raw' && (
        <div className="space-y-2">
          <textarea
            readOnly
            value={rawFormattedText}
            rows={8}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-sm sm:text-base text-slate-800 leading-relaxed focus:outline-none focus:border-indigo-400 focus:bg-white select-all custom-scrollbar"
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
          <p className="text-xs text-slate-500">
            * คลิกในกล่องเพื่อเลือกข้อความทั้งหมด หรือกดปุ่ม "คัดลอกทั้งหมด" ด้านบน
          </p>
        </div>
      )}

      {/* Bottom Footer Info */}
      <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <span>ประเภท: วิน {result.options.digitCount} ตัว</span>
          <span>|</span>
          <span>แสดง: {filteredNumbers.length} / {result.totalCount} ชุด</span>
          <span>|</span>
          <span className="text-emerald-600 font-medium">คำนวณเสร็จสมบูรณ์</span>
        </div>
        <div className="text-slate-500">
          สามารถกดคลิกที่ตัวเลขแต่ละตัวเพื่อคัดลอกแยกได้
        </div>
      </div>
    </section>
  );
};
