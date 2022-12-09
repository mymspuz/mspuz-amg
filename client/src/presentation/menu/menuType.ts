import { TablerIcon } from '@tabler/icons'
import * as React from 'react'
import {Path} from "@remix-run/router/history";
import {TRole} from "../../data/AuthTypes";

export type MenuType = {
    id: string
    role?: TRole
    title?: string
    caption?: string
    type: 'group' | 'item' | 'collapse'
    url?: string | Partial<Path>
    icon?: TablerIcon
    breadcrumbs?: boolean
    external?: boolean
    target?: '_self' | '_blank'
    disabled?: boolean
    children?: MenuType[]
    chip?: {
        avatar?: React.ReactElement
        color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
        label?: React.ReactNode
        size?: 'small' | 'medium'
        variant?: 'filled' | 'outlined'
    }
}