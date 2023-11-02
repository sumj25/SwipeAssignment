import { legacy_createStore as createStore } from 'redux';
import invoiceReducer from './Reducers';

const store = createStore(invoiceReducer);

export default store;