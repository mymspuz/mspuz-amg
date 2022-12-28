import React, { useState } from 'react'
import { Divider, Grid, IconButton, TextField } from '@mui/material'
import { IconPaperclip, IconSend } from '@tabler/icons'

import { useAppSelector } from '../../../../../../hooks'

type FooterChatMainProps = {
    handleClickSend: (userId: number, message: string) => void
}

const FooterChatMain: React.FC<FooterChatMainProps> = ({ handleClickSend }: FooterChatMainProps) => {
    const [message, setMessage] = useState<string>('')

    const selectDialog = useAppSelector((state) => state.chat.selectDialog)

    const handleClick = () => {
        if (!message.trim()) {
            return
        }
        handleClickSend(selectDialog, message)
        setMessage('')
    }

    return (
        <Grid item xs={12}>
            <Divider sx={{ marginY: '10px' }}/>
            <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                <Grid item xs zeroMinWidth>
                    <TextField
                        id="outlined-message"
                        label="Сообщение"
                        fullWidth={true}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={(e) => { if (e.key === 'Enter') handleClick() } }
                    />
                </Grid>
                <Grid item>
                    <IconButton>
                        <IconPaperclip />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleClick}>
                        <IconSend />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FooterChatMain