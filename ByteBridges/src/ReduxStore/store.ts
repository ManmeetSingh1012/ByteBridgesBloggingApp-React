import { configureStore } from '@reduxjs/toolkit';
import authslice from './authslice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authslice)

export const store = configureStore({
  reducer: {
    // our reducers goes here
     persistedReducer
  },
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
//export default stores;