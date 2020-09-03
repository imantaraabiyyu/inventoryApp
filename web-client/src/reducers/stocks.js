import {
  DELETE_STOCK_REQUEST,
  DELETE_STOCK_SUCCESS,
  DELETE_STOCK_FAILURE,
  DELETE_STOCKS_REQUEST,
  DELETE_STOCKS_SUCCESS,
  DELETE_STOCKS_FAILURE,
  FIND_STOCK_REQUEST,
  FIND_STOCK_SUCCESS,
  FIND_STOCK_FAILURE,
  FIND_STOCKS_REQUEST,
  FIND_STOCKS_SUCCESS,
  FIND_STOCKS_FAILURE,
  SAVE_STOCK_REQUEST,
  SAVE_STOCK_SUCCESS,
  SAVE_STOCK_FAILURE
} from "../actions/constants";

const defaultState = {
  saveSuccess: false,
  data: null,
  loading: false,
  error: null
};

export function Stocks(state = defaultState, action) {
  switch (action.type) {
    case FIND_STOCKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_STOCKS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_STOCKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_STOCKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_STOCKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_STOCKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function Stock(state = defaultState, action) {
  switch (action.type) {
    case FIND_STOCK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_STOCK_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_STOCK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SAVE_STOCK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_STOCK_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case SAVE_STOCK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_STOCK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case DELETE_STOCK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FIND_STOCKS_SUCCESS:
      return {
        data: action.data,
        saveSuccess: false
      };
    default:
      return state;
  }
}
