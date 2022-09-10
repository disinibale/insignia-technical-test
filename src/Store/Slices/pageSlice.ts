import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PageState {
    name: string
}

const initialState: PageState = {
    name: 'Home'
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        switchPage: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export const { switchPage } = pageSlice.actions
export default pageSlice.reducer