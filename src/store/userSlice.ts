import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    user : '',
    profileImg : '',
    isLogin : false, 
    cartItems : []
}

const userSlice = createSlice({
    name : 'user' ,
    initialState : initialUserState,
    reducers : {
        login(state , action) {
            state.user = action.payload
            state.isLogin = true;
        },
        logout(state) {
            state.user = '';
            state.isLogin = false;
        },
        addProfileImg(state,action) {
            state.profileImg = action.payload;
        },
        modifyDisplayName(state,action) {
            state.user = action.payload;
        }
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer