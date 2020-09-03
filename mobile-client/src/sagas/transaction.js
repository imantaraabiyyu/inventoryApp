import { put, takeLatest } from 'redux-saga/effects';
import {
  FIND_TRANSACTIONS_FAILURE,
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTIONS_SUCCESS,
  FIND_TRANSACTION_FAILURE,
  FIND_TRANSACTION_SUCCESS,
  FIND_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE,
  SAVE_TRANSACTION_REQUEST
} from '../actions/constants';
import { commonAxios } from '../utils/apiUtil';

function* findById(action) {
  try {
    const data = yield commonAxios.get(`transactions/${action.id}`);
    yield put({
      type: FIND_TRANSACTION_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_TRANSACTION_FAILURE,
      error: error
    });
  }
}

function* deleteById(action) {
  try {
    const data = yield commonAxios.delete(`transactions/${action.id}`);
    yield put({
      type: DELETE_TRANSACTION_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: DELETE_TRANSACTION_FAILURE,
      error: error
    });
  }
}

function* save(action) {
  const { id, amount, type, description } = action.data;
  try {
    const data = yield id
      ? commonAxios.put(`transactions`, { id, amount, type, description })
      : commonAxios.post(`transactions`, { amount, type, description });
    yield put({
      type: SAVE_TRANSACTION_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: SAVE_TRANSACTION_FAILURE,
      error: error
    });
  }
}

function* findAll(action) {
  const { sort = 'asc', page = 0, size = 10, type, from, to } =
    action.params || {};
  try {
    const data = yield commonAxios.get('transactions', {
      params: { sort, page, size, type, from, to }
    });
    yield put({
      type: FIND_TRANSACTIONS_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_TRANSACTIONS_FAILURE,
      error: error
    });
  }
}

export function* watchFindTransactions() {
  yield takeLatest(FIND_TRANSACTIONS_REQUEST, findAll);
}

export function* watchFindTransaction() {
  yield takeLatest(FIND_TRANSACTION_REQUEST, findById);
}

export function* watchSaveTransaction() {
  yield takeLatest(SAVE_TRANSACTION_REQUEST, save);
}

export function* watchDeleteTransaction() {
  yield takeLatest(DELETE_TRANSACTION_REQUEST, deleteById);
}
