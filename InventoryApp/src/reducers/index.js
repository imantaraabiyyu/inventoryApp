import { combineReducers } from 'redux';

import { items, itemId, itemsSearch, deletedItemById, saveItem } from './item';
import { units, unitId, unitsSearch, deletedUnitById, saveUnit } from './unit';
import { stocks, stockId, deletedStockById, saveStock } from './stock';
import {
  transactions,
  transactionId,
  deletedTransactionById,
  saveTransaction
} from './transaction';

export default combineReducers({
  items,
  itemId,
  itemsSearch,
  deletedItemById,
  saveItem,
  units,
  unitId,
  unitsSearch,
  deletedUnitById,
  saveUnit,
  stocks,
  stockId,
  deletedStockById,
  saveStock,
  transactions,
  transactionId,
  deletedTransactionById,
  saveTransaction
});
