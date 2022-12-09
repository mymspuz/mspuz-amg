import React from 'react'
import { LinearProgress, Backdrop, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'

const LoaderWrapper = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%'
})

const Loader: React.FC = () => (
    <Backdrop
        open={true}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
    // <LoaderWrapper>
    //     <LinearProgress color="primary" />
    // </LoaderWrapper>
)

export default Loader