import {
   combineReducers,
   configureStore,
   isRejectedWithValue,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
   PersistConfig,
   persistReducer,
   FLUSH,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
   REHYDRATE,
   persistStore,
} from 'redux-persist';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createPersistStorage } from './persist-storage';

import { authApi } from '~/src/infrastructure/redux/apis/auth.api';
import { postsApi } from '~/src/infrastructure/redux/apis/post.api';
import { productsApi } from '~/src/infrastructure/redux/apis/product.api';
import authSlice from '~/src/infrastructure/redux/features/auth/auth.slice';
import searchSlice from '~/src/infrastructure/redux/features/app/search.slice';
import { categoryApi } from '~/src/infrastructure/redux/apis/category.api';

const storage = createPersistStorage();

const persistConfig: PersistConfig<ReturnType<typeof reducers>> = {
   key: 'root',
   version: 1,
   storage, // Use AsyncStorage via createPersistStorage
   blacklist: [
      authApi.reducerPath,
      postsApi.reducerPath,
      productsApi.reducerPath,
      categoryApi.reducerPath,
   ], // Exclude API reducers from persistence
   whitelist: ['auth', 'search'], // Only persist auth and search slices
};

/**
 * This function is used to get enhancers for debugging (not setup yet, but can be used in future so ignoring for now)
 */
const getEnhancers = (getDefaultEnhancers: any) => {
   return getDefaultEnhancers();
};

/**
 * On api error this will be called
 */
export const rtkQueryLoggerMiddleware =
   (api: any) => (next: any) => (action: any) => {
      if (isRejectedWithValue(action)) {
         console.log('isRejectedWithValue', action.error, action.payload);
         alert(JSON.stringify(action)); // This is just an example. Replace with your preferred notification method.
      }

      return next(action);
   };

const reducers = combineReducers({
   auth: authSlice,
   search: searchSlice,
   [authApi.reducerPath]: authApi.reducer,
   [postsApi.reducerPath]: postsApi.reducer,
   [productsApi.reducerPath]: productsApi.reducer,
   [categoryApi.reducerPath]: categoryApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const reduxStore = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat(
         authApi.middleware,
         postsApi.middleware,
         productsApi.middleware,
         categoryApi.middleware,
         rtkQueryLoggerMiddleware,
      ),
   enhancers: getEnhancers,
});

// Enable refetchOnMount and refetchOnReconnect behavior
setupListeners(reduxStore.dispatch);

export default reduxStore;

export const persistor = persistStore(reduxStore);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
