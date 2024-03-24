import { api } from "../../../config/api";
import {
  createProductListItemFailure,
  createProductListItemRequest,
  createProductListItemSuccess,
  deleteProductListItemFailure,
  deleteProductListItemRequest,
  deleteProductListItemSuccess,
  getProductListItemsByShopIdFailure,
  getProductListItemsByShopIdRequest,
  getProductListItemsByShopIdSuccess,
} from "./ActionCreators";
import {
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

// localhost:5454/api/admin/ingredients/product/16

export const createProductListItem = ({productList,jwt}) => {
  return async (dispatch) => {
    dispatch(createProductListItemRequest());
    try {
      const { data } = await api.post("api/admin/product", productList,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("created productList ", data);
      dispatch(createProductListItemSuccess(data));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(createProductListItemFailure(error));
    }
  };
};

export const getProductListItemsByShopId = (reqData) => {
  return async (dispatch) => {
    dispatch(getProductListItemsByShopIdRequest());
    try {
      const { data } = await api.get(
        `/api/product/shop/${reqData.shopId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}
        &seasonal=${reqData.seasonal}&product_category=${reqData.productCategory}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("productList item by shops ", data);
      dispatch(getProductListItemsByShopIdSuccess(data));
    } catch (error) {
      dispatch(getProductListItemsByShopIdFailure(error));
    }
  };
};

export const searchProductListItem = ({keyword,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.get(`api/product/search?name=${keyword}`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("data ----------- ", data);
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE });
    }
  };
};

export const getAllIngredientsOfProductListItem = (reqData) => {
  return async (dispatch) => {
    dispatch(getProductListItemsByShopIdRequest());
    try {
      const { data } = await api.get(
        `api/product/shop/${reqData.shopId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("productList item by shops ", data);
      dispatch(getProductListItemsByShopIdSuccess(data));
    } catch (error) {
      dispatch(getProductListItemsByShopIdFailure(error));
    }
  };
};

export const updateProductListItemsAvailability = ({productId,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(`/api/admin/product/${productId}`, {},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update productListItems Availability ", data);
      dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ",error)
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
        payload: error,
      });
    }
};
};

export const deleteProductAction = ({productId,jwt}) => async (dispatch) => {
  dispatch({ type: DELETE_MENU_ITEM_REQUEST });
  try {
    const { data } = await api.delete(`/api/admin/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("delete product ", data);
    dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
  }
};
