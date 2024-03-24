import * as actionTypes from './ActionTypes';
// Create Shop Actions
export const createShopRequest = () => ({
    type: actionTypes.CREATE_RESTAURANT_REQUEST,
  });
  
  export const createShopSuccess = (shop) => ({
    type: actionTypes.CREATE_RESTAURANT_SUCCESS,
    payload: shop,
  });
  
  export const createShopFailure = (error) => ({
    type: actionTypes.CREATE_RESTAURANT_FAILURE,
    payload: error,
  });

  // Get All Shops Actions (similar structure for other actions)
export const getAllShopsRequest = () => ({
    type: actionTypes.GET_ALL_RESTAURANTS_REQUEST,
  });
  
  export const getAllShopsSuccess = (shops) => ({
    type: actionTypes.GET_ALL_RESTAURANTS_SUCCESS,
    payload: shops,
  });
  
  export const getAllShopsFailure = (error) => ({
    type: actionTypes.GET_ALL_RESTAURANTS_FAILURE,
    payload: error,
  });
  

  // Delete Shop Actions
export const deleteShopRequest = () => ({
    type: actionTypes.DELETE_RESTAURANT_REQUEST,
  });
  
  export const deleteShopSuccess = (shopId) => ({
    type: actionTypes.DELETE_RESTAURANT_SUCCESS,
    payload: shopId,
  });
  
  export const deleteShopFailure = (error) => ({
    type: actionTypes.DELETE_RESTAURANT_FAILURE,
    payload: error,
  });


  // Update Shop Actions
export const updateShopRequest = () => ({
    type: actionTypes.UPDATE_RESTAURANT_REQUEST,
  });
  
  export const updateShopSuccess = (updatedShop) => ({
    type: actionTypes.UPDATE_RESTAURANT_SUCCESS,
    payload: updatedShop,
  });
  
  export const updateShopFailure = (error) => ({
    type: actionTypes.UPDATE_RESTAURANT_FAILURE,
    payload: error,
  });

  export const getShopByIdRequest = () => ({
    type: actionTypes.GET_RESTAURANT_BY_ID_REQUEST,
  });
  
  export const getShopByIdSuccess = (shop) => ({
    type: actionTypes.GET_RESTAURANT_BY_ID_SUCCESS,
    payload: shop,
  });
  
  export const getShopByIdFailure = (error) => ({
    type: actionTypes.GET_RESTAURANT_BY_ID_FAILURE,
    payload: error,
  });
  