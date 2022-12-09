import { IconBuildingBank, IconFileArrowLeft, IconFileArrowRight, IconFriends } from '@tabler/icons'

import { MenuType } from './menuType'
import { Role } from '../../data/AuthTypes'

const loading: MenuType = {
    id: 'loading',
    title: 'Загрузка документов',
    role: Role.USER,
    type: 'group',
    children: [
        {
            id: 'loading-bank-statements',
            title: 'Банковские выписки',
            type: 'item',
            url: '/dashboard/loading/bank-statements',
            icon: IconBuildingBank,
            breadcrumbs: false
        },
        {
            id: 'loading-purchase-documents',
            title: 'Документы покупок',
            type: 'item',
            url: '/dashboard/loading/purchase-documents',
            icon: IconFileArrowLeft,
            breadcrumbs: false
        },
        {
            id: 'loading-sales-documents',
            title: 'Документы продаж',
            type: 'item',
            url: '/dashboard/loading/sales-documents',
            icon: IconFileArrowRight,
            breadcrumbs: false
        },
        {
            id: 'loading-personnel-documents',
            title: 'Кадровые документы',
            type: 'item',
            url: '/dashboard/loading/personal-documents',
            icon: IconFriends,
            breadcrumbs: false
        }
    ]
}

export default loading