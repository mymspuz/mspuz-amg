import { configureStore } from '@reduxjs/toolkit'

import {
    customizationReducer,
    authReducer,
    errorReducer,
    chatReducer
} from './slice'
import { authApi } from './queries/auth.queri'
import { docsApi } from './queries/docs.queri'
import { rtkQueryErrorLogger } from './middleware/errorLogger'

export const store = configureStore({
    reducer: {
        customization: customizationReducer,
        auth: authReducer,
        chat: chatReducer,
        error: errorReducer,
        [authApi.reducerPath]: authApi.reducer,
        [docsApi.reducerPath]: docsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(rtkQueryErrorLogger)
        .concat(authApi.middleware)
        .concat(docsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch