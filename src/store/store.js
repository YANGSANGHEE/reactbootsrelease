import { configureStore, createSlice } from '@reduxjs/toolkit';

let updateState = createSlice({
    name: 'updateState',
    initialState: {
        updateState: 'N',
    },
    reducers: {
        changeState(state, action) {
            state.updateState = action.payload.updateState;
        },
    },
});

export let { changeState } = updateState.actions; //삭제시 상태

export default configureStore({
    reducer: {
        updateState: updateState.reducer,
    },
});
