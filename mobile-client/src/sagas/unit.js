import { put, takeLatest } from 'redux-saga/effects';
import {
  FIND_UNITS_FAILURE,
  FIND_UNITS_REQUEST,
  FIND_UNITS_SUCCESS,
  FIND_UNIT_FAILURE,
  FIND_UNIT_SUCCESS,
  FIND_UNIT_REQUEST,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAILURE,
  DELETE_UNIT_REQUEST,
  SAVE_UNIT_SUCCESS,
  SAVE_UNIT_FAILURE,
  SAVE_UNIT_REQUEST,
  FIND_UNITS_SEARCH_SUCCESS,
  FIND_UNITS_SEARCH_FAILURE,
  FIND_UNITS_SEARCH_REQUEST
} from '../actions/constants';
import { commonAxios } from '../utils/apiUtil';

function* findById(action) {
  try {
    const data = yield commonAxios.get(`units/${action.id}`);
    yield put({
      type: FIND_UNIT_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_UNIT_FAILURE,
      error: error
    });
  }
}

function* deleteById(action) {
  try {
    const data = yield commonAxios.delete(`units/${action.id}`);
    yield put({
      type: DELETE_UNIT_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: DELETE_UNIT_FAILURE,
      error: error
    });
  }
}

function* save(action) {
  const { id, name, description } = action.data;
  try {
    const data = yield id
      ? commonAxios.put(`units`, { id, name, description })
      : commonAxios.post(`units`, { name, description });
    yield put({
      type: SAVE_UNIT_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: SAVE_UNIT_FAILURE,
      error: error
    });
  }
}

function* findAll(action) {
  const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
  try {
    const data = yield commonAxios.get('units', {
      params: { ...search, sort, page, size }
    });
    yield put({
      type: FIND_UNITS_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_UNITS_FAILURE,
      error: error
    });
  }
}

function* find(action) {
  const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
  try {
    const data = yield commonAxios.get('units', {
      params: { ...search, sort, page, size }
    });
    yield put({
      type: FIND_UNITS_SEARCH_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_UNITS_SEARCH_FAILURE,
      error: error
    });
  }
}

export function* watchFindUnitsSearch() {
  yield takeLatest(FIND_UNITS_SEARCH_REQUEST, find);
}
export function* watchFindUnits() {
  yield takeLatest(FIND_UNITS_REQUEST, findAll);
}

export function* watchFindUnit() {
  yield takeLatest(FIND_UNIT_REQUEST, findById);
}

export function* watchSaveUnit() {
  yield takeLatest(SAVE_UNIT_REQUEST, save);
}

export function* watchDeleteUnit() {
  yield takeLatest(DELETE_UNIT_REQUEST, deleteById);
}
