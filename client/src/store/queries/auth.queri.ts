import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { RootState } from '../index'
import { api_url } from '../../utils/initialConst'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_URL_API_DEV}auth/`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getAuth: builder.mutation({
            query: (payload) => ({
                url: 'signin',
                method: 'POST',
                body: payload
            })
        }),
        getAuthByName: builder.query({
            query: () => ''
        }),
    }),
})

export const {
    useGetAuthByNameQuery,
    useLazyGetAuthByNameQuery,
    useGetAuthMutation
} = authApi