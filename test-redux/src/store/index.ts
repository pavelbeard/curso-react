import { configureStore, PayloadAction, type Middleware } from '@reduxjs/toolkit';
import { UserID, UserWithID } from '../types/types';
import usersReducer, { rollbackUser } from './slices/users';
import { toast } from 'sonner';

const persistedAppStateMiddleware: Middleware = store => next => action => {
    next(action);
    localStorage.setItem('__redux_app_state__', JSON.stringify(store.getState()));
};

const syncronizeWithDBMiddleware: Middleware = store => next => action => {
    const { type, payload } = action as PayloadAction<UserID | any>;
    const prevState = store.getState();
    next(action);

    if (type === 'users/deleteUserById') {
        const userIdToRemove = payload;
        const users = prevState.users as UserWithID[];
        const userToRemove = users.find(user => user.id == userIdToRemove);

        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                // throw new Error('Algo se ha pasado mal...')
                toast.success(`Usuario ${userIdToRemove} se ha eliminado correctamente!`);
            }
        })
        .catch(err => {
            toast.error(`Algo se ha pasado mal mientras eliminar al ususario ${userIdToRemove}`);
            if (userToRemove) store.dispatch(rollbackUser(userToRemove));
            console.error(err);
        })
    }

}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        persistedAppStateMiddleware,
        syncronizeWithDBMiddleware,
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;