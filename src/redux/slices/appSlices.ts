import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TApp = {
  token: string;
  username: string;
};
const initalValues: TApp = {
  token: "",
  username: "",
};
const appSlice = createSlice({
  name: "appSlice",
  initialState: initalValues,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateInfo: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});
export const { updateToken, updateInfo } = appSlice.actions;
export default appSlice.reducer;
