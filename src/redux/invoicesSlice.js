import { createSlice } from "@reduxjs/toolkit";
import convertCurrency from "../utils/currencyConverter";
const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id,
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateInvoicesByProduct: (state, action) => {
      const { productId, diff, prodCurr } = action.payload;
      state.forEach((invoice) => {
        const index = invoice?.items.findIndex(
          (item) => parseInt(item.itemId) === parseInt(productId),
        );
        if (index !== -1) {
          invoice.total = String(
            (parseFloat(invoice.total) + convertCurrency(parseFloat(diff),prodCurr,invoice.currency)).toFixed(2),
          );
        }
      });
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoicesByProduct,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
