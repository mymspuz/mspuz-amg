import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../index";

export const dashboardClientApi = createApi({
    reducerPath: 'dashboardClientApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_URL_API_DEV}1c/`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        getBalanceBankLast: build.query({
            query: (params: {code: string}) => {
                return {
                    url: '',
                    method: 'GET',
                    credentials: 'include',
                    params: params
                }
            }
        })
    })
})

export const {
    useGetBalanceBankLastQuery,
    useLazyGetBalanceBankLastQuery
} = dashboardClientApi