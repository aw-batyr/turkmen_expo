import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Props {
  radioStatus: string;
  bidStatus: boolean;
  submited: boolean;
}

const initialState: Props = {
  radioStatus: "equipped",
  bidStatus: false,
  submited: false,
};

const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {
    setRadioStatus(state, action) {
      state.radioStatus = action.payload;
    },
    setBidStatus(state, action) {
      state.bidStatus = action.payload;
    },
    setSumbited(state, action) {
      state.submited = action.payload;
    },
  },
});

export const selectBid = (state: RootState) => state.bidSlice;

export const { setRadioStatus, setBidStatus, setSumbited } = bidSlice.actions;

export default bidSlice.reducer;
