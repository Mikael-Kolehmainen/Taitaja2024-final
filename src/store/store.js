import { Tuple, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import { rootReducer } from "./rootReducer";

/*
  This is store.ts, the main file for handling the global state of the application.
  I use the Redux-toolkit for handling the global state and for persistent state
  I'm using Redux-persist.
*/

export const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(thunk),
});

export const persistor = persistStore(store);
