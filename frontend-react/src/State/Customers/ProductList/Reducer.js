// Reducers.js
import * as actionTypes from './ActionType';

const initialState = {
  productListItems: [],
  loading: false,
  error: null,
  search:[],
  message:null
};

const productListItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_MENU_ITEM_REQUEST:
    case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
    case actionTypes.DELETE_MENU_ITEM_REQUEST:
    case actionTypes.SEARCH_MENU_ITEM_REQUEST:
    case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message:null
      };
    case actionTypes.CREATE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        productListItems: [...state.productListItems, action.payload],
        message:"Product Created Successfully"
      };
    case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        productListItems: action.payload,
      };
    case actionTypes.DELETE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        productListItems: state.productListItems.filter(
          (productListItem) => productListItem.id !== action.payload
        ),
      };
      case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
        console.log("updated items id ",action.payload.id)
      return {
        ...state,
        loading: false,
        productListItems: state.productListItems.map(
          (productListItem) => productListItem.id === action.payload.id?action.payload:productListItem
        ),
      };
      case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        search:action.payload
      };
    case actionTypes.CREATE_MENU_ITEM_FAILURE:
    case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
    case actionTypes.DELETE_MENU_ITEM_FAILURE:
    case actionTypes.SEARCH_MENU_ITEM_FAILURE:
    case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message:null
      };
    default:
      return state;
  }
};

export default productListItemReducer;
