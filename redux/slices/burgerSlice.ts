import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BurgerTypes {
  footerDrop: string;
  burgerOpen: boolean;
  burgerDrop: string;
}

const initialState: BurgerTypes = {
  burgerDrop: "",
  footerDrop: "",
  burgerOpen: false,
};

const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    setFooterDrop(state, action: PayloadAction<string>) {
      state.footerDrop = action.payload;
    },
    setBurgerOpen(state, action: PayloadAction<boolean>) {
      state.burgerOpen = action.payload;
    },
    setBurgerDrop(state, action: PayloadAction<string>) {
      state.burgerDrop = action.payload;
    },
  },
});

export const selectBurger = (state: RootState) => state.burgerSlice;

export const { setFooterDrop, setBurgerOpen, setBurgerDrop } =
  burgerSlice.actions;

export default burgerSlice.reducer;
