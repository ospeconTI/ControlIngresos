export const ADD = "[parteDiario] add ";
export const ADD_SUCCESS = "[parteDiario] add succes";
export const ADD_ERROR = "[parteDiario] add error";

export const add = (item) => ({
    type: ADD,
    item: item,
});
