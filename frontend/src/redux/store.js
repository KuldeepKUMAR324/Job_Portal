import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice";
import jobSlice from "./jobSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  PAUSE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

// Redux Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine all your reducers
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
});

// Apply persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer, // ✅ Use the correct reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;
