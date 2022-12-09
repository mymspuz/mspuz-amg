import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: {error: string} = {
    error: ''
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        clearError: (state) => {
            state.error = ''
        }
    }
})

export const { setError, clearError } = errorSlice.actions

export default errorSlice.reducer