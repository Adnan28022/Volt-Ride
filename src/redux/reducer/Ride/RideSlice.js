import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/ApiUrl";


const API_URL = `${API_BASE_URL}/rides`;

// --- ASYNC THUNKS ---

// 1. Fetch All Rides (Admin)
export const fetchAllRides = createAsyncThunk(
  "rides/fetchAllRides",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`, {
        withCredentials: true,
      });
      return response.data.rides;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch all rides",
      );
    }
  },
);

// 2. Fetch User's Ride History
export const fetchUserRides = createAsyncThunk(
  "rides/fetchUserRides",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        withCredentials: true,
      });
      return response.data.rides;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch history",
      );
    }
  },
);

// 3. Get Active Ride Status (Pge load par check karne ke liye)
export const getActiveRide = createAsyncThunk(
  "rides/getActiveRide",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/active/${userId}`, {
        withCredentials: true,
      });
      return response.data; // Includes { active: true/false, ride: {} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to check active ride",
      );
    }
  },
);

// 4. Bulk Check Status (Multiple Users)
export const checkBulkStatus = createAsyncThunk(
  "rides/checkBulkStatus",
  async (userIds, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/check-bulk`,
        { userIds },
        { withCredentials: true },
      );
      return response.data.activeMap;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Bulk check failed",
      );
    }
  },
);

// --- SLICE ---

const rideSlice = createSlice({
  name: "rides",
  initialState: {
    allRides: [], // Admin ke liye
    userRides: [], // Current user history
    activeRide: null, // Current ongoing ride details
    isRiding: false, // Boolean flag for UI toggles
    bulkStatus: {}, // { userId: true/false }
    loading: false,
    error: null,
  },
  reducers: {
    clearRideError: (state) => {
      state.error = null;
    },
    // Jab user logout kare toh ride state clear kar dein
    resetRideState: (state) => {
      state.activeRide = null;
      state.isRiding = false;
      state.userRides = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Rides
      .addCase(fetchAllRides.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRides.fulfilled, (state, action) => {
        state.loading = false;
        state.allRides = action.payload;
      })

      // User History
      .addCase(fetchUserRides.fulfilled, (state, action) => {
        state.loading = false;
        state.userRides = action.payload;
      })

      // Get Active Ride (Bohat zaroori for App Launch)
      .addCase(getActiveRide.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActiveRide.fulfilled, (state, action) => {
        state.loading = false;
        state.isRiding = action.payload.active;
        state.activeRide = action.payload.ride || null;
      })
      .addCase(getActiveRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Bulk Status
      .addCase(checkBulkStatus.fulfilled, (state, action) => {
        state.bulkStatus = action.payload;
      });
  },
});

export const { clearRideError, resetRideState } = rideSlice.actions;
export default rideSlice.reducer;
