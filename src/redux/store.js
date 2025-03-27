import { configureStore } from "@reduxjs/toolkit";
import productreducer from './productslicer';
import userReducer  from "./userslicer";
export const store=configureStore({
    reducer:{
        product:productreducer,
        user:userReducer,
    },
});

