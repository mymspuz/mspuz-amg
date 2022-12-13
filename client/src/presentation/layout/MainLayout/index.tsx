import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { styled, Theme, useTheme } from '@mui/material/styles'
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material'

import { Breadcrumbs } from '../../components/extended/'
import Header from './Header'
import Sidebar from './Sidebar'
import Customization from '../Customization'
import navigation from '../../menu'
import { drawerWidth } from '../../theme/constants'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setStoreMenu } from '../../../store/slice/customizationSlice'
import themeTypography from '../../theme/typography'
import {CustomizedSnackbars} from "../../components";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: { theme: Theme, open: boolean }) => ({
    ...themeTypography(theme).mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}))

const MainLayout = () => {
    const theme = useTheme()

    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))

    const leftDrawerOpened = useAppSelector((state) => state.customization.opened)

    const dispatch = useAppDispatch()

    const handleLeftDrawerToggle = () => {
        dispatch(setStoreMenu(!leftDrawerOpened))
    }

    useEffect(() => {
        dispatch(setStoreMenu(!matchDownMd))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} window={undefined}/>

            <Main theme={theme} open={leftDrawerOpened}>
                <Breadcrumbs
                    separator={true}
                    navigation={navigation}
                    icon
                    title
                    rightAlign
                    card={false}
                    divider={false}
                    icons={false}
                    maxItems={10}
                    titleBottom={false}
                />
                <Outlet />
            </Main>
            {/*<Customization />*/}
        </Box>
    )
}

export default MainLayout