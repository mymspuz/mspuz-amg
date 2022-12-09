import { styled } from '@mui/material/styles'
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'

import { AnimateButton } from '../../../../components/extended'

const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.warning.light,
    marginTop: '16px',
    marginBottom: '16px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '200px',
        height: '200px',
        border: '19px solid ',
        borderColor: theme.palette.warning.main,
        borderRadius: '50%',
        top: '65px',
        right: '-150px'
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '200px',
        height: '200px',
        border: '3px solid ',
        borderColor: theme.palette.warning.main,
        borderRadius: '50%',
        top: '145px',
        right: '-70px'
    }
}))

const UpgradePlanCard = () => (
    <CardStyle>
        <CardContent>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h4">Upgrade your plan</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" color="grey.900" sx={{ opacity: 0.6 }}>
                        70% discount for 1 years <br />
                        subscriptions.
                    </Typography>
                </Grid>
                <Grid item>
                    <Stack direction="row">
                        <AnimateButton
                            offset={10}
                            direction={'right'}
                            scale={{hover: 1, tap: 0.9}}
                            type={'scale'}
                        >
                            <Button variant="contained" color="warning" sx={{ boxShadow: 'none' }}>
                                Go Premium
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </Grid>
        </CardContent>
    </CardStyle>
)

export default UpgradePlanCard