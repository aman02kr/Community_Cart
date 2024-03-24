// Actions.js

import { api } from "../../../config/api";
import {
  createShopFailure,
  createShopRequest,
  createShopSuccess,
  deleteShopFailure,
  deleteShopRequest,
  deleteShopSuccess,
  getAllShopsFailure,
  getAllShopsRequest,
  getAllShopsSuccess,
  getShopByIdFailure,
  getShopByIdRequest,
  getShopByIdSuccess,
  updateShopFailure,
  updateShopRequest,
  updateShopSuccess,
} from "./ActionCreateros";

import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_RESTAIRANTS_EVENTS_FAILURE,
  GET_RESTAIRANTS_EVENTS_REQUEST,
  GET_RESTAIRANTS_EVENTS_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
} from "./ActionTypes";

export const getAllShopsAction = (token) => {
  return async (dispatch) => {
    dispatch(getAllShopsRequest());
    try {
      const { data } = await api.get("/api/shops", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllShopsSuccess(data));
      console.log("all shop ", data);
    } catch (error) {
      dispatch(getAllShopsFailure(error));
    }
  };
};

export const getShopById = (reqData) => {
  return async (dispatch) => {
    dispatch(getShopByIdRequest());
    try {
      const response = await api.get(`api/shops/${reqData.shopId}`, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch(getShopByIdSuccess(response.data));
    } catch (error) {
      console.log("error",error)
      dispatch(getShopByIdFailure(error));
    }
  };
};

export const getShopByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/shops/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get shop by user id ", data);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: GET_RESTAURANT_BY_USER_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createShop = (reqData) => {
  console.log("token-----------", reqData.token);
  return async (dispatch) => {
    dispatch(createShopRequest());
    try {
      const { data } = await api.post(`/api/admin/shops`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch(createShopSuccess(data));
      console.log("created shop ", data);
    } catch (error) {
      console.log("catch error ", error);
      dispatch(createShopFailure(error));
    }
  };
};

export const updateShop = ({ shopId, shopData, jwt }) => {
  return async (dispatch) => {
    dispatch(updateShopRequest());

    try {
      const res = await api.put(
        `api/admin/shop/${shopId}`,
        shopData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch(updateShopSuccess(res.data));
    } catch (error) {
      dispatch(updateShopFailure(error));
    }
  };
};
export const deleteShop = ({ shopId, jwt }) => {
  return async (dispatch) => {
    dispatch(deleteShopRequest());

    try {
      const res = await api.delete(`/api/admin/shop/${shopId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete shop ", res.data);
      dispatch(deleteShopSuccess(shopId));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(deleteShopFailure(error));
    }
  };
};

export const updateShopStatus = ({ shopId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

    try {
      const res = await api.put(
        `api/admin/shops/${shopId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("ressssss ", res.data);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("error ",error)
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };
};





export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
      const res = await api.post(`api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create category ", res.data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getShopsCategory = ({ jwt,shopId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const res = await api.get(`/api/category/shop/${shopId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get shops category ", res.data);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
    }
  };
};
