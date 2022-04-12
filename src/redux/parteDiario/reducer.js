import { ADD, ADD_SUCCESS, ADD_ERROR } from "./actions";
import { store } from "../store";

const initialState = {
    entities: [],
    timeStamp: null,
    timeStampError: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case ADD:
            newState.options = action.options;
            //newState.entities = action.payload.receive;
            break;
        case ADD_SUCCESS:
            newState.timeStamp = new Date().getTime();
            break;
        case ADD_ERROR:
            newState.TimeStampError = new Date().getTime();
            break;
    }
    return newState;
};
