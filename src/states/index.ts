import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

// 定义counter的原子状态
// export const counterAtom = atom({
//   a: 1,
// });

export const testState = atom(0);

export const counterAtom = atomWithImmer({
  value: 0,
});
