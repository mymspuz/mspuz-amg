import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IChatDialog, IChatMessage, IChatMessages, IChatNewMessageResponse, IChatState } from '../../data/ChatTypes'

const initialState: IChatState = {
    dialogs: [],
    selectDialog: 0
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatDialogs: (state, action: PayloadAction<IChatDialog[]>) => {
            state.dialogs = action.payload
        },
        setChatMessages: (state, action: PayloadAction<IChatMessages>) => {
            if (action.payload.messages.length) {
                const index = state.dialogs.findIndex(c => c.user.id === action.payload.id)
                if (index > -1) {
                    state.dialogs[index].messages = action.payload.messages
                }
            }
        },
        addChatMessage: (state, action: PayloadAction<IChatNewMessageResponse>) => {
            const index = state.dialogs.findIndex(d => d.user.id === action.payload.userId)
            if (index > -1) {
                if (state.dialogs[index].messages.some(m => m.id === action.payload.id)) {
                    console.log('errorAddChatMessage')
                } else {
                    const newMessage: IChatMessage = {
                        id: action.payload.id,
                        userId: action.payload.userId,
                        role: action.payload.role,
                        message: action.payload.message,
                        createdAt: action.payload.createdAt
                    }
                    state.dialogs[index].messages.push(newMessage)
                    if (state.dialogs[index].user.id !== state.selectDialog) {
                        state.dialogs[index].user.newMessage += 1
                    }
                }
            } else {
                const newDialog: IChatDialog = {
                    user: {
                        id: action.payload.userId,
                        name: action.payload.user.login,
                        avatar: '',
                        description: '',
                        connect: true,
                        newMessage: 1,
                        period: Date.now().toString()
                    },
                    messages: []
                }
                state.dialogs.unshift(newDialog)
            }
        },
        setChatSelectDialog: (state, action: PayloadAction<number>) => {
            state.selectDialog = action.payload
        },
        resetChatNewMessage: (state) => {
            const index = state.dialogs.findIndex(d => d.user.id === state.selectDialog)
            if (index > -1) {
                if (state.dialogs[index].user.newMessage) {
                    state.dialogs[index].user.newMessage = 0
                }
            }
        },
        setConnectDialog: (state, action: PayloadAction<{ id: number, connect: boolean }>) => {
            state.dialogs = state.dialogs.map(d => {
                if (d.user.id === action.payload.id) {
                    return {...d, user: {...d.user, connect: action.payload.connect}}
                } else {
                    return d
                }
            })
        }
    }
})

export const {
    setChatDialogs,
    setChatMessages,
    addChatMessage,
    setChatSelectDialog,
    resetChatNewMessage,
    setConnectDialog
} = chatSlice.actions

export default chatSlice.reducer