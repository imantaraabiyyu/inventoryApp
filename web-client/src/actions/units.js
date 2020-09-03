import {
  DELETE_UNIT_REQUEST,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAILURE,
  DELETE_UNITS_REQUEST,
  DELETE_UNITS_SUCCESS,
  DELETE_UNITS_FAILURE,
  FIND_UNIT_REQUEST,
  FIND_UNIT_SUCCESS,
  FIND_UNIT_FAILURE,
  FIND_UNITS_REQUEST,
  FIND_UNITS_SUCCESS,
  FIND_UNITS_FAILURE,
  SAVE_UNIT_REQUEST,
  SAVE_UNIT_SUCCESS,
  SAVE_UNIT_FAILURE
} from "./constants";
import { commonAxios } from "../util/apiUtil";
import Swal from "sweetalert2";

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_UNIT_REQUEST
  });

  commonAxios
    .delete(`units/${id}`)
    .then((data) => {
      dispatch(deleteUnitSuccess(data));
    })
    .then(() => {
      dispatch(findAll());
    })
    .catch((error) => {
      dispatch(deleteUnitFailure(error));
    });
};

export const deleteAll = (ids) => (dispatch) => {
  dispatch({
    type: DELETE_UNITS_REQUEST
  });

  commonAxios
    .delete(`units?${ids.map((id) => "ids=" + id).join("&")}`)
    .then((data) => {
      dispatch(deleteUnitsSuccess(data));
      dispatch(findAll());
    })
    .catch((error) => {
      dispatch(deleteUnitsFailure(error));
    });
};

export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_UNIT_REQUEST
  });

  commonAxios
    .get(`units/${id}`)
    .then((data) => {
      dispatch(findUnitSuccess(data));
    })
    .catch((error) => {
      dispatch(findUnitFailure(error));
    });
};

export const findAll = ({ search, sort = "asc", page = 0, size = 10 } = {}) => (
  dispatch
) => {
  dispatch({
    type: FIND_UNITS_REQUEST
  });

  commonAxios
    .get("units", {
      params: {
        ...search,
        sort,
        page,
        size
      }
    })
    .then((data) => {
      dispatch(findUnitsSuccess(data));
    })
    .catch((error) => {
      dispatch(findUnitsFailure(error));
    });
};

export const save = ({ id, name, description } = {}) => (dispatch) => {
  dispatch({
    type: SAVE_UNIT_REQUEST
  });

  const request = id
    ? commonAxios.put(`units/`, { id, name, description })
    : commonAxios.post("units/", { name, description });

  request
    .then((data) => {
      dispatch(saveUnitSuccess(data));
    })
    .then(() => {
      dispatch(Swal.fire("Success", "Item Successfully Saved!", "success"));
    })
    .catch((error) => {
      dispatch(saveUnitFailure(error));
    });
};

function saveUnitSuccess(data) {
  return {
    type: SAVE_UNIT_SUCCESS,
    data: data
  };
}

function saveUnitFailure(error) {
  return {
    type: SAVE_UNIT_FAILURE,
    error: error
  };
}

function deleteUnitSuccess(data) {
  return {
    type: DELETE_UNIT_SUCCESS,
    data: data
  };
}

function deleteUnitFailure(error) {
  return {
    type: DELETE_UNIT_FAILURE,
    error: error
  };
}

function deleteUnitsSuccess(data) {
  return {
    type: DELETE_UNITS_SUCCESS,
    data: data
  };
}

function deleteUnitsFailure(error) {
  return {
    type: DELETE_UNITS_FAILURE,
    error: error
  };
}

function findUnitSuccess(data) {
  return {
    type: FIND_UNIT_SUCCESS,
    data: data
  };
}

function findUnitFailure(error) {
  return {
    type: FIND_UNIT_FAILURE,
    error: error
  };
}

function findUnitsSuccess(data) {
  return {
    type: FIND_UNITS_SUCCESS,
    data: data
  };
}

function findUnitsFailure(error) {
  return {
    type: FIND_UNITS_FAILURE,
    error: error
  };
}
