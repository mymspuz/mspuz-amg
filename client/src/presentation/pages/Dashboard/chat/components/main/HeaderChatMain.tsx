import React from 'react'
import { Avatar, Box, Divider, Grid, IconButton, Typography } from '@mui/material'
import { IconDots, IconMenu2 } from '@tabler/icons'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks'
import { chatOpen } from '../../../../../../store/slice/customizationSlice'

const HeaderChatMain: React.FC = () => {

    const chatDrawerOpened = useAppSelector((state) => state.customization.openedChatSidebar)
    const dialogs = useAppSelector((state) => state.chat.dialogs)
    const selectDialog = useAppSelector((state) => state.chat.selectDialog)

    const user = dialogs.filter(d => d.user.id === selectDialog)[0].user
    const { avatar, name, period, connect } = user

    const dispatch = useAppDispatch()

    const handleMenuView = () => {
        dispatch(chatOpen(!chatDrawerOpened))
    }

    return (
        <Grid item xs={12}>
            <Grid container spacing={0.5}>
                <Grid item>
                    <IconButton onClick={handleMenuView} aria-label="delete">
                        <IconMenu2 />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar src={avatar} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant='h4'>
                                        {name}
                                        {connect
                                            ?
                                            <Box
                                                component={'span'}
                                                sx={{
                                                    display: 'inline-block',
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#00e676',
                                                    marginLeft: '5px'
                                                }}
                                            />
                                            :
                                            <Box
                                                component={'span'}
                                                sx={{
                                                    display: 'inline-block',
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#ffe57f',
                                                    marginLeft: '5px'
                                                }}
                                            />
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6'>
                                        {period}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm zeroMinWidth />
                <Grid item>
                    <IconButton aria-label="delete">
                        <IconDots />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider sx={{ marginTop: '10px' }}/>
        </Grid>
    )
}

export default HeaderChatMain