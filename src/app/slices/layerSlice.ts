import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/UserModel";
import { KonvaElementType } from "../types/KonvaTypes";

type LayerState = {
  layers: KonvaElementType[];
};

const initialState: LayerState = {
  layers: [],
};

export const layerSlice = createSlice({
  name: "layer",
  initialState,
  reducers: {
    setLayers: (state, action: PayloadAction<KonvaElementType[]>) => {
      state.layers = action.payload;
    },
  },
});

export const { setLayers } = layerSlice.actions;

export default layerSlice.reducer;
