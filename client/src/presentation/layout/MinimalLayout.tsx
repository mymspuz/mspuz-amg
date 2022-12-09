import React from 'react'
import { Outlet } from 'react-router-dom'

import Customization from './Customization'

const MinimalLayout: React.FC = () => (
    <>
        <Outlet />
        {/*<Customization />*/}
    </>
)

export default MinimalLayout