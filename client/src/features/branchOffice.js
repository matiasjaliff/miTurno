import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

export const branchOfficePicker = createAsyncThunk("BRANCH_OFFICE_PICKER", (picked) => {
    console.log('BRANCH PICKED EN REDUCE ES ', picked)
    /* const day = picked.date.getDay().toString();
    const date = picked.date.getDate().toString();
    const month = picked.date.getMonth().toString();
    const year = picked.date.getFullYear().toString();
    const hours = picked.date.getHours().toString();
    const minutes = picked.date.getMinutes().toString(); */
    const clickedOffice = picked.clickedOffice

    return {clickedOffice}
});

export const emptyBranchOffice = createAsyncThunk("EMPTY_BRANCH_OFFICE", () => {
    return {}
})

const branchOfficeReducer = createReducer({}, {
    [branchOfficePicker.fulfilled]: (state, action) => action.payload,
    [emptyBranchOffice.fulfilled]: (state, action) => action.payload
});

export default branchOfficeReducer;