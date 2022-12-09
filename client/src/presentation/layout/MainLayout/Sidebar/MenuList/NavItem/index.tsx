import React, { forwardRef, useEffect } from 'react'
import { Link, To } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { TablerIcon } from '@tabler/icons'

import { useAppDispatch, useAppSelector } from '../../../../../../hooks'
import { MenuType } from '../../../../../menu/menuType'
import themeTypography from '../../../../../theme/typography'
import { menuOpen, setStoreMenu } from '../../../../../../store/slice/customizationSlice'

type NavItemProps = {
    item: MenuType,
    level: number
}

const NavItem = ({ item, level }: NavItemProps) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const customization = useAppSelector((state) => state.customization)
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'))

    const CallIcon = (props: { icon:  TablerIcon }) => {
        const HtmlCode = props.icon
        return <HtmlCode stroke={1.5} size="1.3rem" />
    }

    const itemIcon = item?.icon ? (
        <CallIcon icon={item.icon}/>
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex((id) => id === item.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex((id) => id === item.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    )

    let itemTarget = '_self'
    if (item?.target) {
        itemTarget = '_blank'
    }

    let listItemProps: any
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget }
    } else {
        listItemProps = {
            component: forwardRef((props, ref) => (
                <Link
                    // ref={ref}
                    {...props}
                    to={item?.url as To}
                    target={itemTarget}
                />))
        }
    }

    const itemHandler = (id: string) => {
        dispatch(menuOpen(id))
        if (matchesSM) dispatch(setStoreMenu(false))
    }

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(menuOpen(item.id))
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item?.disabled}
            sx={{
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                        {item.title}
                    </Typography>
                }
                secondary={
                    item?.caption && (
                        <Typography variant="caption" sx={{ ...themeTypography(theme).subMenuCaption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item?.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    )
}

export default NavItem