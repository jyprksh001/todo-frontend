import { configureStore } from '@reduxjs/toolkit'

import MainReducer from './reducers/main';

const store = configureStore({reducer: MainReducer});

export default store;

