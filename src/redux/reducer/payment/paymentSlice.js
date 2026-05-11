import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/ApiUrl";

const API = axios.create({
    baseURL: `${API_BASE_URL}/payment`,
    withCredentials: true,
});

// ================= ASYNC THUNKS =================

// 1. Create Payment Intent
export const createPaymentIntent = createAsyncThunk(
    "payment/createIntent",
    async ({ amount, userId }, { rejectWithValue }) => {
        try {
            const response = await API.post("/create-intent", { amount, userId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed");
        }
    }
);

// 2. Confirm Payment — Wallet Update
export const confirmPayment = createAsyncThunk(
    "payment/confirm",
    async ({ paymentIntentId, userId, amount }, { rejectWithValue }) => {
        try {
            const response = await API.post("/confirm", {
                paymentIntentId,
                userId,
                amount,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed");
        }
    }
);

// 3. Record Ride Deduction
export const recordDeduction = createAsyncThunk(
    "payment/deduct",
    async ({ userId, amount, rideId }, { rejectWithValue }) => {
        try {
            const response = await API.post("/deduct", { userId, amount, rideId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed");
        }
    }
);

// 4. Fetch User Payment History
export const fetchUserPayments = createAsyncThunk(
    "payment/fetchUserPayments",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await API.get(`/user/${userId}`);
            return response.data.payments;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed");
        }
    }
);

// ================= SLICE =================

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        payments: [],          // User payment history
        clientSecret: null,    // Stripe client secret
        loading: false,
        error: null,
        success: false,
        message: null,
    },
    reducers: {
        clearPaymentState: (state) => {
            state.error = null;
            state.success = false;
            state.message = null;
            state.clientSecret = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Intent
            .addCase(createPaymentIntent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPaymentIntent.fulfilled, (state, action) => {
                state.loading = false;
                state.clientSecret = action.payload.clientSecret;
            })
            .addCase(createPaymentIntent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Confirm Payment
            .addCase(confirmPayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(confirmPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(confirmPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Record Deduction
            .addCase(recordDeduction.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })

            // Fetch Payments
            .addCase(fetchUserPayments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload;
            })
            .addCase(fetchUserPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;