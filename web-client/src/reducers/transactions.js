import {
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTIONS_REQUEST,
  DELETE_TRANSACTIONS_SUCCESS,
  DELETE_TRANSACTIONS_FAILURE,
  FIND_TRANSACTION_REQUEST,
  FIND_TRANSACTION_SUCCESS,
  FIND_TRANSACTION_FAILURE,
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTIONS_SUCCESS,
  FIND_TRANSACTIONS_FAILURE,
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE
} from "../actions/constants";

const defaultState = {
  saveSuccess: false,
  data: null,
  loading: false,
  error: null
};

export function Transactions(state = defaultState, action) {
  switch (action.type) {
    case FIND_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_TRANSACTIONS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function Transaction(state = defaultState, action) {
  switch (action.type) {
    case FIND_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_TRANSACTION_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SAVE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_TRANSACTION_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case SAVE_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case DELETE_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FIND_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        saveSuccess: false
      };
    default:
      return state;
  }
}
