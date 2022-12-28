import React from 'react'
import {
    Avatar,
    Badge,
    Box,
    Chip, Divider,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material'

import { useAppSelector } from '../../../../../../hooks'

type TProps = {
    handleSelectDialog: (id: number) => void
}

const DialogsChat: React.FC<TProps> = ({ handleSelectDialog }: TProps) => {
    const dialogs = useAppSelector((state) => state.chat.dialogs)

    return (
        <Box>
            <List disablePadding={false}>
                {dialogs && dialogs.map(dialog => (
                    <div key={dialog.user.id}>
                        <ListItemButton onClick={() => handleSelectDialog(dialog.user.id)} >
                            <ListItemAvatar>
                                <Badge
                                    anchorOrigin={{
                                        horizontal: 'right',
                                        vertical: 'bottom'
                                    }}
                                    color={dialog.user.connect ? "success" : "warning"}
                                    overlap="circular"
                                    variant="dot"
                                    badgeContent=" "
                                >
                                    <Avatar src={ dialog.user.avatar } />
                                </Badge>
                            </ListItemAvatar>
                            <ListItemText aria-multiline={true}>
                                <Typography variant={'body1'} component='span'>
                                    <Grid container spacing={1}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography variant={'h5'}>{ dialog.user.name }</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant={'subtitle2'}>{ dialog.user.period }</Typography>
                                        </Grid>
                                    </Grid>
                                </Typography>
                                <Typography variant={'body2'} component={'p'}>
                                    <Grid container spacing={1} component={'span'}>
                                        <Grid item xs zeroMinWidth component={'span'}>
                                            <Typography variant={'caption'}>{ dialog.user.description }</Typography>
                                        </Grid>
                                        <Grid item component={'span'}>
                                            {dialog.user.newMessage > 0 && (
                                                <Chip
                                                    label={dialog.user.newMessage}
                                                    color="secondary"
                                                    size={'small'}
                                                    component={'span'}
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                        <Divider />
                    </div>
                ))}
            </List>
        </Box>
    )
}

export default DialogsChat