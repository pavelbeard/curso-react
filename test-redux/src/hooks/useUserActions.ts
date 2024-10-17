import { addNewUser, deleteUserById } from "../store/slices/users";
import { User, UserID } from "../types/types";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const addUser = ({ username, github }: User) => {
        dispatch(addNewUser({ username, github }))
    };

    const deleteUser = (id: UserID) => {
        dispatch(deleteUserById(id));
    };

    return {
        addUser,
        deleteUser
    }
};