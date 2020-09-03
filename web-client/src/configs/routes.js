import { HomePage } from "../scenes/home";
import { ItemsPage, ItemPage } from "../scenes/item";
import { StocksPage, StockPage } from "../scenes/stock";
import { TransactionsPage, TransactionPage } from "../scenes/transaction";
import { UnitsPage, UnitPage } from "../scenes/unit";
import { ErrorPage } from "../scenes/error";

const routes = [
  {
    path: "/",
    breadcrumb: "Home",
    component: HomePage,
    exact: true
  },
  {
    path: "/items/add",
    breadcrumb: "Add Item",
    component: ItemPage
  },
  {
    path: "/items/:id",
    breadcrumb: "Detail",
    component: ItemPage
  },
  {
    path: "/items",
    breadcrumb: "Items",
    component: ItemsPage
  },
  {
    path: "/stocks/add",
    breadcrumb: "Add Stock",
    component: StockPage
  },
  {
    path: "/stocks/:id",
    breadcrumb: "Detail",
    component: StockPage
  },
  {
    path: "/stocks",
    breadcrumb: "Stocks",
    component: StocksPage
  },
  {
    path: "/transactions/add",
    breadcrumb: "Add Transaction",
    component: TransactionPage
  },
  {
    path: "/transactions/:id",
    breadcrumb: "Detail",
    component: TransactionPage
  },
  {
    path: "/transactions",
    breadcrumb: "Transactions",
    component: TransactionsPage
  },
  {
    path: "/units/add",
    breadcrumb: "Add Unit",
    component: UnitPage
  },
  {
    path: "/units/:id",
    breadcrumb: "Detail",
    component: UnitPage
  },
  {
    path: "/units",
    breadcrumb: "Units",
    component: UnitsPage
  },
  {
    path: "*",
    component: ErrorPage,
    props: {
      code: 404
    }
  }
];

export default routes;
