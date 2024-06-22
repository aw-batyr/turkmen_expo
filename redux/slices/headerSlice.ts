import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type activeLangType = {
  title: 'Ру' | 'En';
  // title: 'Ру' | 'Tm' | 'En';
  // localization: "ru" | "tm" | "en";
  localization: 'ru' | 'en';
};

interface HeaderState {
  activeLang: activeLangType;
  showInput: boolean;
}

const initialState: HeaderState = {
  activeLang: { title: 'Ру', localization: 'ru' },
  showInput: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setActiveLang(state, action: PayloadAction<activeLangType>) {
      state.activeLang = action.payload;
    },
    setShowInput(state, action: PayloadAction<boolean>) {
      state.showInput = action.payload;
    },
  },
});

export const selectHeader = (state: RootState) => state.headerSlice;

export const { setActiveLang, setShowInput } = headerSlice.actions;

export default headerSlice.reducer;
