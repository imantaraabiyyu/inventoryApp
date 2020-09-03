import {
  DELETE_UNIT_REQUEST,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAILURE,
  DELETE_UNITS_REQUEST,
  DELETE_UNITS_SUCCESS,
  DELETE_UNITS_FAILURE,
  FIND_UNIT_REQUEST,
  FIND_UNIT_SUCCESS,
  FIND_UNIT_FAILURE,
  FIND_UNITS_REQUEST,
  FIND_UNITS_SUCCESS,
  FIND_UNITS_FAILURE,
  SAVE_UNIT_REQUEST,
  SAVE_UNIT_SUCCESS,
  SAVE_UNIT_FAILURE
} from "../actions/constants";

const defaultState = {
  saveSuccess: false,
  data: null,
  loading: false,
  error: null
};

export function Units(state = defaultState, action) {
  switch (action.type) {
    case FIND_UNITS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_UNITS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_UNITS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_UNITS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_UNITS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_UNITS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function Unit(state = defaultState, action) {
  switch (action.type) {
    case FIND_UNIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_UNIT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_UNIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SAVE_UNIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_UNIT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case SAVE_UNIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_UNIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_UNIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case DELETE_UNIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FIND_UNITS_SUCCESS:
      return {
        ...state,
        saveSuccess: false
      };
    default:
      return state;
  }
}
