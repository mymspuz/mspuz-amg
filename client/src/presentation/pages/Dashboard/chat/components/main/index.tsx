import React from 'react'
import {
    Grid,
    Card,
    CardContent,
} from '@mui/material'

import { gridSpacing } from '../../../../../theme/constants'
import HeaderChatMain from './HeaderChatMain'
import FooterChatMain from './FooterChatMain'
import MessagesChatMain from './MessagesChatMain'

type ChatContentProps = {
    handleClickSend: (userId: number, message: string) => void
}

const ChatContent: React.FC<ChatContentProps> = ({ handleClickSend }: ChatContentProps) => {
    return (
        <Grid container spacing={ gridSpacing } sx={{ paddingLeft: '24px' }}>
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
                            <HeaderChatMain />
                            {/*Messages*/}
                            {<MessagesChatMain />}
                            {/*Footer*/}
                            <FooterChatMain handleClickSend={handleClickSend} />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ChatContent