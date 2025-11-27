import {create} from 'zustand';

import type {SetState, SliceCreator} from './store.d';

interface CountState {
    count: number;
    increment: () => void;
}

interface DataState {
    data: Record<string, any>;
    request: () => Promise<void>;
}

// data: any | null;
// loading: boolean;
// error: string | null;
// fetchData: () => Promise<void>;

/*
data: null,
loading: false,
error: null,
fetchData: async () => {
    set({ loading: true, error: null });
    try {
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: 'Data fetched successfully!' });
            }, 1000);
        });
        set({ data: response, loading: false });
    } catch (err) {
        set({
            error: err instanceof Error ? err.message : 'An error occurred',
            loading: false
        });
    }
},
*/

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
