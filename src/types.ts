export type WinDigitCount = 2 | 3 | 4;

export type CopyFormat = 'space' | 'newline' | 'comma' | 'chunk10';

export interface WinOptions {
  digitCount: WinDigitCount;
  includeDoubles: boolean; // รวมเลขเบิ้ล เช่น 11, 22 หรือ 112, 121
  includeTriples: boolean; // รวมเลขตอง เช่น 111, 222 (สำหรับ 3 หรือ 4 ตัว)
  permuteAll: boolean; // กลับทุกประตู (true) หรือ ไม่กลับ/ชุดโต๊ด (false)
  excludedDigits: string[]; // เลขดับ/ไม่ต้องการ
}

export interface CombinationGroup {
  baseCombo: string;
  items: string[];
}

export interface WinResult {
  inputDigits: string;
  options: WinOptions;
  groups: CombinationGroup[];
  allNumbers: string[];
  totalCount: number;
  generatedAt: number;
}
