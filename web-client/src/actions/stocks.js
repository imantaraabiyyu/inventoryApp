import {
  DELETE_STOCK_REQUEST,
  DELETE_STOCK_SUCCESS,
  DELETE_STOCK_FAILURE,
  DELETE_STOCKS_REQUEST,
  DELETE_STOCKS_SUCCESS,
  DELETE_STOCKS_FAILURE,
  FIND_STOCK_REQUEST,
  FIND_STOCK_SUCCESS,
  FIND_STOCK_FAILURE,
  FIND_STOCKS_REQUEST,
  FIND_STOCKS_SUCCESS,
  FIND_STOCKS_FAILURE,
  SAVE_STOCK_REQUEST,
  SAVE_STOCK_SUCCESS,
  SAVE_STOCK_FAILURE
} from "./constants";
import { commonAxios } from "../util/apiUtil";
import Swal from "sweetalert2";

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_STOCK_REQUEST
  });

  commonAxios
    .delete(`stocks/${id}`)
    .then((data) => {
      dispatch(deleteStockSuccess(data));
      dispatch(findAll());
    })
    .catch((error) => {
      console.log(error);
      dispatch(deleteStockFailure(error));
    });
};

export const deleteAll = (ids) => (dispatch) => {
  dispatch({
    type: DELETE_STOCKS_REQUEST
  });

  commonAxios
    .delete(`stocks?${ids.map((id) => "ids=" + id).join("&")}`)
    .then((data) => {
      dispatch(deleteStocksSuccess(data));
    })
    .then(() => {
      dispatch(findAll());
    })
    .catch((error) => {
      dispatch(deleteStocksFailure(error));
    });
};

export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_STOCK_REQUEST
  });

  commonAxios
    .get(`stocks/${id}`)
    .then((data) => {
      dispatch(findStockSuccess(data));
    })
    .catch((error) => {
      dispatch(findStockFailure(error));
    });
};

export const findAll = ({ search, sort = "asc", page = 0, size = 10 } = {}) => (
  dispatch
) => {
  dispatch({
    type: FIND_STOCKS_REQUEST
  });

  commonAxios
    .get("stocks", {
      params: {
        ...search,
        sort,
        page,
        size
      }
    })
    .then((data) => {
      dispatch(findStocksSuccess(data));
    })
    .catch((error) => {
      dispatch(findStocksFailure(error));
    });
};

export const save = ({ id, item, qty, unit } = {}) => (dispatch) => {
  dispatch({
    type: SAVE_STOCK_REQUEST
  });
  let itemId = item.id;
  let unitId = unit.id;
  const request = id
    ? commonAxios.put(`stocks/`, { id, itemId, qty, unitId })
    : commonAxios.post("stocks/", { itemId, qty, unitId });

  request
    .then((data) => {
      dispatch(saveStockSuccess(data));
    })
    .then(() => {
      dispatch(Swal.fire("Success", "Item Successfully Saved!", "success"));
    })
    .catch((error) => {
      dispatch(saveStockFailure(error));
    });
};

function saveStockSuccess(data) {
  return {
    type: SAVE_STOCK_SUCCESS,
    data: data
  };
}

function saveStockFailure(error) {
  return {
    type: SAVE_STOCK_FAILURE,
    error: error
  };
}

function deleteStockSuccess(data) {
  return {
    type: DELETE_STOCK_SUCCESS,
    data: data
  };
}

function deleteStockFailure(error) {
  return {
    type: DELETE_STOCK_FAILURE,
    error: error
  };
}

function deleteStocksSuccess(data) {
  return {
    type: DELETE_STOCKS_SUCCESS,
    data: data
  };
}

function deleteStocksFailure(error) {
  return {
    type: DELETE_STOCKS_FAILURE,
    error: error
  };
}

function findStockSuccess(data) {
  return {
    type: FIND_STOCK_SUCCESS,
    data: data
  };
}

function findStockFailure(error) {
  return {
    type: FIND_STOCK_FAILURE,
    error: error
  };
}

function findStocksSuccess(data) {
  return {
    type: FIND_STOCKS_SUCCESS,
    data: data
  };
}

function findStocksFailure(error) {
  return {
    type: FIND_STOCKS_FAILURE,
    error: error
  };
}
