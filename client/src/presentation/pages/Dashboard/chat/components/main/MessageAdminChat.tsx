import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'

type TProps = {
    message: string
    dateMessage: string
}

const MessageAdminChat: React.FC<TProps> = ({ message, dateMessage }: TProps) => {
    return (
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
                                    <Typography variant='body2'>{ message }</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6' align='right' color='rgb(158, 158, 158)'>{ dateMessage }</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MessageAdminChat