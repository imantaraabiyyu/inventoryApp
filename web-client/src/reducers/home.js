import {
  FIND_STOCK_SUMMARY_FAILURE,
  FIND_STOCK_SUMMARY_REQUEST,
  FIND_STOCK_SUMMARY_SUCCESS,
  FIND_TRANSACTION_CHART_SUMMARY_FAILURE,
  FIND_TRANSACTION_CHART_SUMMARY_REQUEST,
  FIND_TRANSACTION_CHART_SUMMARY_SUCCESS,
  FIND_TRANSACTION_SUMMARY_FAILURE,
  FIND_TRANSACTION_SUMMARY_SUCCESS,
  FIND_TRANSACTION_SUMMARY_REQUEST,
  FIND_TRANSACTION_CURRENT_SUMMARY_REQUEST,
  FIND_TRANSACTION_CURRENT_SUMMARY_SUCCESS,
  FIND_TRANSACTION_CURRENT_SUMMARY_FAILURE
} from "../actions/constants";

const defaultState = {
  saveSuccess: false,
  dataChart: null,
  dataTable: null,
  dataStats: null,
  dataCurrentStats: null,
  loading: false,
  loadingStats: false,
  error: null
};

export function Stats(state = defaultState, action) {
  switch (action.type) {
    case FIND_TRANSACTION_SUMMARY_REQUEST:
      return {
        ...state,
        loadingStats: true,
        error: null
      };
    case FIND_TRANSACTION_SUMMARY_SUCCESS:
      return {
        ...state,
        dataStats: action.data,
        loadingStats: false,
        error: null
      };
    case FIND_TRANSACTION_SUMMARY_FAILURE:
      return {
        ...state,
        loadingStats: false,
        error: action.error
      };
    case FIND_TRANSACTION_CURRENT_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_TRANSACTION_CURRENT_SUMMARY_SUCCESS:
      return {
        ...state,
        dataCurrentStats: action.data,
        loading: false,
        error: null
      };
    case FIND_TRANSACTION_CURRENT_SUMMARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function Chart(state = defaultState, action) {
  switch (action.type) {
    case FIND_TRANSACTION_CHART_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_TRANSACTION_CHART_SUMMARY_SUCCESS:
      return {
        ...state,
        dataChart: action.data,
        loading: false,
        error: null
      };
    case FIND_TRANSACTION_CHART_SUMMARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function Table(state = defaultState, action) {
  switch (action.type) {
    case FIND_STOCK_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_STOCK_SUMMARY_SUCCESS:
      return {
        ...state,
        dataTable: action.data,
        loading: false,
        error: null
      };
    case FIND_STOCK_SUMMARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
