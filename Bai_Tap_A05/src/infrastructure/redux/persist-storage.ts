import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { WebStorage } from 'redux-persist/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function createPersistStorage() {
   return AsyncStorage;
}
