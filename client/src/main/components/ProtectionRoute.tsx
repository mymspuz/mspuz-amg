import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { TRole, UserResponse } from '../../data/AuthTypes'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getCurrentAccountAdapter } from '../../data/localstorage/CurrentAccountAdapter'
import { setAll } from '../../store/slice/authSlice'
import { Loader } from '../../presentation/components'

type ProtectionRouteProps = {
    children: JSX.Element
    role: TRole[]
}

type TState = {
    loading: boolean
    errorAccess: boolean
}

const ProtectionRoute: React.FC<ProtectionRouteProps> = ({ children, role }: ProtectionRouteProps) => {
    const [state, setState] = useState<TState>({ loading: true, errorAccess: false })

    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const checkRole = (authRole: TRole) => {
        if (role.some(r => r === authRole)) {
            setState({...state, loading: false})
        } else {
            setState({...state, errorAccess: true})
        }
    }

    const authLocalstorage = getCurrentAccountAdapter()

    useEffect(() => {
        if (!authLocalstorage.token) {
            return
        }
        if (auth.role && auth.token) {
            setState({...state, loading: false})
            checkRole(auth.role)
        } else {
            const decode_token: UserResponse = jwt_decode(authLocalstorage.token)
            dispatch(setAll({ role: decode_token.role, token: authLocalstorage.token }))
            checkRole(decode_token.role)
        }
    }, [])

    if (!authLocalstorage.token) {
        return <Navigate to={'/auth/signin'} />
    }

    return (
        <>
            {state.errorAccess && <p>ErrorAccess</p>}
            {state.loading ? <Loader /> : children}
        </>
    )
}

export default ProtectionRoute