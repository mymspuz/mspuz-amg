import React, { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'

import { useAppSelector } from '../../hooks'
import themes from '../../presentation/theme'
import { baseName } from '../../presentation/theme/constants'
import NavigationScroll from '../../presentation/layout/NavigationScroll'
import MinimalLayout from '../../presentation/layout/MinimalLayout'
import { Loadable } from '../../presentation/components'
import MainLayout from '../../presentation/layout/MainLayout'
import MakeSignIn from '../pages/MakeSignIn'
import { ProtectionRoute } from '../components'
import { Role } from '../../data/AuthTypes'

const MainRouter: React.FC = () => {
    const customization = useAppSelector((state) => state.customization)

    const AuthSignIn = Loadable(lazy(() => import('../../presentation/pages/Auth/SignIn')))
    const AuthSignUp = Loadable(lazy(() => import('../../presentation/pages/Auth/SignUp')))
    const AuthChangePassword = Loadable(lazy(() => import('../../presentation/pages/Auth/ChangePassword')))

    const DefaultPage = Loadable(lazy(() => import('../../presentation/pages/Dashboard/main/index')))
    const BankStatementsPage = Loadable(lazy(() => import('../../presentation/pages/Dashboard/loading/BankStatements')))
    const SalesDocumentsPage = Loadable(lazy(() => import('../../presentation/pages/Dashboard/loading/DocsSales')))
    const PurchaseDocumentsPage = Loadable(lazy(() => import('../../presentation/pages/Dashboard/loading/DocsPurchase')))
    const PersonalDocumentsPage = Loadable(lazy(() => import('../../presentation/pages/Dashboard/loading/DocsPersonal')))

    const ServicePage = Loadable(lazy(() => import('../../presentation/pages/Dashboard/service/ServicePage')))

    const ChatPage = Loadable(lazy(() => import('../../presentation/pages/Dashboard/chat/index')))

    const ListAllDocsPage = Loadable(lazy(() => import('../../presentation/pages/Dashboard/admin/ListDocsPage')))

    return (
        <BrowserRouter basename={baseName}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes>
                            <Route path='/' element={<ProtectionRoute role={ [Role.ADMIN, Role.USER] }><MainLayout /></ProtectionRoute>} >
                                <Route index element={<ProtectionRoute role={ [Role.ADMIN, Role.USER] }><DefaultPage /></ProtectionRoute>} />
                                <Route path='/chat' element={<ProtectionRoute role={ [Role.ADMIN, Role.USER] }><ChatPage /></ProtectionRoute>} />

                                <Route path='/dashboard/loading/bank-statements' element={<ProtectionRoute role={ [Role.USER] }><BankStatementsPage /></ProtectionRoute>} />
                                <Route path='/dashboard/loading/sales-documents' element={<ProtectionRoute role={ [Role.USER] }><SalesDocumentsPage /></ProtectionRoute>} />
                                <Route path='/dashboard/loading/purchase-documents' element={<ProtectionRoute role={ [Role.USER] }><PurchaseDocumentsPage /></ProtectionRoute>} />
                                <Route path='/dashboard/loading/personal-documents' element={<ProtectionRoute role={ [Role.USER] }><PersonalDocumentsPage /></ProtectionRoute>} />

                                <Route path='/dashboard/admin/docs' element={<ProtectionRoute role={ [Role.ADMIN] }><ListAllDocsPage /></ProtectionRoute>} />

                                <Route path='/page/services' element={<ProtectionRoute role={ [Role.USER] }><ServicePage /></ProtectionRoute>} />
                            </Route>
                            <Route path='/auth' element={ <MinimalLayout /> }>
                                <Route path='/auth/signin' element={<MakeSignIn />} />
                                <Route path='/auth/signup' element={<AuthSignUp />} />
                                <Route path='/auth/change' element={<AuthChangePassword />} />
                            </Route>
                            <Route path="*" element={<h1>ErrorPage</h1>} />
                        </Routes>
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </BrowserRouter>
    )
}

export default MainRouter