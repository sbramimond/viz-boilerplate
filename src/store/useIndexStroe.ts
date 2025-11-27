import {create} from 'zustand';

import type {SetState, SliceCreator} from './store.d';

interface CountState {
    count: number;
    increment: () => void;
}

interface DataState {
    data: Record<string, string>;
    request: () => Promise<void>;
}

export let countSlice: SliceCreator<CountState> = (set: SetState<CountState>) => ({
    count: 1,
    increment: () => set((state) => ({count: state.count + 1})),
});

// 创建数据获取的slice
export let fatchSlice: SliceCreator<DataState> = (set: SetState<DataState>) => ({
    data: {},
    request: async () => {
        let response = await fetch('/api/getDetail/');
        let {data = {}} = await response.json();

        set({data});
    },
});

export default create<CountState & DataState>((set, get, api) => ({
    ...countSlice(set, get, api),
    ...fatchSlice(set, get, api),
}));
