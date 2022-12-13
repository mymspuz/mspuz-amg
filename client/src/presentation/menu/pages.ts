import { IconChartInfographic, IconFileInfo, IconCertificate } from '@tabler/icons'

import { MenuType } from './menuType'
import { Role } from '../../data/AuthTypes'

const pages: MenuType = {
    id: 'pages',
    type: 'group',
    role: Role.USER,
    children: [
        {
            id: 'page-reports',
            title: 'Отчетность-налоги',
            type: 'item',
            url: '/page/reports',
            icon: IconChartInfographic,
            breadcrumbs: false
        },
        {
            id: 'page-info',
            title: 'Информация',
            type: 'item',
            url: '/page/info',
            icon: IconFileInfo,
            breadcrumbs: false
        },
        {
            id: 'page-services',
            title: 'Услуги',
            type: 'item',
            url: '/page/services',
            icon: IconCertificate,
            breadcrumbs: false
        },
    ]
}

export default pages