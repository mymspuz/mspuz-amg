import React from 'react'
import { Avatar, Badge, Box, Grid, IconButton, OutlinedInput, Typography } from '@mui/material'
import { IconChevronDown, IconSearch } from '@tabler/icons'

import User1 from '../../../../../../assets/images/users/user-round.svg'

const HeaderChatSideBar = () => {
    return (
        <Box sx={{ padding: '24px 24px 16px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item>
                            <Badge
                                anchorOrigin={{
                                    horizontal: 'right',
                                    vertical: 'bottom'
                                }}
                                color="success"
                                overlap="circular"
                                variant="dot"
                                badgeContent=" "
                            >
                                <Avatar src={User1}/>
                            </Badge>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography variant={'h4'} align={'left'}>John Doe</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="delete" size="large">
                                <IconChevronDown fontSize="inherit" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <OutlinedInput
                        id="outlined-chat-search"
                        type='text'
                        startAdornment={ <IconSearch /> }
                        placeholder={ 'Поиск' }
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default HeaderChatSideBar