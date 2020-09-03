import { combineReducers } from "redux";
import { Items, Item } from "./items";
import { Units, Unit } from "./units";
import { Stocks, Stock } from "./stocks";
import { Transactions, Transaction } from "./transactions";
import { Stats, Chart, Table } from "./home";
export default combineReducers({
  Stats,
  Chart,
  Table,
  Items,
  Item,
  Units,
  Unit,
  Stocks,
  Stock,
  Transactions,
  Transaction
});
