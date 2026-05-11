import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/ApiUrl";

const API = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    withCredentials: true,
});

export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => { try { const response = await API.post("/register", userData); return response.data; } catch (error) { return rejectWithValue(error.response.data.message); } });
export const verifyOTP = createAsyncThunk("auth/verifyOTP", async (otpData, { rejectWithValue }) => { try { const response = await API.post("/verify-otp", otpData); return response.data; } catch (error) { return rejectWithValue(error.response.data.message); } });
export const loginUser = createAsyncThunk("auth/login", async (loginData, { rejectWithValue }) => { try { const response = await API.post("/login", loginData); return response.data; } catch (error) { return rejectWithValue(error.response.data.message); } });
export const fetchAllUsers = createAsyncThunk("auth/fetchAllUsers", async (_, { rejectWithValue }) => { try { const response = await API.get("/users"); return response.data; } catch (error) { return rejectWithValue(error.response.data.message); } });
export const deleteUserAccount = createAsyncThunk("auth/deleteUser", async (id, { rejectWithValue }) => { try { const response = await API.delete(`/user/${id}`); return { id, message: response.data.message }; } catch (error) { return rejectWithValue(error.response.data.message); } });
export const resendOTP = createAsyncThunk("auth/resendOTP", async (email, { rejectWithValue }) => { try { const response = await API.post("/resend-otp", { email }); return response.data; } catch (error) { return rejectWithValue(error.response.data.message); } });
export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => { try { const response = await API.get("/logout"); return response.data; } catch (error) { return rejectWithValue(error.response.data.message); } });
export const confirmWalletTopup = createAsyncThunk("auth/confirmWalletTopup", async ({ paymentIntentId, userId, amount }, { rejectWithValue }) => { try { const response = await axios.post(`${API_BASE_URL}/payment/confirm`, { paymentIntentId, userId, amount }, { withCredentials: true }); return response.data; } catch (error) { return rejectWithValue(error.response?.data?.message || "Payment failed"); } });

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, users: [], loading: false, error: null, message: null, isAuthenticated: false },
    reducers: {
        clearErrors: (state) => { state.error = null; },
        clearMessages: (state) => { state.message = null; },
        deductWalletBalance: (state, action) => { if (state.user) { state.user.walletBalance = Math.max(0, (state.user.walletBalance || 0) - action.payload); } },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message; })
            .addCase(verifyOTP.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message; })
            .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; state.isAuthenticated = true; state.message = action.payload.message; })
            .addCase(fetchAllUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload.users || action.payload || []; })
            .addCase(deleteUserAccount.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message; state.users = state.users.filter((u) => u._id !== action.payload.id); })
            .addCase(resendOTP.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message; })
            .addCase(logoutUser.fulfilled, (state) => { state.loading = false; state.user = null; state.users = []; state.isAuthenticated = false; state.message = "Logged out successfully"; })
            .addCase(confirmWalletTopup.fulfilled, (state, action) => { state.loading = false; if (state.user && action.payload.walletBalance !== undefined) { state.user.walletBalance = action.payload.walletBalance; } })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => { state.loading = true; state.error = null; })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => { state.loading = false; state.error = action.payload; });
    },
});

export const { clearErrors, clearMessages, deductWalletBalance } = authSlice.actions;
export default authSlice.reducer;
