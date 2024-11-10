import { useCallback, useState } from 'react';
import { Draft, freeze, produce } from 'immer';

export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = S | DraftFunction<S>;
export type ImmerHook<S> = [S, (updater: Updater<S>) => void];

export function useImmer<T>(initialState: T | (() => T)): ImmerHook<T> {
  const [state, setState] = useState<T>(() =>
    freeze(typeof initialState === 'function' ? (initialState as () => T)() : initialState)
  );

  const setImmerState = useCallback((updater: Updater<T>) => {
    setState(currentState => {
      if (typeof updater === 'function') {
        return freeze(produce(currentState, updater as DraftFunction<T>));
      }
      return freeze(updater);
    });
  }, []);

  return [state, setImmerState];
}
