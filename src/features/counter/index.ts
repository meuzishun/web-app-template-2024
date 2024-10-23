import type { CounterState } from './types';
import {
  counterSlice,
  increment,
  decrement,
  incrementByAmount,
} from './slices';
import { useCounter } from './hooks';

export type { CounterState };
export { counterSlice, increment, decrement, incrementByAmount, useCounter };
