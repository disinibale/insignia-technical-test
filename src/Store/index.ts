import { configureStore } from "@reduxjs/toolkit"
import pageReducer from './Slices/pageSlice'
import customersReducer from './Slices/customersSlice'
import { customersApi } from './Apis/customers';

export const store = configureStore({
    reducer: {
        page: pageReducer,
        customers: customersReducer,
        [customersApi.reducerPath]: customersApi.reducer
    },
    middleware: (getDefaultMiddleWare) => {
        return getDefaultMiddleWare().concat([
            customersApi.middleware
        ])
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch