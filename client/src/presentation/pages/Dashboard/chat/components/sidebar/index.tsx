import React from 'react'
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Box,
    useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'

type SideBarProps = {
    open: boolean
}
const ChatSideBar: React.FC<SideBarProps> = ({ open }: SideBarProps) => {

    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))

    const drawerWidth = 240

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    // position: 'inherit'
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <PerfectScrollbar
                component='div'
                style={{
                    height: '320px',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}
            >
                    <List>
                        {[
                            'Inbox',
                            'Starred',
                            'Send email',
                            'Drafts',
                            'All mail',
                            'Trash',
                            'Spam',
                            'Inbox',
                            'Starred',
                            'Send email',
                            'Drafts',
                            'All mail',
                            'Trash',
                            'Spam'
                        ].map((text, index) => (
                            <>
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </>
                        ))}
                    </List>
            </PerfectScrollbar>
        </Drawer>
    )
}

export default ChatSideBar