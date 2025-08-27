import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../feature/authSlice"; // your auth slice
import categoryReducer from "../feature/categorySlice";
import propertyReducer from "../feature/propertySlice";
import propertyCategoryReducer from "../feature/propertyCategorySlice"
import usersReducer from "../feature/userSlice"
import serviceReducer from "../feature/serviceSlice"
import dahboardReucer from "../feature/dashboardSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  property: propertyReducer,
  propertyCategory: propertyCategoryReducer,
  users: usersReducer,
  services: serviceReducer,
  dashboard: dahboardReucer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "category"], // 👈 use "auth" instead of "user"
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch: () => AppDispatch = useDispatch;
