import { GET_ALL, GET_ALL_SUCCESS, GET_ALL_ERROR } from "./actions";
import { store } from "../store";

const initialState = {
    entities: [],
    timeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case GET_ALL:
            newState.options = action.options;
            //newState.entities = action.payload.receive;
            break;
        case GET_ALL_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_ALL_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
