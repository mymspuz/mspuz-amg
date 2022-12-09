import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import {
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Tooltip,
    Typography
} from '@mui/material'
import { IconSettings } from '@tabler/icons'
import PerfectScrollbar from 'react-perfect-scrollbar'

import SubCard from '../components/cards/SubCard'
import AnimateButton from '../components/extended/AnimateButton'
import { setStoreBorderRadius, setStoreFontFamily } from '../../store/slice/customizationSlice'
import { gridSpacing } from '../theme/constants'
import { useAppDispatch, useAppSelector } from '../../hooks'

const valueText = (value: number) => `${value}px`

const Customization = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const customization = useAppSelector(state => state.customization)

    const [open, setOpen] = useState(false)
    const handleToggle = () => {
        setOpen(!open)
    }

    const [borderRadius, setBorderRadius] = useState(customization.borderRadius)
    const handleBorderRadius = (event: any, newValue: number) => {
        setBorderRadius(newValue)
    }

    useEffect(() => {
        dispatch(setStoreBorderRadius(borderRadius))
    }, [dispatch, borderRadius])

    let initialFont
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter'
            break
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins'
            break
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto'
            break
    }

    const [fontFamily, setFontFamily] = useState(initialFont)
    useEffect(() => {
        let newFont
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`
                break
            case 'Poppins':
                newFont = `'Poppins', sans-serif`
                break
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`
                break
        }
        dispatch(setStoreFontFamily(newFont))
    }, [dispatch, fontFamily])

    return (
        <>
            <Tooltip title="Live Customize">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '25%',
                        position: 'fixed',
                        right: 10,
                        zIndex: theme.zIndex.speedDial
                    }}
                >
                    <AnimateButton
                        type={'rotate'}
                        direction={'right'}
                        offset={10}
                        scale={{hover: 1, tap: 0.9}}
                    >
                        <IconButton color="inherit" size="large" disableRipple>
                            <IconSettings />
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                <PerfectScrollbar component="div">
                    <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                        <Grid item xs={12}>
                            <SubCard
                                title={'Font Family'}
                                content={true}
                                contentClass={''}
                                darkTitle={false}
                                secondary={''}
                                sx={{}}
                                contentSX={{}}
                            >
                                <FormControl>
                                    <RadioGroup
                                        aria-label="font-family"
                                        value={fontFamily}
                                        onChange={(e) => setFontFamily(e.target.value)}
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value="Roboto"
                                            control={<Radio />}
                                            label="Roboto"
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                                '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Poppins"
                                            control={<Radio />}
                                            label="Poppins"
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                                '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Inter"
                                            control={<Radio />}
                                            label="Inter"
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                                '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard
                                title={'Border Radius'}
                                content={true}
                                contentClass={''}
                                darkTitle={false}
                                secondary={''}
                                sx={{}}
                                contentSX={{}}
                            >
                                <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                                    <Grid item>
                                        <Typography variant="h6" color="secondary">
                                            4px
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            size="small"
                                            value={borderRadius}
                                            onChange={(e) => handleBorderRadius(e, 10)}
                                            getAriaValueText={valueText}
                                            valueLabelDisplay="on"
                                            aria-labelledby="discrete-slider-small-steps"
                                            marks
                                            step={2}
                                            min={4}
                                            max={24}
                                            color="secondary"
                                            sx={{
                                                '& .MuiSlider-valueLabel': {
                                                    color: 'secondary.light'
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6" color="secondary">
                                            24px
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </Drawer>
        </>
    )
}

export default Customization