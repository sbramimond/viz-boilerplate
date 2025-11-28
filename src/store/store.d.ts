import {type StoreApi} from 'zustand';

type SetState<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean) => void;

type SliceCreator<T> = (set: SetState<T>, get: () => T, api: StoreApi<T>) => T;

export type {SetState, SliceCreator};
