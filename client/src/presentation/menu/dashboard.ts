import { IconDashboard, IconMessages } from '@tabler/icons'

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
        },
        {
            id: 'page-chat',
            title: 'Чат',
            type: 'item',
            url: '/chat',
            icon: IconMessages,
            breadcrumbs: false
        }
    ]
}

export default dashboard