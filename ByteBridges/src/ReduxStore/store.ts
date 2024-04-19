import {configureStore} from '@reduxjs/toolkit';
import authslice from './authslice';

export const store = configureStore({
reducer : authslice

});


export type RootState = ReturnType<typeof store.getState>;
//export default stores;