import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "../Authentication/Reducer";
import shopReducer from "../Customers/Shop/Reducer";
import productListItemReducer from "../Customers/ProductList/Reducer";
import cartReducer from "../Customers/Cart/Reducer";
import { orderReducer } from "../Customers/Orders/order.reducer";
import shopsOrderReducer from "../Admin/Order/shops.order.reducer";
import superAdminReducer from "../SuperAdmin/superAdmin.reducer";



const rootReducer=combineReducers({

    auth:authReducer,
    shop:shopReducer,
    productList:productListItemReducer,
    cart:cartReducer,
    order:orderReducer,

    // admin
    shopsOrder:shopsOrderReducer,

    // super admin
    superAdmin:superAdminReducer
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))