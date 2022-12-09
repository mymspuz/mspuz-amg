import { Box } from '@mui/material'

import MainCard from '../../../components/cards/MainCard'

type AuthCardWrapperProps = {
    children: JSX.Element
}

const AuthCardWrapper = ({ children, ...other }: AuthCardWrapperProps) => (
    <MainCard
        border={false}
        boxShadow={false}
        contentClass={''}
        contentSX={{}}
        darkTitle={false}
        secondary={''}
        shadow={''}
        title={''}
        content={false}
        sx={{
            maxWidth: {xs: 400, lg: 475},
            margin: {xs: 2.5, md: 3},
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
)

export default AuthCardWrapper