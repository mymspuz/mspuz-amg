import React, { useState } from 'react'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

type CustomizedSnackbarsProps = {
    color: AlertColor
    content: string
}

const CustomizedSnackbars: React.FC<CustomizedSnackbarsProps> = ({ color, content }: CustomizedSnackbarsProps) => {
    const [open, setOpen] = useState(true)


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
                {content}
            </Alert>
        </Snackbar>
    )
}

export default CustomizedSnackbars