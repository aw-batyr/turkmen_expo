import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BurgerTypes {
  footerDrop: string;
  burgerMenu: boolean;
  burgerDrop: string;
}

const initialState: BurgerTypes = {
  burgerDrop: "",
  footerDrop: "",
  burgerMenu: false,
};

const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    setFooterDrop(state, action: PayloadAction<string>) {
      state.footerDrop = action.payload;
    },
    setBurgerMenu(state, action: PayloadAction<boolean>) {
      state.burgerMenu = action.payload;
    },
    setBurgerDrop(state, action: PayloadAction<string>) {
      state.burgerDrop = action.payload;
    },
  },
});

export const selectBurger = (state: RootState) => state.burgerSlice;

export const { setFooterDrop, setBurgerMenu, setBurgerDrop } =
  burgerSlice.actions;

export default burgerSlice.reducer;
