import { IconDashboard } from '@tabler/icons'

import { MenuType } from './menuType'

const dashboard: MenuType = {
    id: 'dashboard',
    title: 'Основное',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Обзор',
            type: 'item',
            url: '/',
            icon: IconDashboard,
            breadcrumbs: false
        }
    ]
}

export default dashboard