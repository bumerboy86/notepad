import { configureStore } from '@reduxjs/toolkit';
import noteSlice from './note.slice';

export const store = configureStore({
    reducer: {
        note: noteSlice,
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;