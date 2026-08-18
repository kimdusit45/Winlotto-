import React, { useState, useMemo, useEffect } from 'react';
import { WinOptions as WinOptionsType, WinResult } from './types';
import { calculateWinNumbers } from './utils/permutation';
import { Header } from './components/Header';
import { DigitInput } from './components/DigitInput';
import { WinOptions } from './components/WinOptions';
import { ResultDisplay } from './components/ResultDisplay';

export function App() {
  // 1. Digits state (up to 6 digits) - initially empty so placeholder is visible
  const [digits, setDigits] = useState<string>('');

  // 2. Win options state
  const [options, setOptions] = useState<WinOptionsType>({
    digitCount: 3,
    permuteAll: true,
    includeDoubles: false,
    includeTriples: false,
    excludedDigits: [],
  });

  // 3. Computed or manually generated result
  const [result, setResult] = useState<WinResult | null>(null);

  // Available unique digits from input
  const availableDigits = useMemo(() => {
    return Array.from(new Set(digits.split(''))).sort();
  }, [digits]);

  // Handle calculate action
  const handleCalculate = () => {
    if (digits.length === 0) return;
    const res = calculateWinNumbers(digits, options);
    setResult(res);
  };

  // Auto-calculate on option changes if digits exist
  useEffect(() => {
    if (digits.length >= 2) {
      const res = calculateWinNumbers(digits, options);
      setResult(res);
    } else {
      setResult(null);
    }
  }, [digits, options]);

  // Reset to default
  const handleResetAll = () => {
    setDigits('');
    setOptions({
      digitCount: 3,
      permuteAll: true,
      includeDoubles: false,
      includeTriples: false,
      excludedDigits: [],
    });
  };

  // Generate 6 random non-repeating digits
  const handleRandom = () => {
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    const randStr = nums.slice(0, 6).join('');
    setDigits(randStr);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-sky-50/50 text-slate-800 flex flex-col selection:bg-indigo-500 selection:text-white font-sans relative overflow-x-hidden pb-10">
      {/* Decorative cheerful background soft blurs */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/3 -right-40 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-40 left-1/3 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
        {/* Header */}
        <Header />

        {/* 1. Large 6-Digit Direct Input Section with Win Mode Selectors */}
        <section aria-label="ช่องกรอกตัวเลข 6 หลัก">
          <DigitInput
            value={digits}
            onChange={(val) => setDigits(val)}
            onClear={() => setDigits('')}
            onRandom={handleRandom}
            digitCount={options.digitCount}
            onDigitCountChange={(count) => setOptions((prev) => ({ ...prev, digitCount: count }))}
          />
        </section>

        {/* 2. Win Options & Action Buttons (Calculate, Reset, Advanced Parameters) */}
        <section aria-label="ตัวเลือกและปุ่มคำนวณ">
          <WinOptions
            options={options}
            inputLength={digits.length}
            availableDigits={availableDigits}
            onChange={setOptions}
            onCalculate={handleCalculate}
            onResetAll={handleResetAll}
          />
        </section>

        {/* 3. Result Display with Matrix Grid, Grouping and Instant Copy */}
        <section aria-label="ผลลัพธ์การวินตัวเลข">
          <ResultDisplay result={result} />
        </section>
      </main>
    </div>
  );
}

export default App;
