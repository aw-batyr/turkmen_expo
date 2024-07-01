import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Props {
  faqStatus: string;
}

const initialState: Props = {
  faqStatus: "all",
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setFaqStatus(state, action: PayloadAction<string>) {
      state.faqStatus = action.payload;
    },
  },
});

export const selectFaq = (state: RootState) => state.faqSlice;

export const { setFaqStatus } = faqSlice.actions;

export default faqSlice.reducer;
