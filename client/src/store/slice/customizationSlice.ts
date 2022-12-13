import { createSlice } from '@reduxjs/toolkit'

import { fontFamily, borderRadius } from '../../presentation/theme/constants'

type TInitialState = {
    isOpen: string[]
    fontFamily: string
    borderRadius: number
    opened: boolean
    openedChatSidebar: boolean
}

const initialState: TInitialState = {
    isOpen: [],
    fontFamily: fontFamily,
    borderRadius: borderRadius,
    opened: true,
    openedChatSidebar: true
}

const customizationSlice = createSlice({
    name: 'customization',
    initialState,
    reducers: {
        menuOpen: (state, action) => {
            state.isOpen = [action.payload]
        },
        chatOpen: (state, action) => {
            state.openedChatSidebar = action.payload
        },
        setStoreMenu: (state, action) => {
            state.opened = action.payload
        },
        setStoreFontFamily: (state, action) => {
            state.fontFamily = action.payload
        },
        setStoreBorderRadius: (state, action) => {
            state.borderRadius = action.payload
        }
    }
})

export const { menuOpen, chatOpen, setStoreMenu, setStoreFontFamily, setStoreBorderRadius } = customizationSlice.actions

export default customizationSlice.reducer