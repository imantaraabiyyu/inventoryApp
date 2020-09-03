import {
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTIONS_REQUEST,
  DELETE_TRANSACTIONS_SUCCESS,
  DELETE_TRANSACTIONS_FAILURE,
  FIND_TRANSACTION_REQUEST,
  FIND_TRANSACTION_SUCCESS,
  FIND_TRANSACTION_FAILURE,
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTIONS_SUCCESS,
  FIND_TRANSACTIONS_FAILURE,
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE
} from "./constants";
import { commonAxios } from "../util/apiUtil";
import Swal from "sweetalert2";

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_TRANSACTION_REQUEST
  });

  commonAxios
    .delete(`transactions/${id}`)
    .then((data) => {
      dispatch(deleteTransactionSuccess(data));
    })
    .then(() => {
      dispatch(findAll());
    })
    .catch((error) => {
      console.log(error);
      dispatch(deleteTransactionFailure(error));
    });
};

export const deleteAll = (ids) => (dispatch) => {
  dispatch({
    type: DELETE_TRANSACTIONS_REQUEST
  });

  commonAxios
    .delete(`transactions?${ids.map((id) => "ids=" + id).join("&")}`)
    .then((data) => {
      dispatch(deleteTransactionsSuccess(data));
    })
    .then(() => {
      dispatch(findAll());
    })
    .catch((error) => {
      console.log(error);
      dispatch(deleteTransactionsFailure(error));
    });
};

export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_TRANSACTION_REQUEST
  });

  commonAxios
    .get(`transactions/${id}`)
    .then((data) => {
      dispatch(findTransactionSuccess(data));
    })
    .catch((error) => {
      dispatch(findTransactionFailure(error));
    });
};

export const findAll = ({ search, sort = "asc", page = 0, size = 10 } = {}) => (
  dispatch
) => {
  dispatch({
    type: FIND_TRANSACTIONS_REQUEST
  });

  commonAxios
    .get("transactions", {
      params: {
        ...search,
        sort,
        page,
        size
      }
    })
    .then((data) => {
      dispatch(findTransactionsSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(findTransactionsFailure(error));
    });
};

export const save = ({ id, type, amount, description } = {}) => (dispatch) => {
  dispatch({
    type: SAVE_TRANSACTION_REQUEST
  });

  const request = id
    ? commonAxios.put(`transactions/`, { id, type, amount, description })
    : commonAxios.post("transactions/", { type, amount, description });

  request
    .then((data) => {
      dispatch(saveTransactionSuccess(data));
    })
    .then(() => {
      dispatch(Swal.fire("Success", "Item Successfully Saved!", "success"));
    })
    .catch((error) => {
      dispatch(saveTransactionFailure(error));
    });
};

function saveTransactionSuccess(data) {
  return {
    type: SAVE_TRANSACTION_SUCCESS,
    data: data
  };
}

function saveTransactionFailure(error) {
  return {
    type: SAVE_TRANSACTION_FAILURE,
    error: error
  };
}

function deleteTransactionSuccess(data) {
  return {
    type: DELETE_TRANSACTION_SUCCESS,
    data: data
  };
}

function deleteTransactionFailure(error) {
  return {
    type: DELETE_TRANSACTION_FAILURE,
    error: error
  };
}

function deleteTransactionsSuccess(data) {
  return {
    type: DELETE_TRANSACTIONS_SUCCESS,
    data: data
  };
}

function deleteTransactionsFailure(error) {
  return {
    type: DELETE_TRANSACTIONS_FAILURE,
    error: error
  };
}

function findTransactionSuccess(data) {
  return {
    type: FIND_TRANSACTION_SUCCESS,
    data: data
  };
}

function findTransactionFailure(error) {
  return {
    type: FIND_TRANSACTION_FAILURE,
    error: error
  };
}

function findTransactionsSuccess(data) {
  return {
    type: FIND_TRANSACTIONS_SUCCESS,
    data: data
  };
}

function findTransactionsFailure(error) {
  return {
    type: FIND_TRANSACTIONS_FAILURE,
    error: error
  };
}
