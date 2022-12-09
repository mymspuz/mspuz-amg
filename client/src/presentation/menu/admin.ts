import { IconChartInfographic } from '@tabler/icons'

import { MenuType } from './menuType'
import { Role } from '../../data/AuthTypes'

const admin: MenuType = {
    id: 'admin',
    role: Role.ADMIN,
    type: 'group',
    title: 'Администрирование',
    children: [
        {
            id: 'admin-docs',
            title: 'Список документов',
            type: 'item',
            url: '/dashboard/admin/docs',
            icon: IconChartInfographic,
            breadcrumbs: false
        },
    ]
}

export default admin