import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth/AuthSlice";
import bikeReducer from "./reducer/bike/bikeSlice";
import stationReducer from "./reducer/station/stationSlice";
import rideReducer from "./reducer/Ride/RideSlice";
import paymentReducer from "./reducer/payment/paymentSlice";
import reviewReducer from "./reducer/review/reviewSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// ✅ Safe storage — falls back to in-memory if localStorage is unavailable
const createSafeStorage = () => {
  // In-memory fallback (used if localStorage is blocked or window is undefined)
  const memoryStorage = (() => {
    const store = {};
    return {
      getItem: (key) => Promise.resolve(store[key] ?? null),
      setItem: (key, value) => { store[key] = value; return Promise.resolve(); },
      removeItem: (key) => { delete store[key]; return Promise.resolve(); },
    };
  })();

  if (typeof window === "undefined") return memoryStorage;

  try {
    // Test that localStorage actually works (can be blocked in private mode)
    localStorage.setItem("__test__", "1");
    localStorage.removeItem("__test__");
    return {
      getItem: (key) => Promise.resolve(localStorage.getItem(key)),
      setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
      removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
    };
  } catch {
    return memoryStorage;
  }
};

const storageEngine = createSafeStorage();

// ✅ Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  bikes: bikeReducer,
  stations: stationReducer,
  rides: rideReducer,
  payment: paymentReducer,
  review: reviewReducer,
});

// ✅ Persist config — only auth is persisted (wallet balance lives here)
const persistConfig = {
  key: "root",
  version: 1,
  storage: storageEngine,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);