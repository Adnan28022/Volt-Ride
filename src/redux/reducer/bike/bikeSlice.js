import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/ApiUrl";


const API_URL = `${API_BASE_URL}/bikes`;

// --- ASYNC THUNKS ---

// 1. Fetch All Bikes
export const fetchBikes = createAsyncThunk(
  "bikes/fetchBikes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch bikes",
      );
    }
  },
);

// 2. Add New Bike
export const addBike = createAsyncThunk(
  "bikes/addBike",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return response.data.bike;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to add bike",
      );
    }
  },
);

// 3. Unlock Bike (Start Ride)
export const unlockBike = createAsyncThunk(
  "bikes/unlockBike",
  async ({ bikeCode, userId, lat, lng }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/unlock`,
        { bikeCode, userId, lat, lng },
        { withCredentials: true },
      );
      // Return bike and ride data
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Invalid QR or Code",
      );
    }
  },
);

// 4. Update Live Location (New API)
// Is thunk ko frontend par setInterval se call karein
export const updateBikeLocation = createAsyncThunk(
  "bikes/updateBikeLocation",
  async ({ rideId, bikeId, lat, lng }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/update-location`,
        { rideId, bikeId, lat, lng },
        { withCredentials: true },
      );
      // Backend status return karega, hum state update ke liye local data bhejte hain
      return { bikeId, lat, lng };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Sync failed");
    }
  },
);

// 5. Lock Bike (End Ride)
export const lockBike = createAsyncThunk(
  "bikes/lockBike",
  async ({ bikeId, stationId, totalCost, lat, lng }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/lock`,
        { bikeId, stationId, totalCost, lat, lng },
        { withCredentials: true },
      );
      return response.data.bike;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to lock bike",
      );
    }
  },
);

// 6. Update Bike Info
export const updateBike = createAsyncThunk(
  "bikes/updateBike",
  async ({ id, bikeData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, bikeData, { // ✅ bikeData
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data.bike;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update bike",
      );
    }
  },
);

// 7. Delete Bike
export const deleteBike = createAsyncThunk(
  "bikes/deleteBike",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to delete bike",
      );
    }
  },
);

// --- BIKE SLICE ---

const bikeSlice = createSlice({
  name: "bikes",
  initialState: {
    bikes: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearBikeState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Bikes
      .addCase(fetchBikes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.loading = false;
        state.bikes = action.payload;
      })
      .addCase(fetchBikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Bike
      .addCase(addBike.fulfilled, (state, action) => {
        state.bikes.unshift(action.payload);
        state.success = true;
      })

      // Unlock Bike (Ride Start)
      .addCase(unlockBike.pending, (state) => {
        state.loading = true;
      })
      .addCase(unlockBike.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBike = action.payload.bike;
        const index = state.bikes.findIndex((b) => b._id === updatedBike._id);
        if (index !== -1) {
          state.bikes[index] = updatedBike; // Status "Riding" ho jayega
        }
        state.success = true;
      })
      .addCase(unlockBike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- LIVE LOCATION UPDATE ---
      .addCase(updateBikeLocation.fulfilled, (state, action) => {
        const { bikeId, lat, lng } = action.payload;
        const index = state.bikes.findIndex((b) => b._id === bikeId);
        if (index !== -1) {
          // Admin map ke liye state mein hi bike ki location update kar dena
          state.bikes[index].location = { lat, lng };
        }
      })

      // Lock Bike (Ride End)
      .addCase(lockBike.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bikes.findIndex(
          (b) => b._id === action.payload._id,
        );
        if (index !== -1) {
          state.bikes[index] = action.payload; // Status "Available" aur new station update
        }
        state.success = true;
      })

      // Update Info
      .addCase(updateBike.fulfilled, (state, action) => {
        const index = state.bikes.findIndex(
          (b) => b._id === action.payload._id,
        );
        if (index !== -1) {
          state.bikes[index] = action.payload;
        }
        state.success = true;
      })

      // Delete Bike
      .addCase(deleteBike.fulfilled, (state, action) => {
        state.bikes = state.bikes.filter((b) => b._id !== action.payload);
      });
  },
});

export const { clearBikeState } = bikeSlice.actions;
export default bikeSlice.reducer;
