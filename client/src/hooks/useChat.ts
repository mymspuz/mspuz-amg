import { io, Socket } from 'socket.io-client'
import { useCallback, useEffect, useMemo } from 'react'
import jwt_decode from 'jwt-decode'

import { UserResponse } from '../data/AuthTypes'
import {  IChatMessages, IChatNewMessageResponse } from '../data/ChatTypes'
import { useAppDispatch, useAppSelector } from './store'
import {
    addChatMessage,
    setChatDialogs,
    setChatMessages,
    setChatSelectDialog,
    setConnectDialog
} from '../store/slice/chatSlice'

type TDialogsResponse = {
    user: {
        id: number
        login: string
    }
    connect: boolean
    count: number
    date: string
    updateAt: Date
}

let socket: Socket

export const useChat = () => {

    const auth = useAppSelector(state => state.auth)
    const chatDialogs = useAppSelector(state => state.chat.dialogs)

    const dispatch = useAppDispatch()

    const decode_token: UserResponse = jwt_decode(auth.token)

    if (!socket) {
        socket = io(process.env.REACT_APP_URL_WS_DEV as string, {
            query: {
                userId: decode_token.id,
                userName: decode_token.login
            },
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            }
        })
    } else {
        if (!socket.connected) {
            socket.connect()
        }
    }

    useEffect(() => {
        socket.on('log', (log: { id: number, connect: boolean }) => {
            dispatch(setConnectDialog(log))
        })

        socket.on(`dialogs_${decode_token.id}`, (dialogs: TDialogsResponse[]) => {
            const result: any[] = dialogs.map((d) => {
                return {
                    user: {
                        id: decode_token.role === 'ADMIN' ? d.user.id : decode_token.id,
                        name: d.user.login,
                        avatar: null,
                        description: '',
                        newMessage: d.count,
                        period: d.date,
                        connect: d.connect
                    },
                    messages: []
                }
            })
            dispatch(setChatDialogs(result))
            if (result.length) {
                dispatch(setChatSelectDialog(result[0].user.id))
                socket.emit(
                    'messages:get',
                    { id: result[0].user.id }
                )
            }
        })

        socket.on(`messages_${decode_token.id}`, (messages: IChatMessages) => {
            dispatch(setChatMessages(messages))
        })

        socket.on(`newMessage_${decode_token.id}`, (newMessage: IChatNewMessageResponse) => {
            dispatch(addChatMessage(newMessage))
        })

        if (decode_token.role === 'ADMIN') {
            socket.on('newMessageAdmin', (newMessage: IChatNewMessageResponse) => {
                dispatch(addChatMessage(newMessage))
            })
        }

        if (!chatDialogs.length) {
            socket.emit('dialogs:get')
        }
    }, [])

    const getMessages = useCallback((payload: { id: number }) => {
        const index = chatDialogs.findIndex(c => c.user.id === payload.id)
        if (index > -1) {
            if (!chatDialogs[index].messages.length) {
                socket.emit('messages:get', payload)
            }
        }
    }, [])

    const sendMessage = useCallback((payload: { userId: number, message: string }) => {
        socket.emit(
            'message:post',
            {
                    userId: payload.userId,
                    role: decode_token.role,
                    message: payload.message
                }
        )

    }, [])

    const readMessage = useCallback((payload: { userId: number }) => {
        socket.emit('messages:read', { userId: payload.userId })
    }, [])

    const disconnect = useCallback(() => {
        socket.disconnect()
        socket.close()
    }, [])

    const chatActions = useMemo(() => ({ getMessages, sendMessage, readMessage, disconnect }), [])

    return { chatActions }
}