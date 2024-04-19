import {createSlice} from "@reduxjs/toolkit";


const initialState = {

   status : false,
   userData : null
}

const authslice = createSlice ({

   name : "auth",
   initialState,
   reducers :{

      Login : (state,action) =>{
         state.status = true;
         state.userData = action.payload.userData;
      },

      Logout : (state) =>{
         state.status = false;
         state.userData = null;
      }

   }
})


export const {Login,Logout} = authslice.actions;
export default authslice.reducer;