import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  loading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError } = appSlice.actions;
export default appSlice.reducer;
