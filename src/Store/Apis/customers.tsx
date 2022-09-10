import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { setCustomersData } from '../Slices/customersSlice'

export const customersApi = createApi({
    reducerPath: 'customersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1337/api',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${process.env.REACT_APP_API_TOKEN}`)
            return headers
        }
    }),
    tagTypes: ['Customers'],
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: ({ pageSize, page }) => ({
                url: 'customers',
                method: 'GET',
                params: {
                    "pagination[pageSize]": pageSize,
                    "pagination[page]": page
                },
            }),
            providesTags: ['Customers']
        }),
        getCustomerById: builder.mutation({
            query: (id) => ({
                url: `customers/${id}`,
                method: 'GET'
            })
        }),
        createCustomer: builder.mutation({
            query: (payload) => ({
                url: 'customers',
                method: 'POST',
                body: {
                    data: { ...payload }
                }
            }),
            invalidatesTags: ['Customers']
        }),
        updateCustomer: builder.mutation({
            query: ({ id, payload }) => ({
                url: `customers/${id}`,
                method: 'PUT',
                body: {
                    data: { ...payload }
                }
            }),
            invalidatesTags: ['Customers']
        }),
        removeCustomer: builder.mutation({
            query: (id) => ({
                url: `customers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Customers']
        })
    })
})

export const {
    useGetCustomersQuery,
    useGetCustomerByIdMutation,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useRemoveCustomerMutation
} = customersApi