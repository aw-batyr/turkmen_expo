import { baseAPI } from '@/lib/API';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { activeLangType } from './headerSlice';

export const fetchAbout = createAsyncThunk(
  'about/fetchAbout',
  async ({ activeLang }: { activeLang: activeLangType }) => {
    const res = await fetch(`${baseAPI}settings/about_us${activeLang.localization}`);

    const data = await res.json();

    return data;
  },
);

interface AboutType {
  aboutData: string;
}

const initialState: AboutType = {
  aboutData: '',
};

const aboutSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    setAboutUsData(state, action) {
      state.aboutData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAbout.pending, (state) => {
      console.log('pending');
    });

    builder.addCase(fetchAbout.fulfilled, (state, action) => {
      console.log('success', action.payload);
      state.aboutData = action.payload;
    });

    builder.addCase(fetchAbout.rejected, (state) => {
      console.log('error');
    });
  },
});

export const { setAboutUsData } = aboutSlice.actions;

export default aboutSlice.reducer;
