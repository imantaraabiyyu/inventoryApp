import { put, takeLatest } from 'redux-saga/effects';
import {
  FIND_STOCKS_FAILURE,
  FIND_STOCKS_REQUEST,
  FIND_STOCKS_SUCCESS,
  FIND_STOCK_FAILURE,
  FIND_STOCK_SUCCESS,
  FIND_STOCK_REQUEST,
  DELETE_STOCK_SUCCESS,
  DELETE_STOCK_FAILURE,
  DELETE_STOCK_REQUEST,
  SAVE_STOCK_SUCCESS,
  SAVE_STOCK_FAILURE,
  SAVE_STOCK_REQUEST
} from '../actions/constants';
import { commonAxios } from '../utils/apiUtil';

function* findById(action) {
  try {
    const data = yield commonAxios.get(`stocks/${action.id}`);
    yield put({
      type: FIND_STOCK_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_STOCK_FAILURE,
      error: error
    });
  }
}

function* deleteById(action) {
  try {
    const data = yield commonAxios.delete(`stocks/${action.id}`);
    yield put({
      type: DELETE_STOCK_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: DELETE_STOCK_FAILURE,
      error: error
    });
  }
}

function* save(action) {
  const { id, item, unit, qty } = action.data;
  const itemId = item.id;
  const unitId = unit.id;
  try {
    const data = yield id
      ? commonAxios.put(`stocks`, { id, itemId, unitId, qty })
      : commonAxios.post(`stocks`, { itemId, unitId, qty });
    yield put({
      type: SAVE_STOCK_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: SAVE_STOCK_FAILURE,
      error: error
    });
  }
}

function* findAll(action) {
  const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
  try {
    const data = yield commonAxios.get('stocks', {
      params: { ...search, sort, page, size }
    });
    yield put({
      type: FIND_STOCKS_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_STOCKS_FAILURE,
      error: error
    });
  }
}

export function* watchFindStocks() {
  yield takeLatest(FIND_STOCKS_REQUEST, findAll);
}

export function* watchFindStock() {
  yield takeLatest(FIND_STOCK_REQUEST, findById);
}

export function* watchSaveStock() {
  yield takeLatest(SAVE_STOCK_REQUEST, save);
}

export function* watchDeleteStock() {
  yield takeLatest(DELETE_STOCK_REQUEST, deleteById);
}
