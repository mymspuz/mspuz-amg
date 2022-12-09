import React from 'react'
import { Link, Typography, Stack } from '@mui/material'

const AuthFooter: React.FC = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="http://amg.msk.ru" target="_blank" underline="hover">
            amg.msk.ru
        </Typography>
        <Typography variant="subtitle2" component={Link} href="#" target="_blank" underline="hover">
            &copy; mspuz
        </Typography>
    </Stack>
)

export default AuthFooter