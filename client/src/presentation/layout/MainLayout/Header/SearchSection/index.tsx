import { useState } from 'react'
import { useTheme, styled } from '@mui/material/styles'
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material'
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state'
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons'
import { shouldForwardProp } from '@mui/system'

import { Transitions } from '../../../../components/extended'
import themeTypography from '../../../../theme/typography'

const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}))

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}))

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...themeTypography(theme).commonAvatar,
    ...themeTypography(theme).mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}))

type MobileSearchProps = {
    value: string
    setValue: (e: string) => void
    popupState: any
}

const MobileSearch = ({ value, setValue, popupState }: MobileSearchProps) => {
    const theme = useTheme()

    popupState = PopupState

    return (
        <OutlineInputStyle
            id="input-search-header"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            startAdornment={
                <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <ButtonBase sx={{ borderRadius: '12px' }}>
                        <HeaderAvatarStyle variant="rounded">
                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                        </HeaderAvatarStyle>
                    </ButtonBase>
                    <Box sx={{ ml: 2 }}>
                        <ButtonBase sx={{ borderRadius: '12px' }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...themeTypography(theme).commonAvatar,
                                    ...themeTypography(theme).mediumAvatar,
                                    background: '#fbe9e7',
                                    color: '#d84315',
                                    '&:hover': {
                                        background: '#d84315',
                                        color: '#fbe9e7'
                                    }
                                }}
                                {...bindToggle(popupState)}
                            >
                                <IconX stroke={1.5} size="1.3rem" />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    )
}

const SearchSection = () => {
    const theme = useTheme()
    const [value, setValue] = useState('')

    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{ ml: 2 }}>
                                <ButtonBase sx={{ borderRadius: '12px' }}>
                                    <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                                        <IconSearch stroke={1.5} size="1.2rem" />
                                    </HeaderAvatarStyle>
                                </ButtonBase>
                            </Box>
                            <PopperStyle {...bindPopper(popupState)} transition>
                                {({ TransitionProps }) => (
                                    <>
                                        <Transitions
                                            position={'top-left'}
                                            direction={'up'}
                                            type="zoom"
                                            {...TransitionProps}
                                            sx={{transformOrigin: 'center left'}}
                                        >
                                            <Card
                                                sx={{
                                                    background: '#fff',
                                                    [theme.breakpoints.down('sm')]: {
                                                        border: 0,
                                                        boxShadow: 'none'
                                                    }
                                                }}
                                            >
                                                <Box sx={{ p: 2 }}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item xs>
                                                            <MobileSearch value={value} setValue={setValue} popupState={popupState} />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Card>
                                        </Transitions>
                                    </>
                                )}
                            </PopperStyle>
                        </>
                    )}
                </PopupState>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <OutlineInputStyle
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <ButtonBase sx={{ borderRadius: '12px' }}>
                                <HeaderAvatarStyle variant="rounded">
                                    <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                </HeaderAvatarStyle>
                            </ButtonBase>
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Box>
        </>
    )
}

export default SearchSection