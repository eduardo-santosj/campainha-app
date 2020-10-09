import { houseReducer } from './houseReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    housesState: houseReducer
});