import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/ApiUrl";


// API Base URL
const API_URL = `${API_BASE_URL}/stations`;

// 1. Fetch All Stations
export const fetchStations = createAsyncThunk(
  "stations/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching stations",
      );
    }
  },
);

// 2. Fetch Specific Station Details
export const getStationDetails = createAsyncThunk(
  "stations/fetchDetails",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

// 3. Add New Station
export const addStation = createAsyncThunk(
  "stations/add",
  async (stationData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/add`, stationData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

// 4. Update Station
export const updateStation = createAsyncThunk(
  "stations/update",
  async ({ id, ...stationData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, stationData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

// 5. Delete Station
export const deleteStation = createAsyncThunk(
  "stations/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; // ID return kar rahe hain taake state se remove kar saken
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

// 6. Park Bike at Station
export const parkBikeAtStation = createAsyncThunk(
  "stations/parkBike",
  async (parkData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/park`, parkData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

const stationSlice = createSlice({
  name: "stations",
  initialState: {
    items: [],
    selectedStation: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedStation: (state) => {
      state.selectedStation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchStations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Details
      .addCase(getStationDetails.fulfilled, (state, action) => {
        state.selectedStation = action.payload;
      })

      // Add Station
      .addCase(addStation.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update Station
      .addCase(updateStation.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (s) => s._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete Station
      .addCase(deleteStation.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s._id !== action.payload);
      })

      // Park Bike
      .addCase(parkBikeAtStation.fulfilled, (state, action) => {
        // Update specific station count in list after parking
        const index = state.items.findIndex(
          (s) => s._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { clearSelectedStation } = stationSlice.actions;
export default stationSlice.reducer;
