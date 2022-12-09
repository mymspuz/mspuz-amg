import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from '../index'
import {TChangeStatusReq, TParamsRequest} from '../../data/DocsTypes'

export const docsApi = createApi({
    reducerPath: 'docsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_URL_API_DEV}docs/`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        getDocsAll: build.query({
           query: (paramsFilter: TParamsRequest) => {
               return {
                   url: '',
                   method: 'GET',
                   credentials: 'include',
                   params: paramsFilter
               }
           }
        }),
        getDocsForUser: build.query({
            query: (type) => `${type}`
        }),
        docsUpload: build.mutation({
            query: (data) => ({
                url: 'upload',
                method: 'POST',
                credentials: 'include',
                body: data
            })
        }),
        docsRemove: build.mutation({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
                credentials: 'include'
            })
        }),
        docsDownload: build.query({
            queryFn: async (id, api, extraOptions, baseQuery) => {
                const result: any = await baseQuery({
                    url: `download/${id}`,
                    responseHandler: ((response) => response.blob())
                })
                if ('error' in result || result.status > 300) {
                    return { error: result.error }
                }
                const hiddenElement = document.createElement('a')
                const url = window.URL || window.webkitURL
                const blobData = url.createObjectURL(result.data)
                hiddenElement.href = blobData
                hiddenElement.target = '_blank'
                hiddenElement.download = `docs.zip`
                hiddenElement.click()
                return { data: null }
            }
        }),
        docsChangeStatus: build.mutation({
            query: (data: TChangeStatusReq) => ({
                url: '',
                method: 'PUT',
                credentials: 'include',
                body: data
            })
        })
    })
})

export const {
    useGetDocsAllQuery,
    useLazyGetDocsAllQuery,

    useGetDocsForUserQuery,
    useLazyGetDocsForUserQuery,

    useDocsUploadMutation,

    useLazyDocsDownloadQuery,

    useDocsRemoveMutation,

    useDocsChangeStatusMutation,
} = docsApi