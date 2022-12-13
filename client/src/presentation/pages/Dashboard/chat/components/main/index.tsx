import React from 'react'
import { Grid, Card, CardContent, IconButton, Avatar, Typography, Box, Divider, TextField } from '@mui/material'
import { IconMenu2, IconDots, IconSend, IconPaperclip } from '@tabler/icons'

import { gridSpacing } from '../../../../../theme/constants'
import User1 from '../../../../../../assets/images/users/user-round.svg'

const ChatContent: React.FC = () => {
    return (
        <Grid container spacing={ gridSpacing }>
            <Grid item xs={12}>
                <Card
                    elevation={0}
                    square={true}
                    sx={{
                        backgroundColor: 'rgb(250, 250, 250)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid rgba(144, 202, 249, 0.46)'
                    }}
                >
                    <CardContent>
                        <Grid container spacing={ gridSpacing }>
                            {/*Header*/}
                            <Grid item xs={12}>
                                <Grid container spacing={0.5}>
                                    <Grid item>
                                        <IconButton aria-label="delete">
                                            <IconMenu2 />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Avatar
                                                    src={User1}
                                                />
                                            </Grid>
                                            <Grid item sm zeroMinWidth>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h4'>
                                                            Admin
                                                            <Box
                                                                component={'span'}
                                                                sx={{
                                                                    display: 'inline-block',
                                                                    width: '8px',
                                                                    height: '8px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: 'rgb(0, 200, 83)',
                                                                    marginLeft: '5px'
                                                                }}
                                                            />
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h6'>
                                                            Last seen 2h ago
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
                            {/*Messages*/}
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    {/*Message #1*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={2} />
                                            <Grid item xs={10}>
                                                <Card
                                                    elevation={0}
                                                    square={true}
                                                    sx={{
                                                        backgroundColor: 'rgb(227, 242, 253)',
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        width: 'fit-content',
                                                        float: 'right',
                                                    }}
                                                >
                                                    <CardContent sx={{ padding: '10px', '&:last-child': { paddingBottom: '10px'} }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant='body2'>Hi Good Morning!</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h6' align='right' color='rgb(158, 158, 158)'>11:23 AM</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/*Message #2*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={7}>
                                                <Card
                                                    elevation={0}
                                                    square={true}
                                                    sx={{
                                                        backgroundColor: 'rgb(237, 231, 246)',
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        width: 'fit-content',
                                                        float: 'left',
                                                    }}
                                                >
                                                    <CardContent sx={{ padding: '10px', '&:last-child': { paddingBottom: '10px'} }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant='body2'>
                                                                    Hey. Very Good morning. How are you?
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h6' align='right' color='rgb(158, 158, 158)'>
                                                                    11:23 AM
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/*Message #3*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={2} />
                                            <Grid item xs={10}>
                                                <Card
                                                    elevation={0}
                                                    square={true}
                                                    sx={{
                                                        backgroundColor: 'rgb(227, 242, 253)',
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        width: 'fit-content',
                                                        float: 'right',
                                                    }}
                                                >
                                                    <CardContent sx={{ padding: '10px', '&:last-child': { paddingBottom: '10px'} }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant='body2'>Hi Good Morning!</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h6' align='right' color='rgb(158, 158, 158)'>11:23 AM</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/*Message #4*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={7}>
                                                <Card
                                                    elevation={0}
                                                    square={true}
                                                    sx={{
                                                        backgroundColor: 'rgb(237, 231, 246)',
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        width: 'fit-content',
                                                        float: 'left',
                                                    }}
                                                >
                                                    <CardContent sx={{ padding: '10px', '&:last-child': { paddingBottom: '10px'} }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant='body2'>
                                                                    Hey. Very Good morning. How are you?
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h6' align='right' color='rgb(158, 158, 158)'>
                                                                    11:23 AM
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/*Message #5*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={2} />
                                            <Grid item xs={10}>
                                                <Card
                                                    elevation={0}
                                                    square={true}
                                                    sx={{
                                                        backgroundColor: 'rgb(227, 242, 253)',
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        width: 'fit-content',
                                                        float: 'right',
                                                    }}
                                                >
                                                    <CardContent sx={{ padding: '10px', '&:last-child': { paddingBottom: '10px'} }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant='body2'>Hi Good Morning!</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h6' align='right' color='rgb(158, 158, 158)'>11:23 AM</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/*Message #6*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={7}>
                                                <Card
                                                    elevation={0}
                                                    square={true}
                                                    sx={{
                                                        backgroundColor: 'rgb(237, 231, 246)',
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        width: 'fit-content',
                                                        float: 'left',
                                                    }}
                                                >
                                                    <CardContent sx={{ padding: '10px', '&:last-child': { paddingBottom: '10px'} }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant='body2'>
                                                                    Hey. Very Good morning. How are you?
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h6' align='right' color='rgb(158, 158, 158)'>
                                                                    11:23 AM
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/*Message #7*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={2} />
                                            <Grid item xs={10}>
                                                <Card
                                                    elevation={0}
                                                    square={true}
                                                    sx={{
                                                        backgroundColor: 'rgb(227, 242, 253)',
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        width: 'fit-content',
                                                        float: 'right',
                                                    }}
                                                >
                                                    <CardContent sx={{ padding: '10px', '&:last-child': { paddingBottom: '10px'} }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant='body2'>Hi Good Morning!</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h6' align='right' color='rgb(158, 158, 158)'>11:23 AM</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/*Message #8*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={7}>
                                                <Card
                                                    elevation={0}
                                                    square={true}
                                                    sx={{
                                                        backgroundColor: 'rgb(237, 231, 246)',
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        width: 'fit-content',
                                                        float: 'left',
                                                    }}
                                                >
                                                    <CardContent sx={{ padding: '10px', '&:last-child': { paddingBottom: '10px'} }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant='body2'>
                                                                    Hey. Very Good morning. How are you?
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h6' align='right' color='rgb(158, 158, 158)'>
                                                                    11:23 AM
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*Footer*/}
                            <Grid item xs={12}>
                                <Divider sx={{ marginY: '10px' }}/>
                                <Grid container spacing={1}>
                                    <Grid item xs zeroMinWidth>
                                        <TextField
                                            id="outlined-message"
                                            label="Сообщение"
                                            // size="small"
                                            fullWidth={true}
                                            // value={filter.author}
                                            // onChange={(e) => setFilter({
                                            //     ...filter,
                                            //     author: e.target.value
                                            // })}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <IconButton aria-label="delete">
                                            <IconPaperclip />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton aria-label="delete">
                                            <IconSend />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ChatContent