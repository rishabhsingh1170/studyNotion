import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import profileReducer from "../slices/profileSlice.js";
import cartReducer from "../slices/cartSlice.js";

const rootReducer = combineReducers({
  // Add your reducers here
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
});

export default rootReducer;