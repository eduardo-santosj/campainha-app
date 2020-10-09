import { SAVE_HOUSES_VALUE } from '../actions/actionsTypes';

const initialState = {
    houses: []
};
  
export const houseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_HOUSES_VALUE:
            return {
                ...state,
                houses: action.data
            }
        default:
        return state;
    }
};