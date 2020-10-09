import { CLICK_UPDATE_VALUE, SAVE_HOUSES_VALUE } from './actionsTypes';

export const clickButton = value => ({
    type: CLICK_UPDATE_VALUE,
    newValue: value
});

export const saveHouses = value => ({
    type: SAVE_HOUSES_VALUE,
    data: value
});