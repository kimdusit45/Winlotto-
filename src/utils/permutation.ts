import { CombinationGroup, WinOptions, WinResult } from '../types';

/**
 * Helper to generate all unique permutations of an array of characters
 */
function getPermutations(arr: string[]): string[] {
  if (arr.length <= 1) return [arr.join('')];
  
  const results = new Set<string>();
  
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const subPerms = getPermutations(remaining);
    
    for (const sub of subPerms) {
      results.add(current + sub);
    }
  }
  
  return Array.from(results);
}

/**
 * Helper to generate k-combinations from an array of elements
 */
function getCombinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  if (arr.length === k) return [arr];
  
  const [head, ...tail] = arr;
  const withHead = getCombinations(tail, k - 1).map(combo => [head, ...combo]);
  const withoutHead = getCombinations(tail, k);
  
  return [...withHead, ...withoutHead];
}

/**
 * Main engine to generate "Win" number permutations and combinations
 */
export function calculateWinNumbers(
  rawInput: string,
  options: WinOptions
): WinResult {
  // Clean input digits, keeping only 0-9
  const cleanedDigits = rawInput.replace(/\D/g, '');
  
  // Filter out excluded digits
  const filteredDigits = cleanedDigits
    .split('')
    .filter(d => !options.excludedDigits.includes(d));
  
  // Distinct digits
  const uniqueDigits = Array.from(new Set(filteredDigits)).sort();
  
  const k = options.digitCount;
  const groups: CombinationGroup[] = [];
  const allNumbersSet = new Set<string>();
  const allNumbersOrdered: string[] = [];

  const addNumber = (num: string, groupList?: string[]) => {
    if (!allNumbersSet.has(num)) {
      allNumbersSet.add(num);
      allNumbersOrdered.push(num);
      if (groupList && !groupList.includes(num)) {
        groupList.push(num);
      }
    }
  };

  // 1. Standard distinct digit combinations & permutations
  if (uniqueDigits.length >= k) {
    const combos = getCombinations(uniqueDigits, k);
    
    for (const combo of combos) {
      const baseComboStr = combo.join('');
      const groupItems: string[] = [];
      
      if (options.permuteAll) {
        // Generate all permutations e.g. for [1,2,3] -> 123, 132, 213, 231, 312, 321
        const perms = getPermutations(combo);
        // Sort permutations alphabetically / numerically from base
        perms.forEach(p => addNumber(p, groupItems));
      } else {
        // Combinations only (ชุดโต๊ด/ไม่กลับ)
        addNumber(baseComboStr, groupItems);
      }
      
      if (groupItems.length > 0) {
        groups.push({
          baseCombo: baseComboStr,
          items: groupItems,
        });
      }
    }
  }

  // 2. Optional: Include doubles / haam (เลขเบิ้ล / เลขหาม)
  if (options.includeDoubles && uniqueDigits.length >= 1) {
    if (k === 2) {
      // 2 digits doubles: 11, 22, 33...
      const doubleGroupItems: string[] = [];
      for (const d of uniqueDigits) {
        const doubleNum = d + d;
        addNumber(doubleNum, doubleGroupItems);
      }
      if (doubleGroupItems.length > 0) {
        groups.push({
          baseCombo: 'เลขเบิ้ล (2 ตัว)',
          items: doubleGroupItems,
        });
      }
    } else if (k === 3 && uniqueDigits.length >= 2) {
      // 3 digits haam / doubles: e.g. from {1, 2}: (1,1,2) -> 112, 121, 211 and (1,2,2) -> 122, 212, 221
      const doubleCombos = getCombinations(uniqueDigits, 2);
      for (const [a, b] of doubleCombos) {
        // Group for A double + B
        const group1Items: string[] = [];
        const perms1 = options.permuteAll
          ? getPermutations([a, a, b])
          : [`${a}${a}${b}`];
        perms1.forEach(p => addNumber(p, group1Items));
        
        if (group1Items.length > 0) {
          groups.push({
            baseCombo: `${a}${a}${b} (เบิ้ล/หาม)`,
            items: group1Items,
          });
        }

        // Group for B double + A
        const group2Items: string[] = [];
        const perms2 = options.permuteAll
          ? getPermutations([a, b, b])
          : [`${a}${b}${b}`];
        perms2.forEach(p => addNumber(p, group2Items));
        
        if (group2Items.length > 0) {
          groups.push({
            baseCombo: `${a}${b}${b} (เบิ้ล/หาม)`,
            items: group2Items,
          });
        }
      }
    } else if (k === 4 && uniqueDigits.length >= 2) {
      // 4 digits with doubles: 1 double + 2 distinct (e.g. 1,1,2,3) or 2 doubles (1,1,2,2)
      // 1 double + 2 distinct:
      if (uniqueDigits.length >= 3) {
        const triplets = getCombinations(uniqueDigits, 3);
        for (const [a, b, c] of triplets) {
          // Double 'a'
          const g1: string[] = [];
          (options.permuteAll ? getPermutations([a, a, b, c]) : [`${a}${a}${b}${c}`]).forEach(p => addNumber(p, g1));
          if (g1.length > 0) groups.push({ baseCombo: `${a}${a}${b}${c} (เบิ้ล 1 คู่)`, items: g1 });

          // Double 'b'
          const g2: string[] = [];
          (options.permuteAll ? getPermutations([a, b, b, c]) : [`${a}${b}${b}${c}`]).forEach(p => addNumber(p, g2));
          if (g2.length > 0) groups.push({ baseCombo: `${a}${b}${b}${c} (เบิ้ล 1 คู่)`, items: g2 });

          // Double 'c'
          const g3: string[] = [];
          (options.permuteAll ? getPermutations([a, b, c, c]) : [`${a}${b}${c}${c}`]).forEach(p => addNumber(p, g3));
          if (g3.length > 0) groups.push({ baseCombo: `${a}${b}${c}${c} (เบิ้ล 1 คู่)`, items: g3 });
        }
      }
      // 2 pairs of doubles: e.g. 1,1,2,2
      const pairs = getCombinations(uniqueDigits, 2);
      for (const [a, b] of pairs) {
        const g: string[] = [];
        (options.permuteAll ? getPermutations([a, a, b, b]) : [`${a}${a}${b}${b}`]).forEach(p => addNumber(p, g));
        if (g.length > 0) groups.push({ baseCombo: `${a}${a}${b}${b} (เบิ้ล 2 คู่)`, items: g });
      }
    }
  }

  // 3. Optional: Include triples / all identical (เลขตอง / สี่ตัวเหมือน)
  if (options.includeTriples && uniqueDigits.length >= 1) {
    const tripleGroupItems: string[] = [];
    for (const d of uniqueDigits) {
      const sameNum = d.repeat(k);
      addNumber(sameNum, tripleGroupItems);
    }
    if (tripleGroupItems.length > 0) {
      groups.push({
        baseCombo: k === 3 ? 'เลขตอง (3 ตัวเหมือน)' : `เลขเหมือน (${k} ตัว)`,
        items: tripleGroupItems,
      });
    }
  }

  return {
    inputDigits: rawInput,
    options,
    groups,
    allNumbers: allNumbersOrdered,
    totalCount: allNumbersOrdered.length,
    generatedAt: Date.now(),
  };
}

/**
 * Format numbers for copying or displaying according to chosen style
 */
export function formatResultText(numbers: string[], format: 'space' | 'newline' | 'comma' | 'chunk10'): string {
  if (numbers.length === 0) return '';
  
  switch (format) {
    case 'space':
      return numbers.join(' ');
    case 'newline':
      return numbers.join('\n');
    case 'comma':
      return numbers.join(', ');
    case 'chunk10': {
      const lines: string[] = [];
      for (let i = 0; i < numbers.length; i += 10) {
        lines.push(numbers.slice(i, i + 10).join(' '));
      }
      return lines.join('\n');
    }
    default:
      return numbers.join(' ');
  }
}
