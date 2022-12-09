import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { getCurrentAccountAdapter } from '../../data/localstorage/CurrentAccountAdapter'
import { setAll } from '../../store/slice/authSlice'
import { UserResponse } from '../../data/AuthTypes'
import { SignIn } from '../../presentation/pages/Auth'

const MakeSignIn: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true)

    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const authLocalstorage = getCurrentAccountAdapter()

    useEffect(() => {
        if (!authLocalstorage.token) {
            return
        }
        const decode_token: UserResponse = jwt_decode(authLocalstorage.token)
        dispatch(setAll({ role: decode_token.role, token: authLocalstorage.token }))
    }, [])

    if (auth.role && auth.token && authLocalstorage.token) {
        return <Navigate to={'/'} />
    }

    if (!authLocalstorage.token) {
        return <SignIn />
    }

    return loading ? <p>LoadingMake...</p> : null
}

export default MakeSignIn