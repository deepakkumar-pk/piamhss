import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: { toggleForm: false, formId: undefined, deleteId: null },
};

export const ReducerSlice = createSlice({
  name: "PIAMHSS",
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    updateAction: (state, action) => {
      state.client.formId = action.payload;
    },
    voucherShow: (state, action) => {
      state.client.voucherShow = action.payload;
    },
    defaulterDataFilter: (state, action) => {
      state.client.defaulterDataFilter = action.payload;
    },
    searchValue: (state, action) => {
      state.client.searchValue = action.payload;
    },
    studentClassFilter: (state, action) => {
      state.client.studentClassFilter = action.payload;
    },
    printAll: (state, action) => {
      state.client.printAll = action.payload;
    },
    monthlySummary: (state, action) => {
      state.client.monthlySummary = action.payload;
    },
    deleteAction: (state, action) => {
      state.client.deleteId = action.payload;
    },
    annualFund: (state, action) => {
      state.client.annualFund = action.payload;
    },
  },
});

export const {
  toggleChangeAction,
  voucherShow,
  defaulterDataFilter,
  updateAction,
  searchValue,
  studentClassFilter,
  printAll,
  deleteAction,
  annualFund,
  monthlySummary,
} = ReducerSlice.actions;

export default ReducerSlice.reducer;
