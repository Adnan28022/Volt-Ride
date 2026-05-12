import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/ApiUrl";

const API = axios.create({
    baseURL: `${API_BASE_URL}/reviews`,
    withCredentials: true,
});

// 1. Submit Review
export const submitReview = createAsyncThunk(
    "review/submit",
    async ({ userId, rideId, bikeId, rating, comment }, { rejectWithValue }) => {
        try {
            const response = await API.post("/submit", {
                userId, rideId, bikeId, rating, comment,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed");
        }
    }
);

// 2. Check Review
export const checkReview = createAsyncThunk(
    "review/check",
    async ({ rideId, userId }, { rejectWithValue }) => {
        try {
            const response = await API.get(`/check/${rideId}/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed");
        }
    }
);

// 3. Fetch Bike Reviews
export const fetchBikeReviews = createAsyncThunk(
    "review/fetchBike",
    async (bikeId, { rejectWithValue }) => {
        try {
            const response = await API.get(`/bike/${bikeId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed");
        }
    }
);

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews: [],
        avgRating: 0,
        hasReviewed: false,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearReviewState: (state) => {
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitReview.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.hasReviewed = true;
            })
            .addCase(submitReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(checkReview.fulfilled, (state, action) => {
                state.hasReviewed = action.payload.hasReviewed;
            })
            .addCase(fetchBikeReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.reviews;
                state.avgRating = action.payload.avgRating;
            });
    },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;