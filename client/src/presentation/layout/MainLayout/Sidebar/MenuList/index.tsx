import { Typography } from '@mui/material'

import NavGroup from './NavGroup'
import menuItems from '../../../../menu'
import { useAppSelector } from '../../../../../hooks'

const MenuList = () => {
    const auth = useAppSelector((state) => state.auth)

    const navItems = menuItems.items.map((item) => {
        if (item?.role) {
            if (auth.role !== item.role) {
                return null
            }
        }
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                )
        }
    })

    return <>{navItems}</>
}

export default MenuList