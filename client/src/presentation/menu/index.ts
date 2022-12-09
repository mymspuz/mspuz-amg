import { MenuType } from './menuType'
import dashboard from './dashboard'
import loading from './loadingDocuments'
import pages from './pages'
import admin from './admin'

const menuItems: { items: MenuType[] } = {
    items: [dashboard, loading, pages, admin]
}

export default menuItems