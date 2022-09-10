import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PageState {
    customersData: any
}

const initialState: PageState = {
    customersData: []
}

export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setCustomersData: (state, action: PayloadAction<any>) => {
            state.customersData = action.payload
        }
    }
})

export const { setCustomersData } = customersSlice.actions
export default customersSlice.reducer