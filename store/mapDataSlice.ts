import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  region: string;
}

const initialState: AppState = {
  region: "India",
};

const mapDataSlice = createSlice({
  name: 'mapData',
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<string>) {
      state.region = action.payload;
    },
  },
});

export const { setRegion } = mapDataSlice.actions;
export default mapDataSlice.reducer;
