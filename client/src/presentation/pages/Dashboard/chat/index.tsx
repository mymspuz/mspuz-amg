import React from 'react'
import {Grid, Box, useMediaQuery} from '@mui/material'
import { styled, Theme, useTheme } from '@mui/material/styles'

import { gridSpacing } from '../../../theme/constants'
import ChatSideBar from './components/sidebar'
import themeTypography from '../../../theme/typography'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import ChatContent from "./components/main";

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
            width: `calc(100% - ${drawerChatWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerChatWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerChatWidth}px)`,
            padding: '16px',
            marginRight: '10px'
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
        width: `calc(100% - ${drawerChatWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}))

const Chat: React.FC = () => {
    const theme = useTheme()

    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))

    const leftDrawerOpened = useAppSelector((state) => state.customization.openedChatSidebar)

    const dispatch = useAppDispatch()

    return (
        <Box sx={{ display: 'flex' }}>
            <MainChat theme={theme} open={leftDrawerOpened}>
                <ChatContent />
            </MainChat>
        </Box>
    )
}

export default Chat