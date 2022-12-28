import React, {useEffect, useRef} from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { CardContent, Grid } from '@mui/material'
import dayjs from 'dayjs'

import MessageAdminChat from './MessageAdminChat'
import MessageUserChat from './MessageUserChat'
import { useAppSelector } from '../../../../../../hooks'

const MessagesChatMain: React.FC = () => {
    const scrollRef = useRef<HTMLElement | null>(null)

    const dialogs = useAppSelector((state) => state.chat.dialogs)
    const selectDialog = useAppSelector((state) => state.chat.selectDialog)

    const messages = dialogs.filter(d => d.user.id === selectDialog)[0].messages

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop += 400 * messages.length
        }
    }, [messages])

    return (
        <PerfectScrollbar
            component="div"
            style={{
                width: '100%',
                height: 'calc(100vh - 440px)',
                overflowX: 'hidden',
                minHeight: '525px',
            }}
            containerRef={(ref) => scrollRef.current = ref}
        >
            <CardContent>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        {messages && messages.map(m => (
                            m.role === 'ADMIN'
                                ? <MessageAdminChat
                                    key={m.id}
                                    message={m.message}
                                    dateMessage={dayjs(m.createdAt).format('DD.MM.YYYY')}
                                />
                                : <MessageUserChat
                                    key={m.id}
                                    message={m.message}
                                    dateMessage={dayjs(m.createdAt).format('DD.MM.YYYY')}
                                />
                        )) }
                    </Grid>
                </Grid>
            </CardContent>
        </PerfectScrollbar>
    )
}

export default MessagesChatMain