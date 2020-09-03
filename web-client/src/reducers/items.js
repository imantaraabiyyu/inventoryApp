import {
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  DELETE_ITEMS_REQUEST,
  DELETE_ITEMS_SUCCESS,
  DELETE_ITEMS_FAILURE,
  FIND_ITEM_REQUEST,
  FIND_ITEM_SUCCESS,
  FIND_ITEM_FAILURE,
  FIND_ITEMS_REQUEST,
  FIND_ITEMS_SUCCESS,
  FIND_ITEMS_FAILURE,
  SAVE_ITEM_REQUEST,
  SAVE_ITEM_SUCCESS,
  SAVE_ITEM_FAILURE,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILURE
} from "../actions/constants";

const defaultState = {
  saveSuccess: false,
  data: null,
  loading: false,
  error: null,
  image: null
};

export function Items(state = defaultState, action) {
  switch (action.type) {
    case FIND_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_ITEMS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function Item(state = defaultState, action) {
  switch (action.type) {
    case FIND_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_ITEM_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SAVE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_ITEM_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case SAVE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case DELETE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FIND_ITEMS_SUCCESS:
      return {
        ...state,
        saveSuccess: false
      };
    default:
      return state;
  }
}
