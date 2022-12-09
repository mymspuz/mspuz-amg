import { Link } from 'react-router-dom'
import { ButtonBase } from '@mui/material'

import { defaultPath } from '../../../theme/constants'
import { Logo } from '../../../components'

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={defaultPath}>
        <Logo />
    </ButtonBase>
)

export default LogoSection