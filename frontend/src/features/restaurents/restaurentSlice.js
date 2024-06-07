import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restaurentService from "./restaurentService";

const initialState = {
    restaurents: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new restaurent
export const createRestaurent = createAsyncThunk('restaurents/create', async (restaurentData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await restaurentService.createRestaurent(restaurentData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get restaurents
export const getRestaurents = createAsyncThunk('restaurents/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await restaurentService.getRestaurents(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete restaurent
export const deleteRestaurent = createAsyncThunk('restaurents/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await restaurentService.deleteRestaurent(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateRestaurent = createAsyncThunk('restaurents/update', async ({ id, restaurentData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await restaurentService.updateRestaurent(id, restaurentData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const restaurentSlice = createSlice({
    name: 'restaurent',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createRestaurent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createRestaurent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.restaurents.push(action.payload);
        })
        .addCase(createRestaurent.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getRestaurents.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getRestaurents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.restaurents = action.payload;
        })
        .addCase(getRestaurents.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteRestaurent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteRestaurent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.restaurents = state.restaurents.filter((restaurent) => restaurent._id !== action.payload.id);
        })
        .addCase(deleteRestaurent.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateRestaurent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateRestaurent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            const index = state.restaurents.findIndex(rest => rest._id === action.payload._id);
            if (index !== -1) {
                state.restaurents[index] = action.payload;
            }
        })
        .addCase(updateRestaurent.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const {reset} = restaurentSlice.actions
export default restaurentSlice.reducer