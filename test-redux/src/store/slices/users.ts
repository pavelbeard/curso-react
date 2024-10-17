import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserID, UserWithID } from "../../types/types";

const DEFAULT_STATE: UserWithID[] = [
    {
        id: "1",
        username: "pavelbeard",
        github: "pavelbeard",
    },
    {
        id: "2",
        username: "nextjs",
        github: "nextjs",
    }
];


const initialState: UserWithID[] = (() => {
    const persistedState = localStorage.getItem('__redux_app_state__');
    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const { username, github } = action.payload
            const id = crypto.randomUUID();
            const newUser: UserWithID = {
                id,
                username,
                github
            };
            state.push(newUser);
        },
        deleteUserById: (state, action: PayloadAction<UserID>) => {
            const id = action.payload;
            return state.filter(user => user.id != id);
        },
        rollbackUser: (state, action: PayloadAction<UserWithID>) => {
            const ifUserExists = state.some(user => user.id == action.payload.id)
            if (!ifUserExists) {
                state.push(action.payload)
            }
        }
    }
});

export default userSlice.reducer;
export const {
    addNewUser,
    deleteUserById,
    rollbackUser,
 } = userSlice.actions;