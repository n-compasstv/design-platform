import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/UserModel";
import { KonvaElementType } from "../types/KonvaTypes";

type LayerState = {
  layers: KonvaElementType[];
  selectedLayer: KonvaElementType | undefined;
};

const initialState: LayerState = {
  layers: [],
  selectedLayer: undefined
};

export const layerSlice = createSlice({
  name: "layer",
  initialState,
  reducers: {
    setLayers: (state, action: PayloadAction<KonvaElementType[]>) => {
      state.layers = action.payload;
    },

    setSelectedLayer: (state, action: PayloadAction<KonvaElementType | undefined>) => {
      state.selectedLayer = action.payload;
    },
  },
});

export const { setLayers, setSelectedLayer } = layerSlice.actions;

export default layerSlice.reducer;
