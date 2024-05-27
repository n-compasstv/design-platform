import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import userReducer from "../slices/userSlice";
import { designPlatformApi } from '../services/api';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [designPlatformApi.reducerPath]: designPlatformApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(designPlatformApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
// export const persistor = persistStore(store);