import React from 'react'
import {
    Drawer,
    Card,
    useMediaQuery,
} from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTheme } from '@mui/material/styles'

import HeaderChatSideBar from './HeaderChatSideBar'
import DialogsChat from './DialogsChat'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks'
import { chatOpen } from '../../../../../../store/slice/customizationSlice'

type SideBarProps = {
    open: boolean
    handleSelectDialog: (id: number) => void
}
const ChatSideBar: React.FC<SideBarProps> = ({ open, handleSelectDialog }: SideBarProps) => {

    const drawerWidth = 320

    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))
    // const container = window !== undefined ? () => window.document.body : undefined

    const chatDrawerOpened = useAppSelector((state) => state.customization.openedChatSidebar)
    const dispatch = useAppDispatch()

    const handleChatDrawerToggle = () => {
        dispatch(chatOpen(!chatDrawerOpened))
    }

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    transform: 'none',
                    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                    width: drawerWidth,
                    position: 'relative'
                },
            }}
            PaperProps={{
                variant: 'outlined',
                sx: {
                    height: '100%',
                    backgroundColor: 'transparent',
                    border: 'none'
                }
            }}
            anchor="left"
            open={open}
            ModalProps={{ keepMounted: true }}
            // container={container}
            variant={matchUpMd ? 'persistent' : 'temporary'}
            onClose={handleChatDrawerToggle}
        >
            <Card
                elevation={0}
                square={true}
                sx={{
                    backgroundColor: 'rgb(250, 250, 250)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid rgba(144, 202, 249, 0.46)',
                    padding: '0px 24px 24px',
                    height: '100%'
                }}
            >
                <HeaderChatSideBar />
                <PerfectScrollbar
                    component='div'
                    style={{
                        overflowX: 'hidden',
                        height: 'calc(100vh - 440px)',
                        minHeight: '520px'
                    }}
                >
                    <DialogsChat handleSelectDialog={handleSelectDialog}/>
                </PerfectScrollbar>
            </Card>
        </Drawer>
    )
}

export default ChatSideBar