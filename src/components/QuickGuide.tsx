import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, CheckCircle2 } from 'lucide-react';

export const QuickGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>คำแนะนำการใช้งานและตัวอย่างผลลัพธ์การวินตัวเลข</span>
        </span>
        <span className="p-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
          {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-600" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* 3 Digits Example */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-indigo-600 block text-xs">
                วิน 3 ตัว (จากเลข 6 ตัว)
              </span>
              <p className="text-slate-600 text-xs">
                จาก <code className="text-slate-900 font-bold font-mono">123456</code> จะได้ทั้งหมด <strong className="text-indigo-600 font-mono">120 ชุด</strong> (ไม่รวมเบิ้ล)
              </p>
              <div className="bg-white p-2 rounded-lg text-[11px] font-mono text-indigo-900 border border-slate-200">
                ตัวอย่าง: 123, 124, 125, 126, 134, 135...
              </div>
            </div>

            {/* 2 Digits Example */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-indigo-600 block text-xs">
                วิน 2 ตัว (จากเลข 6 ตัว)
              </span>
              <p className="text-slate-600 text-xs">
                จาก <code className="text-slate-900 font-bold font-mono">123456</code> จะได้ทั้งหมด <strong className="text-indigo-600 font-mono">30 ชุด</strong> (ไม่รวมเบิ้ล) หรือ 36 ชุด (รวมเบิ้ล)
              </p>
              <div className="bg-white p-2 rounded-lg text-[11px] font-mono text-indigo-900 border border-slate-200">
                ตัวอย่าง: 12, 13, 14, 15, 16, 21, 23...
              </div>
            </div>

            {/* 4 Digits Example */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-indigo-600 block text-xs">
                วิน 4 ตัว (จากเลข 6 ตัว)
              </span>
              <p className="text-slate-600 text-xs">
                จาก <code className="text-slate-900 font-bold font-mono">123456</code> จะได้ทั้งหมด <strong className="text-indigo-600 font-mono">360 ชุด</strong> (ไม่รวมเบิ้ล)
              </p>
              <div className="bg-white p-2 rounded-lg text-[11px] font-mono text-indigo-900 border border-slate-200">
                ตัวอย่าง: 1234, 1235, 1236, 1243...
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>ขั้นตอนง่ายๆ ใน 3 สเต็ป:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 text-xs pl-1 font-sans">
              <li>เลือกประเภทการวิน เช่น <strong>วิน 2 ตัว</strong>, <strong>วิน 3 ตัว</strong> หรือ <strong>วิน 4 ตัว</strong></li>
              <li>พิมพ์หรือกรอกตัวเลขที่ต้องการ 6 ตัว ในช่องด้านบน (หรือกดปุ่มสุ่ม/ตัวอย่าง)</li>
              <li>กดปุ่ม <strong>คำนวณผลลัพธ์วินเลข</strong> และกด <strong>คัดลอกทั้งหมด</strong> เพื่อนำตัวเลขไปใช้งานได้ทันที</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
