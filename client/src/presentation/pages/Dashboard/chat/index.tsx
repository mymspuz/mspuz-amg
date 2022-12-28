import React, { useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import { styled, Theme, useTheme } from '@mui/material/styles'

import ChatSideBar from './components/sidebar'
import themeTypography from '../../../theme/typography'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import ChatContent from './components/main'
import { useChat } from '../../../../hooks/useChat'
import { resetChatNewMessage, setChatSelectDialog } from '../../../../store/slice/chatSlice'


const drawerChatWidth: number = 320

const MainChat = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: { theme: Theme, open: boolean }) => ({
    ...themeTypography(theme).mainContentChat,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerChatWidth - 20),
            paddingLeft: '0px',
            // width: `calc(100% - ${drawerChatWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            // marginLeft: '20px',
            // width: `calc(100% - ${drawerChatWidth}px)`,
            // padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            // marginLeft: '10px',
            // width: '80%',
            // padding: '16px',
            // marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        // width: `calc(100% - ${drawerChatWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}))

const Chat: React.FC = () => {
    const handleSelectDialog = (id: number): void => {
        dispatch(setChatSelectDialog(id))
        const index = dialogs.findIndex(d => d.user.id === id)
        if (index === -1 || !dialogs[index].messages.length) {
            console.log('mid', id)
            chatActions.getMessages({ id: id })
        } else {
            if (dialogs[index].user.newMessage > 0) {
                chatActions.readMessage({ userId: id })
            }
        }
    }

    const handleClickSend = (userId: number, message: string): void => {
        chatActions.sendMessage({ userId, message })
    }

    const theme = useTheme()

    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))

    const chatDrawerOpened = useAppSelector((state) => state.customization.openedChatSidebar)
    const dialogs = useAppSelector((state) => state.chat.dialogs)
    const selectDialog = useAppSelector((state) => state.chat.selectDialog)

    const dispatch = useAppDispatch()

    const { chatActions } = useChat()

    useEffect(() => {
        chatActions.getMessages({ id: 1 })
    }, [])

    useEffect(() => {
        if (selectDialog) {
            const index = dialogs.findIndex(d => d.user.id === selectDialog)
            if (index > -1) {
                if (dialogs[index].user.newMessage) {
                    chatActions.readMessage({ userId: selectDialog })
                    dispatch(resetChatNewMessage())
                }
            }
        } else {
            chatActions.disconnect()
        }
    }, [selectDialog])

    return (
        <MainChat theme={theme} open={chatDrawerOpened} sx={{ display: 'flex' }}>
            <ChatSideBar open={chatDrawerOpened} handleSelectDialog={handleSelectDialog} />
            {selectDialog && <ChatContent handleClickSend={handleClickSend} />}
        </MainChat>
    )
}

export default Chat