import {
  watchFindItems,
  watchFindItem,
  watchSaveItem,
  watchDeleteItem,
  watchFindItemsSearch
} from './item';
import {
  watchFindUnits,
  watchFindUnit,
  watchSaveUnit,
  watchDeleteUnit,
  watchFindUnitsSearch
} from './unit';
import {
  watchFindStock,
  watchFindStocks,
  watchSaveStock,
  watchDeleteStock
} from './stock';
import {
  watchFindTransaction,
  watchFindTransactions,
  watchSaveTransaction,
  watchDeleteTransaction
} from './transaction';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    fork(watchFindItems),
    fork(watchFindItemsSearch),
    fork(watchFindItem),
    fork(watchSaveItem),
    fork(watchDeleteItem),
    fork(watchFindUnits),
    fork(watchFindUnit),
    fork(watchSaveUnit),
    fork(watchDeleteUnit),
    fork(watchFindUnitsSearch),
    fork(watchFindStock),
    fork(watchFindStocks),
    fork(watchSaveStock),
    fork(watchDeleteStock),
    fork(watchFindTransaction),
    fork(watchFindTransactions),
    fork(watchSaveTransaction),
    fork(watchDeleteTransaction)
  ]);
}
