import { Items, FormItem, ItemSearch } from '../screens/item';
import { Units, FormUnit, UnitSearch } from '../screens/unit';
import { Stocks, FormStock } from '../screens/stock';
import { Transactions, FormTransaction } from '../screens/transaction';
import Login from '../screens/login';
import Home from '../screens/home';
import Main from '../screens/main';

const drawerRoutes = [
  {
    name: 'Home',
    icon: 'home',
    component: Home
  },
  {
    name: 'Items',
    icon: 'box',
    component: Items
  },
  {
    name: 'Units',
    icon: 'balance-scale',
    component: Units
  },
  {
    name: 'Stocks',
    icon: 'boxes',
    component: Stocks
  },
  {
    name: 'Transaction',
    icon: 'money-bill-wave',
    component: Transactions
  }
];

const stackRoutes = [
  {
    name: 'Login',
    component: Login
  },
  {
    name: 'Main',
    component: Main
  },
  {
    name: 'FormItem',
    component: FormItem
  },
  {
    name: 'FormUnit',
    component: FormUnit
  },
  {
    name: 'FormStock',
    component: FormStock
  },
  {
    name: 'FormTransaction',
    component: FormTransaction
  },
  {
    name: 'ItemSearch',
    component: ItemSearch
  },
  {
    name: 'UnitSearch',
    component: UnitSearch
  }
];

export { stackRoutes, drawerRoutes };
