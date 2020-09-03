import { commonAxios } from "../util/apiUtil";
import {
  FIND_STOCK_SUMMARY_FAILURE,
  FIND_STOCK_SUMMARY_REQUEST,
  FIND_STOCK_SUMMARY_SUCCESS,
  FIND_TRANSACTION_CHART_SUMMARY_FAILURE,
  FIND_TRANSACTION_CHART_SUMMARY_REQUEST,
  FIND_TRANSACTION_CHART_SUMMARY_SUCCESS,
  FIND_TRANSACTION_SUMMARY_FAILURE,
  FIND_TRANSACTION_SUMMARY_SUCCESS,
  FIND_TRANSACTION_SUMMARY_REQUEST,
  FIND_TRANSACTION_CURRENT_SUMMARY_REQUEST,
  FIND_TRANSACTION_CURRENT_SUMMARY_FAILURE,
  FIND_TRANSACTION_CURRENT_SUMMARY_SUCCESS
} from "./constants";

export const stockSummary = () => (dispatch) => {
  dispatch({
    type: FIND_STOCK_SUMMARY_REQUEST
  });

  commonAxios
    .get("stocks/summary")
    .then((data) => {
      console.log(data);
      dispatch(stockSummarySuccess(data));
    })
    .catch((error) => {
      dispatch(stockSummaryFailure(error));
    });
};

export const transactionChartSummary = (year) => (dispatch) => {
  dispatch({
    type: FIND_TRANSACTION_CHART_SUMMARY_REQUEST
  });

  commonAxios
    .get("transactions/annual", {
      params: { year: year }
    })
    .then((data) => {
      dispatch(transactionChartSummarySuccess(data));
    })
    .catch((error) => {
      dispatch(transactionChartSummaryFailure(error));
    });
};

export const transactionSummary = (year, month, date) => (dispatch) => {
  dispatch({
    type: FIND_TRANSACTION_SUMMARY_REQUEST
  });

  commonAxios
    .get("transactions/summary", { params: { year, month, date } })
    .then((data) => {
      dispatch(transactionSummarySuccess(data));
    })
    .catch((error) => {
      dispatch(transactionSummaryFailure(error));
    });
};

export const transactionCurrentSummary = () => (dispatch) => {
  dispatch({
    type: FIND_TRANSACTION_CURRENT_SUMMARY_REQUEST
  });

  commonAxios
    .get("transactions/summary")
    .then((data) => {
      dispatch(transactionCurrentSummarySuccess(data));
    })
    .catch((error) => {
      dispatch(transactionCurrentSummaryFailure(error));
    });
};

function transactionCurrentSummaryFailure(error) {
  return {
    type: FIND_TRANSACTION_CURRENT_SUMMARY_FAILURE,
    error: error
  };
}

function transactionCurrentSummarySuccess(data) {
  return {
    type: FIND_TRANSACTION_CURRENT_SUMMARY_SUCCESS,
    data: data
  };
}

function transactionSummaryFailure(error) {
  return {
    type: FIND_TRANSACTION_SUMMARY_FAILURE,
    error: error
  };
}

function transactionSummarySuccess(data) {
  return {
    type: FIND_TRANSACTION_SUMMARY_SUCCESS,
    data: data
  };
}

function transactionChartSummaryFailure(error) {
  return {
    type: FIND_TRANSACTION_CHART_SUMMARY_FAILURE,
    error: error
  };
}

function transactionChartSummarySuccess(data) {
  return {
    type: FIND_TRANSACTION_CHART_SUMMARY_SUCCESS,
    data: data
  };
}

function stockSummaryFailure(error) {
  return {
    type: FIND_STOCK_SUMMARY_FAILURE,
    error: error
  };
}

function stockSummarySuccess(data) {
  return {
    type: FIND_STOCK_SUMMARY_SUCCESS,
    data: data
  };
}
