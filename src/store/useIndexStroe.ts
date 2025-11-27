import {create} from 'zustand';

interface State {
    count: number;
    increment: (count: number) => void;
}

export default create<State>((set) => ({
    count: 1,
    increment: (count: number) => set((state) => ({ count: state.count + 1 })),
}));
