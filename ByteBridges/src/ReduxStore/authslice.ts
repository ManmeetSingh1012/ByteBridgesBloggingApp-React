//import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*interface AuthState {
   status: boolean;
   userData: string; // Adjust the type according to your userData structure
}

const initialState: AuthState = {
   status: false,
   userData: "",
};

const authSlice = createSlice ({
   name: "auth",
   initialState,
   reducers: {
      Login: (state, action: PayloadAction<{ userData: any }>) => {
         state.status = true;
         state.userData = action.payload.userData;
      },
      Logout: (state) => {
         state.status = false;
         state.userData = "";
      }
   }
});

export const { Login, Logout } = authSlice.actions;
export default authSlice.reducer;*/

/*import { combineReducers ,configureStore } from "@reduxjs/toolkit";
import { ADD_DATA , REMOVE_DATA ,PostsState , RootState } from "./action";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

/*const initialState = {
  posts: {
   authstatus: false,
   acesstoken: "",
  },
};

interface payload {
type: string;
payload: string;
}

const postsReducer = (state = initialState, action:PayloadAction<payload>) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        posts: {authstatus: true, acesstoken: action.payload},
      };
    case REMOVE_DATA:
      return {
        ...state,
        posts: {authstatus: false, acesstoken: action.payload},
      };
    default:
      return state;
  }
};*/


/*const initialState: PostsState = {
  authstatus: false,
  acesstoken: "",
};

const postsReducer = (state = initialState, action: PayloadAction<PostsState>): PostsState => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        authstatus: true,
        acesstoken: action.payload,
      };
    case REMOVE_DATA:
      return {
        ...state,
        authstatus: false,
        acesstoken: action.payload,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
    posts: postsReducer
});


// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist
    }),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor }; */


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./action";
export interface User {
 status : boolean,
 acesstoken :string
}
const initialState: User = 
    {
       status : false,
       acesstoken :""
    }

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
       state.status = true,
       state.acesstoken = action.payload
       
    },

    removeUser :(state) =>{
       state.status = false,
       state.acesstoken = ""
    }
  },
});
export const { addUser , removeUser} =
  userSlice.actions;
//export const userSelector = (state: RootState) => state.;
export default userSlice.reducer;


