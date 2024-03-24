import * as actionTypes from './ActionType';

// Delete ProductList Item Actions
export const deleteProductListItemRequest = () => ({
    type: actionTypes.DELETE_MENU_ITEM_REQUEST,
  });
  
  export const deleteProductListItemSuccess = (productListItemId) => ({
    type: actionTypes.DELETE_MENU_ITEM_SUCCESS,
    payload: productListItemId,
  });
  
  export const deleteProductListItemFailure = (error) => ({
    type: actionTypes.DELETE_MENU_ITEM_FAILURE,
    payload: error,
  });

  // Get ProductList Items by Shop ID Actions
export const getProductListItemsByShopIdRequest = () => ({
    type: actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
  });
  
  export const getProductListItemsByShopIdSuccess = (productListItems) => ({
    type: actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    payload: productListItems,
  });
  
  export const getProductListItemsByShopIdFailure = (error) => ({
    type: actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    payload: error,
  });

  // Create ProductList Item Actions
export const createProductListItemRequest = () => ({
    type: actionTypes.CREATE_MENU_ITEM_REQUEST,
  });
  
  export const createProductListItemSuccess = (productListItem) => ({
    type: actionTypes.CREATE_MENU_ITEM_SUCCESS,
    payload: productListItem,
  });
  
  export const createProductListItemFailure = (error) => ({
    type: actionTypes.CREATE_MENU_ITEM_FAILURE,
    payload: error,
  });