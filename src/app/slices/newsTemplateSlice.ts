import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewsTemplateType } from "../types/NewsTemplateTypes";

type NewsTemplateState = {
  template: NewsTemplateType | undefined;
};

const initialState: NewsTemplateState = {
  template: undefined,
};

export const newsTemplateSlice = createSlice({
  name: "newsTemplate",
  initialState,
  reducers: {
    setNewsTemplate: (state, action: PayloadAction<NewsTemplateType>) => {
      state.template = action.payload;
    },

  },
});

export const { setNewsTemplate } = newsTemplateSlice.actions;

export default newsTemplateSlice.reducer;
