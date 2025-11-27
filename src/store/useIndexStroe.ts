import {create, type StoreApi} from 'zustand';

import type {SliceCreator} from './store.d';

interface State {
    count: number;
    increment: () => void;
}

export let countSlice: SliceCreator<State> = (set) => ({
    count: 1,
    increment: () => set((state) => ({count: state.count + 1})),
});

export default create<State>((set, get, api) => ({
    ...countSlice(set, get, api),
}));
