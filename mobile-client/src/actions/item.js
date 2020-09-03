import {
  FIND_ITEM_REQUEST,
  DELETE_ITEM_REQUEST,
  SAVE_ITEM_REQUEST,
  FIND_ITEMS_REQUEST,
  FIND_ITEMS_SEARCH_REQUEST
} from './constants';

export function save(data) {
  return {
    type: SAVE_ITEM_REQUEST,
    data: data
  };
}

export function deleteById(id) {
  return {
    type: DELETE_ITEM_REQUEST,
    id: id
  };
}

export function findById(id) {
  return {
    type: FIND_ITEM_REQUEST,
    id: id
  };
}

export function findAll(params) {
  return {
    type: FIND_ITEMS_REQUEST,
    params: params
  };
}

export function find(params) {
  return {
    type: FIND_ITEMS_SEARCH_REQUEST,
    params: params
  };
}
