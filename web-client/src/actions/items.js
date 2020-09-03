import {
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  DELETE_ITEMS_REQUEST,
  DELETE_ITEMS_SUCCESS,
  DELETE_ITEMS_FAILURE,
  FIND_ITEM_REQUEST,
  FIND_ITEM_SUCCESS,
  FIND_ITEM_FAILURE,
  FIND_ITEMS_REQUEST,
  FIND_ITEMS_SUCCESS,
  FIND_ITEMS_FAILURE,
  SAVE_ITEM_REQUEST,
  SAVE_ITEM_SUCCESS,
  SAVE_ITEM_FAILURE,
  SAVE_IMAGE_SUCCESS,
  SAVE_IMAGE_FAILURE,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILURE
} from "./constants";
import { commonAxios } from "../util/apiUtil";
import Swal from "sweetalert2";

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_ITEM_REQUEST
  });

  commonAxios
    .delete(`items/${id}`)
    .then((data) => {
      dispatch(deleteItemSuccess(data));
      dispatch(findAll());
    })
    .catch((error) => {
      dispatch(deleteItemFailure(error));
    });
};

export const deleteImage = (id, fileName) => (dispatch) => {
  dispatch({
    type: DELETE_IMAGE_REQUEST
  });

  commonAxios
    .delete(`items/${id}/images/${fileName}`)
    .then((data) => {
      dispatch(deleteImageSuccess(data));
      dispatch(findById(id));
    })
    .then(() =>
      Swal.fire("Deleted!", `file ${fileName} has been deleted.`, "success")
    )
    .catch((error) => {
      dispatch(deleteImageFailure(error));
      Swal.fire("Error!", error, "error");
    });
};

export const deleteAll = (ids) => (dispatch) => {
  dispatch({
    type: DELETE_ITEMS_REQUEST
  });

  commonAxios
    .delete(`items?${ids.map((id) => "ids=" + id).join("&")}`)
    .then((data) => {
      dispatch(deleteItemsSuccess(data));
    })
    .then(() => {
      dispatch(findAll());
    })
    .catch((error) => {
      dispatch(deleteItemsFailure(error));
    });
};

export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_ITEM_REQUEST
  });

  commonAxios
    .get(`items/${id}`)
    .then((data) => {
      dispatch(findItemSuccess(data));
    })
    .catch((error) => {
      dispatch(findItemFailure(error));
    });
};

export const findAll = ({ search, sort = "asc", page = 0, size = 10 } = {}) => (
  dispatch
) => {
  dispatch({
    type: FIND_ITEMS_REQUEST
  });

  commonAxios
    .get("items", {
      params: {
        ...search,
        sort,
        page,
        size
      }
    })
    .then((data) => {
      dispatch(findItemsSuccess(data));
    })
    .catch((error) => {
      dispatch(findItemsFailure(error));
    });
};

export const save = ({ id, name, description, imagesUpload } = {}) => (
  dispatch
) => {
  dispatch({
    type: SAVE_ITEM_REQUEST
  });

  const request = id
    ? commonAxios.put(`items/`, { id, name, description })
    : commonAxios.post("items/", { name, description });

  request
    .then((data) => {
      dispatch(saveItemSuccess(data));
      const formData = new FormData();
      imagesUpload.forEach((image) => {
        formData.append("files", image);
      });
      commonAxios
        .post(`items/${data.id}/images`, formData, {
          headers: {
            "content-type": "multipart/form-data"
          }
        })
        .then((data) => {
          dispatch(saveImageSuccess(data));
        })
        .catch((error) => {
          console.log(error);
          dispatch(saveImageFailure(error));
        });
    })
    .then(() => {
      dispatch(Swal.fire("Success", "Item Successfully Saved!", "success"));
    })
    .catch((error) => {
      dispatch(saveItemFailure(error));
    });
};

function saveImageSuccess(data) {
  return {
    type: SAVE_IMAGE_SUCCESS,
    data: data
  };
}

function saveImageFailure(error) {
  return {
    type: SAVE_IMAGE_FAILURE,
    error: error
  };
}

function saveItemSuccess(data) {
  return {
    type: SAVE_ITEM_SUCCESS,
    data: data
  };
}

function saveItemFailure(error) {
  return {
    type: SAVE_ITEM_FAILURE,
    error: error
  };
}

function deleteItemSuccess(data) {
  return {
    type: DELETE_ITEM_SUCCESS,
    data: data
  };
}

function deleteItemFailure(error) {
  return {
    type: DELETE_ITEM_FAILURE,
    error: error
  };
}

function deleteImageSuccess(data) {
  return {
    type: DELETE_IMAGE_SUCCESS,
    data: data
  };
}

function deleteImageFailure(error) {
  return {
    type: DELETE_IMAGE_FAILURE,
    error: error
  };
}

function deleteItemsSuccess(data) {
  return {
    type: DELETE_ITEMS_SUCCESS,
    data: data
  };
}

function deleteItemsFailure(error) {
  return {
    type: DELETE_ITEMS_FAILURE,
    error: error
  };
}

function findItemSuccess(data) {
  return {
    type: FIND_ITEM_SUCCESS,
    data: data
  };
}

function findItemFailure(error) {
  return {
    type: FIND_ITEM_FAILURE,
    error: error
  };
}

function findItemsSuccess(data) {
  return {
    type: FIND_ITEMS_SUCCESS,
    data: data
  };
}

function findItemsFailure(error) {
  return {
    type: FIND_ITEMS_FAILURE,
    error: error
  };
}
