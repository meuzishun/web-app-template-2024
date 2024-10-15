import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../store/slices/counterSlice';

export const useCounter = () => {
  const appDispatch = useAppDispatch();
  const counterValue = useAppSelector((state) => state.counter.value);
  const incrementCount = () => appDispatch(increment());
  const decrementCount = () => appDispatch(decrement());
  const incrementCountBy = (value: number) =>
    appDispatch(incrementByAmount(value));

  return {
    counterValue,
    incrementCount,
    decrementCount,
    incrementCountBy,
  };
};
