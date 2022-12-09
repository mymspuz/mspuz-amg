import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TAuthResponse, TRole } from '../../data/AuthTypes'

const initialState: TAuthResponse = {
    role: '',
    token: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAll: (state, action: PayloadAction<TAuthResponse>) => {
            state.role = action.payload.role
            state.token = action.payload.token
        },
        setRole: (state, action: PayloadAction<TRole>) => {
            state.role = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        clearAll: (state) => {
            state.role = ''
            state.token = ''
        }
    }
})

export const { setAll, clearAll, setRole, setToken } = authSlice.actions

export default authSlice.reducer