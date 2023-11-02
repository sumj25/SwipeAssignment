import { ADD_INVOICE, EDIT_INVOICE, DELETE_INVOICE, SET_SELECTED_INVOICE_ID } from "./ActionTypes";

const initialState = {
  invoices: [],
  selectedInvoiceId: null
};

const invoiceReducer = (state = initialState, action) => {
  //   console.log(action);
  switch (action.type) {
    case ADD_INVOICE:
      return Object.assign({}, state, {
        invoices: state.invoices.concat(action.payload),
        selectedInvoiceId: null
      });
    case EDIT_INVOICE:
      const updatedInvoices = state.invoices.map((invoice) => {
        if (invoice.id === action.payload.id) {
          return Object.assign({}, invoice, action.payload);
        }
        return invoice;
      });
      console.log(action.payload, "inside reducer");
      return Object.assign({}, state, {
        invoices: updatedInvoices,
        selectedInvoiceId: action.payload.id
      });
    case DELETE_INVOICE:
      const filteredInvoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
      return Object.assign({}, state, {
        invoices: filteredInvoices,
      });
    case SET_SELECTED_INVOICE_ID:
      return Object.assign({}, state, {
        selectedInvoiceId: action.payload.id,
      });
    default:
      return state;
  }
};

export default invoiceReducer;
